import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataLoaderPortalService } from '../data-loader-portal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  response : any;
  alert:boolean=false;
  alertMessage:string ="";
  alertClass : string ="";

  loginForm = new FormGroup({
    user : new FormControl('',[Validators.required,
      Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password : new FormControl('',[Validators.required,
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$")])
  })


  constructor(private service : DataLoaderPortalService,
    private router:Router) { }

  ngOnInit(): void {
  }

  get user(){
    return this.loginForm.get('user');
  }

  get password(){
    return this.loginForm.get('password');
  }


  login(){
    var val = {
      userName : this.loginForm.controls['user'].value,
      password : this.loginForm.controls['password'].value
    }

    console.log("value =" + JSON.stringify(val));

    this.service.Login(val).subscribe(
      res => {  
        this.response = res;
        this.alertMessage="User Logged In successfully.";
        this.alertClass ="alert-success";

        localStorage.setItem('userLoggedIn', "true");
        
        this.router.navigate(['/header']);



        this.alert=true;
           setTimeout(() => {
                              this.alert=false;
                          }, 4000); //alert will disappear after 4 sec

       } ,
        (error) => {
          if(error.status == "400"){
            console.log("Invalid Credentials");

            this.alertMessage="Invalid Credentials";
            this.alertClass ="alert-danger";
        this.alert=true;
           setTimeout(() => {
                              this.alert=false;
                          }, 4000); //alert will disappear after 4 sec
          }
          else
            {
              console.log("Something Went Wrong.");
              
            this.alertMessage="Something went wrong";
            this.alertClass ="alert-danger";
        
            this.alert=true;
               setTimeout(() => {
                                  this.alert=false;
                              }, 4000); //alert will disappear after 4 sec
          }
        }
    );

  }



  closeAlert(){
    this.alert=false;
  }


}
