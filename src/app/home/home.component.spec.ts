import { ComponentFixture, TestBed } from '@angular/core/testing';

import defaults from '../../assets/resources/_app.json';
import config from '../../assets/resources/app.json';
import { HomeComponent } from './home.component';


const _config = config as Record<string, any>;

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a home title`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    if ('homeTitle' in config) {
      expect(app.homeTitle).toEqual(config.homeTitle);
    } else {
      expect(app.homeTitle).toEqual(defaults.homeTitle);
    }
  });
  it(`should have a home title other than the default`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app.homeTitle).toEqual(_config['homeTitle']);
  });
  it(`should have an owner`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    if ('owner' in config) {
      expect(app.owner).toEqual(config.owner);
    } else {
      expect(app.owner).toEqual(defaults.owner);
    }
  });
  it(`should have an owner other than the default`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app.owner).toEqual(_config['owner']);
  });
  it(`should have an email`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    if ('email' in config) {
      expect(app.email).toEqual(config.email);
    } else {
      expect(app.email).toEqual(defaults.email);
    }
  });
  it(`should have an email other than the default`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app.email).toEqual(_config['email']);
  });
  it(`should have a home description`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    if ('homeDescription' in config) {
      expect(app.homeDescription).toEqual(config.homeDescription);
    } else {
      expect(app.homeDescription).toEqual(defaults.homeDescription);
    }
  });
  it(`should have a home description other than the default`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app.homeDescription).toEqual(_config['homeDescription']);
  });
});
