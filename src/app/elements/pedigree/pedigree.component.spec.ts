import { of } from 'rxjs';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoatService } from '../../services/goat/goat.service';
import { PedigreeComponent } from './pedigree.component';


jest.mock('../../services/goat/goat.service');
const goatService = jest.mocked(GoatService);
describe('DoesComponent', () => {
  let component: PedigreeComponent;
  let fixture: ComponentFixture<PedigreeComponent>;

  beforeEach(async () => {
    goatService.mockClear();
    await TestBed.configureTestingModule({
      declarations: [PedigreeComponent],
      providers: [GoatService],
    })
      .compileComponents();
    fixture = TestBed.createComponent(PedigreeComponent);
    component = fixture.componentInstance;
    TestBed.inject(GoatService);

    component.goat = {};

    component['goatService'] = {
      related: of([])
    } as unknown as GoatService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call GoatService once', () => {
    expect(goatService).toHaveBeenCalledTimes(1);
  });
  it('should match the snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
