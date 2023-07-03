import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable'



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  reportForm: any;
  users: any;
  destino: string = '';
  estado: string = '';
  del: string = '';
  al: string = '';
  seguimientos: any = [];
  fechaHoy = new Date().toISOString();
  fechaIni = new Date('01/01/2023').toISOString();

  constructor(private fb: FormBuilder, private reportService: ReportService) {
    this.reportForm = this.fb.group({
      funcionario: ['', Validators.required],
      estado: [''],
      del: [this.fechaIni.substr(0, 10)],
      al: [this.fechaHoy.substr(0, 10)],
    });
  }

  ngOnInit(): void {
    this.reportService.getAllUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    });
  }

  get form() {
    return this.reportForm.controls;
  }

  obtenerHojasRutas(form: any) {
    console.log(form.value);
    this.destino = form.value.funcionario;
    this.estado = form.value.estado;
    this.del = form.value.del;
    this.al = form.value.al;
    this.getSeguimientos();
  }

  getSeguimientos() {
    // this.campo=parseInt(this.campo)
    // if(this.campo==this.year-1){
    //   this.dategt=this.campo;
    //   this.datelt=this.campo+1;
    // }else if(this.campo==this.year){
    //   this.dategt=this.campo;
    //   this.datelt=this.campo+1;
    // }else{
    //   this.dategt=this.campo;
    //   this.datelt=this.year+1;
    // }
    this.reportService
      .getAllSeguimientos(this.destino, this.estado, this.del, this.al)
      .subscribe((data) => {
        this.seguimientos = data.serverResponse;
        console.log(this.seguimientos);
      });
  }
  imprimir() {
    const doc = new jsPDF({orientation:"landscape", format:'letter'});
    
    autoTable(doc, { html: '#table', theme:'grid'})
    //doc.autoTable({ html: 'htmlData'});
    doc.output('dataurlnewwindow', { filename: 'comprobante.pdf'});
  }
  
}