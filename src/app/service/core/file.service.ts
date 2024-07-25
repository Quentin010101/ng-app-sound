import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environnement } from '../../../environnement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private http = inject(HttpClient)

  private url = environnement.backend_url + "file/"
  
  constructor() { }

  private save(files: FormData, id: number): Observable<string>{
    return this.http.post<string>(this.url + 'save?id=' + id, files)
  }

  saveFiles(files: File[], id: number){
    let formdata: FormData = new FormData();

    files.forEach(f => {
      formdata.append('files', f)
    })
    return this.save(formdata, id)
  }
}
