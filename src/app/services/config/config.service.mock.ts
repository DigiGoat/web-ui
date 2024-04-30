import type { ConfigService } from './config.service';

export const ConfigServiceMock = {
  email: 'TEST_EMAIL',
  homeDescription: 'TEST_DESCRIPTION',
  homeTitle: 'TEST_TITLE',
  menubarTitle: 'TEST_MENUBAR_TITLE',
  owner: 'TEST_OWNER',
  repo: 'TEST_REPO'
} as ConfigService;
