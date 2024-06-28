import { Component, inject } from '@angular/core';
import { BookManagementService } from '../../../../service/api/book-management.service';
import { DirectoryContainer } from '../../../../interface/bookApi/bookContainer.interface';
import {  ReactiveFormsModule } from '@angular/forms';
import { TextComponent } from '../../../../shared/input/text/text.component';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/icon/icon.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-file-management',
  standalone: true,
  imports: [ReactiveFormsModule, TextComponent, CommonModule, IconComponent],
  templateUrl: './file-management.component.html',
  styleUrl: './file-management.component.scss'
})
export class FileManagementComponent {
  private _bookManagementService = inject(BookManagementService)
  private router = inject(Router)
  private activeRoute = inject(ActivatedRoute)
  
  directory: DirectoryContainer | null = null


  constructor(){
    if(!this._bookManagementService.serviceInit) {
      this.redirectToRoot()
    }else{
      this._bookManagementService.state.next(3)

      this._bookManagementService.newDirectorySubject.subscribe(directory => {
        this.directory = directory
      })
    }
  }

  private redirectToRoot(){
    this.router.navigate(['drop'] , {relativeTo: this.activeRoute.parent})
  }

}
