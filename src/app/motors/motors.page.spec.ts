import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MotorsPage } from './motors.page';

describe('MotorsPage', () => {
  let component: MotorsPage;
  let fixture: ComponentFixture<MotorsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MotorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
