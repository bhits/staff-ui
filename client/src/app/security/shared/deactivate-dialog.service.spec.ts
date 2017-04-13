import { TestBed, inject } from '@angular/core/testing';

import { DeactivateDialogService } from './deactivate-dialog.service';

describe('DeactivateDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeactivateDialogService]
    });
  });

  it('should ...', inject([DeactivateDialogService], (service: DeactivateDialogService) => {
    expect(service).toBeTruthy();
  }));
});
