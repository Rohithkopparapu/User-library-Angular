import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRegiestrationComponent } from './new-regiestration.component';

describe('NewRegiestrationComponent', () => {
  let component: NewRegiestrationComponent;
  let fixture: ComponentFixture<NewRegiestrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewRegiestrationComponent]
    });
    fixture = TestBed.createComponent(NewRegiestrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
