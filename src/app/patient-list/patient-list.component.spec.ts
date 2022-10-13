// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { DataLoaderPortalService } from '../data-loader-portal.service';

// import { PatientListComponent } from './patient-list.component';

// describe('PatientListComponent', () => {
//   let component: PatientListComponent;
//   let fixture: ComponentFixture<PatientListComponent>;

//   let dataLoaderPortalService: DataLoaderPortalService;
//   let dataLoaderPortalServiceSpy: { PatientList: jasmine.Spy };
//   let routerSpy: { navigateByUrl: jasmine.Spy };
//   let router: Router;
  
//   beforeEach(async () => {
//     dataLoaderPortalServiceSpy = jasmine.createSpyObj(DataLoaderPortalService, ['PatientList']);
//     routerSpy = jasmine.createSpyObj(Router, ['navigateByUrl']);
//     await TestBed.configureTestingModule({
//       declarations: [ PatientListComponent ],
//       providers: [
//         { provide: DataLoaderPortalService, useValue: dataLoaderPortalServiceSpy },
//         { provide: Router, useValue: routerSpy },
//       ],
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(PatientListComponent);
//     component = fixture.componentInstance;
//     dataLoaderPortalService = TestBed.inject(DataLoaderPortalService);
//     router = TestBed.inject(Router);
//     component.ngOnInit();
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


//#region  Testing Code
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';
import { DataLoaderPortalService } from '../data-loader-portal.service';
import { Location } from '@angular/common';

import { PatientListComponent } from './patient-list.component';

describe('PatientListComponent', () => {
  let component: PatientListComponent;
  let fixture: ComponentFixture<PatientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientListComponent ],
     providers: [DataLoaderPortalService],
     imports: [AppRoutingModule,HttpClientModule,RouterModule.forRoot([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Call LoadPatientList ', () => {
    let service = fixture.debugElement.injector.get(DataLoaderPortalService);

    let data =  [
      {
        "id": 1,
        "patientName": "Test A",
        "address1": "Add 2",
        "address2": "Add 2",
        "address3": "Add 3",
        "district": "Pune",
        "state": "Maharashtra",
        "country": "India",
        "dob": "1990-12-12T00:00:00",
        "emailId": "Test@gmail.com",
        "phoneNumber": "1234567890",
        "drugId": "12345",
        "drugName": "Drug Test",
        "status": "Pending",
        "isActive": true,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null,
        "fileId": null
      }];


    spyOn(service,"PatientList").and.callFake( () => {
return of(
 data
  )
    });

    component.loadPatientList();

    expect(component.patientList).toEqual(data);
  });

  it('Call approve function', () => {
    let service = fixture.debugElement.injector.get(DataLoaderPortalService);

    let data=[{ status:200 }];
    spyOn(service,"UpdatePatientStatus").and.callFake( () => {
      return of(
        data
      )
    });

    let item ={
      id : 1
    }
    component.ApproveClick(item);

    expect(service.UpdatePatientStatus).toHaveBeenCalled();

    component.RejectClick(item);

    expect(service.UpdatePatientStatus).toHaveBeenCalled();
    expect(component.alertMessage).toEqual("Status updated successfully.");
    expect(component.alertClass).toEqual("alert-success");
  })

  xit('Call UpdatePatientStatus function with failed status', () => {
    let service = fixture.debugElement.injector.get(DataLoaderPortalService);

    let data=[{ status:400 }];
    spyOn(service,"UpdatePatientStatus").and.callFake( () => {
      return of(
        data
      )
    });

    let item ={
      id : 1
    }
    component.ApproveClick(item);
    expect(service.UpdatePatientStatus).toHaveBeenCalled();
    component.RejectClick(item);
    expect(service.UpdatePatientStatus).toHaveBeenCalled();
    expect(component.alertMessage).toEqual("Invalid Data");
    expect(component.alertClass).toEqual("alert-success");
  })

  it('Redirection on update patient', fakeAsync( () => {
    let objRouter : Router;
    let location : Location;
    
    objRouter = TestBed.inject(Router);
    location = TestBed.inject(Location);

  fixture.detectChanges();
  fixture.whenStable().then( () =>{
    expect(location.path()).toEqual('/updatepatient');
  })
  }));

  it('Search records', () =>{
    let service = fixture.debugElement.injector.get(DataLoaderPortalService);

    let data =  [
      {
        "id": 1,
        "patientName": "Test A",
        "address1": "Add 2",
        "address2": "Add 2",
        "address3": "Add 3",
        "district": "Pune",
        "state": "Maharashtra",
        "country": "India",
        "dob": "1990-12-12T00:00:00",
        "emailId": "Test@gmail.com",
        "phoneNumber": "1234567890",
        "drugId": "12345",
        "drugName": "Drug Test",
        "status": "Pending",
        "isActive": true,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null,
        "fileId": null
      }];
    spyOn(service,"SearchPatientDetailsByNameOrEmailID").and.callFake( () => {
      return of(
        data
      )
    });

    const element : HTMLInputElement =  fixture.debugElement.nativeElement.querySelector('#txtSearch');
    element.value = 'Test A';
    element.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    
    expect(service.SearchPatientDetailsByNameOrEmailID).toHaveBeenCalled();
    
  });

});

//#endregion

