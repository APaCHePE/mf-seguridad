import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiMockService {
  protected simulateDelay = 300; // ms

  protected handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    return new Observable(observer => {
      observer.error(error);
    });
  }

  protected okResponse<T>(data: T): Observable<T> {
    return of(data).pipe(delay(this.simulateDelay));
  }
}