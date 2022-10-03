import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataLoaderPortalService } from './data-loader-portal.service';
import { HttpClientModule } from '@angular/common/http';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { UploadedFileListComponent } from './uploaded-file-list/uploaded-file-list.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { EditPatientDetailsComponent } from './edit-patient-details/edit-patient-details.component';
import { DatePipe } from '@angular/common';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdmindashboardComponent,
    FileuploadComponent,
    HeaderComponent,
    UploadedFileListComponent,
    PatientListComponent,
    EditPatientDetailsComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    AppRoutingModule
  ],
  providers: [DataLoaderPortalService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
