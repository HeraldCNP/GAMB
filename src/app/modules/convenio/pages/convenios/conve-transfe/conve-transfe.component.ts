import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ConvenioService } from '../../../services/convenio.service';

@Component({
  selector: 'app-conve-transfe',
  templateUrl: './conve-transfe.component.html',
  styleUrls: ['./conve-transfe.component.css']
})
export class ConveTransfeComponent implements OnInit {
  URL = environment.api;
  convenioId: any;
  enti: any;
  saldocv: any = 0;
  montototaltrans: number = 0;
  transfeForm: any;
  total: any;
  files: any;
  progress = 0;
  datosConvenio: any[] = [];
  partidas: any;
  rubros: any;
  gamb: any;
  constructor(
    private fb: FormBuilder,
    private api: ConvenioService,
    private router: Router,
    private activeRouter: ActivatedRoute,
  ) {
    this.transfeForm = this.fb.group({
      fecha: ['', [Validators.required]],
      entidad: ['', [Validators.required]],
      cuenta: ['',],
      partida: ['',],
      rubro: ['',],
      importe: ['', [Validators.required]],
      fuente: ['', [Validators.required]],
      comprobante: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.convenioId = this.activeRouter.snapshot.paramMap.get('id');
    this.getconvenio();
  }
  
  getconvenio() {
    if (this.convenioId) {
      this.api.getSingleConvenio(this.convenioId).subscribe(data => {
        console.log(data.financiadoras)
        data.financiadoras.forEach((finan: any) => {
          if (finan.entidad.codigo == 1508) {
            this.gamb = finan;
            console.log(this.gamb)
          }
        });
        data.financiadoras.forEach((finan: any) => {
          if (this.gamb.tipo == 'Financiadora') {
            if (finan.tipo == 'Financiadora') {
              this.datosConvenio.push(finan);
              this.getPartidas();
            }
          } else if (this.gamb.tipo == 'Ejecutora') {
            if (finan.tipo == 'Financiadora') {
              this.datosConvenio.push(finan);
              this.getRubros();
            }
          }else{
            this.getPartidas();
            this.getRubros();
            this.datosConvenio = data.financiadoras;
          }
        });
        console.log(this.datosConvenio)

        // this.datosConvenio = data.financiadoras;
        // console.log("financiadoras", data.financiadoras)
        this.total = data.montototal;
        // console.log(data.financiadoras)
        if (data.montototaltrans != undefined) {
          this.montototaltrans = data.montototaltrans;
          console.log(this.montototaltrans);
        } else {
          this.montototaltrans = 0;
          console.log("monto Total Transferido:", this.montototaltrans);
        }
        if (data.saldo != undefined) {
          this.saldocv = data.saldo;
          console.log(this.saldocv);
        } else {
          this.saldocv = data.montototal;
          console.log(this.saldocv);
        }
        this.enti = data.transferencia;
        // console.log(this.enti)
      })
    }
  }

  getPartidas() {
    this.api.getAllPartidas().subscribe(data => {
      this.partidas = data;
      // console.log("partidas", this.partidas)
      // console.log("partidas", data)
    })
  }

  getRubros() {
    this.api.getAllRubros().subscribe(data => {
      this.rubros = data;
      // console.log("partidas", this.partidas)
      // console.log("partidas", data)
    })
  }

  uploadTransfe() {
    let fd = new FormData();
    fd.append('fecha', this.transfeForm.value.fecha);
    fd.append('entidad', this.transfeForm.value.entidad);
    fd.append('cuenta', this.transfeForm.value.cuenta);
    fd.append('partida', this.transfeForm.value.partida);
    fd.append('rubro', this.transfeForm.value.rubro);
    fd.append('importe', this.transfeForm.value.importe);
    fd.append('fuente', this.transfeForm.value.fuente);
    fd.append('comprobante', this.files[0]);
    let saldo: any = 0;
    let total: any = 0;
    this.datosConvenio.forEach((element: any) => {
      if (this.transfeForm.value.entidad == element.entidad.denominacion) {
        console.log(element.entidad.denominacion)
        total = parseFloat(element.monto)
        console.log(total)
      }
    });
    let totaltrans = this.transfeForm.value.importe
    this.enti.forEach((element: any) => {
      if (this.transfeForm.value.entidad == element.entidad) {
        totaltrans = parseInt(totaltrans + element.importe)

      }
    });
    console.log(totaltrans)
    saldo = total - totaltrans
    console.log(saldo)
    fd.append('totaldes', totaltrans);
    fd.append('saldo', saldo);
    if (totaltrans <= total) {
      console.log(this.montototaltrans);
      console.log(this.saldocv);
      let montototaltransfe = this.transfeForm.value.importe + this.montototaltrans
      let saldocv: any = this.total - montototaltransfe
      console.log(montototaltransfe)
      console.log(saldocv)
      let fdv = new FormData();
      fdv.append('montototaltrans', montototaltransfe);
      fdv.append('saldo', saldocv);
      console.log(this.convenioId)
      this.api.addTransfe(fd, this.convenioId)
        .subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            }
            this.api.editarEstado(fdv, this.convenioId).subscribe(data => {
            })
          },
          err => {
            console.log('HTTP Error', err)
            this.progress = 0;
          },
          () => {
            this.progress = 0;
            this.router.navigate(['convenio/convenio/index']),
              this.alertOk('success', 'Exito', 'Transferencia Registrada Correctamente', '2000')
          }
        );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El total de tranferencias no debe superar el monto total',

      })
    }

  }

  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer
    })
  }

  get form() {
    return this.transfeForm.controls;
  }

  onChange($event: any) {
    this.files = $event.target.files;
  }

  cancel() {
    this.router.navigate(['convenio/convenio/index'])
  }

}
