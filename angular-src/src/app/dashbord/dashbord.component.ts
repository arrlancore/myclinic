import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
	public name:any;
  constructor(public auth:AuthService) {  	

    var user=JSON.parse(localStorage.getItem('user'));

    this.name=user.name;

  }

  ngOnInit() {
    this.auth.isDoctor();
  }

}
