import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneloginComponent } from './phonelogin.component';

describe('PhoneloginComponent', () => {
  let component: PhoneloginComponent;
  let fixture: ComponentFixture<PhoneloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhoneloginComponent]
    });
    fixture = TestBed.createComponent(PhoneloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
