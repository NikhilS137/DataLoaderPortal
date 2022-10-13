import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataLoaderPortalService } from '../data-loader-portal.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  response : any;
  alert:boolean=false;
  alertMessage:string ="";
  alertClass : string ="";

  forgetPassForm = new FormGroup({
    user : new FormControl('',[Validators.required,
      Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password : new FormControl('',[Validators.required,
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$")]),
      confirmPassword : new FormControl('',[Validators.required,
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$")])  
  },
  [CustomValidators.MatchValidator('password', 'confirmPassword')]
  )


  constructor(private service : DataLoaderPortalService,
    private router:Router) { }

  ngOnInit(): void {
  }

  get user(){
    return this.forgetPassForm.get('user');
  }

  get password(){
    return this.forgetPassForm.get('password');
  }

   get confirmPassword(){
    return this.forgetPassForm.get('confirmPassword');
  }

  get passwordMatchError() {
    return (
      this.forgetPassForm.getError('mismatch') &&
      this.forgetPassForm.get('confirmPassword')?.touched
    );
  }

  ChangePasswordClick(){
    var val = {
      username : this.forgetPassForm.controls['user'].value,
      password : this.forgetPassForm.controls['password'].value
    }

    this.service.ForgetPassowrd(val).subscribe(
      res => {  
        this.response = res;
        this.alertMessage="Password changed successfully.";
        this.alertClass ="alert-success";
        
        this.router.navigate(['/login']);



        this.alert=true;
           setTimeout(() => {
                              this.alert=false;
                          }, 4000); //alert will disappear after 4 sec

       } ,
        (error) => {
              console.log("Something Went Wrong.");
              
            this.alertMessage="Something went wrong";
            this.alertClass ="alert-danger";
        
            this.alert=true;
               setTimeout(() => {
                                  this.alert=false;
                              }, 4000); //alert will disappear after 4 sec
        }
    );

  }



  closeAlert(){
    this.alert=false;
  }



}



import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
}