import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
	authToken:any;
	user:any;

  constructor(private http:Http) { }
  
  registerUser(user){
  	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.post('http://localhost:4000/users/register', user, {headers: headers})
  		.map(res =>res.json());
  	
  }

  authenticateUser(user){
  	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.post('http://localhost:4000/users/authenticate', user, {headers:headers})
  	.map(res =>res.json());
  }

  storeUserData(token,user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken=token;
    this.user=user;
  }

  logout(){
    this.authToken=null;
    this.user=null;
    localStorage.clear();
  }

  loadToken(){
    const token=localStorage.getItem('id_token');
    this.authToken=token;
  }

  // Get bio
  getBio(id){
    let headers= new Headers();
    headers.append('Content-type','application/json');
    return this.http.get('http://localhost:4000/users/bio/'+id, {headers:headers})
    .map(res =>res.json());
  }

  // Get List Patient
  getListPatient(){
    let headers= new Headers();
    headers.append('Content-type','application/json');
    return this.http.get('http://localhost:4000/users/listpatient', {headers:headers})
    .map(res =>res.json());
  }

  // Get List Doctor
  getListDoctor(){
    let headers= new Headers();
    headers.append('Content-type','application/json');
    return this.http.get('http://localhost:4000/users/listdoctor', {headers:headers})
    .map(res =>res.json());
  }
  // delete User
  deleteUser(id){
    let headers= new Headers();
    headers.append('Content-type','application/json');
    return this.http.delete('http://localhost:4000/users/delete/'+id, {headers:headers})
    .map(res =>res.json());
  }

  loggedIn() {
  return tokenNotExpired('id_token');
}
}
