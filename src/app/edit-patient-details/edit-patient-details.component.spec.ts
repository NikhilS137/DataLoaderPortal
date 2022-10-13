import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { DataLoaderPortalService } from '../data-loader-portal.service';
import { of } from 'rxjs';

import { EditPatientDetailsComponent } from './edit-patient-details.component';

describe('EditPatientDetailsComponent', () => {
  let component: EditPatientDetailsComponent;
  let fixture: ComponentFixture<EditPatientDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPatientDetailsComponent ],
      providers: [DataLoaderPortalService,DatePipe],
      imports: [ReactiveFormsModule,AppRoutingModule,HttpClientModule,RouterModule.forRoot([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPatientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Search patient form  validation - patientName check', () => {
    let patientName = component.searchPatientForm.controls['patientName'];
    expect(patientName.valid).toBeFalsy();
    expect(patientName.errors).toBeTruthy();
    });

  it('Search patient form  validation - set patientName check', () => {
    let patientName = component.searchPatientForm.controls['patientName'];
    patientName.setValue('Test');
    expect(patientName.valid).toBeTruthy();
    expect(patientName.value).toEqual('Test');
    });

  it('Search patient form  validation - submit click', () => {
    expect(component.searchPatientForm.invalid).toBeTruthy();

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

    spyOn(service,'GetPatientDetailsByName').and.callFake(() => {
      return of(
       data
        )
          });

    let patientName = component.searchPatientForm.controls['patientName'];
    patientName.setValue('Test A');

    component.SearchClick();
    fixture.detectChanges();

    expect(component.displayEditForm).toEqual(true);

    expect(component.searchResult).toEqual(data);


    });

    it('Edit patient form  validation - address1 check', () => {
      let address1 = component.editPatientForm.controls['address1'];
      expect(address1.valid).toBeFalsy();
      expect(address1.errors).toBeTruthy;
      });

      it('Edit patient form  validation - set address1 check', () => {
        let address1 = component.editPatientForm.controls['address1'];
        address1.setValue('Test');
        expect(address1.valid).toBeTruthy();
        expect(address1.value).toEqual('Test');
        });

    it('Edit patient form  validation - district check', () => {
      let district = component.editPatientForm.controls['district'];
      expect(district.valid).toBeFalsy();
      expect(district.errors).toBeTruthy;
      });

      it('Edit patient form  validation - set district check', () => {
        let district = component.editPatientForm.controls['district'];
        district.setValue('Test');
        expect(district.valid).toBeTruthy();
        expect(district.value).toEqual('Test');
        });

      it('Edit patient form  validation - state check', () => {
      let state = component.editPatientForm.controls['state'];
      expect(state.valid).toBeFalsy();
      expect(state.errors).toBeTruthy;
      });

      it('Edit patient form  validation - set state check', () => {
        let state = component.editPatientForm.controls['state'];
        state.setValue('Test');
        expect(state.valid).toBeTruthy();
        expect(state.value).toEqual('Test');
        });

      it('Edit patient form  validation - country check', () => {
      let country = component.editPatientForm.controls['country'];
      expect(country.valid).toBeFalsy();
      expect(country.errors).toBeTruthy;
      });

      it('Edit patient form  validation - set country check', () => {
        let country = component.editPatientForm.controls['country'];
        country.setValue('Test');
        expect(country.valid).toBeTruthy();
        expect(country.value).toEqual('Test');
        });

     it('Edit patient form  validation - dob check', () => {
      let dob = component.editPatientForm.controls['dob'];
      expect(dob.valid).toBeFalsy();
      expect(dob.errors).toBeTruthy;
      });

      it('Edit patient form  validation - set dob check', () => {
        let dob = component.editPatientForm.controls['dob'];
        dob.setValue('12/12/1990');
        expect(dob.valid).toBeTruthy();
        expect(dob.value).toEqual('12/12/1990');
        });

     it('Edit patient form  validation - emailId check', () => {
      let emailId = component.editPatientForm.controls['emailId'];
      expect(emailId.valid).toBeFalsy();
      expect(emailId.errors).toBeTruthy;
      });

      it('Edit patient form  validation - set dob check', () => {
        let emailId = component.editPatientForm.controls['emailId'];
        emailId.setValue('Admin@gmail.com');
        expect(emailId.valid).toBeTruthy();
        expect(emailId.value).toEqual('Admin@gmail.com');
        });

         it('Edit patient form  validation - phoneNumber check', () => {
      let phoneNumber = component.editPatientForm.controls['phoneNumber'];
      expect(phoneNumber.valid).toBeFalsy();
      expect(phoneNumber.errors).toBeTruthy;
      });

      it('Edit patient form  validation - set phoneNumber check', () => {
        let phoneNumber = component.editPatientForm.controls['phoneNumber'];
        phoneNumber.setValue('1234567890');
        expect(phoneNumber.valid).toBeTruthy();
        expect(phoneNumber.value).toEqual('1234567890');
        });

    it('Edit patient form - submit click', fakeAsync( () => {
    expect(component.editPatientForm.invalid).toBeTruthy();

    let service = TestBed.inject(DataLoaderPortalService);
    let spy = spyOn(service,'UpdatePatientDetails').and.returnValue(of([]));
    let subSpy = spyOn(service.UpdatePatientDetails(1,null),'subscribe');

    let data ={
      id :1
    }

    component.searchResult = data; 

    component.UpdateClick();
    fixture.detectChanges();
    tick();
    expect(spy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();

    }));

});
