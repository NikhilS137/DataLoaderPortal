import { HttpClient } from '@angular/common/http';
import { ReadVarExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataLoaderPortalService } from '../data-loader-portal.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  base64 : any ="";
  fileName :string="";
  fileSelected? : Blob;
  imageUrl? : string;

  alert:boolean=false;
  alertMessage:string ="";
  alertClass : string ="";

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
    
  constructor(private service:DataLoaderPortalService,
     private router:Router) { }
  
  ngOnInit(): void {
  }
      
  get f(){
    return this.myForm.controls;
  }
     
  onFileChange(event:any) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileName = event.target.files[0].name;
      this.myForm.patchValue({
        fileSource: file
      });
      const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.base64 = reader.result;
        
    };
    
    }
  }
     
  submit()
  {
    
    var val = {
      FileName : this.fileName,
      strFile : this.base64
    }

    console.log(JSON.stringify(val));

    this.service.FileUpload(val).subscribe(
      res => {  
        // console.log("success" );
        this.alertMessage="File uploaded successfully.";
        this.alertClass ="alert-success";

        localStorage.setItem('userLoggedIn', "true");
        
        this.alert=true;
           setTimeout(() => {
                              this.alert=false;
                          }, 4000); //alert will disappear after 4 sec
                          
        // this.router.navigate(['/filelist']);
        this.router.navigate(['/dashboard']);
       } ,
        (error) => {
          if(error.status == "400"){
            console.log("Invalid Data" +error.status);

            this.alertMessage="Invalid Data";
            this.alertClass ="alert-danger";
        this.alert=true;
           setTimeout(() => {
                              this.alert=false;
                          }, 4000); //alert will disappear after 4 sec
          }
          else
            {
              console.log("Something Went Wrong. " +error.status );
              
            this.alertMessage="Something went wrong";
            this.alertClass ="alert-danger";
        
            this.alert=true;
               setTimeout(() => {
                                  this.alert=false;
                              }, 4000); //alert will disappear after 4 sec
          }
        }
    )

  }

  closeAlert(){
    this.alert=false;
  }


}
