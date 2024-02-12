import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturbooksComponent } from './returbooks.component';

describe('ReturbooksComponent', () => {
  let component: ReturbooksComponent;
  let fixture: ComponentFixture<ReturbooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReturbooksComponent]
    });
    fixture = TestBed.createComponent(ReturbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
