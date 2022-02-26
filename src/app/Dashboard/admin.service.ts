import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  getAdminDetails() {
    return this.http.get(`${environment.url}/admin?AdminID=1`)
  }
  updateAdminDetails(details: any, adminID: number) {
    return this.http.put(`${environment.url}/admin/${adminID}`, details)
  }

  changePassword(passwords: any, adminID: number) {
    return this.http.put(`${environment.url}/admin/${adminID}`, passwords)
  }

  getSettingsDetails() {
    return this.http.get(`${environment.url}/admin/settings`)
  }

  updateSettingsDetails(settings: any) {
    return this.http.put(`${environment.url}/admin/settings`, settings)
  }

  getDashboardAdmin() {
    return this.http.get(`${environment.url}/admin/dashboard`)
  }


}
