import {inject, TestBed} from "@angular/core/testing";

import {CountryLookupResolveService} from "./country-lookup-resolve.service";

describe('CountryLookupResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountryLookupResolveService]
    });
  });

  it('should ...', inject([CountryLookupResolveService], (service: CountryLookupResolveService) => {
    expect(service).toBeTruthy();
  }));
});
