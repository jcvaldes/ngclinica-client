import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { VerifyTokenGuard } from '../../../services/guards/verify-token.guard';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    canActivateChild: [VerifyTokenGuard],
    data: { titulo: 'Gestión de Especialidades' },
    children: [
      {
        path: '',
        component: CategoryListComponent,
        data: { animation: 'CategoryListPage'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
