import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import defaults from '../assets/resources/_app.json';
import config from '../assets/resources/app.json';
import { AppComponent } from './app.component';


const _config = config as Record<string, any>

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have an email`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    if ('email' in config) {
      expect(app.email).toEqual(config.email);
    } else {
      expect(app.email).toEqual(defaults.email);
    }
  });
  it(`should have an email other than the default`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.email).toEqual(_config['email']);
  });
  it(`should have a menubar title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    if ('menubarTitle' in config) {
      expect(app.menubarTitle).toEqual(config.menubarTitle);
    } else {
      expect(app.menubarTitle).toEqual(defaults.menubarTitle);
    }
  });
  it(`should have a menubar title other than the default`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.menubarTitle).toEqual(_config['menubarTitle']);
  });
  it(`should have an owner`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    if ('owner' in config) {
      expect(app.owner).toEqual(config.owner);
    } else {
      expect(app.owner).toEqual(defaults.owner);
    }
  });
  it(`should have an owner other than the default`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.owner).toEqual(_config['owner']);
  });
  it(`should have a repo`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    if ('repo' in config) {
      expect(app.repo).toEqual(config.repo);
    } else {
      expect(app.repo).toEqual(defaults.repo);
    }
  });
  it(`should have a repo other than the default`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.repo).toEqual(_config['repo']);
  });
});
