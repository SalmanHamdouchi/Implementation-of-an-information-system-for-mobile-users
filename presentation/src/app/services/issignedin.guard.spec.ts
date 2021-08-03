import { TestBed } from '@angular/core/testing';

import { IssignedinGuard } from './issignedin.guard';

describe('IssignedinGuard', () => {
  let guard: IssignedinGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IssignedinGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
