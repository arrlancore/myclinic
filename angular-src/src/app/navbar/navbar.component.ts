import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }
// logout(){
//   	this.authService.logout();
//   	// this.flashMessage.show("Logout...", {cssClass:'alert-success', timeout:2000});
//   	this.router.navigate(['/']);
//   	return false;
//   }
}
