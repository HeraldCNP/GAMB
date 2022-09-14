import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogService } from '../../../services/blog.service';
import { ListSliderI } from '../../../models/listSlider.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider-create',
  templateUrl: './slider-create.component.html',
  styleUrls: ['./slider-create.component.css']
})
export class SliderCreateComponent implements OnInit {
  sliderForm: FormGroup = new FormGroup({});
  files:any;
  constructor(
    private api: BlogService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.sliderForm = new FormGroup({
      title : new FormControl('', Validators.required),
      detail : new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    })
  }
  

  sendFormSlider(){
    // Creación del objeto donde incluimos todos los campos del formulario y además la imagen
    let fd = new FormData();
    fd.append('image', this.files[0]);
    fd.append('titulo', this.sliderForm.value.title);
    fd.append('detalle', this.sliderForm.value.detail);
  

    this.api.sendSlider(fd).subscribe(
      res => console.log(res),
      err => console.log('HTTP Error', err),
      () => this.router.navigate(['blog/slider/index'])
    )
  }

  onChange($event:any) {
    this.files = $event.target.files;
  }
}
