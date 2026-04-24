import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSupportTicketsComponent } from './create-support-tickets.component';

describe('CreateSupportTicketsComponent', () => {
  let component: CreateSupportTicketsComponent;
  let fixture: ComponentFixture<CreateSupportTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSupportTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSupportTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
