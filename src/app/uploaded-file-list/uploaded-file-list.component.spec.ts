import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedFileListComponent } from './uploaded-file-list.component';

describe('UploadedFileListComponent', () => {
  let component: UploadedFileListComponent;
  let fixture: ComponentFixture<UploadedFileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedFileListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadedFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});