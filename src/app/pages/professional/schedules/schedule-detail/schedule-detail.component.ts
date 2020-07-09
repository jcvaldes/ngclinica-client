import { environment } from './../../../../../environments/environment';
import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../../services/notification.service';
import { Schedule } from '../schedule.model';
import { User } from '../../../admin/users/user.model';
import { Category } from '../../../admin/categories/category.model';
import { NgxCalendarComponent } from 'ss-ngx-calendar';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { HttpService } from '../../../../services/http.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.scss']
})
export class ScheduleDetailComponent implements OnInit, OnDestroy {
  @ViewChild('calendar') calendar: NgxCalendarComponent;
  timeTable: string[];
  category: Category;
  schedule: Schedule;
  scheduleSubscription: Subscription = new Subscription();
  scheduleTime: Date;
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    appointmentDate: new FormControl(null, Validators.required),
    status: new FormControl(null, Validators.required),
  });
  url: string;
  constructor(
    private _notificationService: NotificationService,
    private router: Router,
    public _httpService: HttpService,
    private dialogRef: MatDialogRef<ScheduleDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.url = `${environment.apiUrl}/api/appointment`;
    this.populateForm(data);
  }
  ngOnDestroy() {
    this.scheduleSubscription.unsubscribe();
  }
  ngOnInit() {

  }
  onClear() {
    this.form.reset();
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setErrors(null);
    });
  }
  onSubmit() {
    if (this.form.valid) {
      if (!this.form.get('id').value) {
        Swal.fire({
          title: '¿Deseas Actualizar el los datos del turno?',
          html: `
            Estás a punto de actualizar un turno del paciente<br>¿Deseas Continuar?
        `,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, Actualizar!',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.value) {
            this._httpService.put(this.url, this.form.value).subscribe(
              (resp: any) => {
                Swal.fire(
                  'Atención',
                  'El turno ha sido actualizado',
                  'success'
                );
                this.onClear();
                this.router.navigate(['/schedules']);
              },
              (err) => {
                Swal.fire(
                  'Error',
                  `:: ${err}`,
                  'error'
                );
              },
            );
          }
        });
      }
    }
  }
  populateForm(data) {
    debugger
    this.scheduleSubscription = this._httpService.getSingle<Schedule>(data.id)
      .subscribe((res: any) => {
        //     this.schedule = res.payload;
        debugger
        this.form.get('appointmentDate').setValue(this.schedule.appointmentDate);
        //     this.form.get('active').setValue(this.schedule.active);
      }, err => this._notificationService.error(`:: ${err}`));
  }
  // categoryChanged(category: Category) {
  //   this.category = category;
  //   this.professionals = category.professionals || null;
  //   this.form.get('ProfessionalId').setValue(null);
  //   this.form.get('ProfessionalId').setErrors(null);
  //   this.professional = null;
  // }

  onChooseDate(date: any) {
    //  // this.calendarValue = date.value;
    //   this.scheduleTime = null;
    //   this.timeTable = null;
    //   if (this.validateSchedule()) {
    //     this.createTimeTable();
    //   } else {
    //     this.form.get('scheduleDate').setValue(null);
    //   }
  }

  // onChangeDate(date: any) {
  //   this.calendarRange = date;
  // }
  // private validateSchedule() {
  //   if (!this.professional || !this.category) {
  //     this._notificationService.error('Ingresa una especialidad y un profesional antes de continuar');
  //     return false;
  //   }
  //   const atendeeDays = this.professional.timeslot.map(i => i.day);
  //   if (!atendeeDays.includes(this.calendarValue.isoWeekday())) {
  //     this._notificationService.error('El profesional elegido no atiende el dia seleccionado, revisa los días en los que atiende e intenta nuevamente');
  //     return false;
  //   }
  //   return true;
  // }
  // private createTimeTable() {
  //   const x = 30; // minutes interval
  //   const schedule: any = this.professional.timeslot.find(i => i.day === this.calendarValue.isoWeekday());
  //   const hourStart = +schedule.timeStart.split(':')[0];
  //   const hourEnd = +schedule.timeEnd.split(':')[0];
  //   let times = []; // time array
  //   let tt = 0; // start time
  //   const ap = ['AM', 'PM']; // AM-PM
  //   // loop to increment the time and push results in array
  //   for (let i = 0; tt < 24 * 60; i++) {
  //     let hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
  //     let mm = (tt % 60); // getting minutes of the hour in 0-55 format
  //     times[i] = (hh % 24) +
  //       ':' + ('0' + mm).slice(-2) // + ' ' + ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
  //     tt = tt + x;
  //   }
  //   const timeStart = schedule.timeStart.split(':');
  //   const timeEnd = schedule.timeEnd.split(':');
  //   this.timeTable = times.slice(
  //     times.findIndex(i => {
  //       const start = i.split(':');
  //       return +start[0] === +timeStart[0] && +start[1] === +timeStart[1];
  //     }),
  //     times.findIndex(i => {
  //       const end = i.split(':');
  //       return +end[0] === +timeEnd[0] && +end[1] === +timeEnd[1];
  //     }),
  //   );
  // }
  // timeChange(evt) {
  //   const time = evt.value.split(':');
  //   this.scheduleTime = new Date(
  //     this.calendarValue.year(),
  //     this.calendarValue.month(),
  //     this.calendarValue.date(),
  //     time[0],
  //     time[1]
  //   );
  // }
}
