import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { GacetaService } from '../../../services/gaceta.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-ptdi-index',
  templateUrl: './ptdi-index.component.html',
  styleUrls: ['./ptdi-index.component.css']
})
export class PtdiIndexComponent implements OnInit {

  ptdis: any = [];
  ptdi: any;
  idPtdi: any;
  date = new Date();
  URL = environment.api;
  status: any;
  showModal: boolean = false;
  addForm: any;
  editForm: any;
  files: any = [];
  progress: number = 0;
  ptdiId: any;

  constructor(
    private router: Router, private api: GacetaService, private fb: FormBuilder
  ) {
    this.addForm = new FormGroup({
      gestion: new FormControl('', Validators.required),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      archivo: new FormControl('', Validators.required),
    });

    this.editForm = this.fb.group({
      gestion: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      archivo: [''],
    });
  }

  ngOnInit(): void {
    this.getPtdis()
  }

  getPtdis() {
    this.api.getAllPtdis().subscribe
      (res => {
        this.ptdis = res;
        console.log(this.ptdis)
      });
  }


  changeStatus(id: any, estado: any) {
    let fd = new FormData();
    fd.append('estado', estado);
    console.log(estado)
    this.api.changeEstadoPtdi(id, fd)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.getPtdis();
        }
      );
  }



  generatePDF() {

  }

  getPtdi(id: any) {
    this.api.getGaceta(id)
      .subscribe(
        res => {
          this.ptdi = res.serverResponse;
          console.log(this.ptdi)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.showModal = true;
        }
      );
  }

  updatePtdi(id: string) {
    this.router.navigate(['docAdmin/ptdi/update', id])
  }

  deletePtdi(id: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Eliminado!',
          'El Documento ha sido eliminado.',
          'success'
        )
        this.api.deletePtdi(id).subscribe(
          res => console.log(res),
          err => console.log('HTTP Error', err),
          () => this.getPtdis()
        );
      }
    })
  }

  get form() {
    return this.addForm.controls;
  }

  onChange($event: any) {
    this.files = $event.target.files;
  }

  getId(id: string) {
    this.ptdiId = id;
  }

  addArchivo(form: FormData) {
    let fd = new FormData();
    fd.append('gestion', this.addForm.value.gestion);
    fd.append('descripcion', this.addForm.value.descripcion);
    fd.append('file', this.files[0]);
    this.api.registerPtdi(fd).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        }
      },
      (err) => {
        console.log('HTTP Error', err);
        this.progress = 0;
      },
      () => {
        this.progress = 0;
        this.getPtdis();
        this.resetForm();
        this.alertOk(
          'success',
          'Exito',
          'Documento Creado Correctamente',
          '2000'
        );
      }
    );
  }

  resetForm() {
    this.addForm.reset();
  }

  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer,
    });
  }

  cargarDataEdit(ptdi: any) {
    // console.log("Rendi Edit", ptdi)
    this.editForm.setValue({
      gestion: ptdi.gestion,
      descripcion: ptdi.descripcion,
      archivo: null
    });
    this.idPtdi = ptdi._id;
  }

  editPtdi() {
    let fd = new FormData();

    if (this.files[0]) {
      fd.append('gestion', this.editForm.value.gestion);
      fd.append('descripcion', this.editForm.value.descripcion);
      fd.append('archivo', this.files[0]);
    } else {
      fd.append('gestion', this.editForm.value.gestion);
      fd.append('descripcion', this.editForm.value.descripcion);
    }

    // let fd = new FormData();

    console.log(this.idPtdi)

    this.api.editarPtdi(fd, this.idPtdi).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log('HTTP Error', err);
      },
      () => {
        this.editForm.reset();
        this.alertOk(
          'success',
          'Exito',
          'Documento editado Correctamente',
          '2000'
        );
        this.getPtdis();
      }
    );
  }

}
