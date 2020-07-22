import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { HttpService } from '../../services/http.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  url = `${environment.apiUrl}/api/statistics`;
  graficos: any = {
    grafico1: {
      labels: [],
      data:  [],
      type: 'doughnut',
    }
  };
  constructor(private httpService: HttpService) { }
  ngOnInit(): void {
    this.httpService.get(this.url).subscribe(resp => {
      const opByCategory = resp.opByCategory;
      const appointmentByDayOfWeek = resp.appointmentByDayOfWeek;
      this.graficos.grafico1.labels = opByCategory.map(i => i.Category.name);
      this.graficos.grafico1.data = opByCategory.map(i => i.cnt);
    });
  }
  createPdf() {
    const dataURL = document.getElementsByTagName('canvas')[0].toDataURL();
    var pdf = new jsPDF();
    pdf.text(20, 20, 'Operaciones x Especialidad')
    pdf.addImage(dataURL, 'JPEG', 20, 30);

    pdf.save('reporte.pdf');
  }
  downloadCanvas(event) {
    var anchor = event.target;
    // get the canvas
    anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();
    anchor.download = "test.png";
  }

}
