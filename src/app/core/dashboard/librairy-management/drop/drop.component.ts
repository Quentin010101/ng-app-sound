import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DirectoryContainer } from '../../../../interface/bookApi/bookContainer.interface';
import { BookManagementService } from '../../../../service/api/book-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from '../../../../shared/loader/loader.component';
import { IconComponent } from '../../../../shared/icon/icon.component';

@Component({
  selector: 'app-drop',
  standalone: true,
  imports: [CommonModule, LoaderComponent, IconComponent],
  templateUrl: './drop.component.html',
  styleUrl: './drop.component.scss'
})
export class DropComponent {
  private _bookManagementService = inject(BookManagementService)
  private router = inject(Router)
  private activeRoute = inject(ActivatedRoute)
  hover: boolean = false

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
      console.log(new Date().getTime())
      this._bookManagementService.newFileSubject.next(event.dataTransfer.items)
      this._bookManagementService.newDirectorySubject.subscribe(response => {
        if(response){
          console.log(new Date().getTime())
          this.router.navigate(['choice'] , {relativeTo: this.activeRoute.parent})
        }
      })
    }
  }

  onDragOver(event: DragEvent){
    this.hover = true
  }

  onDragLeave(event: DragEvent){
    this.hover = false
  }

  onclick(event: Event){
    event.preventDefault()
    event.stopPropagation()
  }

}




