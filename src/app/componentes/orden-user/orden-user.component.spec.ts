import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenUserComponent } from './orden-user.component';

describe('OrdenUserComponent', () => {
  let component: OrdenUserComponent;
  let fixture: ComponentFixture<OrdenUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
