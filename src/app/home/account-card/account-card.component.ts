import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { toReadableDate } from 'src/app/@core/utils/methods';


@Component({
  selector: 'account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent implements OnInit {

  constructor() { }

  @Input() data;
  @Output() editClickedEvent = new EventEmitter();

  ngOnInit() { }

  editClicked() {
    this.editClickedEvent.emit();
  }

  formatDate(date: Date) {
    return toReadableDate(date);
  }

}
