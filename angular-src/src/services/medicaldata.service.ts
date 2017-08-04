import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class MedicaldataService {

  constructor(private http:Http) { }

getPatientList(){
	let headers= new Headers();
    headers.append('Content-type','application/json');
    return this.http.get('http://localhost:4000/users/listpatient', {headers:headers})
    .map(res =>res.json());
}

getPatientRecord(id){
	let headers= new Headers();
    headers.append('Content-type','application/json');
    return this.http.get('http://localhost:4000/medicals/m-record/user/'+id, {headers:headers})
    .map(res =>res.json());
}


getAllRecord(){
	let headers= new Headers();
    headers.append('Content-type','application/json');
    return this.http.get('http://localhost:4000/medicals/all', {headers:headers})
    	.map(res =>res.json());
}

onSubmitMR(data,id){
  	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.put('http://localhost:4000/medicals/m-record/'+id, data, {headers: headers})
  		.map(res =>res.json());  	
  
}
onDeleteMR(pid,mid){
	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.put('http://localhost:4000/medicals/m-record/delete/'+pid+"/"+mid, {headers: headers})
  		.map(res =>res.json());  		
}
onSubmitHM(data,id){
  	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.put('http://localhost:4000/medicals/m-history/'+id, data, {headers: headers})
  		.map(res =>res.json());  	
  
}
onDeleteHM(pid,mid){
	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.put('http://localhost:4000/medicals/m-history/delete/'+pid+"/"+mid, {headers: headers})
  		.map(res =>res.json());  		
}
onSubmitHMC(data,id){
	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.put('http://localhost:4000/medicals/medication-history/'+id, data, {headers: headers})
  		.map(res =>res.json());
}
onDeleteHMC(pid,mid){
	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.put('http://localhost:4000/medicals/medication-history/delete/'+pid+"/"+mid, {headers: headers})
  		.map(res =>res.json());  		
}
onSubmitAllergies(data,id){
	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.put('http://localhost:4000/medicals/allergies/'+id, data, {headers: headers})
  		.map(res =>res.json());
}
onDeleteAllergies(pid,mid){
	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.put('http://localhost:4000/medicals/allergies/delete/'+pid+"/"+mid, {headers: headers})
  		.map(res =>res.json());  		
}
onSubmitFS(data,id){
	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.put('http://localhost:4000/medicals/fs-history/'+id, data, {headers: headers})
  		.map(res =>res.json());
}
onDeleteFS(pid,mid){
	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.put('http://localhost:4000/medicals/fs-history/delete/'+pid+"/"+mid, {headers: headers})
  		.map(res =>res.json());  		
}
}
