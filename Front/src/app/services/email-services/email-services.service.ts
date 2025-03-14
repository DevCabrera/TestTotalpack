import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailServices {
  private apiUrl = 'http://emailsender/'; // URL del PDF a la que apuntamos el servicio

  constructor(private http: HttpClient) { }

  // Método para enviar un correo electrónico
  sendEmail(to: string, bodyTemplate: string): Observable<any> {
    const body = { to, body_template: bodyTemplate };
    return this.http.post(this.apiUrl, body);
  }
}