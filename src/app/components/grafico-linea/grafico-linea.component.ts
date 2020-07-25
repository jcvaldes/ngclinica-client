import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Label, BaseChartDirective } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
@Component({
  selector: 'app-grafico-linea',
  templateUrl: './grafico-linea.component.html',
  styles: []
})
export class GraficoLineaComponent implements OnInit {
  @Input('chartLabels') lineChartLabels: Label[] = [];
  @Input('chartData') lineChartData: any[][2] = [][2];
  @Input('options') lineChartOptions: any;
  @Input('colors') lineChartColors: any;

  public lineChartLegend = true;
  public lineChartPlugins = [pluginAnnotations];
  public lineChartType = 'line';
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() { }

  ngOnInit() {
  }
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
