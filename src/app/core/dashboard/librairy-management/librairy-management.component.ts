import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropComponent } from './drop/drop.component';
import { FileManagementComponent } from './file-management/file-management.component';
import { ApiChoiceComponent } from './api-choice/api-choice.component';
import { RouterOutlet } from '@angular/router';
import { BookManagementService } from '../../../service/api/book-management.service';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/icon/icon.component';
import { CardComponent } from '../../../shared/card/card.component';

@Component({
  selector: 'app-librairy-management',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, DropComponent, FileManagementComponent, ApiChoiceComponent, CommonModule, IconComponent, CardComponent],
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
      if(number && this.state != number) this.state = number
    })
  }

}
