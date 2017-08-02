import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewrecordComponent } from './newrecord.component';

describe('NewrecordComponent', () => {
  let component: NewrecordComponent;
  let fixture: ComponentFixture<NewrecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewrecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
