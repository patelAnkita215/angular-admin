import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(
    private http: HttpClient
  ) { }
  getAllUsers(offset: number) {
    return this.http.get(`${environment.url}/admin/users/all?offset=${offset}`)
  }
  getBusinessUsers(offset: number) {

    return this.http.get(`${environment.url}/admin/business/all?offset=${offset}`)
  }
  getUserByID(ID: number) {
    return this.http.get(`${environment.url}/admin/users?userId=${ID}`)
  }

  deleteUser(UserID: number) {
    return this.http.delete(`${environment.url}/admin/astrologer/${UserID}`)
  }

  getOrders(payload: any) {
    return this.http.post(`${environment.url}/admin/wallet-transactions`, payload)
  }

  getWalletTransactions() {
    return this.http.get(`${environment.url}/wallettransactions?Offset=0`)
  }
  searchUsers(SearchItem: any) {
    return this.http.get(`${environment.url}/users?Search=${SearchItem}&Offset=0`)
  }
  getAllUserRequests(offset: any, type: number) {
    return this.http.get(`${environment.url}/user-requests?Status=${type}&Offset=${offset}`)
  }
  getWalletTransactionsByUserId(userid: number) {
    return this.http.get(`${environment.url}/admin/${userid}/wallet-transactions?Offset=0`)
  }
  getDashboardByUserId(userid: number) {
    return this.http.get(`${environment.url}/dashboard/${userid}/admin`)
  }
  updateUserByUserId(userid: number, payload: any) {
    return this.http.put(`${environment.url}/admin/${userid}/update-userdetails`, payload)
  };
  getTransactionsByUserIdDateFilter(userid: number,data:any) {
    return this.http.post(`${environment.url}/admin/${userid}/wallet-transactions?Offset=0`,data)
  }

  getTransactionsPopupByID(ID: number) {
    return this.http.get(`${environment.url}/admin/wallet-transactions/${ID}`)
  }
  getUserByIdSetting(ID: number) {
    return this.http.get(`${environment.url}/admin/users?userId=${ID}`)
  }

  updateUserByIdSetting(userid: number,setting: any) {
    return this.http.put(`${environment.url}/admin/${userid}/update-userdetails`, setting)
  }

}
