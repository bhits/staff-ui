import {inject, TestBed} from "@angular/core/testing";

import {LocaleLookupResolveService} from "./locale-lookup-resolve.service";

describe('LocaleLookupResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocaleLookupResolveService]
    });
  });

  it('should ...', inject([LocaleLookupResolveService], (service: LocaleLookupResolveService) => {
    expect(service).toBeTruthy();
  }));
});
