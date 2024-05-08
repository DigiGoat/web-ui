import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFoundComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    component.searchParam = 'TEST';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display a not found message', () => {
    const element = fixture.nativeElement.querySelector('[test-id=message]');
    expect(element.innerHTML).toBe('The Requested Goat "TEST" Was Not Found');
  });
  it('should match the snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
