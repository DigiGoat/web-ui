import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoatService } from '../../services/goat/goat.service';
import { BucksComponent } from './bucks.component';


jest.mock('../../services/goat/goat.service');
const goatService = jest.mocked(GoatService);
describe('BucksComponent', () => {
  let component: BucksComponent;
  let fixture: ComponentFixture<BucksComponent>;

  beforeEach(async () => {
    goatService.mockClear();
    await TestBed.configureTestingModule({
      declarations: [BucksComponent],
      providers: [GoatService],
    })
      .compileComponents();
    fixture = TestBed.createComponent(BucksComponent);
    component = fixture.componentInstance;
    TestBed.inject(GoatService);

    goatService.mockImplementation(() => {
      return {
        bucks: of([])
      } as unknown as GoatService;

    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call GoatService once', () => {
    expect(goatService).toHaveBeenCalledTimes(1);
  });
  it('should specify a name of Bucks', () => {
    expect(component.name).toBe('Bucks');
  });
  it('should specify an Observable getter of bucks', () => {
    expect(component.getter).toBeInstanceOf(Observable);
  });
  it('should match the snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
