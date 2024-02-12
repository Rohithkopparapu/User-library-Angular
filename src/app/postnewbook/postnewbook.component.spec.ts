import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostnewbookComponent } from './postnewbook.component';

describe('PostnewbookComponent', () => {
  let component: PostnewbookComponent;
  let fixture: ComponentFixture<PostnewbookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostnewbookComponent]
    });
    fixture = TestBed.createComponent(PostnewbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
