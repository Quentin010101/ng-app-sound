import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { TextComponent } from '../../shared/input/text/text.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextComponent ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginFormulaire = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(){
    this.loginFormulaire.controls['username'].valueChanges.subscribe(data => {
      console.log("data")
    })
  }

  public onFormSubmit(){
    console.log("submit")
  }
}
