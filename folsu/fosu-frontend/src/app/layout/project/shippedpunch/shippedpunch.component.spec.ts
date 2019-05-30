import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippedpunchComponent } from './shippedpunch.component';

describe('ShippedpunchComponent', () => {
  let component: ShippedpunchComponent;
  let fixture: ComponentFixture<ShippedpunchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippedpunchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippedpunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
