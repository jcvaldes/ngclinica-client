import { environment } from '../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { GraficoDonaComponent } from '../grafico-dona/grafico-dona.component';

import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-statistics-dona',
  templateUrl: './statistics-dona.component.html',
  styleUrls: ['./statistics-dona.component.scss'],
})
export class StatisticsDonaComponent extends GraficoDonaComponent implements OnInit {
  graficos: any = {
    grafico1: {
      labels: ['Cardio', 'Endo'],
      data:  ['2', '3'],
      type: 'doughnut',
      leyenda: ''
    }
  };
  url = `${environment.apiUrl}/api/statistics`;
  constructor(private httpService: HttpService) {
    super();
  }
  ngOnInit() {
    this.httpService.get(this.url).subscribe(resp => {
      this.graficos.grafico1.labels = resp.map(i => i.Category.name);
      this.graficos.grafico1.data = resp.map(i => i.cnt);
    });
  }
  downloadCanvas(event) {
    var anchor = event.target;
    // get the canvas
    anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();
    anchor.download = "test.png";
  }

}
