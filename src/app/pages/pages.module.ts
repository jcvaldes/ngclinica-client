import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';
import { UsersModule } from './admin/users/users.module';
import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { StatisticsDonaComponent } from '../components/statistics-dona/statistics-dona.component';

@NgModule({
  declarations: [
    DashboardComponent,
    GraficoDonaComponent,
    StatisticsDonaComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    PagesRoutingModule,
  ],
  exports: [DashboardComponent],
  providers: []
})
export class PagesModule { }
