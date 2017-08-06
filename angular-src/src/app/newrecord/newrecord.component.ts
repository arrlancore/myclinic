import { Component, OnInit } from '@angular/core';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { MedicaldataService } from '../../services/medicaldata.service';
import { DatePipe } from '@angular/common';
import { FlashMessagesService} from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-newrecord',
  templateUrl: './newrecord.component.html',
  styleUrls: ['./newrecord.component.css']
})
export class NewrecordComponent implements OnInit {
  public searchStr: string;
  public dataService: CompleterData;
  public patientData:any;
  public selectedItem:any;
  public patientId:any;
  public listrecord:any;
  public totalrecord:any;
  public listhistory:any;
  public listmedication:any;
  public listallergies:any;
   public listfs:any;
  isOpen:boolean;
  recorderActive:boolean=false;
  public complaint:string;
  public lab_result:string;
  public diag_result:string;
  public problem_list:string;
  public plan:string;
  public weight:string
  public height:string;
  public doctor:string;
  public mhistory:string;
  public year:string;
  public mchistory:string;
  public status:string;
  public alertype:string;
  public alerof:string;
  public fstitle:string;
  public fsstatus:string;  
loader:boolean=false;



  constructor(public completerService: CompleterService, public medicaldata:MedicaldataService,
    public flashMessage:FlashMessagesService,public router:Router, public authService:AuthService) {
// data service for autocomplete form
  	this.dataService = this.completerService.remote("users/listpatient?", 'name', 'name');		
  	
   }

  ngOnInit() {
  	if(!this.authService.isDoctor()){
  	    this.router.navigate(['/dashbord']);	
  	}
  	let user=JSON.parse(localStorage.getItem('user'));
    this.doctor=user.name;
    console.log(this.doctor);
  }
// If name of patient selected
 onItemSelect(selected:CompleterItem){
	if(selected){
	this.selectedItem = selected.originalObject._id;
	this.loadRecordById(this.selectedItem);
	this.recorderActive=true;
	}else{
		this.searchStr="";
	}

}
// Load data record by Id
loadRecordById(id){
	this.loader=true;
	this.medicaldata.getPatientRecord(id).subscribe(record =>{
		this.patientId=record._id;
		this.listrecord=record.m_record;
		this.totalrecord= this.listrecord.length || 0;
		this.listhistory=record.medical_history;
		this.listmedication=record.medication_history;
		this.listallergies=record.allergies;
		this.listfs=record.fs_history;
		this.loader=false;
	},err=>{
		this.loader=false;
  		console.log(err);
  		return false;

  	});

}
cleanMedicalRecord(){
		this.complaint="";
		this.lab_result="";
		this.diag_result="";
		this.problem_list="";
		this.plan="";
		this.doctor="";
		this.weight="";
		this.height="";
}
// Submit medical rrecord
onSubmitMedicalRecord(){
	const data={
		complaint:this.complaint,
		lab_result:this.lab_result,
		diag_result:this.diag_result,
		problem_list:this.problem_list,
		plan:this.plan,
		created_by:this.doctor,
		weight:this.weight,
		height:this.height
	}
	// start submit to server
	this.medicaldata.onSubmitMR(data,this.patientId).subscribe(data =>{ 
		if(data.success){
			this.flashMessage.show("Success added", {cssClass:'alert-success', timeout:3000});  
			this.cleanMedicalRecord();
			this.loadRecordById(this.selectedItem);
		}else{
			this.flashMessage.show("Something went wrong", {cssClass:'alert-danger', timeout:3000});  
			console.log(data);
		}
	});
}
// Remove medical record by id
removeMR(id){
	this.medicaldata.onDeleteMR(this.patientId,id).subscribe(data =>{	
	if(data.success){
			this.flashMessage.show("Removed", {cssClass:'alert-success', timeout:3000}); 	
			this.loadRecordById(this.selectedItem);
	}else{
			this.flashMessage.show("Something went wrong", {cssClass:'alert-danger', timeout:3000});  
			console.log(data);
	}

	})
}
// submit medical history
onSubmitMedicalHistory(){
	const data={
		title:this.mhistory,
		year:this.year
	}
	this.medicaldata.onSubmitHM(data,this.patientId).subscribe(data=>{
		if(data.success){
			this.flashMessage.show("Success added", {cssClass:'alert-success', timeout:3000});  
			this.mhistory="",this.year="";
			this.loadRecordById(this.selectedItem);
		}else{
			this.flashMessage.show("Something went wrong", {cssClass:'alert-danger', timeout:3000});  
			console.log(data);
		}
	});
}
// remove medical history
removeHM(id){
	this.medicaldata.onDeleteHM(this.patientId,id).subscribe(data =>{	
	if(data.success){
			this.flashMessage.show("Removed", {cssClass:'alert-success', timeout:3000}); 	
			this.loadRecordById(this.selectedItem);
	}else{
			this.flashMessage.show("Something went wrong", {cssClass:'alert-danger', timeout:3000});  
			console.log(data);
	}

	})
}
// submit medication history
onSubmitMedicationHistory(){
	const data={
		name:this.mchistory,
		status:this.status
	}
	this.medicaldata.onSubmitHMC(data,this.patientId).subscribe(data=>{
		if(data.success){
			this.flashMessage.show("Success added", {cssClass:'alert-success', timeout:3000});  
			this.mchistory="",this.status="";
			this.loadRecordById(this.selectedItem);
		}else{
			this.flashMessage.show("Something went wrong", {cssClass:'alert-danger', timeout:3000});  
			console.log(data);
		}
	});

}
// remove medication history
removeHMC(id){
	this.medicaldata.onDeleteHMC(this.patientId,id).subscribe(data =>{	
	if(data.success){
			this.flashMessage.show("Removed", {cssClass:'alert-success', timeout:3000}); 	
			this.loadRecordById(this.selectedItem);
	}else{
			this.flashMessage.show("Something went wrong", {cssClass:'alert-danger', timeout:3000});  
			console.log(data);
	}

	})
}
// submit allergies
onSubmitAllergies(){
	const data={
		name:this.alerof,
		allergy_type:this.alertype
	}
	this.medicaldata.onSubmitAllergies(data,this.patientId).subscribe(data=>{
		if(data.success){
			this.flashMessage.show("Success added", {cssClass:'alert-success', timeout:3000});  
			this.alerof="",this.alertype="";
			this.loadRecordById(this.selectedItem);
		}else{
			this.flashMessage.show("Something went wrong", {cssClass:'alert-danger', timeout:3000});  
			console.log(data);
		}
	});
}
// remove allergies by id
removeAllergies(id){
	this.medicaldata.onDeleteAllergies(this.patientId,id).subscribe(data =>{	
	if(data.success){
			this.flashMessage.show("Removed", {cssClass:'alert-success', timeout:3000}); 	
			this.loadRecordById(this.selectedItem);
	}else{
			this.flashMessage.show("Something went wrong", {cssClass:'alert-danger', timeout:3000});  
			console.log(data);
	}

	})
}
// submit family and social history
onSubmitFS(){
	const data={
		name:this.fstitle,
		fs_type:this.fsstatus
	}
	this.medicaldata.onSubmitFS(data,this.patientId).subscribe(data=>{
		if(data.success){
			this.flashMessage.show("Success added", {cssClass:'alert-success', timeout:3000});  
			this.fstitle="",this.fsstatus="";
			this.loadRecordById(this.selectedItem);
		}else{
			this.flashMessage.show("Something went wrong", {cssClass:'alert-danger', timeout:3000});  
			console.log(data);
		}
	});

}
// remove family/social history by id
removeFS(id){
	this.medicaldata.onDeleteFS(this.patientId,id).subscribe(data =>{	
	if(data.success){
			this.flashMessage.show("Removed", {cssClass:'alert-success', timeout:3000}); 	
			this.loadRecordById(this.selectedItem);
	}else{
			this.flashMessage.show("Something went wrong", {cssClass:'alert-danger', timeout:3000});  
			console.log(data);
	}

	})

}
    
}
