import { Component } from '@angular/core';

@Component({
  selector: 'app-drop',
  standalone: true,
  imports: [],
  templateUrl: './drop.component.html',
  styleUrl: './drop.component.scss'
})
export class DropComponent {
  
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation()
    if(event.dataTransfer && event.dataTransfer.files){
      this.handleDrop(event.dataTransfer?.files)
    }
  }

  onChange(e: Event){
    let target = e.target as HTMLInputElement
    if(target.files){
      this.handleDrop(target.files)
    }
  }

  private handleDrop(list: FileList){
    for(let file of list){
      
    }
  }
}
