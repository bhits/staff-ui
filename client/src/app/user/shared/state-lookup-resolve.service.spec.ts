import {inject, TestBed} from "@angular/core/testing";

import {StateLookupResolveService} from "./state-lookup-resolve.service";

describe('StateLookupResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateLookupResolveService]
    });
  });

  it('should ...', inject([StateLookupResolveService], (service: StateLookupResolveService) => {
    expect(service).toBeTruthy();
  }));
});
