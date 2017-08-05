import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class MedicaldataService {

  constructor(public http:Http) { }
  // ***Request for medical record***
// list all patient
getPatientList(){
	let headers= new Headers();
    headers.append('Content-type','application/json');
    return this.http.get('users/listpatient', {headers:headers})
    .map(res =>res.json());
}
// get data record by id
getPatientRecord(id){
	let headers= new Headers();
    headers.append('Content-type','application/json');
    return this.http.get('medicals/m-record/user/'+id, {headers:headers})
    .map(res =>res.json());
}
// get all medicall record
getAllRecord(){
	let headers= new Headers();
    headers.append('Content-type','application/json');
    return this.http.get('medicals/all', {headers:headers})
    	.map(res =>res.json());
}
// Submit medical record
onSubmitMR(data,id){
  	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.put('medicals/m-record/'+id, data, {headers: headers})
  		.map(res =>res.json());  	  
}
// Delete medical record
onDeleteMR(pid,mid){
  console.log(pid,mid);
	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.put('medicals/m-record/delete/'+pid+"/"+mid, {headers: headers})
  		.map(res =>res.json());  		
}
// submit medical history
onSubmitHM(data,id){
  	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.put('medicals/m-history/'+id, data, {headers: headers})
  		.map(res =>res.json());  	
  
}
// remove medical history
onDeleteHM(pid,mid){
	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.put('medicals/m-history/delete/'+pid+"/"+mid, {headers: headers})
  		.map(res =>res.json());  		
}
// submit medication history
onSubmitHMC(data,id){
	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.put('medicals/medication-history/'+id, data, {headers: headers})
  		.map(res =>res.json());
}
// remove medication history
onDeleteHMC(pid,mid){
	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.put('medicals/medication-history/delete/'+pid+"/"+mid, {headers: headers})
  		.map(res =>res.json());  		
}
// submit allergies history
onSubmitAllergies(data,id){
	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.put('medicals/allergies/'+id, data, {headers: headers})
  		.map(res =>res.json());
}
// remove allergies history
onDeleteAllergies(pid,mid){
	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.put('medicals/allergies/delete/'+pid+"/"+mid, {headers: headers})
  		.map(res =>res.json());  		
}
// submit family social history
onSubmitFS(data,id){
	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.put('medicals/fs-history/'+id, data, {headers: headers})
  		.map(res =>res.json());
}
// remove family social history
onDeleteFS(pid,mid){
	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.put('medicals/fs-history/delete/'+pid+"/"+mid, {headers: headers})
  		.map(res =>res.json());  		
}
}
