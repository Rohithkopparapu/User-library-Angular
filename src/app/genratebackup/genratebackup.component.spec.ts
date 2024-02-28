import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenratebackupComponent } from './genratebackup.component';

describe('GenratebackupComponent', () => {
  let component: GenratebackupComponent;
  let fixture: ComponentFixture<GenratebackupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenratebackupComponent]
    });
    fixture = TestBed.createComponent(GenratebackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
