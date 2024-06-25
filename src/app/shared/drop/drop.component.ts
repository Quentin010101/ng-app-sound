import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-drop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drop.component.html',
  styleUrl: './drop.component.scss'
})
export class DropComponent {
  extensionAllowed: string[] = ['png', 'jpg']
  nbDirMax: number = 5
  
  onDrop(event: DragEvent) {
    this.reset()
    if(event.dataTransfer && event.dataTransfer.items){
      this.handleDataTransferList(event.dataTransfer.items)
    }else{
      console.log("no file or directory dropped")
    }
  }

  onChange(e: Event){
    let target = e.target as HTMLInputElement
    if(target.files){
    }
  }


  directory: DirectoryContainer | null = null
  securityCount: number = 0

  private handleDataTransferList(list: DataTransferItemList){
    if(list && list.length > 0){
      for(let i = 0; i < list.length; i++){
        let entry = list[i].webkitGetAsEntry()
        if(entry)  this.handleDataTransferItem(entry, null).then(r =>console.log("then"))
      }
    }else{
      console.log("no data")
    }
  }
  private reset(){
    this.directory = null
    this.securityCount = 0
  }

  private async handleDataTransferItem(item: FileSystemEntry, dir: DirectoryContainer | null){
    if(item){
      if(item.isDirectory){
        await this.handleDirectory(item as FileSystemDirectoryEntry, dir)
      }else if(item.isFile){
        await this.handleFile(item as FileSystemFileEntry, dir)
      }
    }
  }

  private async handleFile(entry: FileSystemFileEntry, dir: DirectoryContainer | null){
    return new Promise((resolve) => { 
    let extension = entry.name.split('.').pop()
    let file: File | null = null
    // if(extension && this.extensionAllowed.includes(extension)){
    //   file = await  this.getFile(entry)
    // }
    let thisFile = new FileContainer(entry.name, entry.fullPath, extension,file)
    if(dir){
      dir.files.push(thisFile)
    }
    console.log(this.directory)
    resolve(true)
    })
  }

  private async getFile(entry: FileSystemFileEntry){
    try {
      return new Promise<File>((resolve, reject) => entry.file(resolve, reject));
    } catch (err) {
      console.log(err);
      return null
    }
  }

  private handleDirectory(entry: FileSystemDirectoryEntry, dir: DirectoryContainer | null){
    return new Promise((resolve) => { 
      if(!this.checkNumberOfDirValid()) throw new Error("trop de dir")
      let thisDir = new DirectoryContainer(entry.name, entry.fullPath)
      if(dir){
        dir.directory = thisDir
      }else{
        this.directory = thisDir
      }
  
      let directoryReader = entry.createReader();
      directoryReader.readEntries((entries) =>{
        entries.forEach((entry) => {
          this.handleDataTransferItem(entry, thisDir)
        })
      })
      resolve(true)
    })
  }

  private checkNumberOfDirValid(): boolean{
    this.securityCount ++
    return this.securityCount < this.nbDirMax
  }

}

export class DirectoryContainer{
  constructor(name:string, path:string){
    this.name = name
    this.path = path
  }

  name!: string
  path!: string
  directory!: DirectoryContainer
  files: FileContainer[] = []
}

export class FileContainer{
  constructor(name:string, path:string, extension:string | undefined, file: File | null){
    this.name = name
    this.path = path
    this.extension = extension
    this.file = file
  }

  path: string;
  name: string;
  extension: string | undefined
  file: File | null
  
}
