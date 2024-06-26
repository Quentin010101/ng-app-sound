import { DirectoryContainer, FileContainer } from "../../interface/bookApi/bookContainer.interface";



export function handleDataTransferList(list: DataTransferItemList): Promise<DirectoryContainer | null>{

let directory: DirectoryContainer | null = null

function scanItems(item: FileSystemEntry, dir: DirectoryContainer | null) : Promise<boolean>{
  return new Promise(function(resolve) {
    if (item.isFile) {
        handleFile(item as FileSystemFileEntry, dir)
        resolve(true);
    } else if (item.isDirectory) {

      let directoryReader = (item as FileSystemDirectoryEntry).createReader();
      let thisDir = new DirectoryContainer(item.name, item.fullPath)
      if(dir){
        dir.directories.push(thisDir) 
      }else{
        directory = thisDir
      }
      directoryReader.readEntries(function(entries) {
        return Promise.all(entries.map(entry => scanItems(entry, thisDir))).then(bool => {
            resolve(true)
        });
      })
    }
  })
}
 return Promise.all(Array.from(list, item => scanItems(item.webkitGetAsEntry() as FileSystemEntry, null))).then(function() {
        return directory
      })

}

function handleFile(entry: FileSystemFileEntry, dir: DirectoryContainer | null){
  let extension = entry.name.split('.').pop()
  let file: File | null = null

  let thisFile = new FileContainer(entry.name, entry.fullPath, extension,file)
  if(dir){
    dir.files.push(thisFile)
  }
  
}