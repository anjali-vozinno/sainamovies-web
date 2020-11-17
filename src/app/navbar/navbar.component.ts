import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  status=false;
  public isMenuCollapsed = true;
  
  constructor(private dataService: DataService, private router:Router) { }

  ngOnInit(): void {
  }
  isScrolled = false;
  isNavbarCollapsed=true;
@HostListener("window:scroll")
scrollEvent() {
    window.pageYOffset >= 80 ? (this.isScrolled = true) : (this.isScrolled = false);
}
showSearchBar(){
this.status =!this.status;
}
signOut(){
  this.dataService.signOut()
}
}