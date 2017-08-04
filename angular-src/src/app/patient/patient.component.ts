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
  constructor(private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit() {
  	this.getListpatient();
  }
  getListpatient(){
  	this.authService.getListPatient().subscribe(data=>{
  		this.patientlist=data;
  	});
  }
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
  onSeePatient(id){
  	this.router.navigate(['/medicalrecord', id]);
  }
}
