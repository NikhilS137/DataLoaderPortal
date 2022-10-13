import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';
import { DataLoaderPortalService } from '../data-loader-portal.service';

import { UploadedFileListComponent } from './uploaded-file-list.component';

describe('UploadedFileListComponent', () => {
  let component: UploadedFileListComponent;
  let fixture: ComponentFixture<UploadedFileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedFileListComponent ],
      providers: [DataLoaderPortalService],
      imports: [AppRoutingModule,HttpClientModule,RouterModule.forRoot([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadedFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadUploadFileList', () => {
    let service = fixture.debugElement.injector.get(DataLoaderPortalService);
let data =[{
  "fileUploadId": 7,
  "fileName": "File1.xlsx",
  "serverFileName": null,
  "status": "Completed",
  "savedRecordsCount": 1,
  "validationFailedRecordsCount": 1,
  "totalRecordsCount": 2,
  "fileLocation": null,
  "validationFailedFileName": null,
  "validationFailedFileLocation": null,
  "createdBy": null,
  "createdDate": null
}];
    spyOn(service,"FileUploadList").and.callFake( () => {
      return of(
       data
        )
          });

    component.ngOnInit();

    expect(service.FileUploadList).toHaveBeenCalled();

  });


  it('Click btnFileUpload', () => {
    let element :HTMLButtonElement = fixture.debugElement.nativeElement.querySelector("#btnFileUpload");

    element.click();

    expect(component.display).toEqual('block');

  });

  it('Click btnClose', () => {
    let element :HTMLButtonElement = fixture.debugElement.nativeElement.querySelector("#btnClose");

    element.click();

    expect(component.display).toEqual('none');

  });

});
