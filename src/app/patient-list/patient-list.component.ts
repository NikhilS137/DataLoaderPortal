import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataLoaderPortalService } from '../data-loader-portal.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patientList : any;
  alert:boolean=false;
  alertMessage:string ="";
  alertClass : string ="";

  display : string = 'none';
  ModalTitle="File Upload";

  constructor(private service:DataLoaderPortalService, private router : Router) { }

  ngOnInit(): void {
    this.loadPatientList();
  }

  loadPatientList(){
    this.service.PatientList().subscribe( 
      response => {this.patientList  = response;}
    );
   }

   onCloseHandled() {
    this.display = "none";
  }

  ApproveClick(item:any){
        this.CallUpdateServiceAPI(item.id,"Approved");
    }

    RejectClick(item:any){
      this.CallUpdateServiceAPI(item.id,"Rejected");
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
        
                          this.loadPatientList();
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


  OpenEditPatient(){
    this.router.navigate(['/updatepatient']);
    this.display = "block";
  }

  
  closeAlert(){
    this.alert=false;
  }

  SearchRecordsByNameOrEmailID(event: any){
    let searchValue = event.target.value;
    if(searchValue == '')
    this.loadPatientList();
    else
    this.service.SearchPatientDetailsByNameOrEmailID(searchValue).subscribe(
      response => {this.patientList  = response;}
    )
   
  }


}
