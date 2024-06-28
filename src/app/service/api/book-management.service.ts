import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { handleDataTransferList } from './fileHandler';
import { DirectoryContainer } from '../../interface/bookApi/bookContainer.interface';

@Injectable({
  providedIn: 'root'
})
export class BookManagementService {
  serviceInit: boolean = false
  newFileSubject = new Subject<DataTransferItemList>()
  newDirectorySubject = new Subject<DirectoryContainer>()
  state = new Subject<number>()


  constructor() { 
    this.newFileSubject.subscribe(response => {
      this.serviceInit = true
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
