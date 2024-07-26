import { Component, inject } from '@angular/core';
import { BookService } from '../../../service/core/book.service';
import { Book } from '../../../interface/core/book.interface';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-librairy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './librairy.component.html',
  styleUrl: './librairy.component.scss'
})
export class LibrairyComponent {
  private _bookService = inject(BookService)
  private router = inject(Router)
  private activeRoute = inject(ActivatedRoute)

  private fullBookList: Book[] = []
  private $searchState = new BehaviorSubject<string>('full')

  bookListShow: Book[] = []

  constructor(){
    this._bookService.getAllBooks().subscribe(b => {
      this.fullBookList = b
      if(this.$searchState.value == 'full') this.bookListShow = this.fullBookList
    })
  }

  goToBook(book: Book){
    this.router.navigate(['book', book.id_book], {relativeTo: this.activeRoute.parent})
  }
}
