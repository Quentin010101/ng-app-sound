import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookApiService } from '../../../service/api/book-api.service';
import { ApiSettings } from './../../../interface/bookApi/apiSettings.interface';
import { Component, inject } from '@angular/core';
import { TextComponent } from '../../../shared/input/text/text.component';
import { CardComponent } from '../../../shared/card/card.component';
import { LoaderComponent } from '../../../shared/loader/loader.component';

@Component({
  selector: 'app-api-setting',
  standalone: true,
  imports: [ReactiveFormsModule, TextComponent, CardComponent, LoaderComponent ],
  templateUrl: './api-setting.component.html',
  styleUrl: './api-setting.component.scss'
})
export class ApiSettingComponent {
  private _bookApiService = inject(BookApiService)
  error: boolean  = false
  loading: boolean = true

  constructor(){

  }

  settingsForm = new FormGroup({
    id_google_api_key: new FormControl(),
    key: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required)
  })

  ngOnInit(){
    this._bookApiService.getApiInfo().subscribe({
      next: response => {
        console.log("test2")
        this.updateForm(response)
        this.loading = false
      },
      error: error => {
        console.log("test1")
        this.error = true
        this.loading = false
      },
    })


  }

  private updateForm(apiSettings: ApiSettings){
    this.settingsForm.patchValue(apiSettings)
  }
}
