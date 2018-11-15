import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface myData {
  status: "ok" | "error",
  data: string
}

interface isLoggedIn {
  status: boolean
}

interface logoutStatus {
  status: "ok" | "error",
  data?: string
}

interface quoteInterface {
	status: "ok" | "error"
}

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getSomeData() {
    return this.http.post<myData>('/api/database/', null)
  }

  isLoggedIn(): Observable<isLoggedIn> {
    return this.http.post<isLoggedIn>('/api/isloggedin/', null)
  }

  logout() {
    return this.http.post<logoutStatus>('/api/logout/', null)
  }

  saveNewQuote(quote) {
	  return this.http.post<quoteInterface>('/api/new', { quote })
  }

}
