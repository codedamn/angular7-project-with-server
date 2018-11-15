import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

interface myData {
  status: "ok" | "error",
  data: string
}

@Injectable()
export class AuthService {

  private loggedInStatus = false

  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }

  get isLoggedIn() {
    return this.loggedInStatus
  }

  getUserDetails(username, password) {
    // post these details to API server return user info if correct
    return this.http.post<myData>('/api/auth/', { // http://localhost:1234/api/auth
      username,
      password
    })
  }

}
