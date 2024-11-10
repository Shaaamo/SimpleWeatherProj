import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlockCompComponent } from './dashboard/block-comp/block-comp.component';
import { hideCompGuard } from './common/guards/hide-comp.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'block',
        component: BlockCompComponent,
        canActivate: [hideCompGuard]
    }
];
