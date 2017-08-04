import { Component, OnInit } from '@angular/core';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import {MdTabsModule,MdInputModule} from '@angular/material';
import { MedicaldataService } from '../../services/medicaldata.service';
import { DatePipe } from '@angular/common';
import { FlashMessagesService} from 'angular2-flash-messages';


@Component({
  selector: 'app-newrecord',
  templateUrl: './newrecord.component.html',
  styleUrls: ['./newrecord.component.css']
})
export class NewrecordComponent implements OnInit {
  protected searchStr: string;
  protected dataService: CompleterData;
  protected patientData:any;
  protected selectedItem:any;
  private patientId:any;
  private listrecord:any;
  private totalrecord:any;
  private listhistory:any;
  private listmedication:any;
  private listallergies:any;
   private listfs:any;
  isOpen:boolean;
  recorderActive:boolean=false;
  private complaint:string;
  private lab_result:string;
  private diag_result:string;
  private problem_list:string;
  private plan:string;
  private weight:string
  private height:string;
  private doctor:string;
  private mhistory:string;
  private year:string;
  private mchistory:string;
  private status:string;
  private alertype:string;
  private alerof:string;
  private fstitle:string;
  private fsstatus:string;

  constructor(private completerService: CompleterService, private medicaldata:MedicaldataService,
    private flashMessage:FlashMessagesService) {
  	this.dataService = this.completerService.remote("http://localhost:4000/users/listpatient?", 'name', 'name');		
  	var user=JSON.parse(localStorage.getItem('user'));
    this.doctor=user.name;
   }

  ngOnInit() {

  }


 onItemSelect(selected:CompleterItem){
	if(selected){
	this.selectedItem = selected.originalObject._id;
	this.loadRecordById(this.selectedItem);
	this.recorderActive=true;
	}else{
		this.searchStr="";
	}

}

loadRecordById(id){
	this.medicaldata.getPatientRecord(id).subscribe(record =>{
		this.patientId=record._id;
		this.listrecord=record.m_record;
		this.totalrecord= this.listrecord.length || 0;
		this.listhistory=record.medical_history;
		this.listmedication=record.medication_history;
		this.listallergies=record.allergies;
		this.listfs=record.fs_history;
	},err=>{
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

removeMR(id){
	this.medicaldata.onDeleteMR(this.selectedItem,id).subscribe(data =>{	
	if(data.success){
			this.flashMessage.show("Removed", {cssClass:'alert-success', timeout:3000}); 	
			this.loadRecordById(this.selectedItem);
	}else{
			this.flashMessage.show("Something went wrong", {cssClass:'alert-danger', timeout:3000});  
			console.log(data);
	}

	})
}
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
removeHM(id){
	this.medicaldata.onDeleteHM(this.selectedItem,id).subscribe(data =>{	
	if(data.success){
			this.flashMessage.show("Removed", {cssClass:'alert-success', timeout:3000}); 	
			this.loadRecordById(this.selectedItem);
	}else{
			this.flashMessage.show("Something went wrong", {cssClass:'alert-danger', timeout:3000});  
			console.log(data);
	}

	})
}
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
removeHMC(id){
	this.medicaldata.onDeleteHMC(this.selectedItem,id).subscribe(data =>{	
	if(data.success){
			this.flashMessage.show("Removed", {cssClass:'alert-success', timeout:3000}); 	
			this.loadRecordById(this.selectedItem);
	}else{
			this.flashMessage.show("Something went wrong", {cssClass:'alert-danger', timeout:3000});  
			console.log(data);
	}

	})
}
onSubmitAllergies(){
	const data={
		name:this.alerof,
		allergy_type:this.alertype
	}
	this.medicaldata.onSubmitAllergies(data,this.patientId).subscribe(data=>{
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
removeAllergies(id){
	this.medicaldata.onDeleteAllergies(this.selectedItem,id).subscribe(data =>{	
	if(data.success){
			this.flashMessage.show("Removed", {cssClass:'alert-success', timeout:3000}); 	
			this.loadRecordById(this.selectedItem);
	}else{
			this.flashMessage.show("Something went wrong", {cssClass:'alert-danger', timeout:3000});  
			console.log(data);
	}

	})
}
onSubmitFS(){
	const data={
		name:this.fstitle,
		fs_type:this.fsstatus
	}
	this.medicaldata.onSubmitFS(data,this.patientId).subscribe(data=>{
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
removeFS(id){
	this.medicaldata.onDeleteFS(this.selectedItem,id).subscribe(data =>{	
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
