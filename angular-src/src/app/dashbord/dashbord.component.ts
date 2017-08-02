import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
	private name:any;
  constructor() {  	

    var user=JSON.parse(localStorage.getItem('user'));

    this.name=user.name;

  }

  ngOnInit() {
  }

}
