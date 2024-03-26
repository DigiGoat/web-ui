import { TestBed } from '@angular/core/testing';

import { AppService } from './config.service';


jest.mock('../../../assets/resources/config.json', () => ({
  __esModule: true,
  default: {},
}));
describe('ConfigService', () => {
  let service: AppService;


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have a config', () => {
    expect(service['config']).toBeTruthy();
  });
  describe('With a Configuration (v1.0.0)', () => {
    it('should return a homeTitle', () => {
      service['config'] = { homeTitle: 'TEST' };
      const spy = jest.spyOn(service, 'homeTitle', 'get');
      const homeTitle = service.homeTitle;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(homeTitle).toBe('TEST');
    });
    it('should return a owner', () => {
      service['config'] = { owner: 'TEST' };
      const spy = jest.spyOn(service, 'owner', 'get');
      const owner = service.owner;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(owner).toBe('TEST');
    });
    it('should return a email', () => {
      service['config'] = { email: 'TEST' };
      const spy = jest.spyOn(service, 'email', 'get');
      const email = service.email;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(email).toBe('TEST');
    });
    it('should return a homeDescription', () => {
      service['config'] = { homeDescription: 'TEST' };
      const spy = jest.spyOn(service, 'homeDescription', 'get');
      const homeDescription = service.homeDescription;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(homeDescription).toBe('TEST');
    });
    it('should return a repo', () => {
      service['config'] = { repo: 'TEST' };
      const spy = jest.spyOn(service, 'repo', 'get');
      const repo = service.repo;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(repo).toBe('TEST');
    });
    it('should return a menubarTitle', () => {
      service['config'] = { menubarTitle: 'TEST' };
      const spy = jest.spyOn(service, 'menubarTitle', 'get');
      const menubarTitle = service.menubarTitle;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(menubarTitle).toBe('TEST');
    });
  });
  describe('Without a Configuration', () => {
    it('should return a homeTitle', () => {
      const spy = jest.spyOn(service, 'homeTitle', 'get');
      const homeTitle = service.homeTitle;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(homeTitle).toBe('Dairy Goat Farm');
    });
    it('should return a owner', () => {
      const spy = jest.spyOn(service, 'owner', 'get');
      const owner = service.owner;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(owner).toBe('First & Last Name');
    });
    it('should return a email', () => {
      const spy = jest.spyOn(service, 'email', 'get');
      const email = service.email;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(email).toBe('someone@email.com');
    });
    it('should return a homeDescription', () => {
      const spy = jest.spyOn(service, 'homeDescription', 'get');
      const homeDescription = service.homeDescription;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(homeDescription).toBe('Our Farm is home to ...');
    });
    it('should return a repo', () => {
      const spy = jest.spyOn(service, 'repo', 'get');
      const repo = service.repo;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(repo).toBe('https://github.com/DigiGoat/your-website');
    });
    it('should return a menubarTitle', () => {
      const spy = jest.spyOn(service, 'menubarTitle', 'get');
      const menubarTitle = service.menubarTitle;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(menubarTitle).toBe('Dairy Goat <br> Farm');
    });
  });
});
