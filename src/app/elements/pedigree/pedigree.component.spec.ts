import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GoatService } from '../../services/goat/goat.service';
import { PedigreeComponent } from './pedigree.component';

jest.mock('../../services/goat/goat.service');
describe('PedigreeComponent', () => {
  let component: PedigreeComponent;
  let fixture: ComponentFixture<PedigreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PedigreeComponent],
      providers: [GoatService]
    }).compileComponents();
    fixture = TestBed.createComponent(PedigreeComponent);
    component = fixture.componentInstance;
    component['goatService'].related = of([]);
    component.goat = {};
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('with parents', () => {
    beforeEach(() => {
      component.goat = {
        name: 'Test Goat',
        damId: 1,
        sireId: 2
      };
    });
    describe('parents exist', () => {
      beforeEach(() => {
        component['goatService'].related = of([{ id: 1, name: 'Dam' }, { id: 2, name: 'Sire' }]);
        fixture.detectChanges();
      });
      it('should have a dam', () => {
        expect(component.dam).toEqual({ id: 1, name: 'Dam' });
      });
      it('should have a sire', () => {
        expect(component.sire).toEqual({ id: 2, name: 'Sire' });
      });
    });
    describe('parents do not exist', () => {
      beforeEach(() => {
        component['goatService'].related = of([]);
        fixture.detectChanges();
      });
      it('should not have a dam', () => {
        expect(component.dam).toBeUndefined();
      });
      it('should not have a sire', () => {
        expect(component.sire).toBeUndefined();
      });
    });
  });
  describe('without parents', () => {
    beforeEach(() => {
      component.goat = {
        name: 'Test Goat',
        damId: undefined,
        sireId: undefined
      };
      fixture.detectChanges();
    });
    it('should not have a dam', () => {
      expect(component.dam).toBeUndefined();
    });
    it('should not have a sire', () => {
      expect(component.sire).toBeUndefined();
    });
  });
  describe('getPopoverContent', () => {
    it('should return the popover content with formatted date and ID', () => {
      const goat = {
        dateOfBirth: '2022-01-01',
        normalizeId: 'GOAT123'
      };
      const expectedContent = `<div>
        <span class="fw-bold">Born</span>: <span class="fw-light">January 1, 2022</span>
        <br>
        <span class="fw-bold">ID</span>: <span class="fw-light">GOAT123</span>
      </div>`;

      const actualContent = component.getPopoverContent(goat);

      expect(actualContent).toEqual(expectedContent);
    });

    it('should return an empty string if goat is undefined', () => {
      const goat = undefined;
      const expectedContent = '';

      const actualContent = component.getPopoverContent(goat);

      expect(actualContent).toEqual(expectedContent);
    });
  });
});
