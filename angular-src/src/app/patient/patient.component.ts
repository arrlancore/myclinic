import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
patientlist:any;
  constructor(public flashMessage:FlashMessagesService,
    public authService:AuthService,
    public router:Router) { }

  ngOnInit() {
  	if(!this.authService.isDoctor()){
    this.router.navigate(['/dashbord']);
    }
  	this.getListpatient();
  }
  // get all patient
  getListpatient(){
  	this.authService.getListPatient().subscribe(data=>{
  		this.patientlist=data;
  	});
  }
  // delete patient by id
  onDeletePatient(id){
  	this.authService.deleteUser(id).subscribe(data=>{
  		if(data.success){
  		this.flashMessage.show("Removed", {cssClass:'alert-success', timeout:3000});
        this.getListpatient();
  		}
  		else{
        this.flashMessage.show("Something went wrong", {cssClass:'alert-danger', timeout:3000});

  		}
  	})
  }
  // View medical record of patient
  onSeePatient(id){
  	this.router.navigate(['/medicalrecord', id]);
  }
}
