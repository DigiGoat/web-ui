import { ComponentFixture, TestBed } from '@angular/core/testing';

import type { Meta } from '@angular/platform-browser';
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
    component['meta'] = { addTag: jest.fn(), removeTag: jest.fn() } as unknown as Meta;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add a `noindex` tag', () => {
    expect(component['meta'].addTag).toHaveBeenCalledTimes(1);
    expect(component['meta'].addTag).toHaveBeenCalledWith({ name: 'robots', content: 'noindex' });
  });
  it('should remove a `noindex` tag when destroyed', () => {
    fixture.destroy();
    expect(component['meta'].removeTag).toHaveBeenCalledTimes(1);
    expect(component['meta'].removeTag).toHaveBeenCalledWith('name="robots"');
  });
  it('should match the snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
