import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule-filter',
  templateUrl: './schedule-filter.component.html',
  styleUrls: ['./schedule-filter.component.scss'],
})
export class ScheduleFilterComponent implements OnInit {
  @Output() searchFiltered = new EventEmitter();
  searching = false;
  form: FormGroup = new FormGroup({
    // patientId: new FormControl(null),
    // professionalId: new FormControl(null),
    // category: new FormControl(null),
    status: new FormControl('1'),
    temperature: new FormControl(null),
    dateAppointment:  new FormControl(null),
  });
  constructor() { }

  ngOnInit() {
  }
  onSearch() {
    this.searchFiltered.emit();
  }
  onClear() {
    
  }
}
