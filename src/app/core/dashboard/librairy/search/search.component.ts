import { Component, inject } from '@angular/core';
import { BookService } from '../../../../service/core/book.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  private _bookService = inject(BookService)

  constructor(){
  }
}
