import { TestBed, inject } from '@angular/core/testing';

import { RoleLookupResolveService } from './role-lookup-resolve.service';

describe('RoleLookupResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleLookupResolveService]
    });
  });

  it('should ...', inject([RoleLookupResolveService], (service: RoleLookupResolveService) => {
    expect(service).toBeTruthy();
  }));
});
