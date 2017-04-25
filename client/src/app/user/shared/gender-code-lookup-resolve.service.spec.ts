import { TestBed, inject } from '@angular/core/testing';

import { GenderCodeLookupResolveService } from './gender-code-lookup-resolve.service';

describe('GenderCodeLookupResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenderCodeLookupResolveService]
    });
  });

  it('should ...', inject([GenderCodeLookupResolveService], (service: GenderCodeLookupResolveService) => {
    expect(service).toBeTruthy();
  }));
});
