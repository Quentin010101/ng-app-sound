import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DirectoryContainer } from '../../../../interface/bookApi/bookContainer.interface';
import { BookManagementService } from '../../../../service/api/book-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from '../../../../shared/loader/loader.component';

@Component({
  selector: 'app-drop',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './drop.component.html',
  styleUrl: './drop.component.scss'
})
export class DropComponent {
  private _bookManagementService = inject(BookManagementService)
  private router = inject(Router)
  private activeRoute = inject(ActivatedRoute)

  extensionAllowed: string[] = ['png', 'jpg']
  nbDirMax: number = 5
  directory: DirectoryContainer | null = null
  securityCount: number = 0

  constructor(){
    this._bookManagementService.state.next(1)
  }

  onDrop(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    if(event.dataTransfer && event.dataTransfer.items){
      this._bookManagementService.newFileSubject.next(event.dataTransfer.items)
      this.router.navigate(['choice'] , {relativeTo: this.activeRoute.parent})
    }
  }









}




