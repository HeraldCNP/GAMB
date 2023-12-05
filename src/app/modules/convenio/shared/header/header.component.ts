import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user:any;
  data:any;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService

    ) {

  }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.data = JSON.parse(this.user)
  }



  inicio(){
    this.router.navigate(['private'])
  }

  cerrarSesion(){
    this.authService.logout()
  }

}
