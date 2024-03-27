import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigService } from '../../services/config/config.service';
import { ConfigServiceMock } from '../../services/config/config.service.mock';
import { HomeComponent } from './home.component';


jest.mock('../../services/config/config.service');
const configService = jest.mocked(ConfigService);
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;


  beforeEach(async () => {
    configService.mockClear();
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [ConfigService],
    })
      .compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    TestBed.inject(ConfigService);
    component = fixture.componentInstance;

    configService.mockImplementation(() => {
      return ConfigServiceMock;
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ConfigService once', () => {
    expect(configService).toHaveBeenCalledTimes(1);
  });
  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});
