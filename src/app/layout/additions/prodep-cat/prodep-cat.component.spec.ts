import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdepCatComponent } from './prodep-cat.component';

describe('ProdepCatComponent', () => {
  let component: ProdepCatComponent;
  let fixture: ComponentFixture<ProdepCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdepCatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdepCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
