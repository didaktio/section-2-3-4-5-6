import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SomePagePage } from './some-page.page';

describe('SomePagePage', () => {
  let component: SomePagePage;
  let fixture: ComponentFixture<SomePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SomePagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SomePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
