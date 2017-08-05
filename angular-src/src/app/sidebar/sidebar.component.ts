import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	loader:boolean=false;
  constructor(public authService:AuthService, public router:Router) { }

  ngOnInit() {
  }

  logout(){
   this.loader=true;
  	this.authService.logout();
  	this.router.navigate(['/']);
  	this.loader=false;
  	return false;

  }

}
