
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './users/users.component';
import { ManageAstrologersComponent } from './manage-astrologers/manage-astrologers.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { CustomerSupportQueriesComponent } from './customer-support-queries/customer-support-queries.component';
import { WalletTransactionsComponent } from './wallet-transactions/wallet-transactions.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AstrologerDetailsComponent } from './astrologer-details/astrologer-details.component';
import { EditAstrologerComponent } from './edit-astrologer/edit-astrologer.component';
import { AddAstrologerComponent } from './add-astrologer/add-astrologer.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserRequestsComponent } from './user-requests/user-requests.component';
import { BusinessUsersComponent } from './business-users/business-users.component';
import { SettingComponent } from './setting-tab/setting.component';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';

const routes: Routes = [
    {
        path: '', component: DashboardComponent,
        children: [

            { path: 'dashboard-list', component: DashboardListComponent },
            { path: 'users', component: UsersComponent },
            { path: 'users/:id', component: UserDetailsComponent },
            { path: 'business-users', component: BusinessUsersComponent },
            { path: 'setting', component: SettingComponent },
            { path: 'business-users/:id', component: UserDetailsComponent },
            { path: 'user-requests', component: UserRequestsComponent },
            { path: 'manage-astrologers', component: ManageAstrologersComponent },
            { path: 'manage-astrologers/view/:id', component: AstrologerDetailsComponent },
            { path: 'manage-astrologers/add', component: AddAstrologerComponent },
            { path: 'manage-astrologers/edit/:id', component: EditAstrologerComponent },
            { path: 'transaction-history', component: TransactionHistoryComponent },
            { path: 'customer-support-queries', component: CustomerSupportQueriesComponent },
            { path: 'wallet-transactions', component: WalletTransactionsComponent },
            { path: 'edit-admin', component: EditAdminComponent },
            { path: '**', redirectTo: '/dashboard/users' }
        ]
    }
];

@NgModule({
    declarations: [
        DashboardComponent,
        DashboardListComponent,
        UsersComponent,
        ManageAstrologersComponent,
        TransactionHistoryComponent,
        CustomerSupportQueriesComponent,
        WalletTransactionsComponent,
        UserDetailsComponent,
        AstrologerDetailsComponent,
        EditAstrologerComponent,
        AddAstrologerComponent,
        EditAdminComponent,
        UserRequestsComponent,
        BusinessUsersComponent,
        SettingComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        NgxPaginationModule,
        NgxSpinnerModule,
        ReactiveFormsModule,
        NgMultiSelectDropDownModule.forRoot(),
        SweetAlert2Module.forRoot(),

    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule { }