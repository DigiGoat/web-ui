import { TestBed } from '@angular/core/testing';

import { AppService } from './config.service';


jest.mock('../../../assets/resources/config.json', () => ({
  __esModule: true,
  default: {},
}));
jest.mock('../../../assets/resources/config.defaults.json', () => ({
  __esModule: true,
  default: [{}],
}));
describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
