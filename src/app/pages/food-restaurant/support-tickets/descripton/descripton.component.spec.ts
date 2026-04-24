import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptonComponent } from './descripton.component';

describe('DescriptonComponent', () => {
  let component: DescriptonComponent;
  let fixture: ComponentFixture<DescriptonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
