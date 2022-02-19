import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AstrologerService {

  constructor(
    private http: HttpClient
  ) { }
  getAllAstrologers() {
    return this.http.get(`${environment.url}/astrologers?Offset=0`)
  }
  getAllAstrologerByID(ID: number) {
    return this.http.get(`${environment.url}/astrologers?AstrologerID=${ID}`)
  }
  editAstrologerByID(payload: any, ID: number) {
    return this.http.put(`${environment.url}/astrologers/${ID}`, payload)
  }
  addAstrologer(payload: any) {
    return this.http.post(`${environment.url}/admin/astrologer`, payload)
  }
  deleteAstrologer(AstrologerID: number) {
    return this.http.delete(`${environment.url}/admin/astrologer/${AstrologerID}`)
  }

  getAstrologerOrderHistory(ID: number) {
    return this.http.get(`${environment.url}/orders?AstrologerID=${ID}`)
  }

  searchAstrologers(SearchItem: any) {
    return this.http.get(`${environment.url}/astrologers?Search=${SearchItem}&Offset=0`)
  }


}
