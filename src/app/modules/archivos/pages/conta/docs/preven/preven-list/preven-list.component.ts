import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContaService } from 'src/app/modules/archivos/services/conta.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preven-list',
  templateUrl: './preven-list.component.html',
  styleUrls: ['./preven-list.component.css']
})
export class PrevenListComponent implements OnInit {
  totalPreventivos: any = 0;
  preventivos: any = [];
  preventivosTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: any;
  cargando: boolean = true;
  carpeta:any;
  carpetaId?:any;

  URL = environment.api;
  constructor(private contaService: ContaService, private activeRouter: ActivatedRoute, private router: Router) { }



  ngOnInit(): void {
    this.carpetaId = this.activeRouter.snapshot.paramMap.get('id');
    // console.log(this.carpetaId);

    this.cargarPreventivos();
  }


  cargarPreventivos() {
    this.cargando = true;
    this.contaService.getSingleCarpeta(this.carpetaId).subscribe(
      (res) => {
        this.preventivos = res.serverResponse;
        console.log(this.preventivos);
        this.cargando = false;
      },
      (err) => console.log('HTTP Error', err),
      () => {

      }
    );

    // this.contaService.getAllConta(this.limit, this.skip)
    //   .subscribe((data: any) => {
    //     this.totalPreventivos = data.serverResponse.length;
    //     this.preventivos = data;
    //     this.preventivosTemp = data;
    //     this.totalPages = data.totalpage;
    //     console.log(data);
    //     this.cargando = false;
    //   });
  }

  editarPreventivo(preventivo:any){
    console.log(preventivo);
    this.router.navigate(['archivos/conta/docs/preven/edit', preventivo._id])
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.preventivos = this.preventivosTemp;
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
    this.cargarPreventivos();
  }

  borrarCarpeta(id: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Eliminado!', 'El Proyecto ha sido eliminado.', 'success');
        // this.almacenService.deleteProveedor(id).subscribe(
        //   (res) => console.log(res),
        //   (err) => console.log('HTTP Error', err),
        //   () => this.cargarProveedores()
        // );
      }
    });
  }


}
