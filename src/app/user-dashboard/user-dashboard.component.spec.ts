import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataLoaderPortalService } from '../data-loader-portal.service';

import { UserDashboardComponent } from './user-dashboard.component';
import { of } from 'rxjs';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDashboardComponent ], 
       providers: [DataLoaderPortalService,DatePipe],
      imports: [HttpClientModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Call GetPatientDetailsByName ', () => {
    let service = fixture.debugElement.injector.get(DataLoaderPortalService);
    const userResponse = {
      id: '2',
      name: 'Bob',
      role: 'Developer',
      pokemon: 'Charizard'
    };

    let data = {
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
      };

  spyOn(service, 'GetPatientDetailsByName').and.returnValue(of(data));



    component.LoadInfo();

    expect(component.patientName).toEqual(data.patientName);
  });

});
