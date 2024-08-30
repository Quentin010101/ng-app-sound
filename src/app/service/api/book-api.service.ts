import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environnement } from '../../../environnement';
import { VolumeInfo } from '../../interface/bookApi/volumeInfo.interface';
import { Observable } from 'rxjs';
import { ApiSettings } from '../../interface/bookApi/apiSettings.interface';

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
  private getInfo(): Observable<ApiSettings>{
    return this.http.get<ApiSettings>(this.url + 'info/get')
  }
  private setInfo(apiSettings: ApiSettings): Observable<ApiSettings>{
    return this.http.post<ApiSettings>(this.url + 'info/set', apiSettings)
  }

  public requestInfoWithTitle(query: string): Observable<VolumeInfo[]>{
    return this.get(query)
  }

  public getApiInfo(){
    return this.getInfo()
  }

  public setApiInfo(apiSettings: ApiSettings){
    return this.setInfo(apiSettings)
  }
}
