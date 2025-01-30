import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { kiddingScheduleGuard } from './kidding-schedule.guard';

describe('kiddingScheduleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => kiddingScheduleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
