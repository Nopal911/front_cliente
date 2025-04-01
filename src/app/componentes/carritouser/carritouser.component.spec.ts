import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritouserComponent } from './carritouser.component';

describe('CarritouserComponent', () => {
  let component: CarritouserComponent;
  let fixture: ComponentFixture<CarritouserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritouserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarritouserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
