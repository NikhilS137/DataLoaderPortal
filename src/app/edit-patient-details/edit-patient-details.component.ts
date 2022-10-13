import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataLoaderPortalService } from '../data-loader-portal.service';

@Component({
  selector: 'app-edit-patient-details',
  templateUrl: './edit-patient-details.component.html',
  styleUrls: ['./edit-patient-details.component.css']
})
export class EditPatientDetailsComponent implements OnInit {

  
  RoleList : any[] =[];
  radioSel:any;
  radioSelected:any;
  alert:boolean=false;
  alertMessage:string ="";
  alertClass : string ="";

  displayEditForm : boolean = false;
  searchResult : any;

  searchPatientForm = new FormGroup({
    patientName : new FormControl('',[Validators.required]),
  })

  editPatientForm = new FormGroup({
    address1 : new FormControl('',[Validators.required]),
    address2 : new FormControl(''),
    address3 : new FormControl(''),
    district : new FormControl('',[Validators.required]),
    state : new FormControl('',[Validators.required]),
    country : new FormControl('',[Validators.required]),
    dob : new FormControl('',[Validators.required]),
    emailId : new FormControl('',[Validators.required,Validators.email,
      Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    phoneNumber : new FormControl('',[Validators.required,
    Validators.pattern("^[0-9]{10}$")])
  })

  get s(){
    return this.searchPatientForm.controls;
  }

  get f(){
    return this.editPatientForm.controls;
  }

  constructor(private service: DataLoaderPortalService,public router:Router,public datepipe: DatePipe) { }

  ngOnInit(): void {
  }

  SearchClick(){
    
    // console.log(this.s.patientName.value);
    this.service.GetPatientDetailsByName(this.s.patientName.value).subscribe(
      response => { this.searchResult = response ;
        console.log(this.searchResult);
        if(this.searchResult != undefined){
          this.displayEditForm =true;
        this.BindDataToForm();
        }
        else
        {
        this.displayEditForm =false;
        this.alertMessage="Records not found.";
        this.alertClass ="alert-warning";

        this.alert=true;
           setTimeout(() => {
                              this.alert=false;
                          }, 4000); //alert will disappear after 4 sec
       
        }
      }
     
    );
   
    // console.log("Search Clicked ");
  }

  BindDataToForm(){
    this.editPatientForm.controls['address1'].setValue(this.searchResult.address1);
    this.editPatientForm.controls['address2'].setValue(this.searchResult.address2);    
    this.editPatientForm.controls['address3'].setValue(this.searchResult.address3);
    this.editPatientForm.controls['district'].setValue(this.searchResult.district);
    this.editPatientForm.controls['state'].setValue(this.searchResult.state);
    this.editPatientForm.controls['country'].setValue(this.searchResult.country);
    this.editPatientForm.controls['dob'].setValue(this.datepipe.transform(this.searchResult.dob, 'yyyy-MM-dd'));
    this.editPatientForm.controls['emailId'].setValue(this.searchResult.emailId);
    this.editPatientForm.controls['phoneNumber'].setValue(this.searchResult.phoneNumber);
  }


  UpdateClick(){
    // console.log("Update Clicked ");

    var val ={
      Id : this.searchResult.id,
      Address1 : this.f.address1.value,
      Address2 : this.f.address2.value,
      Address3 : this.f.address3.value,
      District : this.f.district.value,
      State : this.f.state.value,
      Country : this.f.country.value,
      Dob : this.f.dob.value,
      EmailId : this.f.emailId.value,
      PhoneNumber : this.f.phoneNumber.value
    }

    // console.log(JSON.stringify(val));

    this.service.UpdatePatientDetails(this.searchResult.id,val).subscribe(
      res => {
        // this.router.navigate(['/dashboard']);
        this.alertMessage="Details updated successfully.";
        this.alertClass ="alert-success";

        this.alert=true;
           setTimeout(() => {
                              this.alert=false;
                          }, 4000); //alert will disappear after 4 sec
        
         this.clearControls();
         this.displayEditForm =false;

       },
       (error) => {
         if(error.status == "400"){
           console.log("Invalid Data");

           this.alertMessage="Invalid Data";
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

  clearControls(){
    this.searchResult ="";
  this.editPatientForm.reset();
  this.searchPatientForm.reset();
  }
    
  closeAlert(){
    this.alert=false;
  }


  ApproveClick(){
    this.CallUpdateServiceAPI(this.searchResult.id,"Approved");
}

RejectClick(){
  this.CallUpdateServiceAPI(this.searchResult.id,"Rejected");
}


CallUpdateServiceAPI(id:number,status:string){
this.service.UpdatePatientStatus(id,status).subscribe(
  res => {
    this.alertMessage="Status updated successfully.";
    this.alertClass ="alert-success";

    this.alert=true;
       setTimeout(() => {
                          this.alert=false;
                      }, 4000); //alert will disappear after 4 sec
    
                      this.clearControls();
                      this.displayEditForm =false;

   },
   (error) => {
     if(error.status == "400"){
       console.log("Invalid Data");

       this.alertMessage="Invalid Data";
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



}
