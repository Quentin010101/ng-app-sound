import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { handleDataTransferList } from './fileHandler';
import { DirectoryContainer } from '../../interface/bookApi/bookContainer.interface';
import { BookApiService } from './book-api.service';

@Injectable({
  providedIn: 'root'
})
export class BookManagementService {
  private _bookApiService = inject(BookApiService)

  newFileSubject = new Subject<DataTransferItemList>()
  newDirectorySubject = new Subject<DirectoryContainer>()


  constructor() { 
    this.newFileSubject.subscribe(response => {
      this.newBook(response)
    })
  }

  private newBook(response: DataTransferItemList){
    handleDataTransferList(response).then(d => this.handleFileManagementResponse(d))
  }

  private handleNewFiles() {
    
  }

  private handleFileManagementResponse(directory: DirectoryContainer | null){
    if(directory){
      this.newDirectorySubject.next(directory)
    }
  }
}
