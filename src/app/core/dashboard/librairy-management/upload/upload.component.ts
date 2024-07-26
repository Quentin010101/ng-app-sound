import { Component, inject } from '@angular/core';
import { BookManagementService } from '../../../../service/api/book-management.service';
import { Book } from '../../../../interface/core/book.interface';
import { BookService } from '../../../../service/core/book.service';
import { Message } from '../../../../interface/utils/message.interface';
import { MessageService } from '../../../../service/utils/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileListContainer } from '../../../../interface/bookApi/bookContainer.interface';
import { FileService } from '../../../../service/core/file.service';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { IconComponent } from '../../../../shared/icon/icon.component';
import { CardComponent } from '../../../../shared/card/card.component';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [LoaderComponent, IconComponent, CardComponent],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

  private _bookManagementService = inject(BookManagementService)
  private _bookService = inject(BookService)
  private _messageService = inject(MessageService)
  private _fileService = inject(FileService)
  private router = inject(Router)
  private activeRoute = inject(ActivatedRoute)
  
  book: Book | null = null
  filesList: FileListContainer | null = null

  uploadingBook: boolean = false
  uploadingFile: boolean = false
  uploadedBook: boolean = false
  uploadedFile: boolean = false

  constructor(){
    this._bookManagementService.state.next(5)
    this._bookManagementService.$bookSubject.subscribe(book => {
      if(book){
        this.book = book
      }
    })
    this._bookManagementService.newFileListSubject.subscribe(filesList => {
      this.filesList = filesList
    })
  }

  ngOnInit(){
    if(this.book && this.filesList){
      this.saveBook(this.book)
    }else{
      let message = new Message("Erreur: Book not found.")
      message.error = true
      this._messageService.$messageSubject.next(message)
      this.redirectToRoot()
    }
  }

  private saveBook(book: Book){
    this.uploadingBook = true
    this._bookService.save(book).subscribe(response => {
      this.saveFiles(response.id_book)
      this.uploadingBook = false
      this.uploadedBook = true
    })
  }

  private saveFiles(id: number){
    if(this.filesList){
      this.uploadingFile = true
      let files: File[] = []
      this.filesList.files.forEach(f => {
        if(f.file) files.push(f.file)
      })
    this._fileService.saveFiles(files, id).subscribe((r) => {
      this.uploadingFile = false
      this.uploadedFile = true
      setTimeout(() => {
        this._messageService.$messageSubject.next(new Message("File has been uploaded."))
        this.redirectToRoot()
      }, 1500)
    })
    }
  }

  private redirectToRoot(){
    this.router.navigate(['drop'] , {relativeTo: this.activeRoute.parent})
  }
}
