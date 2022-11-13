import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private URL = environment.API_URL + '/auth/login';

  constructor(private http: HttpClient) {}

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  });

  async login(data: object) {
    return this.http
      .post(this.URL, data, { headers: this.headers })
      .toPromise();
  }

  switch(current: boolean) {
    return this.http
      .put(
        environment.API_URL + '/xhr/swich',
        { status: current },
        { headers: this.headers }
      )
      .toPromise();
  }

  getSwitch() {
    return this.http
      .get(environment.API_URL + '/xhr/swich', { headers: this.headers })
      .toPromise();
  }

  getLogs() {
    return this.http
      .get(environment.API_URL + '/xhr/logs', { headers: this.headers })
      .toPromise();
  }

  updateAll() {
    return this.http
      .get(environment.API_URL + '/xhr/update/all', { headers: this.headers })
      .toPromise();
  }

  delAndGet(id: string) {
    return this.http
      .get(environment.API_URL + '/xhr/update/' + id, { headers: this.headers })
      .toPromise();
  }

  removeAlls() {
    return this.http
      .delete(environment.API_URL + '/xhr/delete', { headers: this.headers })
      .toPromise();
  }

  getRutInfo(rut: string) {
    return this.http
      .get('https://siichile.herokuapp.com/consulta?rut=' + rut)
      .toPromise();
  }

  getCurrentCountry() {
    // elkobecc@gmail.com | ip usa zip 61615
    // https://extreme-ip-lookup.com/json/?key=bRJutwlB1pCOj0KnIMDF
    // https://extreme-ip-lookup.com/json/63.70.164.200?key=bRJutwlB1pCOj0KnIMDF
    // https://extreme-ip-lookup.com/json/?callback=getIP&key=bRJutwlB1pCOj0KnIMDF
    // https://extreme-ip-lookup.com/json/63.70.164.200?callback=getIP&key=bRJutwlB1pCOj0KnIMDF
    // https://extreme-ip-lookup.com/csv/?key=bRJutwlB1pCOj0KnIMDF
    // https://extreme-ip-lookup.com/csv/63.70.164.200?key=bRJutwlB1pCOj0KnIMDF
    return this.http
      .get('https://extreme-ip-lookup.com/json/?key=bRJutwlB1pCOj0KnIMDF')
      .toPromise();
  }

  getStatus() {
    return this.http.get(`${environment.API_URL}/status`).toPromise();
  }

  getTexts() {
    return this.http.get(`${environment.API_URL}/config/getall`).toPromise();
  }
}
