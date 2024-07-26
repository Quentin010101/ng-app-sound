import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Book } from '../../../interface/core/book.interface';
import { switchMap } from 'rxjs';
import { BookService } from '../../../service/core/book.service';
import { MessageService } from '../../../service/utils/message.service';
import { Message } from '../../../interface/utils/message.interface';
import { BackComponent } from '../../../shared/back/back.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [BackComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {

  private route: ActivatedRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private _bookService = inject(BookService)
  private _messageService = inject(MessageService)

  book!: Book

  ngOnInit() {
    let id: string | null = this.route.snapshot.paramMap.get('id')
    this.initBook(id);
  }

  goBack(){
    this.redirectToRoot()
  }

  private redirectToRoot(){
    this.router.navigate(['librairy'] , {relativeTo: this.route.parent})
  }

  private initBook(id: string | null){
    if(id){
      let book: Book | undefined = this._bookService.getBook(id)
      if(book){
        this.book = book
      }else{
        let message = new Message("Book id doesn't exist.")
        message.error = true
        this._messageService.$messageSubject.next(message)
        this.redirectToRoot()
      }
    }else{
      let message = new Message("Url parameter is not valid.")
      message.error = true
      this._messageService.$messageSubject.next(message)
      this.redirectToRoot()
    }
  }
}
