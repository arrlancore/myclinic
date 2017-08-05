import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
	authToken:any;
	user:any;

  constructor(public http:Http) { }
  // request register user
  registerUser(user){
  	let headers= new Headers();
  	headers.append('Content-type','application/json');
  	return this.http.post('users/register', user, {headers: headers})
  		.map(res =>res.json());
  	
  }
  // request authenticate
  authenticateUser(user){
  	let headers= new Headers();
  	headers.append('Content-type','application/json');
    return this.http.post('users/authenticate', user, {headers:headers})
  	.map(res =>res.json())
  }
  // store user data to local storage
  storeUserData(token,user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken=token;
    this.user=user;
  }
  // logout to clear local storage
  logout(){
    this.authToken=null;
    this.user=null;
    localStorage.clear();
  }
  // load token on localstorage
  loadToken(){
    const token=localStorage.getItem('id_token');
    this.authToken=token;
  }

  // Get bio
  getBio(id){

    let headers= new Headers();
    headers.append('Content-type','application/json');
    return this.http.get('users/bio/'+id, {headers:headers})
    .map(res =>res.json());
  }

  // Get List Patient
  getListPatient(){
    let headers= new Headers();
    headers.append('Content-type','application/json');
    return this.http.get('users/listpatient', {headers:headers})
    .map(res =>res.json());
  }

  // Get List Doctor
  getListDoctor(){
    let headers= new Headers();
    headers.append('Content-type','application/json');
    return this.http.get('users/listdoctor', {headers:headers})
    .map(res =>res.json());
  }
  // delete User
  deleteUser(id){
    let headers= new Headers();
    headers.append('Content-type','application/json');
    return this.http.delete('users/delete/'+id, {headers:headers})
    .map(res =>res.json());
  }
  // logged in user
  loggedIn() {
  return tokenNotExpired('id_token');
}
  // identify doctor user
  isDoctor(){ 
    let user=JSON.parse(localStorage.getItem('user'));
      if(this.loggedIn&&user.role=='doctor'){
        return true
      }
      else {
        return false;
      }

  }
}
