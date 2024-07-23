import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropComponent } from './drop/drop.component';
import { FileManagementComponent } from './file-management/file-management.component';
import { ApiChoiceComponent } from './api-choice/api-choice.component';
import { RouterOutlet } from '@angular/router';
import { BookManagementService } from '../../../service/api/book-management.service';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/icon/icon.component';

@Component({
  selector: 'app-librairy-management',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, DropComponent, FileManagementComponent, ApiChoiceComponent, CommonModule, IconComponent],
  templateUrl: './librairy-management.component.html',
  styleUrl: './librairy-management.component.scss'
})
export class LibrairyManagementComponent {
  private _bookManagementService = inject(BookManagementService)
  public state: number = 1

  constructor(){

  }

  ngAfterViewInit(){
    this._bookManagementService.state.subscribe(number => {
      console.log()
      if(number && this.state != number) this.state = number
    })
  }

}
