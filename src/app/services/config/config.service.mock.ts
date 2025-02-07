import type { ConfigService } from './config.service';

export const ConfigServiceMock = {
  title: 'TEST_TITLE',
  owner: 'TEST_OWNER',
  email: 'TEST_EMAIL',
  homeDescription: 'TEST_DESCRIPTION',
  shortTitle: 'TEST_TAB_TITLE',
  link: 'https://TEST.LINK',
  analytics: {
    clarity: 'TEST_CLARITY',
    gtag: 'TEST_GTAG'
  },
  colors: {
    background: 'wood',
    main: 'TEST_MAIN',
    secondary: 'TEST_SECONDARY',
    tertiary: 'TEST_TERTIARY',
    quaternary: 'TEST_QUATERNARY',
    light: {
      main: 'TEST_MAIN_LIGHT',
      secondary: 'TEST_SECONDARY_LIGHT',
      tertiary: 'TEST_TERTIARY_LIGHT',
      quaternary: 'TEST_QUATERNARY_LIGHT'
    }

  },
  socials: {
    facebook: 'https://TEST.FACEBOOK',
    instagram: 'https://TEST.INSTAGRAM',
    threads: 'https://TEST.THREADS',
  }
} as ConfigService;
export const EmptyConfigServiceMock = {
  title: '',
  owner: '',
  email: '',
  homeDescription: '',
  shortTitle: '',
  link: '',
  analytics: {},
  colors: {},
  socials: {}
} as ConfigService;
