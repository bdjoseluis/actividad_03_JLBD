import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { Page404Component } from './pages/page404/page404.component';
import { UsuarioViewComponent } from './pages/usuario-view/usuario-view.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: 'home', component: HomeComponent},
    { path: 'newuser', component: NewUserComponent },
    { path: 'updateuser/:_id', component: NewUserComponent },
    { path: 'user/:id_usuario', component: UsuarioViewComponent},
    { path: '**', component: Page404Component}
];
