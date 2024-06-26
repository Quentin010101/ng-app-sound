import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DirectoryContainer } from '../../../../interface/bookApi/bookContainer.interface';
import { BookManagementService } from '../../../../service/api/book-management.service';

@Component({
  selector: 'app-drop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drop.component.html',
  styleUrl: './drop.component.scss'
})
export class DropComponent {
  private _bookManagementService = inject(BookManagementService)
  extensionAllowed: string[] = ['png', 'jpg']
  nbDirMax: number = 5
  directory: DirectoryContainer | null = null
  securityCount: number = 0
  
  onDrop(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    if(event.dataTransfer && event.dataTransfer.items){
      this._bookManagementService.newFileSubject.next(event.dataTransfer.items)
    }
  }




  
  



}




