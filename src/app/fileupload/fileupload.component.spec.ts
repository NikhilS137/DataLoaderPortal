import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';
import { DataLoaderPortalService } from '../data-loader-portal.service';

import { FileuploadComponent } from './fileupload.component';

describe('FileuploadComponent', () => {
  let component: FileuploadComponent;
  let fixture: ComponentFixture<FileuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileuploadComponent ],
      providers: [DataLoaderPortalService],
      imports: [AppRoutingModule,HttpClientModule,RouterModule.forRoot([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect file input change and set uploadedFile  model', () => {
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(new File([''], 'test-file.xlsx'))

    const inputDebugEl  = fixture.debugElement.query(By.css('input[type=file]'));
    inputDebugEl.nativeElement.files = dataTransfer.files;

    inputDebugEl.nativeElement.dispatchEvent(new InputEvent('change'));

    fixture.detectChanges();

    expect(component.myForm.controls['fileSource']).toBeTruthy()
    expect(component.fileName).toBe('test-file.xlsx')
    
});

it('file change event should arrive in handler', () => {
  const element = fixture.nativeElement;
  const input = element.querySelector('#file');
  spyOn(component, 'onFileChange');
  input.dispatchEvent(new Event('change'));
  fixture.detectChanges();
  expect(component.onFileChange).toHaveBeenCalled();
});


it('Search patient form  validation - submit click', () => {
  expect(component.myForm.invalid).toBeTruthy();

  let service = fixture.debugElement.injector.get(DataLoaderPortalService);
  let data =  [
    {
    }];

    var val = {
      FileName : 'test.xlsx',
      strFile : 'abcd'
    }

  spyOn(service,'FileUpload').and.callFake(() => {
    return of(
     data
      )
        });

  component.submit();
  fixture.detectChanges();

  expect(component.alertMessage).toEqual('File uploaded successfully.');
  expect(component.alertClass).toEqual('alert-success');

  });

});
