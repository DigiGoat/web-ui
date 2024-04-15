import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoatModalComponent } from './not-found.component';

describe('GoatModalComponent', () => {
  let component: GoatModalComponent;
  let fixture: ComponentFixture<GoatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoatModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GoatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
