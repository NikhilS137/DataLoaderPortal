import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showHeader : boolean =false;
  isCollapsed = false;
  emailID : string = "Admin@gmail.com";

  constructor(private router:Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('userLoggedIn')) {
      this.showHeader =true;
      this.router.navigate(['/dashboard'])
    }
    else{
      this.showHeader =false;
      this.router.navigate(['/login'])
    }
  }

  ShowHeaderOrNot(){
    if (localStorage.getItem('userLoggedIn'))
    return true;
    else
    return false;
  }

  
  logOutClick() {
    localStorage.removeItem('userLoggedIn');
    this.router.navigate(['/login'])
  } 

}
