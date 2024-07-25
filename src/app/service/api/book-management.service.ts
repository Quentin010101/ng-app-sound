import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { handleDataTransferList, generateList } from './fileHandler';
import { DirectoryContainer, FileContainer, FileListContainer } from '../../interface/bookApi/bookContainer.interface';
import { VolumeInfo } from '../../interface/bookApi/volumeInfo.interface';
import { BookService } from '../core/book.service';
import { Book } from '../../interface/core/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookManagementService {
  private _bookService = inject(BookService)

  serviceInit: boolean = false
  newFileSubject = new Subject<DataTransferItemList>()
  newDirectorySubject = new BehaviorSubject<DirectoryContainer | null>(null)
  newFileListSubject = new BehaviorSubject<FileListContainer | null>(null)
  newVolumeSubject = new BehaviorSubject<VolumeInfo | null>(null)
  $bookSubject = new BehaviorSubject<Book | null>(null)
  state = new Subject<number>()

  extensionAllowed = new BehaviorSubject<string[]>([])


  constructor() { 
    this._bookService.initExtension().subscribe(response => {
      this.extensionAllowed.next(response)
    })
    this.newFileSubject.subscribe(response => {
      this.resetService()
      this.serviceInit = true
      this.newBook(response)
    })
  }

  private resetService(){
    this.serviceInit = false
    this.newDirectorySubject.next(null)
    this.newFileListSubject.next(null)
    this.newVolumeSubject.next(null)
    this.$bookSubject.next(null)
  }

  private newBook(response: DataTransferItemList){
    handleDataTransferList(response).then(d => {
      this.handleFileManagementResponse(d)
    })
  }

  private handleFileManagementResponse(directory: DirectoryContainer | null){
    if(directory){
      this.createAudioList(directory)
      this.newDirectorySubject.next(directory)
    }
  }

  private createAudioList(directory: DirectoryContainer){
    this.newFileListSubject.next(generateList(directory))
  }
}
