import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostdetailsPage } from './postdetails.page';

describe('PostdetailsPage', () => {
  let component: PostdetailsPage;
  let fixture: ComponentFixture<PostdetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PostdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
