import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedCompaniesPage } from './liked-companies.page';

describe('LikedCompaniesPage', () => {
  let component: LikedCompaniesPage;
  let fixture: ComponentFixture<LikedCompaniesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedCompaniesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedCompaniesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
