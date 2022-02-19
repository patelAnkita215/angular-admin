
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: '', redirectTo: 'login' },
    { path: 'login', component: LoginComponent }
];


@NgModule({

    declarations: [
        LoginComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule],
    providers: []
})
export class AuthModule { }