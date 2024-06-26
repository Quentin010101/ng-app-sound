import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VolumeInfo } from '../../../../interface/bookApi/volumeInfo.interface';
import { Author } from '../../../../interface/core/author.interface';
import { TextComponent } from '../../../../shared/input/text/text.component';
import { BookManagementService } from '../../../../service/api/book-management.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-management',
  standalone: true,
  imports: [ReactiveFormsModule,TextComponent],
  templateUrl: './book-management.component.html',
  styleUrl: './book-management.component.scss'
})
export class BookManagementComponent {
  private _bookManagementService = inject(BookManagementService)
  private router = inject(Router)
  private activeRoute = inject(ActivatedRoute)
  
  constructor(){
    if(!this._bookManagementService.serviceInit) {
      this.redirectToRoot()
    }else{
    this._bookManagementService.state.next(4)
    }
  }

  newBookForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    description: new FormControl('', [ Validators.minLength(5), Validators.maxLength(500)]),
    image: new FormGroup({
      imagePath: new FormControl(''),
      imageThumbnailPath: new FormControl('')
    }),
    authors: new FormArray([
      new FormGroup({
        name: new FormControl('', [Validators.minLength(3), Validators.maxLength(50)]),
        surname: new FormControl('', [Validators.minLength(3), Validators.maxLength(50)]),
      })
    ]),
    categories: new FormArray([]),
    chapters: new FormArray([]) 
  })

  private fillFormulaire(volumeInfo: VolumeInfo){
    this.newBookForm.get('title')?.setValue(volumeInfo.title)
    this.newBookForm.get('description')?.setValue(volumeInfo.description)
    this.newBookForm.get('image')?.get('imagePath')?.setValue(volumeInfo.imageLinks.thumbnail)
    this.newBookForm.get('image')?.get('imageThumbnailPath')?.setValue(volumeInfo.imageLinks.smallThumbnail)
    this.newBookForm.get('authors')?.setValue(this.transformStringIntoNameSurname(volumeInfo.authors))
  }



  private transformStringIntoNameSurname(strings: string[]): Author[]{
    let authors: Author[] = []

    for(let i = 0; i < strings.length; i++){
      let author = new Author()
      let split = strings[i].split(' ')
      if(split.length = 1){
        author.name = strings[i]
      }else if(split.length > 1){
        author.name = split.shift() as string
        author.surname = split.join(' ')
      }
    }

    return authors
  }

  private redirectToRoot(){
    this.router.navigate(['drop'] , {relativeTo: this.activeRoute.parent})
  }
}
