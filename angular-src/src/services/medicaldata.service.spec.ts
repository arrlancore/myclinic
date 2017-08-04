import { TestBed, inject } from '@angular/core/testing';

import { MedicaldataService } from './medicaldata.service';

describe('MedicaldataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicaldataService]
    });
  });

  it('should be created', inject([MedicaldataService], (service: MedicaldataService) => {
    expect(service).toBeTruthy();
  }));
});
