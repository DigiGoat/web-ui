import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoatService } from '../../services/goat/goat.service';
import { DoesComponent } from './does.component';


jest.mock('../../services/goat/goat.service');
const goatService = jest.mocked(GoatService);
describe('DoesComponent', () => {
  let component: DoesComponent;
  let fixture: ComponentFixture<DoesComponent>;

  beforeEach(async () => {
    goatService.mockClear();
    await TestBed.configureTestingModule({
      declarations: [DoesComponent],
      providers: [GoatService],
    })
      .compileComponents();
    fixture = TestBed.createComponent(DoesComponent);
    component = fixture.componentInstance;
    TestBed.inject(GoatService);

    goatService.mockImplementation(() => {
      return {
        does: of([])
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
  it('should specify a name of Does', () => {
    expect(component.name).toBe('Does');
  });
  it('should specify an Observable getter of does', () => {
    expect(component.getter).toBeInstanceOf(Observable);
  });
  it('should match the snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
