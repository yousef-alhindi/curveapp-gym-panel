import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymPackageMgmtComponent } from './gym-package-mgmt.component';

describe('GymPackageMgmtComponent', () => {
  let component: GymPackageMgmtComponent;
  let fixture: ComponentFixture<GymPackageMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GymPackageMgmtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GymPackageMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
