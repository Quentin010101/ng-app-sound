import { Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { userGuard } from './guard/user.guard';
import { HomeComponent } from './core/dashboard/home/home.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { LibrairyComponent } from './core/dashboard/librairy/librairy.component';
import { LibrairyManagementComponent } from './core/dashboard/librairy-management/librairy-management.component';
import { ApiSettingComponent } from './core/dashboard/api-setting/api-setting.component';
import { DropComponent } from './core/dashboard/librairy-management/drop/drop.component';
import { ApiChoiceComponent } from './core/dashboard/librairy-management/api-choice/api-choice.component';
import { FileManagementComponent } from './core/dashboard/librairy-management/file-management/file-management.component';
import { BookManagementComponent } from './core/dashboard/librairy-management/book-management/book-management.component';
import { UploadComponent } from './core/dashboard/librairy-management/upload/upload.component';
import { BookComponent } from './core/dashboard/book/book.component';

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
            {
                path:'book/:id', component: BookComponent, title: "Book"
            },
            {
                path:'librairy', component: LibrairyComponent, title: "Librairy"
            },
            {
                path:'librairy-management', component: LibrairyManagementComponent, title: "Librairy Management", children: [
                    {
                        path:'', redirectTo: 'drop', pathMatch: 'full'
                    },
                    {
                        path:'drop', component: DropComponent, title: "Drop"
                    },
                    {
                        path:'choice', component: ApiChoiceComponent, title: "Choice"
                    },
                    {
                        path:'file', component: FileManagementComponent, title: "File"
                    },
                    {
                        path:'book', component: BookManagementComponent, title: "Book"
                    },
                    {
                        path:'upload', component: UploadComponent, title: "Upload"
                    },
                ]
            },
            {
                path:'api-settings', component: ApiSettingComponent, title: "API Settings"
            },
        ]
    },
    {path: '**', component: NotfoundComponent}



];
