import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { ElementRef } from '@angular/core';
import { GoatModalComponent } from './not-found.component';

describe('GoatModalComponent', () => {
  let component: GoatModalComponent;
  let fixture: ComponentFixture<GoatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [GoatModalComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            navigate: jest.fn(),
            snapshot: {
              paramMap: {
                get: jest.fn()
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GoatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to parent route when modal is hidden', () => {
    const router = TestBed.inject(ActivatedRoute);
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.modalElement.nativeElement.dispatchEvent(new Event('hidden.bs.modal'));

    expect(navigateSpy).toHaveBeenCalledWith(['../'], { relativeTo: router });
  });

  it('should show modal when open() is called', () => {
    const modal = component.modal;
    const showSpy = jest.spyOn(modal, 'show');

    component.open();

    expect(showSpy).toHaveBeenCalled();
  });

  it('should hide modal when close() is called', () => {
    const modal = component.modal;
    const hideSpy = jest.spyOn(modal, 'hide');

    component.close();

    expect(hideSpy).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
