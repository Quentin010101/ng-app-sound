import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environnement } from '../../../environnement';
import { Observable } from 'rxjs';
import { Book } from '../../interface/core/book.interface';
import { Category } from '../../interface/core/category.interface';
import { Author } from '../../interface/core/author.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private http = inject(HttpClient)

  private url = environnement.backend_url + "book/"
  
  constructor() { }

  private saveBook(book: Book): Observable<Book>{
    return this.http.post<Book>(this.url + 'save', book)
  }

  private updateBook(book: Book): Observable<Book>{
    return this.http.post<Book>(this.url + 'update', book)
  }

  private getAll(): Observable<Book[]>{
    return this.http.get<Book[]>(this.url + 'get/all')
  }

  private getAllByCategory(category: Category): Observable<Book[]>{
    return this.http.get<Book[]>(this.url + 'get/all/category')
  }

  private getAllByAuthor(author: Author): Observable<Book[]>{
    return this.http.get<Book[]>(this.url + 'get/all/author')
  }

  private deleteById(id:number): Observable<string>{
    return this.http.get<string>(this.url + 'delete/' + id)
  }

  private getExtentionAllowed():Observable<string[]>{
    return this.http.get<string[]>(this.url + 'get/extensionallowed')
  }



}
