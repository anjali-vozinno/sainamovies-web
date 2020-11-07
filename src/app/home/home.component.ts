import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slide : []; token;
  constructor(private dataservice:DataService,private router:Router) { 
   this.token= JSON.parse(localStorage.getItem('token'));
  }
 
  ngOnInit(): void {
    this.getBanner(this.token);
  }
  getBanner(tokenValue){
    this.dataservice.getBanner(tokenValue)
    .subscribe((resp:any)=>{
      this.slide=resp[0].thumbUrl;
    })
  }

}
