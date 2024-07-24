import { Component, inject } from '@angular/core';
import { BookService } from '../../../service/core/book.service';

@Component({
  selector: 'app-librairy',
  standalone: true,
  imports: [],
  templateUrl: './librairy.component.html',
  styleUrl: './librairy.component.scss'
})
export class LibrairyComponent {
  private _bookService = inject(BookService)

  constructor(){
    this._bookService.getAllBooks().subscribe(b => {
      console.log(b)
    })
  }
}
