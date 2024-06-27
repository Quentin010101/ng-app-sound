import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environnement } from '../../../environnement';
import { VolumeInfo } from '../../interface/bookApi/volumeInfo.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookApiService {
  private http = inject(HttpClient)

  private url = environnement.backend_url + "bookDescription/"
  
  constructor() { }

  private get(query: string): Observable<VolumeInfo[]>{
    return this.http.get<VolumeInfo[]>(this.url + 'get?query=' + query)
  }

  public requestInfoWithTitle(query: string): Observable<VolumeInfo[]>{
    return this.get(query)
  }
}
