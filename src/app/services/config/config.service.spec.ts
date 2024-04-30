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
  describe('With a Configuration (v1.0.0)', () => {
    beforeEach(() => {
      service['config'] = {
        homeTitle: 'TEST_TITLE',
        owner: 'TEST_OWNER',
        email: 'TEST_EMAIL',
        homeDescription: 'TEST_DESCRIPTION',
        repo: 'TEST_REPO',
        menubarTitle: 'TEST_MENUBAR_TITLE',
        tabTitle: 'TEST_TAB_TITLE',
        link: 'TEST_LINK'
      };
    });
    test('get homeTitle()', () => {
      const spy = jest.spyOn(service, 'homeTitle', 'get');
      const homeTitle = service.homeTitle;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(homeTitle).toBe('TEST_TITLE');
    });
    test('get owner()', () => {
      const spy = jest.spyOn(service, 'owner', 'get');
      const owner = service.owner;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(owner).toBe('TEST_OWNER');
    });
    test('get email()', () => {
      const spy = jest.spyOn(service, 'email', 'get');
      const email = service.email;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(email).toBe('TEST_EMAIL');
    });
    test('get homeDescription()', () => {
      const spy = jest.spyOn(service, 'homeDescription', 'get');
      const homeDescription = service.homeDescription;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(homeDescription).toBe('TEST_DESCRIPTION');
    });
    test('get repo()', () => {
      const spy = jest.spyOn(service, 'repo', 'get');
      const repo = service.repo;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(repo).toBe('TEST_REPO');
    });
    test('get menubarTitle()', () => {
      const spy = jest.spyOn(service, 'menubarTitle', 'get');
      const menubarTitle = service.menubarTitle;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(menubarTitle).toBe('TEST_MENUBAR_TITLE');
    });
    test('get tabTitle()', () => {
      const spy = jest.spyOn(service, 'tabTitle', 'get');
      const tabTitle = service.tabTitle;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(tabTitle).toBe('TEST_TAB_TITLE');
    });
    test('get link()', () => {
      const spy = jest.spyOn(service, 'link', 'get');
      const link = service.link;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(link).toBe('TEST_LINK');
    });
  });
  describe('Without a Configuration', () => {
    test('get homeTitle()', () => {
      const spy = jest.spyOn(service, 'homeTitle', 'get');
      const homeTitle = service.homeTitle;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(homeTitle).toBe('');
    });
    test('get owner()', () => {
      const spy = jest.spyOn(service, 'owner', 'get');
      const owner = service.owner;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(owner).toBe('');
    });
    test('get email()', () => {
      const spy = jest.spyOn(service, 'email', 'get');
      const email = service.email;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(email).toBe('');
    });
    test('get homeDescription()', () => {
      const spy = jest.spyOn(service, 'homeDescription', 'get');
      const homeDescription = service.homeDescription;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(homeDescription).toBe('');
    });
    test('get repo()', () => {
      const spy = jest.spyOn(service, 'repo', 'get');
      const repo = service.repo;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(repo).toBe('');
    });
    test('get menubarTitle()', () => {
      const spy = jest.spyOn(service, 'menubarTitle', 'get');
      const menubarTitle = service.menubarTitle;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(menubarTitle).toBe('');
    });
    test('get tabTitle()', () => {
      const spy = jest.spyOn(service, 'tabTitle', 'get');
      const tabTitle = service.tabTitle;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(tabTitle).toBe('');
    });
    test('get link()', () => {
      const spy = jest.spyOn(service, 'link', 'get');
      const link = service.link;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(link).toBe('');
    });
  });
});
