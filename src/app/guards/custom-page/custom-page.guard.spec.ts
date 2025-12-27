import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { customPageGuard } from './custom-page.guard';

describe('customPageGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => customPageGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
