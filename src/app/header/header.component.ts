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

  Role="";
  UserName ="";

  constructor(private router:Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('userLoggedIn')) {
      this.showHeader =true;
      
      let user = JSON.parse(localStorage.getItem('user') || '');
      this.UserName = user.username;
      user.roleId == 1 ? this.Role = "Admin" : this.Role = "User" ;

      if(user.roleId == 1)
      this.router.navigate(['/dashboard']);
      else
      this.router.navigate(['/userDashboard']);

    }
    else{
      this.showHeader =false;
      this.router.navigate(['/login'])
    }
  }

  CheckRole(){
    let user = JSON.parse(localStorage.getItem('user') || '');
   if( user.roleId == 1){
   return true ;
   }
   else
   return false;
  }

  ShowHeaderOrNot(){
    if (localStorage.getItem('userLoggedIn'))
    {
    return true;
    }
    else
    {
    return false;
    }
  }

  
  logOutClick() {
    localStorage.removeItem('userLoggedIn');
    this.router.navigate(['/login'])
  } 

}
