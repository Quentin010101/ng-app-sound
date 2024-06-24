import { Component, inject } from '@angular/core';
import { BookService } from '../../../service/core/book.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropComponent } from '../../../shared/drop/drop.component';

@Component({
  selector: 'app-librairy-management',
  standalone: true,
  imports: [ReactiveFormsModule, DropComponent],
  templateUrl: './librairy-management.component.html',
  styleUrl: './librairy-management.component.scss'
})
export class LibrairyManagementComponent {
  private _bookService = inject(BookService)

  public bookForm = new FormGroup({
    title: new FormControl('', [Validators.required])
  })
}
