import { TestBed } from '@angular/core/testing';

import { CustomPagesService } from './custom-pages.service';

describe('CustomPagesService', () => {
  let service: CustomPagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomPagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
