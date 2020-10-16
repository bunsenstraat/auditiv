import { TestBed } from '@angular/core/testing';

import { RecordserviceService } from './recordservice.service';

describe('RecordserviceService', () => {
  let service: RecordserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
