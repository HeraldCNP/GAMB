import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContaService } from '../../../services/conta.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { AreaService } from '../../../services/area.service';
import { CarpetaService } from '../../../services/carpeta.service';

@Component({
  selector: 'app-conta-index',
  templateUrl: './conta-index.component.html',
  styleUrls: ['./conta-index.component.css']
})
export class ContaIndexComponent implements OnInit {
  totalCarpetasConta: any = 0;
  carpetas: any = [];
  carpetasTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: any;
  contaForm: any;
  editForm: any;
  cargando: boolean = true;
  idCarpeta: any;
  idCarpetaConta: any;
  area: string = 'contabilidad';
  carpeta: any;
  tipos: string[] = [];
  tipo: string = 'Preventivos';
  estadoFinan: any;
  URL = environment.api;
  areas: any;

  constructor(private fb: FormBuilder, private contaService: ContaService, private router: Router, private areaService: AreaService, private carpetaService: CarpetaService) {
    this.contaForm = this.fb.group({
      numero: [''],
      detalle: ['', [Validators.required]],
      beneficiario: [''],
      fecha: [''],
      monto: [''],
      fojas: ['', [Validators.required]],
      observacion: [''],
      idCarpeta: [''],
    });

    this.estadoFinan = this.fb.group({

    })


    this.editForm = this.fb.group({
      gestion: ['', [Validators.required]],
      area: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      numCarpeta: ['', [Validators.required]],
      nameCarpeta: ['', [Validators.required]],
      lugar: [''],
      estante: ['', [Validators.required]],
      fila: [''],
    });
  }

  ngOnInit(): void {
    this.cargarCarpetasConta();
    this.cargarAreas()
  }

  cargarCarpetasConta() {
    this.cargando = true;
    this.contaService.getAllConta(this.limit, this.skip, this.area, this.tipo)
      .subscribe((data: any) => {
        this.totalCarpetasConta = data.serverResponse.length;
        this.carpetas = data;
        this.carpetasTemp = data;
        this.totalPages = data.totalpage;
        console.log(data);
        this.cargando = false;
      });
  }



  get form() {
    return this.contaForm.controls;
  }

  get form2() {
    return this.editForm.controls;
  }



  actualizarSegundoSelect() {
    console.log("cambio");

    switch (this.editForm.value.area) {
      case 'administracion':
        this.tipos = ['Opción A', 'Opción B', 'Opción C'];
        break;
      case 'contabilidad':
        this.tipos = ['Preventivos', 'Devengados', 'Estados Financieros', 'Ingresos', 'Otros'];
        break;
      case 'recaudaciones':
        this.tipos = ['Opción 1', 'Opción 2', 'Opción 3'];
        break;
      case 'legal':
        this.tipos = ['Opción 4', 'Opción 5', 'Opción 6'];

        break;
      default:
        this.tipos = [];
        break;
    }
  }


  cargarDataEdit(carpeta:any) {
    this.carpeta = carpeta;
    let search = this.areas.find((x: { nombre: any; }) => x.nombre == carpeta.area);
    this.tipos = search.tipos;
    this.editForm.setValue({
      gestion: carpeta.gestion,
      area: carpeta.area,
      tipo: carpeta.tipo,
      numCarpeta: carpeta.numCarpeta,
      nameCarpeta: carpeta.nameCarpeta,
      lugar: carpeta.lugar,
      estante: carpeta.estante,
      fila: carpeta.fila,
    });
    this.idCarpeta = carpeta._id;
  }

  // gestion: ['', [Validators.required]],
  // area: ['', [Validators.required]],
  // tipo: ['', [Validators.required]],
  // numCarpeta: ['', [Validators.required]],
  // nameCarpeta: ['', [Validators.required]],
  // lugar: [''],
  // estante: ['', [Validators.required]],
  // fila: [''],

  buscar(termino: string) {
    if (termino.length === 0) {
      this.carpetas = this.carpetasTemp;
      return;
    }
    // this.almacenService.searchProveedor(termino).subscribe((resp) => {
    //   console.log('Resp:', resp);
    //   this.proveedores = resp;
    //   this.proveedoresTemp = resp;
    // });
  }

  cambiarPagina(valor: number) {
    this.skip += valor;
    this.page += valor;
    if (this.page < 0) {
      this.skip = 0;
    } else if (this.page > this.totalPages) {
      this.skip -= valor;
      this.page -= valor;
    }
    this.cargarCarpetasConta();
  }

  borrarCarpeta(id: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: '¡No podrás revertir esto! Se eliminaran todos los archivos registrados dentro de esta carpeta',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Eliminado!', 'La Carpeta ha sido eliminada.', 'success');
        this.carpetaService.deleteCarpeta(id).subscribe(
          (res) => console.log(res),
          (err) => console.log('HTTP Error', err),
          () => this.cargarCarpetasConta()
        );
      }
    });
  }

  editCarpeta(form: any){
    this.carpetaService.editCarpeta(form, this.idCarpeta).subscribe(
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
          'Articulo editado Correctamente',
          '2000'
        );
        this.cargarCarpetasConta();
      }
    );
  }

  crearConta(form: any) {
    // console.log(this.finanForm.value.monto.replace(/\./g, ''));
    this.contaService.createConta(form, this.idCarpetaConta).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.contaForm.reset();
        this.alertOk(
          'success',
          'Exito',
          'Documento Registrado Correctamente',
          '2000'
        );
        this.cargarCarpetasConta();
      }
    );
  }

  alertOk(icon: any, title: any, text: any, timer: any) {
    Swal.fire({
      icon,
      title,
      text,
      timer,
    });
  }

  resetForm() {
    this.contaForm.reset();
  }

  // addCarpetaId(carpeta:any){
  //   console.log(carpeta);
  //   this.tipos = carpeta.tipo;
  //   this.contaForm.setValue({
  //     numero: '',
  //     detalle: '',
  //     beneficiario: '',
  //     fecha: '',
  //     monto: '',
  //     fojas: '',
  //     observacion: '',
  //     idCarpeta: carpeta._id,
  //   });
  //   this.idCarpetaConta = carpeta._id;
  // }


  addCarpetaId(carpeta: any) {
    switch (carpeta.tipo) {
      case 'Preventivos':
        console.log(carpeta);
        this.router.navigate(['archivos/conta/docs/preven', carpeta._id])
        break;

      case 'Devengados':
        console.log(carpeta);
        this.router.navigate(['archivos/conta/docs/deven', carpeta._id])
        break;

      default:
        break;
    }
  }

  // verDocumentos(carpeta: any) {
  //   this.contaService.getSingleCarpeta(carpeta._id).subscribe(
  //     (res) => {
  //       this.carpeta = res.serverResponse;
  //       // console.log(this.carpeta);
  //     },
  //     (err) => console.log('HTTP Error', err),
  //     () => {

  //     }
  //   );
  // }

  verArchivos(carpeta: any) {
    switch (carpeta.tipo) {
      case 'Preventivos':
        // console.log(carpeta);
        this.router.navigate(['archivos/conta/docs/preven/list', carpeta._id])
        break;

      case 'Devengados':
        console.log(carpeta);
        this.router.navigate(['archivos/conta/docs/deven/list', carpeta._id])
        break;

      default:
        break;
    }
  }

  changeStatus(status: any) {
    this.tipo = status;
    this.cargarCarpetasConta();
    this.skip = 1;
  }


  public doSelect = (value: any) => {
    // console.log('SingleDemoComponent.doSelect', value);
    let search = this.areas.find((x: { nombre: any; }) => x.nombre == value);
    this.tipos = search.tipos;
    console.log(this.tipos);

    // this.user = this.users.find((item: { post: string; }) => item.post === value);
    // console.log(this.user)
  };


  cargarAreas() {
    this.areaService.getAllAreas()
      .subscribe((data: any) => {
        this.areas = data.serverResponse;
        // console.log(this.areas);
      });
  }


}
