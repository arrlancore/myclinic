import { Component, OnInit } from '@angular/core';
import { MedicaldataService } from '../../services/medicaldata.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-medicalrecord',
  templateUrl: './medicalrecord.component.html',
  styleUrls: ['./medicalrecord.component.css']
})
export class MedicalrecordComponent implements OnInit {
datauser:any;
id:string;
datamd:any;
datamh=[];
datam=[];
dataal=[];
datafs=[];

  constructor(private medicaldata:MedicaldataService) { 

  	setTimeout(()=>{
  		// Load user record data
  		medicaldata.getPatientRecord(this.id).subscribe(record =>{
  		this.datamd=record.m_record;
  		var mh=record.medical_history;
  		for(var i=0; i<mh.length; i++){
  			this.datamh.push(mh[i].title);
  		}this.datamh=this.joinComa(this.datamh);
  		
  		var m=record.medication_history;
  		for(var i=0; i<m.length; i++){
  			this.datam.push(m[i].name);
  		}this.datam=this.joinComa(this.datam); 

  		var al=record.allergies;
  		for(var i=0; i<al.length; i++){
  			this.dataal.push(al[i].name);
  		}this.dataal=this.joinComa(this.dataal); console.log(this.dataal);

  		var fs=record.fs_history;
  		for(var i=0; i<fs.length; i++){
  			this.datafs.push(fs[i].name);
  		}this.datafs=this.joinComa(this.datafs); console.log(this.datafs);

  	});
  	},1000)
  	
  }

  ngOnInit() {
  	// Load Id of user
  	this.datauser=JSON.parse(localStorage.getItem('user'));
    this.id=this.datauser.id;
  }

  joinComa(arr){
  	return arr.join(", ");
  }

}
