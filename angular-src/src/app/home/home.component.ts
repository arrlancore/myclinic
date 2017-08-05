import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  loader:boolean = false;
  constructor(public router:Router, public authService:AuthService,public flashMessage: FlashMessagesService) { }

  ngOnInit() {
    // reject loggedin user
    if(this.authService.loggedIn()){
        this.router.navigate(['/dashbord']); 
        console.log("you are on login mode");
    }
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
    this.loader=true;
    // start authenticate
  	this.authService.authenticateUser(user).subscribe(data =>{
  		if(this.username==undefined||this.password==undefined){
        this.loader=false;
        console.log(this.password);
  			this.flashMessage.show('You have to fill username and password', {
  				cssClass:'alert-danger',
  				timeout:3000,
  			});
  		} else{
  		if(data.success){
        this.loader=false;
  			this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['/dashbord']);
  		} else{
        this.loader=false;
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
