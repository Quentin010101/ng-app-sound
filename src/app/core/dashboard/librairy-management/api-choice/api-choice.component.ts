import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookManagementService } from '../../../../service/api/book-management.service';
import { TextComponent } from '../../../../shared/input/text/text.component';
import { BookApiService } from '../../../../service/api/book-api.service';
import { VolumeInfo } from '../../../../interface/bookApi/volumeInfo.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-api-choice',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextComponent],
  templateUrl: './api-choice.component.html',
  styleUrl: './api-choice.component.scss'
})
export class ApiChoiceComponent {
  private _bookManagementService = inject(BookManagementService)
  private _bookApiService = inject(BookApiService)
  public apiResponse: VolumeInfo[] = []

  newTitleForm = new FormGroup({
    title: new FormControl({value:'',disabled:true}, Validators.required)
  })

  constructor(){
    this._bookManagementService.newDirectorySubject.subscribe(directory => {
      this.newTitleForm.controls.title.enable()
      this.newTitleForm.get('title')?.setValue(directory.name)
      this.callApi(directory.name)
    })
  }

  onFormulaireSubmit(){
    this.callApi(this.newTitleForm.get('title')?.value as string)
  }

  private callApi(title: string){
    if(title && title.length > 3){
      this._bookApiService.requestInfoWithTitle(title).subscribe(response => {
        this.apiResponse = response
      })
    }
  }


}
