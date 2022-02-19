import { TestBed } from '@angular/core/testing';

import { NonAuthGuardGuard } from './non-auth-guard.guard';

describe('NonAuthGuardGuard', () => {
  let guard: NonAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NonAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
