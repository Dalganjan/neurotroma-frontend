import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { LoginComponent } from './account/login.component';
import { MainLandingComponent } from './main-landing/main-landing.component';
import { PatientComponent } from './patient/patient.component';
import { TreatmentComponent } from './treatment/treatment.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);

const routes: Routes = [
    //{ path: '', component: MainLandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
    { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'patientDetails', component: PatientComponent, canActivate: [AuthGuard] },
    { path: 'patientDetails/:patientId/treatment',  component: TreatmentComponent, canActivate: [AuthGuard], pathMatch: 'full'},

    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
