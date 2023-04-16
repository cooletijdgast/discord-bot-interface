import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DvdBounceComponent } from './dvd-bounce.component';

describe('DvdBounceComponent', () => {
  let component: DvdBounceComponent;
  let fixture: ComponentFixture<DvdBounceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DvdBounceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DvdBounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
