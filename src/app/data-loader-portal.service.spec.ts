import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataLoaderPortalService } from './data-loader-portal.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('DataLoaderPortalService', () => {
  let service: DataLoaderPortalService;
  let httpclient: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataLoaderPortalService]
    });
    service = TestBed.inject(DataLoaderPortalService);
    httpclient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Login API', () => {
    const inputData = {
      user : 'Admin@gmail.com',
      password : 'Admin@123'
    };

    service.Login(inputData)
    .subscribe((data) => { expect(data).toEqual('')});

    const req = httpController.expectOne('https://localhost:7271/Login');
    expect(req.request.method).toEqual('POST');

    req.flush('');

  });
  it('Call Login() failed', () => {
    const errorMsg ="status 500 error";
    const inputData = {
      user : 'Admin@gmail.com',
      password : 'Admin@123'
    };

    service.Login(inputData)
    .subscribe(() => {fail('should have failed with 500 error')},
    (error: HttpErrorResponse) => {
      expect(error.status).toEqual(500, 'status');
      expect(error.error).toEqual(errorMsg, 'message');

    });

    const req = httpController.expectOne('https://localhost:7271/Login');
    expect(req.request.method).toEqual('POST');

    req.flush(errorMsg,{ status: 500, statusText : 'Server Error'});

  });

});
