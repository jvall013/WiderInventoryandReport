import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultactivitiesComponent } from './defaultactivities.component';

describe('DefaultactivitiesComponent', () => {
  let component: DefaultactivitiesComponent;
  let fixture: ComponentFixture<DefaultactivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultactivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultactivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
