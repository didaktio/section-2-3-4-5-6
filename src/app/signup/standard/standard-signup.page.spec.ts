import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardSignupPage } from './standard-signup.page';

describe('SignupPage', () => {
  let component: StandardSignupPage;
  let fixture: ComponentFixture<StandardSignupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardSignupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardSignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
