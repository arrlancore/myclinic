import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

loader:boolean=false;


  constructor(public authService:AuthService, public router:Router) { }

  ngOnInit() {
  }
logout(){
   this.loader=true;
  	this.authService.logout();
  	// this.flashMessage.show("Logout...", {cssClass:'alert-success', timeout:2000});
  	this.router.navigate(['/']);
  	this.loader=false;
  	return false;

  }
home(){
    this.router.navigate(['/']);
  }
}


