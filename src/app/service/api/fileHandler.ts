import { DirectoryContainer, FileContainer, FileListContainer } from "../../interface/bookApi/bookContainer.interface";



export async function handleDataTransferList(list: DataTransferItemList): Promise<DirectoryContainer | null>{

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
 await Promise.all(Array.from(list, item_2 => scanItems(item_2.webkitGetAsEntry() as FileSystemEntry, null)));
  return directory;

}

async function handleFile(entry: FileSystemFileEntry, dir: DirectoryContainer | null){
  let extension = entry.name.split('.').pop()
  let file: File | null = null
  file = await getFile(entry)
  let thisFile = new FileContainer(entry.name, entry.fullPath, extension,file)
  if(dir){
    dir.files.push(thisFile)
  }
}

async function getFile(fileEntry: FileSystemFileEntry) : Promise<File>{
  return new Promise((resolve, reject) => fileEntry.file(resolve, reject));
}

export function generateList(dir: DirectoryContainer): FileListContainer{
  console.log(dir)
  let container: FileListContainer = new FileListContainer()
  getDirectoryFiles(dir, container)
  return container
}

function getDirectoryFiles(dir: DirectoryContainer, container: FileListContainer){
  console.log(dir.name)
  console.log(dir)
  addFileToList(dir.files, container)
  if(dir.directories.length > 0){
    dir.directories.forEach((d) => {
      getDirectoryFiles(d, container)
    })
  }
}

function addFileToList(files: FileContainer[], container: FileListContainer){
  console.log(files)
  files.forEach((f)=>{
    if(f.extension == 'png'){
        container.files.push(f)
        container.size += f.file? f.file?.size : 0

    }
  })
}