import { Component, OnInit } from '@angular/core';
import { MedicaldataService } from '../../services/medicaldata.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-medicalrecord',
  templateUrl: './medicalrecord.component.html',
  styleUrls: ['./medicalrecord.component.css']
})
export class MedicalrecordComponent implements OnInit {
datauser:any;
localdata:any;
id:any;
datamd:any;
datamh=[];
datam=[];
dataal=[];
datafs=[];

  constructor(private authService:AuthService,private medicaldata:MedicaldataService, private route:ActivatedRoute, private router:Router) { 

  	
  	
  }

  ngOnInit() {
// Load Id of user
        this.localdata=JSON.parse(localStorage.getItem('user'))
          var sub = this.route.params.subscribe(params => {
          this.id = params['id'] || this.localdata.id;
    // Check if doctor try access withou params
        if(params['id']==undefined && this.localdata.role=='doctor'){
          this.router.navigate(['/dashbord']);
        }
          });

      
      // Load user profile
      if(this.id==this.localdata.id){
        this.datauser=this.localdata;
        console.log("Loaded data local");

      }else{
        this.authService.getBio(this.id).subscribe(data=>{
          this.datauser=data;
        })
      }
      // Load user record data
      this.medicaldata.getPatientRecord(this.id).subscribe(record =>{
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
      }this.dataal=this.joinComa(this.dataal);

      var fs=record.fs_history;
      for(var i=0; i<fs.length; i++){
        this.datafs.push(fs[i].name);
      }this.datafs=this.joinComa(this.datafs);

    });
    
      
  }

  joinComa(arr){
  	return arr.join(", ");
  }

}
