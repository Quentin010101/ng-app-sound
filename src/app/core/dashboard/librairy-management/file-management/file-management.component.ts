import { Component, inject } from '@angular/core';
import { BookManagementService } from '../../../../service/api/book-management.service';
import { DirectoryContainer } from '../../../../interface/bookApi/bookContainer.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextComponent } from '../../../../shared/input/text/text.component';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/icon/icon.component';

@Component({
  selector: 'app-file-management',
  standalone: true,
  imports: [ReactiveFormsModule, TextComponent, CommonModule, IconComponent],
  templateUrl: './file-management.component.html',
  styleUrl: './file-management.component.scss'
})
export class FileManagementComponent {
  private _bookManagementService = inject(BookManagementService)
  directory: DirectoryContainer | null = null

  newTitleForm = new FormGroup({
    title: new FormControl('')
  })

  constructor(){
    this._bookManagementService.newDirectorySubject.subscribe(directory => {
      this.directory = directory
      this.newTitleForm.get('title')?.setValue(directory.name)
    })
  }
}
