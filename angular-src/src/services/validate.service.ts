import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }
  // validate the required input
validateRegister(user){
  	if(user.name==undefined || user.email==undefined || user.username==undefined || user.password==undefined ||
  	 user.gender==undefined  || user.blood_type==undefined || user.birth_date==undefined){
  		return false;
  	}
  	else{
  		return true;
  	}
  }
  // validate email
  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
}
