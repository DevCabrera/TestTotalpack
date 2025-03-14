import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresFormComponent } from './address-form.component';

describe('AddresFormComponent', () => {
  let component: AddresFormComponent;
  let fixture: ComponentFixture<AddresFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddresFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
