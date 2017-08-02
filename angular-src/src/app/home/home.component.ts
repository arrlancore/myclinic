import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	username:String;
	password:String;
  constructor(private router:Router, private authService:AuthService,private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }
// Open register page
  onRegister(){
  	this.router.navigate(['/register']);
  }
// Login
  onLoginSubmit(){
  	const user={
  		username:this.username,
  		password:this.password
  	}
  	this.authService.authenticateUser(user).subscribe(data =>{
  		if(user.username==undefined||user.password==undefined){
  			this.flashMessage.show('You have to fill username and password', {
  				cssClass:'alert-danger',
  				timeout:3000,
  			});
  		} else{

  		if(data.success){
  			this.authService.storeUserData(data.token, data.user);
  			// this.flashMessage.show(data.msg, {
  			// 	cssClass:'alert-success',
  			// 	timeout:5000
  			// });
  			this.router.navigate(['dashbord']);
  		} else{
  			this.flashMessage.show(data.msg, {
  				cssClass:'alert-danger',
  				timeout:3000
  			});
  			this.router.navigate(['/']);
  		}
  	   }
  	});
  }

}
