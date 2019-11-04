import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseOnlyPage } from './enterprise-only.page';

describe('EnterpriseOnlyPage', () => {
  let component: EnterpriseOnlyPage;
  let fixture: ComponentFixture<EnterpriseOnlyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseOnlyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseOnlyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
