import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdeponbrandComponent } from './prodeponbrand.component';

describe('ProdeponbrandComponent', () => {
  let component: ProdeponbrandComponent;
  let fixture: ComponentFixture<ProdeponbrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdeponbrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdeponbrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
