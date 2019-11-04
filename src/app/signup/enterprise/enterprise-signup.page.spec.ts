import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseSignupPage } from './enterprise-signup.page';

describe('SignupPage', () => {
  let component: EnterpriseSignupPage;
  let fixture: ComponentFixture<EnterpriseSignupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseSignupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseSignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
