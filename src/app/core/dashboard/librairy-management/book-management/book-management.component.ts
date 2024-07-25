import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VolumeInfo } from '../../../../interface/bookApi/volumeInfo.interface';
import { Author } from '../../../../interface/core/author.interface';
import { TextComponent } from '../../../../shared/input/text/text.component';
import { BookManagementService } from '../../../../service/api/book-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TextareaComponent } from '../../../../shared/input/textarea/textarea.component';
import { Category } from '../../../../interface/core/category.interface';
import { ChipComponent } from '../../../../shared/chip/chip.component';
import { CardComponent } from '../../../../shared/card/card.component';
import { FileContainer, FileListContainer } from '../../../../interface/bookApi/bookContainer.interface';
import { MessageService } from '../../../../service/utils/message.service';
import { Message } from '../../../../interface/utils/message.interface';

@Component({
  selector: 'app-book-management',
  standalone: true,
  imports: [ReactiveFormsModule,TextComponent, TextareaComponent, ChipComponent, CardComponent],
  templateUrl: './book-management.component.html',
  styleUrl: './book-management.component.scss'
})
export class BookManagementComponent {
  private _bookManagementService = inject(BookManagementService)
  private router = inject(Router)
  private activeRoute = inject(ActivatedRoute)
  private _messageService = inject(MessageService)

  filesList: FileListContainer| null = null
  
  constructor(){
    console.log("construct")
    if(!this._bookManagementService.serviceInit) {
      this.redirectToRoot()
    }else{
    this._bookManagementService.state.next(4)
    this._bookManagementService.newFileListSubject.subscribe(filesList => {
      console.log(filesList)
      this.filesList = filesList
    })
    }
  }

  ngOnInit(){
    this._bookManagementService.newVolumeSubject.subscribe(volume => {
      if(volume){
        if(this.filesList){
          this.fillFormulaire(volume)
        }else{
          let message = new Message("Erreur: File not found.")
          message.error = true
          this._messageService.$messageSubject.next(message)
          this.redirectToRoot()
        }
      }
    })
  }

  newBookForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    description: new FormControl('', [ Validators.minLength(5), Validators.maxLength(500)]),
    image: new FormGroup({
      imagePath: new FormControl(''),
      imageThumbnailPath: new FormControl('')
    }),
    authors: new FormArray([]),
    categories: new FormArray([]),
    chapters: new FormArray([]) 
  })

  private fillFormulaire(volumeInfo: VolumeInfo){
    this.newBookForm.get('title')?.setValue(volumeInfo.title ? volumeInfo.title : '')
    this.newBookForm.get('description')?.setValue(volumeInfo.description ? volumeInfo.description : '')
    this.newBookForm.get('image')?.get('imagePath')?.setValue(volumeInfo.imageLinks.thumbnail ? volumeInfo.imageLinks.thumbnail : '')
    this.newBookForm.get('image')?.get('imageThumbnailPath')?.setValue(volumeInfo.imageLinks.smallThumbnail ? volumeInfo.imageLinks.smallThumbnail : '')
    this.addAuthors(volumeInfo.authors ? volumeInfo.authors : [])
    this.addCategories(volumeInfo.categories ? volumeInfo.categories : [])
    if(this.filesList) this.addChapters(this.filesList)
  }

  private addAuthor(author: Author){
    const auth = new FormGroup({
      name: new FormControl(author.name, [Validators.minLength(3), Validators.maxLength(50)]),
      surname: new FormControl(author.surname, [Validators.minLength(3), Validators.maxLength(50)]),
    })
    this.authors.push(auth)
  }

  private addCategory(category: Category){
    const auth = new FormGroup({
      name: new FormControl(category.name, [Validators.minLength(3), Validators.maxLength(50)]),
    })
    this.categories.push(auth)
  }

  private addChapter(container: FileContainer){
    const chapter = new FormGroup({
      name: new FormControl(container.name, [Validators.minLength(3), Validators.maxLength(50)])
    })
    this.chapters.push(chapter)
  }

  get authors(): FormArray{
    return this.newBookForm.get('authors') as FormArray
  }
  get categories(): FormArray{
    return this.newBookForm.get('categories') as FormArray
  }
  get chapters(): FormArray{
    return this.newBookForm.get('chapters') as FormArray
  }
  get imagePath(): FormControl{
    return this.newBookForm.get('image')?.get('imagePath') as FormControl
  }
  get imageThumbnailPath(): FormControl{
    return this.newBookForm.get('image')?.get('imageThumbnailPath') as FormControl
  }



  private addChapters(array: FileListContainer){
    for(let i = 0; i < array.files.length; i++){
      this.addChapter(array.files[i])
    }
  }

  private addAuthors(array: string[]){
    for(let i = 0; i < array.length; i++){
      if(array[i].indexOf(',') == -1){
        this.createAuthor(array[i])
      }else{
        let arraySplited = array[i].split(',')
        arraySplited.forEach(a => {
          this.createAuthor(a)
        })
      }
    }
  }

  private createAuthor(aut: string){
      let author = new Author()
      let split = aut.split(' ')
      if(split.length = 1){
        author.name = aut
      }else if(split.length > 1){
        author.name = split.shift() as string
        author.surname = split.join(' ')
      }
      this.addAuthor(author)
  }

  private addCategories(array: string[]){
    for(let i = 0; i < array.length; i++){
      let category = new Category();
      category.name = array[i]
      this.addCategory(category)
    }
  }

  private redirectToRoot(){
    this.router.navigate(['drop'] , {relativeTo: this.activeRoute.parent})
  }

  deleteAuthor(i:number){
    console.log("delete author")
    this.authors.removeAt(i)
  }
  deleteCategory(i:number){
    this.categories.removeAt(i)
  }
}
