import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import type { PlatformService } from '../../services/platform/platform.service';
import { GoatsComponent } from './goats.component';
jest.mock('@angular/router');
const goats = [{
  nickname: 'TEST_NICKNAME_1',
  name: 'TEST_NAME_1',
  description: 'TEST_DESCRIPTION_1',
  normalizeId: 'TEST_ID_1',
  dateOfBirth: 'TEST_BIRTH_1'
}, {
  nickname: 'TEST_NICKNAME_2',
  name: 'TEST_NAME_2',
  description: 'TEST_DESCRIPTION_2',
  normalizeId: 'TEST_ID_2',
  dateOfBirth: 'TEST_BIRTH_2'
}];
describe('GoatsComponent', () => {
  let component: GoatsComponent;
  let fixture: ComponentFixture<GoatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoatsComponent],
      providers: [ActivatedRoute],
    })
      .compileComponents();
    fixture = TestBed.createComponent(GoatsComponent);
    component = fixture.componentInstance;
    component.name = 'TEST GOATS';
  });
  describe('Without a searchParam', () => {
    beforeEach(() => {
      component['route'] = {
        snapshot: {
          params: {
          }
        }
      } as unknown as ActivatedRoute;
    });
    describe('Without Goat\'s', () => {
      let html: HTMLElement;
      beforeEach(() => {
        component.getter = of([]);
        fixture.detectChanges();
        html = fixture.nativeElement;
      });
      it('should create', () => {
        expect(component).toBeTruthy();
      });
      it('should set noGoats to true', () => {
        expect(component.noGoats).toBe(true);
      });
      it('should not display goats', () => {
        const element = html.querySelector('[test-id=goats]');
        expect(element).toBeFalsy();
      });
      it('should not display an error', () => {
        const element = html.querySelector('[test-id=error]');
        expect(element).toBeFalsy();
      });
      it('should display no-goats', () => {
        const element = html.querySelector('[test-id=no-goats]');
        expect(element).toBeTruthy();
      });
      it('should display no goats title', () => {
        const element = html.querySelector('[test-id=no-goats-title]');
        expect(element?.innerHTML).toBe('No TEST GOATS Found');
      });
      it('should display no goats prompt', () => {
        const element = html.querySelector('[test-id=no-goats-prompt]');
        expect(element?.innerHTML).toBe('Please Try Again Later.');
      });
      it('should match the snapshot', () => {
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
      });
    });
    describe('With a Error', () => {
      let html: HTMLElement;
      beforeEach(() => {
        component.getter = throwError(() => { return { status: -1, statusText: 'TEST_ERROR' }; });
        fixture.detectChanges();
        html = fixture.nativeElement;
      });
      it('should create', () => {
        expect(component).toBeTruthy();
      });
      it('should set err', () => {
        expect(component.err).toEqual({ status: -1, statusText: 'TEST_ERROR' });
      });
      it('should not display goats', () => {
        const element = html.querySelector('[test-id=goats]');
        expect(element).toBeFalsy();
      });
      it('should not display no-goats', () => {
        const element = html.querySelector('[test-id=no-goats]');
        expect(element).toBeFalsy();
      });
      it('should display error', () => {
        const element = html.querySelector('[test-id=error]');
        expect(element).toBeTruthy();
      });
      it('should display an error title', () => {
        const element = html.querySelector('[test-id=error-title]');
        expect(element?.innerHTML).toBe('Failed To Load TEST GOATS With Error: -1 - TEST_ERROR');
      });
      it('should display an error prompt', () => {
        const element = html.querySelector('[test-id=error-prompt]');
        expect(element?.innerHTML).toBe('Please Check Your Connection And Try Again Later.');
      });
      it('should match the snapshot', () => {
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
      });
    });
    describe('With Goat\'s', () => {
      let html: HTMLElement;
      beforeEach(() => {
        component.getter = of(goats);
        fixture.detectChanges();
        html = fixture.nativeElement;
      });
      it('should create', () => {
        expect(component).toBeTruthy();
      });
      it('should not display no-goats', () => {
        const element = html.querySelector('[test-id=no-goats]');
        expect(element).toBeFalsy();
      });
      it('should not display an error', () => {
        const element = html.querySelector('[test-id=error]');
        expect(element).toBeFalsy();
      });
      it('should display goats', () => {
        const element = html.querySelector('[test-id=goats]');
        expect(element).toBeTruthy();
      });
      it('should display a title', () => {
        const element = html.querySelector('[test-id=name]');
        expect(element?.innerHTML).toBe('TEST GOATS');
      });
      it('should display a description', () => {
        const element = html.querySelector('[test-id=prompt]');
        expect(element?.innerHTML).toBe('Click on a TEST GOAT Below For More Info');
      });
      it('should display the goats', () => {
        const elements = html.querySelectorAll('[test-id=goat-cards]');
        expect(elements).toBeTruthy();
        expect(elements).toHaveLength(goats.length);
      });
      it('should not display placeholders', () => {
        const elements = html.querySelector('[test-id=goat-placeholders]');
        expect(elements).toBeFalsy();
      });
      it('should match the snapshot', () => {
        expect(fixture).toMatchSnapshot();
      });
      describe('during loading', () => {
        beforeEach(() => {
          component['goats'] = [];
          fixture.detectChanges();
          html = fixture.nativeElement;
        });
        it('should create', () => {
          expect(component).toBeTruthy();
        });
        it('should not display no-goats', () => {
          const element = html.querySelector('[test-id=no-goats]');
          expect(element).toBeFalsy();
        });
        it('should not display an error', () => {
          const element = html.querySelector('[test-id=error]');
          expect(element).toBeFalsy();
        });
        it('should display goats', () => {
          const element = html.querySelector('[test-id=goats]');
          expect(element).toBeTruthy();
        });
        it('should display a title', () => {
          const element = html.querySelector('[test-id=name]');
          expect(element?.innerHTML).toBe('TEST GOATS');
        });
        it('should display a description', () => {
          const element = html.querySelector('[test-id=prompt]');
          expect(element?.innerHTML).toBe('Click on a TEST GOAT Below For More Info');
        });
        it('should not display the goats', () => {
          const elements = html.querySelector('[test-id=goat-cards]');
          expect(elements).toBeFalsy();
        });
        it('should display the placeholders', () => {
          const elements = html.querySelectorAll('[test-id=placeholder-cards]');
          expect(elements).toBeTruthy();
          expect(elements).toHaveLength(8);
        });
        it('should display the placeholder cards', () => {
          const elements = html.querySelectorAll('[test-id=placeholder-card]');
          expect(elements).toBeTruthy();
          expect(elements).toHaveLength(8);
        });
        it('should match the snapshot', () => {
          expect(fixture).toMatchSnapshot();
        });
      });
    });
  });
  describe('With a valid searchParam', () => {
    beforeEach(() => {
      component['route'] = {
        snapshot: {
          params: {
            goat: 'TEST_ID_2'
          }
        }
      } as unknown as ActivatedRoute;
    });
    describe('With Goat\'s', () => {
      beforeEach(() => {
        component.getter = of(goats);
      });
      describe('should render', () => {
        let html: HTMLElement;
        beforeEach(() => {
          fixture.detectChanges();
          html = fixture.nativeElement;
        });
        it('should not display no-goats', () => {
          const element = html.querySelector('[test-id=no-goats]');
          expect(element).toBeFalsy();
        });
        it('should not display an error', () => {
          const element = html.querySelector('[test-id=error]');
          expect(element).toBeFalsy();
        });
        it('should display goats container', () => {
          const element = html.querySelector('[test-id=goats]');
          expect(element).toBeTruthy();
        });
        it('should create', () => {
          expect(component).toBeTruthy();
        });
        describe('during loading', () => {
          beforeEach(() => {
            component['goats'] = [];
            fixture.detectChanges();
            html = fixture.nativeElement;
          });
          it('should create', () => {
            expect(component).toBeTruthy();
          });
          it('should not display no-goats', () => {
            const element = html.querySelector('[test-id=no-goats]');
            expect(element).toBeFalsy();
          });
          it('should not display an error', () => {
            const element = html.querySelector('[test-id=error]');
            expect(element).toBeFalsy();
          });
          it('should display goats', () => {
            const element = html.querySelector('[test-id=goats]');
            expect(element).toBeTruthy();
          });
          it('should display a title', () => {
            const element = html.querySelector('[test-id=name]');
            expect(element?.innerHTML).toBe('TEST GOATS');
          });
          it('should display a description', () => {
            const element = html.querySelector('[test-id=prompt]');
            expect(element?.innerHTML).toBe('Click on a TEST GOAT Below For More Info');
          });
          it('should not display the goats', () => {
            const elements = html.querySelector('[test-id=goat-cards]');
            expect(elements).toBeFalsy();
          });
          it('should display the placeholders', () => {
            const elements = html.querySelectorAll('[test-id=placeholder-cards]');
            expect(elements).toBeTruthy();
            expect(elements).toHaveLength(8);
          });
          it('should display the placeholder cards', () => {
            const elements = html.querySelectorAll('[test-id=placeholder-card]');
            expect(elements).toBeTruthy();
            expect(elements).toHaveLength(8);
          });
          it('should match the snapshot', () => {
            expect(fixture).toMatchSnapshot();
          });
        });
      });
      describe('On the server', () => {
        let html: HTMLElement;
        beforeEach(() => {
          component['platformService'] = {
            isServer: true,
            isBrowser: false,
            isBot: false
          } as PlatformService;
          fixture.detectChanges();
          html = fixture.nativeElement;
        });
        it('should not display the browser <div>', () => {
          const element = html.querySelector('[test-id=browser]');
          expect(element).toBeFalsy();
        });
        it('should display the server <div>', () => {
          const element = html.querySelector('[test-id=server]');
          expect(element).toBeTruthy();
        });
        it('should display a goat card', () => {
          const element = html.querySelector('[test-id=server-card]');
          expect(element).toBeTruthy();
        });
        it('should match the snapshot', () => {
          expect(fixture).toMatchSnapshot();
        });
      });
      describe('With a bot', () => {
        let html: HTMLElement;
        beforeEach(() => {
          component['platformService'] = {
            isServer: false,
            isBrowser: true,
            isBot: true
          } as PlatformService;
          fixture.detectChanges();
          html = fixture.nativeElement;
        });
        it('should not display the browser <div>', () => {
          const element = html.querySelector('[test-id=browser]');
          expect(element).toBeFalsy();
        });
        it('should display the server <div>', () => {
          const element = html.querySelector('[test-id=server]');
          expect(element).toBeTruthy();
        });
        it('should display a goat card', () => {
          const element = html.querySelector('[test-id=server-card]');
          expect(element).toBeTruthy();
        });
        it('should match the snapshot', () => {
          expect(fixture).toMatchSnapshot();
        });
      });
      describe('In a browser', () => {
        let html: HTMLElement;
        beforeEach(() => {
          component['platformService'] = {
            isServer: false,
            isBrowser: true,
            isBot: false
          } as PlatformService;
          fixture.detectChanges();
          html = fixture.nativeElement;
        });
        it('should not display the server <div>', () => {
          const element = html.querySelector('[test-id=server]');
          expect(element).toBeFalsy();
        });
        it('should display the browser <div>', () => {
          const element = html.querySelector('[test-id=browser]');
          expect(element).toBeTruthy();
        });
        it('should display a page name', () => {
          const element = html.querySelector('[test-id=name]');
          expect(element?.innerHTML).toBe('TEST GOATS');
        });
        it('should display a page prompt', () => {
          const element = html.querySelector('[test-id=prompt]');
          expect(element?.innerHTML).toBe('Click on a TEST GOAT Below For More Info');
        });
        it('should not display the not found modal', () => {
          const element = html.querySelector('[test-id=not-found-modal]');
          expect(element).toBeFalsy();
        });
        it('should display goat cards', () => {
          const elements = html.querySelectorAll('[test-id=goat-cards]');
          expect(elements).toBeTruthy();
          expect(elements).toHaveLength(goats.length);
        });
        it('should display a goat card for each goat', () => {
          const elements = html.querySelectorAll('[test-id=goat-card]');
          expect(elements).toBeTruthy();
          expect(elements).toHaveLength(goats.length);
        });
        it('should display one goat modal', () => {
          const elements = html.querySelectorAll('[test-id=goat-modal]');
          expect(elements).toBeTruthy();
          expect(elements).toHaveLength(1);
        });
        it('should match the snapshot', () => {
          expect(fixture).toMatchSnapshot();
        });
      });
    });
  });
  describe('With an invalid searchParam', () => {
    beforeEach(() => {
      component['route'] = {
        snapshot: {
          params: {
            goat: 'INVALID_ID'
          }
        }
      } as unknown as ActivatedRoute;
    });
    describe('Without Goat\'s', () => {
      let html: HTMLElement;
      beforeEach(() => {
        component.getter = of([]);
        fixture.detectChanges();
        html = fixture.nativeElement;
      });
      it('should create', () => {
        expect(component).toBeTruthy();
      });
      it('should set noGoats to true', () => {
        expect(component.noGoats).toBe(true);
      });
      it('should not display goats', () => {
        const element = html.querySelector('[test-id=goats]');
        expect(element).toBeFalsy();
      });
      it('should not display an error', () => {
        const element = html.querySelector('[test-id=error]');
        expect(element).toBeFalsy();
      });
      it('should display no-goats', () => {
        const element = html.querySelector('[test-id=no-goats]');
        expect(element).toBeTruthy();
      });
      it('should display no goats title', () => {
        const element = html.querySelector('[test-id=no-goats-title]');
        expect(element?.innerHTML).toBe('No TEST GOATS Found');
      });
      it('should display no goats prompt', () => {
        const element = html.querySelector('[test-id=no-goats-prompt]');
        expect(element?.innerHTML).toBe('Please Try Again Later.');
      });
      it('should match the snapshot', () => {
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
      });
    });
    describe('With a Error', () => {
      let html: HTMLElement;
      beforeEach(() => {
        component.getter = throwError(() => { return { status: -1, statusText: 'TEST_ERROR' }; });
        fixture.detectChanges();
        html = fixture.nativeElement;
      });
      it('should create', () => {
        expect(component).toBeTruthy();
      });
      it('should set err', () => {
        expect(component.err).toEqual({ status: -1, statusText: 'TEST_ERROR' });
      });
      it('should not display goats', () => {
        const element = html.querySelector('[test-id=goats]');
        expect(element).toBeFalsy();
      });
      it('should not display no-goats', () => {
        const element = html.querySelector('[test-id=no-goats]');
        expect(element).toBeFalsy();
      });
      it('should display error', () => {
        const element = html.querySelector('[test-id=error]');
        expect(element).toBeTruthy();
      });
      it('should display an error title', () => {
        const element = html.querySelector('[test-id=error-title]');
        expect(element?.innerHTML).toBe('Failed To Load TEST GOATS With Error: -1 - TEST_ERROR');
      });
      it('should display an error prompt', () => {
        const element = html.querySelector('[test-id=error-prompt]');
        expect(element?.innerHTML).toBe('Please Check Your Connection And Try Again Later.');
      });
      it('should match the snapshot', () => {
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
      });
    });
    describe('With Goat\'s', () => {
      let html: HTMLElement;
      beforeEach(() => {
        component.getter = of(goats);
        fixture.detectChanges();
        html = fixture.nativeElement;
      });
      it('should create', () => {
        expect(component).toBeTruthy();
      });
      it('should not display no-goats', () => {
        const element = html.querySelector('[test-id=no-goats]');
        expect(element).toBeFalsy();
      });
      it('should not display an error', () => {
        const element = html.querySelector('[test-id=error]');
        expect(element).toBeFalsy();
      });
      it('should display goats', () => {
        const element = html.querySelector('[test-id=goats]');
        expect(element).toBeTruthy();
      });
      it('should display a title', () => {
        const element = html.querySelector('[test-id=name]');
        expect(element?.innerHTML).toBe('TEST GOATS');
      });
      it('should display a description', () => {
        const element = html.querySelector('[test-id=prompt]');
        expect(element?.innerHTML).toBe('Click on a TEST GOAT Below For More Info');
      });
      it('should display the goats', () => {
        const elements = html.querySelectorAll('[test-id=goat-cards]');
        expect(elements).toBeTruthy();
        expect(elements).toHaveLength(goats.length);
      });
      it('should not display placeholders', () => {
        const elements = html.querySelector('[test-id=goat-placeholders]');
        expect(elements).toBeFalsy();
      });
      it('should display the goat not found modal', () => {
        const elements = html.querySelector('[test-id=not-found-modal]');
        expect(elements).toBeTruthy();

      });
      it('should match the snapshot', () => {
        expect(fixture).toMatchSnapshot();
      });
      describe('during loading', () => {
        beforeEach(() => {
          component['goats'] = [];
          fixture.detectChanges();
          html = fixture.nativeElement;
        });
        it('should create', () => {
          expect(component).toBeTruthy();
        });
        it('should not display no-goats', () => {
          const element = html.querySelector('[test-id=no-goats]');
          expect(element).toBeFalsy();
        });
        it('should not display an error', () => {
          const element = html.querySelector('[test-id=error]');
          expect(element).toBeFalsy();
        });
        it('should display goats', () => {
          const element = html.querySelector('[test-id=goats]');
          expect(element).toBeTruthy();
        });
        it('should display a title', () => {
          const element = html.querySelector('[test-id=name]');
          expect(element?.innerHTML).toBe('TEST GOATS');
        });
        it('should display a description', () => {
          const element = html.querySelector('[test-id=prompt]');
          expect(element?.innerHTML).toBe('Click on a TEST GOAT Below For More Info');
        });
        it('should not display the goats', () => {
          const elements = html.querySelector('[test-id=goat-cards]');
          expect(elements).toBeFalsy();
        });
        it('should display the placeholders', () => {
          const elements = html.querySelectorAll('[test-id=placeholder-cards]');
          expect(elements).toBeTruthy();
          expect(elements).toHaveLength(8);
        });
        it('should display the placeholder cards', () => {
          const elements = html.querySelectorAll('[test-id=placeholder-card]');
          expect(elements).toBeTruthy();
          expect(elements).toHaveLength(8);
        });
        it('should match the snapshot', () => {
          expect(fixture).toMatchSnapshot();
        });
      });
    });
  });
});
