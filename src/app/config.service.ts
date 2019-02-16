import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public readonly apiUrl = '//127.0.0.1:8080/customer-service/api';
}
