import { Component, OnInit } from '@angular/core';

import { subDays } from 'date-fns';

import { toReadableDate } from '../@core/utils/methods';


const MOCK_COMPANIES_LIST = [
  {
    name: 'Amazon',
    category: 'Everything',
    headquarters: 'Seattle, USA',
    stockPrice: '$1186',
    owner: 'Jeff Bezos',
    dateLiked: toReadableDate(subDays(new Date(), 3))
  },
  {
    name: 'Walmart',
    category: 'Retail',
    headquarters: 'Arkanas, USA',
    stockPrice: '$112',
    owner: 'Walton Family',
    dateLiked: subDays(new Date(), 23)
  },
  {
    name: 'Wordpress',
    category: 'Software, CMS',
    headquarters: 'Fully Distributed',
    stockPrice: 'n/a',
    owner: 'Open Source',
    dateLiked: subDays(new Date(), 9)
  }
]


@Component({
  selector: 'app-liked-companies',
  templateUrl: './liked-companies.page.html',
  styleUrls: ['./liked-companies.page.scss'],
})
export class LikedCompaniesPage implements OnInit {

  constructor() { }

  companies = MOCK_COMPANIES_LIST;

  ngOnInit() {
  }

}
