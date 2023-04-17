import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ComprasService } from '../../../services/compras.service';
import { AlmacenService } from '../../../services/almacen.service';

@Component({
  selector: 'app-compra-index',
  templateUrl: './compra-index.component.html',
  styleUrls: ['./compra-index.component.css']
})
export class CompraIndexComponent implements OnInit {
  idUser: any;
  user: any;
  data: any;
  totalIngresos: any = 0;
  ingresos: any = [];
  programas: any = [];
  ingresosTemp: any = [];
  skip: number = 1;
  page: number = 1;
  limit: number = 10;
  totalPages: any;
  showModal: boolean = true;
  salidaForm: any;
  editForm: any;
  cargando: boolean = true;
  idProveedor: any;
  URL = environment.api;
  ingreso: any;
  x: any;
  date = new Date();
  separados:any;
  categories:any;
  funcionarios:any;
  categoryTotalPrices:any = 0;
  nameCat: any = [];
  constructor(private comprasService: ComprasService, private fb: FormBuilder, private router: Router, private almacenService: AlmacenService) {
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user);
    this.idUser = this.data.id;
    this.salidaForm = this.fb.group({
      glosaSalida: ['', [Validators.required]],
      entregado: [''],
      cargo: [''],
      idPersona: [''],
    });
  }

  ngOnInit(): void {
    this.cargarIngresos();
    this.cargarFuncionarios();
  }

  cargarIngresos() {
    this.cargando = true;
    this.comprasService
      .getAllIngresos(this.limit, this.skip)
      .subscribe((data: any) => {
        this.totalIngresos = data.totalDocs;
        this.ingresos = data;
        this.ingresosTemp = data;
        this.totalPages = data.totalpage;
        console.log(data);
        this.cargando = false;
      });
  }

  cargarFuncionarios() {
    this.cargando = true;
    this.comprasService.getAllFuncionarios().subscribe((data: any) => {
      this.funcionarios = data.serverResponse;
      console.log("Funcionarios", data)
    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.ingresos = this.ingresosTemp;
      return;
    }
    this.comprasService.searchIngreso(termino).subscribe((resp) => {
      console.log('Resp:', resp);
      this.ingresos = resp;
      this.ingresosTemp = resp;
    });
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
    this.cargarIngresos();
  }

  changeStatus(id: any, estado: any) {
    let fd = new FormData();
    fd.append('estado', estado);
    this.comprasService.editIngreso(fd, id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error', err),
      () => {
        this.cargarIngresos();
      }
    );
  }

  borrarIngreso(id: string) {
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
        this.comprasService.deleteIngreso(id).subscribe(
          (res) => console.log(res),
          (err) => console.log('HTTP Error', err),
          () => this.cargarIngresos()
        );
      }
    });
  }

  addIngreso() {
    this.router.navigate(['almacen/compra/create']);
  }


  generatePDF() {
    // let pdf = new jsPDF( 'p', 'mm', [215, 280]);

    // pdf.html(this.el.nativeElement,{
    //   callback:(pdf) => {
    //     pdf.save("output.pdf")
    //   }
    // })
    const DATA: any = document.getElementById('content');
    const doc = new jsPDF('p', 'pt', 'letter');
    const options = {
      background: 'white',
      scale: 2,
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        // Add image Canvas to PDF
        const bufferX = 3;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

        return doc;
      })
      .then((docResult) => {
        docResult.output('dataurlnewwindow', { filename: 'comprobante.pdf' });
        //docResult.save(`${new Date().toISOString()}_HojaDeRuta.pdf`);
      });
  }

  generatePDFS() {
    // let pdf = new jsPDF( 'p', 'mm', [215, 280]);

    // pdf.html(this.el.nativeElement,{
    //   callback:(pdf) => {
    //     pdf.save("output.pdf")
    //   }
    // })
    const DATA: any = document.getElementById('content');
    const doc = new jsPDF('p', 'pt', 'letter');
    const options = {
      background: 'white',
      scale: 2,
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/PNG');
        // Add image Canvas to PDF
        var imgWidth = 210;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        var doc = new jsPDF('p', 'mm');
        var position = 0;

        // const bufferX = 3;
        // const bufferY = 15;
        // const imgProps = (doc as any).getImageProperties(imgData);
        // const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        // doc.addImage(imgData, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

        doc.addImage(imgData, 'PNG', 1, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = (heightLeft - imgHeight);
          console.log("position", imgHeight)
          doc.addPage();
          doc.addImage(imgData, 'PNG', 1, position, imgWidth, imgHeight);
          // doc.addImage(imgData, 'PNG', 1, position, imgWidth, 410);
          heightLeft -= pageHeight;
          doc.save('file.pdf');
        }

        // doc.save('dataurlnewwindow');
        return doc;
      })
      .then((doc) => {
        doc.output('dataurlnewwindow', { filename: 'comprobante.pdf' });
        // var string = doc.output('datauristring');
        // var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
        // this.x = window.open();
        // this.x.document.open();
        // this.x.document.write(embed);
        // this.x.document.close();
        //docResult.save(`${new Date().toISOString()}_HojaDeRuta.pdf`);
      });
  }

  separar() {
    const itemsByCategory = this.ingreso.productos.reduce((accumulator:any, current:any) => {
      if (!accumulator[current.catProgra]) {
        accumulator[current.catProgra] = [];
      }
      accumulator[current.catProgra].push(current);
      // console.log("solo", current);
      return accumulator;
    }, {});
    this.separados = itemsByCategory;
    this.categories = Object.keys(itemsByCategory);

    this.categoryTotalPrices = this.categories.reduce((accumulator:any, category:any) => {
      const items = itemsByCategory[category];
      const total = items.reduce((accumulator:any, item:any) => accumulator + (item.precio * item.cantidadCompra), 0);
      this.almacenService.searchSegCategoria(category)
      .subscribe(
        res => {
          this.nameCat[category] = res.serverResponse[0].proyect_acti
          // console.log(this.nameCat)
        }
      );
      accumulator[category] = total;
      return accumulator;
    }, {});
    console.log("sumas", this.categoryTotalPrices)
    // console.log("CategoriasSeparadas", this.categories)
    // console.log("CategoriasSeparadas", this.separados)
  }





  calculateTotalCostByCategory() {
    return this.ingreso.productos.reduce((acc: any, item: any) => acc + (item.precio * item.cantidadCompra), 0);
  }


  getIngreso(id: string) {
    this.comprasService.getIngreso(id)
      .subscribe(
        res => {
          this.ingreso = res;
        },
        err => console.log('HTTP Error', err),
        () => {
          this.separar();
        }
      );
  }

  calculateTotalCost() {
    return this.ingreso.productos.reduce((acc: any, item: any) => acc + (item.precio * item.cantidadCompra), 0);
  }

  registrarEgreso(form: any, id:string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Registrado!', 'El Egreso ha sido registrado.', 'success');
        this.comprasService.createSalida(form, id).subscribe(
          (res) => console.log(res),
          (err) => console.log('HTTP Error', err),
          () => this.router.navigate(['almacen/egreso/index'])
        );
      }
    });
  }


  editarEntrada(id:string){
    this.router.navigate(['almacen/compra/update', id]);
  }

  getEntrada(id: string){
    this.comprasService.getIngreso(id)
      .subscribe(
        res => {
          this.ingreso = res;
          console.log(this.ingreso)
        },
        err => console.log('HTTP Error', err),
        () => {
          this.salidaForm.patchValue({
            glosaSalida: this.ingreso.concepto,
          })
        }
      );
  }

  get form() {
    return this.salidaForm.controls;
  }

  doSelect = (value: any) => {
    console.log('SingleDemoComponent.doSelect', value);
  }



}
