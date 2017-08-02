import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalrecordComponent } from './medicalrecord.component';

describe('MedicalrecordComponent', () => {
  let component: MedicalrecordComponent;
  let fixture: ComponentFixture<MedicalrecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalrecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
