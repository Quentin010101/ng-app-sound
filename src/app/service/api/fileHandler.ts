import { DirectoryContainer, FileContainer, FileListContainer } from "../../interface/bookApi/bookContainer.interface";



export async function handleDataTransferList(list: DataTransferItemList): Promise<DirectoryContainer | null> {

  let directory: DirectoryContainer | null = null

  function scanItems(item: FileSystemEntry, dir: DirectoryContainer | null): Promise<boolean> {
    return new Promise(function (resolve) {
      if (item.isFile) {
        handleFile(item as FileSystemFileEntry, dir).then(d => resolve(true))
      } else if (item.isDirectory) {

        let directoryReader = (item as FileSystemDirectoryEntry).createReader();
        let thisDir = new DirectoryContainer(item.name, item.fullPath)
        if (dir) {
          dir.directories.push(thisDir)
        } else {
          directory = thisDir
        }
        directoryReader.readEntries(function (entries) {
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

function handleFile(entry: FileSystemFileEntry, dir: DirectoryContainer | null): Promise<boolean> {
  return new Promise((resolve, reject) =>{
    let extension = entry.name.split('.').pop()
    getFile(entry).then(f => {
      let thisFile = new FileContainer(entry.name, entry.fullPath, extension, f)
      if (dir) {
        dir.files.push(thisFile)
      }
      resolve(true)
    })
  })
}

async function getFile(fileEntry: FileSystemFileEntry): Promise<File> {
  return new Promise((resolve, reject) => fileEntry.file(resolve, reject));
}

export function generateList(dir: DirectoryContainer, extension: string[]): FileListContainer {
  let container: FileListContainer = new FileListContainer()
  getDirectoryFiles(dir, container, extension)
  return container
}

function getDirectoryFiles(dir: DirectoryContainer, container: FileListContainer, extension: string[]) {
  if (dir.files.length > 0) {
    addFileToList(dir.files, container, extension)
  }
  if (dir.directories.length > 0) {
    dir.directories.forEach((d) => {
      getDirectoryFiles(d, container, extension)
    })
  }
}

function addFileToList(files: FileContainer[], container: FileListContainer, extension: string[]) {
  files.forEach((f) => {
    if (isExtensionValid(f,extension)) {
      container.files.push(f)
      container.size += f.file ? f.file?.size : 0

    }
  })
}

function isExtensionValid(file: FileContainer, extension: string[]): boolean{
  let extensionToLowercase = extension.map(x => x.toLowerCase())
  if(file.extension && !(extensionToLowercase.indexOf(file.extension.toLowerCase()) == -1)){
    return true
  }
  return false
}