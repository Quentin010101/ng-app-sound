import { Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { userGuard } from './guard/user.guard';
import { HomeComponent } from './core/dashboard/home/home.component';
import { NotfoundComponent } from './core/notfound/notfound.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent, title: 'Login'},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {path: 'dashboard', component: DashboardComponent, canActivate: [userGuard], children: [
            {
                path:'', redirectTo: 'home', pathMatch: 'full'
            },
            {
                path:'home', component: HomeComponent, title: "Home"
            },
        ]
    },
    {path: '**', component: NotfoundComponent}



];
