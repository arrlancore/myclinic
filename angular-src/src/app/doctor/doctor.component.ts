import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
	name:String;
	specially:string;
	username:string;
	password:string;
	email:string;
	address:string;
	alldoctor:any;
	activate:boolean=false;
  constructor(public validateService:ValidateService,
    public flashMessage:FlashMessagesService,
    public authService:AuthService,
    public router:Router) { }

  ngOnInit() {
    if(!this.authService.isDoctor()){
    this.router.navigate(['/dashbord']);
    }
  this.getListdoctor();

  }

  getListdoctor(){
  	this.authService.getListDoctor().subscribe(data =>{
  		this.alldoctor=data;
  	});
  }

  activateClicked(){
  	if(!this.activate){
  		this.activate=true;
  	}else{this.activate=false}

  }

  onSubmitDoctor(){
  	const data={
		name:this.name,
		username:this.username,
		password:this.password,
		email:this.email,
		address:this.address,
		role:"doctor",
		doctor_information:{
			specialization:this.specially
		}
  	}

	// Require field
    if(this.username.length<5 || this.password.length<5){
          this.flashMessage.show("Username and password require minimum for 5 character", {cssClass:'alert-danger', timeout:3000});    
      return false;
      }
    // Validate email
    if(!this.validateService.validateEmail(data.email)){
      this.flashMessage.show("Please input a valid email", {cssClass:'alert-danger', timeout:3000})
      return false;
    }

    // Register new doctor
    this.authService.registerUser(data).subscribe(data =>{
      if(data.success){
        this.flashMessage.show("Congratulation, Register Success. Please noted the password and new doctor is able to login now", {cssClass:'alert-success', timeout:5000});
        this.activate=false;
        this.name="";
        this.specially="";
        this.username="";
        this.password="";
        this.email="";
        this.address="";
        this.getListdoctor();
      } else{
        this.flashMessage.show("Something went wrong, Error: " + data.err.message, {cssClass:'alert-danger', timeout:7000});
        console.log(data.err.message);

      }
    });
  }

  onDeleteDoctor(id){
  	this.authService.deleteUser(id).subscribe(data=>{
  		if(data.success){
  		this.flashMessage.show("Removed", {cssClass:'alert-success', timeout:3000});
        this.getListdoctor();
  		}
  		else{
        this.flashMessage.show("Something went wrong", {cssClass:'alert-danger', timeout:3000});

  		}
  	})
  }

}
