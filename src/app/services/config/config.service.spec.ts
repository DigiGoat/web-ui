import { TestBed } from '@angular/core/testing';

import { ConfigService } from './config.service';


jest.mock('../../../assets/resources/config.json', () => ({
  __esModule: true,
  default: {},
}));
describe('ConfigService', () => {
  let service: ConfigService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigService);
  });
  it('Should Create', () => {
    expect(service).toBeTruthy();
  });
  describe('homeTitle()', () => {
    it('should return a homeTitle from the config', () => {
      service['config'] = { homeTitle: 'TEST' };
      const spy = jest.spyOn(service, 'homeTitle', 'get');
      const homeTitle = service.homeTitle;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(homeTitle).toBe('TEST');
    });
    it('should return a homeTitle from the defaults', () => {
      const spy = jest.spyOn(service, 'homeTitle', 'get');
      const homeTitle = service.homeTitle;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(homeTitle).toBe('Dairy Goat Farm');
    });
  });
  describe('owner()', () => {
    it('should return a owner from the config', () => {
      service['config'] = { owner: 'TEST' };
      const spy = jest.spyOn(service, 'owner', 'get');
      const owner = service.owner;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(owner).toBe('TEST');
    });
    it('should return a owner from the defaults', () => {
      const spy = jest.spyOn(service, 'owner', 'get');
      const owner = service.owner;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(owner).toBe('First & Last Name');
    });
  });
  describe('email()', () => {
    it('should return a email from the config', () => {
      service['config'] = { email: 'TEST' };
      const spy = jest.spyOn(service, 'email', 'get');
      const email = service.email;
      expect(spy).toHaveBeenCalledTimes(1);
          expect(email).toBe('TEST');
        });
    it('should return a email from the defaults', () => {
      const spy = jest.spyOn(service, 'email', 'get');
      const email = service.email;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(email).toBe('someone@email.com');
    });
  });
  describe('homeDescription()', () => {
    it('should return a homeDescription from the config', () => {
      service['config'] = { homeDescription: 'TEST' };
      const spy = jest.spyOn(service, 'homeDescription', 'get');
      const homeDescription = service.homeDescription;
      expect(spy).toHaveBeenCalledTimes(1);
          expect(homeDescription).toBe('TEST');
        });
    it('should return a homeDescription from the defaults', () => {
      const spy = jest.spyOn(service, 'homeDescription', 'get');
      const homeDescription = service.homeDescription;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(homeDescription).toBe('Our Farm is home to ...');
    });
  });
  describe('repo()', () => {
    it('should return a repo from the config', () => {
      service['config'] = { repo: 'TEST' };
      const spy = jest.spyOn(service, 'repo', 'get');
      const repo = service.repo;
      expect(spy).toHaveBeenCalledTimes(1);
          expect(repo).toBe('TEST');
        });
    it('should return a repo from the defaults', () => {
      const spy = jest.spyOn(service, 'repo', 'get');
      const repo = service.repo;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(repo).toBe('https://github.com/DigiGoat/your-website');
    });
  });
  describe('menubarTitle()', () => {
    it('should return a menubarTitle from the config', () => {
      service['config'] = { menubarTitle: 'TEST' };
      const spy = jest.spyOn(service, 'menubarTitle', 'get');
      const menubarTitle = service.menubarTitle;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(menubarTitle).toBe('TEST');
        });
    it('should return a menubarTitle from the defaults', () => {
      const spy = jest.spyOn(service, 'menubarTitle', 'get');
      const menubarTitle = service.menubarTitle;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(menubarTitle).toBe('Dairy Goat <br> Farm');
    });
  });
});
