import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenrateGraphsComponent } from './genrate-graphs.component';

describe('GenrateGraphsComponent', () => {
  let component: GenrateGraphsComponent;
  let fixture: ComponentFixture<GenrateGraphsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenrateGraphsComponent]
    });
    fixture = TestBed.createComponent(GenrateGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
