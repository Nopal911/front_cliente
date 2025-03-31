import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CascosComponent } from './cascos.component';

describe('CascosComponent', () => {
  let component: CascosComponent;
  let fixture: ComponentFixture<CascosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CascosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CascosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
