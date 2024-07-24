export class DirectoryContainer{
    constructor(name:string, path:string){
      this.name = name
      this.path = path
    }
  
    name!: string
    path!: string
    directories: DirectoryContainer[] = []
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

  export class FileListContainer{
    files: FileContainer[] = [];
    size: number = 0
  }