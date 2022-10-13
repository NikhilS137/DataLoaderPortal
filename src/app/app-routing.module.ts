import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdmindashboardComponent } from "./admindashboard/admindashboard.component";
import { EditPatientDetailsComponent } from "./edit-patient-details/edit-patient-details.component";
import { FileuploadComponent } from "./fileupload/fileupload.component";
import { ForgetpasswordComponent } from "./forgetpassword/forgetpassword.component";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./login/login.component";
import { UploadedFileListComponent } from "./uploaded-file-list/uploaded-file-list.component";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";


const routes: Routes = [
    {path: 'dashboard', component: AdmindashboardComponent},
    {path: 'fileupload', component: FileuploadComponent },
    {path: 'filelist' , component : UploadedFileListComponent},
    {path: 'updatepatient', component : EditPatientDetailsComponent},    
    {path: 'header', component : HeaderComponent},
    {path: 'login', component: LoginComponent },
    {path: 'forgetpassword', component: ForgetpasswordComponent },
    {path: 'userDashboard', component: UserDashboardComponent }
  ];
  
  @NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forRoot(routes)
    ],
    exports:[RouterModule]
  })
  export class AppRoutingModule { }