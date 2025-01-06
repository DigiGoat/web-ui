import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoatService } from '../../services/goat/goat.service';
import { ReferencesComponent } from './references.component';


jest.mock('../../services/goat/goat.service');
const goatService = jest.mocked(GoatService);
describe('ReferencesComponent', () => {
  let component: ReferencesComponent;
  let fixture: ComponentFixture<ReferencesComponent>;

  beforeEach(async () => {
    goatService.mockClear();
    await TestBed.configureTestingModule({
      declarations: [ReferencesComponent],
      providers: [GoatService],
    })
      .compileComponents();
    fixture = TestBed.createComponent(ReferencesComponent);
    component = fixture.componentInstance;
    TestBed.inject(GoatService);

    goatService.mockImplementation(() => {
      return {
        references: of([])
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
  it('should specify a name of References', () => {
    expect(component.name).toBe('References');
  });
  it('should specify an Observable getter of references', () => {
    expect(component.getter).toBeInstanceOf(Observable);
  });
  it('should match the snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
