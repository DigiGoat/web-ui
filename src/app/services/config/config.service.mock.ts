import type { ConfigService } from './config.service';

export const ConfigServiceMock = {
  homeTitle: 'TEST_TITLE',
  owner: 'TEST_OWNER',
  email: 'TEST_EMAIL',
  homeDescription: 'TEST_DESCRIPTION',
  menubarTitle: 'TEST_MENUBAR_TITLE',
  tabTitle: 'TEST_TAB_TITLE',
  link: 'TEST_LINK'
} as ConfigService;
export const EmptyConfigServiceMock = {
  homeTitle: '',
  owner: '',
  email: '',
  homeDescription: '',
  menubarTitle: '',
  tabTitle: '',
  link: ''
} as ConfigService;
