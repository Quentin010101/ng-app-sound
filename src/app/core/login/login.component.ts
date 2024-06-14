import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button'; 
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatIconModule,MatDividerModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginFormulaire!: FormGroup

  constructor(){
    this.loginFormulaire = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })

    console.log(this.loginFormulaire.invalid)
  }

  public onFormSubmit(){
    console.log("submit")
  }
}
