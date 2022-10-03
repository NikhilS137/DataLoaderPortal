import { TestBed } from '@angular/core/testing';

import { DataLoaderPortalService } from './data-loader-portal.service';

describe('DataLoaderPortalService', () => {
  let service: DataLoaderPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataLoaderPortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
