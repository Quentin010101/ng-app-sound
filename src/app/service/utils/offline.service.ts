import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { environnement } from '../../../environnement';

@Injectable({
  providedIn: 'root'
})
export class OfflineService {

  private http = inject(HttpClient)
  private url = environnement.backend_url + "status"
  private duration = environnement.offlineCheckDuration

  status = new BehaviorSubject<boolean>(true)

  constructor() {
    let intervale = interval(this.duration)
    intervale.subscribe(() => {
      this.getServeurStatus().subscribe({
        next: value => this.updateStatus(value.online),
        error: error => this.updateStatus(false)
      })
    })
   }


  private updateStatus(value: boolean){
    let actualValue = this.status.getValue()
    console.log(value)
    if(value != actualValue){
      this.status.next(value)
    }
  }

  private getServeurStatus(): Observable<Status>{
    return this.http.get<Status>(this.url)
  }
}

class Status{
  online: boolean = false
}
