import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	private name:string;	
	private email:string;
	private username:string;
	private password:string;
	private address:string;
	private phone:string;
	private mobile:string;
	private gender:string;
	private birthdate:any;
	private bloodtype:string;
	private ename:string;
	private erole:string;
	private ephone:string;
	private eaddress:string;	


  constructor(private validateService:ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
  	const userdata={
  		name:this.name,
  		email:this.email,
  		username:this.username,
  		password:this.password,
  		address:this.address,
  		phone:this.phone,
  		mobile:this.mobile,
  		gender:this.gender,
  		birth_date:this.birthdate,
  		blood_type:this.bloodtype,
  		emergency_contact:{
  			name:this.ename,
  			role:this.erole,
  			phone:this.ephone,
  			address:this.eaddress
  		}

  	}
  	// Require field
    if(!this.validateService.validateRegister(userdata)){
      this.flashMessage.show("Please fill all fields with red mark", {cssClass:'alert-danger', timeout:3000});    
      return false;
    }
    else if(this.username.length<5 || this.password.length<5){
          this.flashMessage.show("Username and password require minimum for 5 character", {cssClass:'alert-danger', timeout:3000});    
      return false;
      }
    // Validate email
    if(!this.validateService.validateEmail(userdata.email)){
      this.flashMessage.show("Please input a valid email", {cssClass:'alert-danger', timeout:3000})
      return false;
    }

    // Register user
    this.authService.registerUser(userdata).subscribe(data =>{
      if(data.success){
        this.flashMessage.show("Congratulation, Register Success. Now you can login", {cssClass:'alert-success', timeout:3000});
        setTimeout(()=>{ 
          this.router.navigate(['/']);
           }, 3000);
        
      } else{
        this.flashMessage.show("Something went wrong, Error: " + data.err.message, {cssClass:'alert-danger', timeout:7000});
        this.router.navigate(['/register']);
        console.log(data.err.message);

      }
    });
  }

}
