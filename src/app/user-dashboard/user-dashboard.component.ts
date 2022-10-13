import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataLoaderPortalService } from '../data-loader-portal.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  patientName ="Test A";
  emailID ="Test@gmail.com";
  address ="Add1 Add2 Add3 Pune";
  DOB :any;
  phoneNumber ="";
  drugID="";
  drugName ="";

  searchResult : any;


  constructor(private service: DataLoaderPortalService,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.LoadInfo();
  }

  LoadInfo(){
    if (localStorage.getItem('user'))
    { 
    let user = JSON.parse(localStorage.getItem('user') || '');
    const emailid = user.username;

    this.service.GetPatientDetailsByName(emailid).subscribe(
      response => { this.searchResult = response ;
        console.log(this.searchResult);
        if(this.searchResult != undefined){
        this.BindDataToForm();
        }
      }
     
    );
  }
}

  BindDataToForm(){
    this.patientName = this.searchResult.patientName;

    this.address = this.searchResult.address1 + " " +this.searchResult.address2
    + " " + this.searchResult.address3 + " " + this.searchResult.district + " "+
    this.searchResult.state + " " + this.searchResult.country;
    
    this.DOB =this.datepipe.transform(this.searchResult.dob, 'MM-dd-yyyy');
    this.emailID= this.searchResult.emailId;

    this.phoneNumber = this.searchResult.phoneNumber;
    this.drugID = this.searchResult.drugId;
    this.drugName = this.searchResult.drugName;
  }


}
