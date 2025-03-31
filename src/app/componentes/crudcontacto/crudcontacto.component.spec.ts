import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudcontactoComponent } from './crudcontacto.component';

describe('CrudcontactoComponent', () => {
  let component: CrudcontactoComponent;
  let fixture: ComponentFixture<CrudcontactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudcontactoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudcontactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
