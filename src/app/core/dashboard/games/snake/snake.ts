import { Direction } from './enum';
let arr: Coord[] = []
let size: number | null = null
let grid: HTMLDivElement | null = null
let direction: Direction = Direction.DOWN
let chrono: number = 0
let seuil: number = 100
let req: number = 0
let allCoord: Coord[] = []

export function reset(){
  arr = []
  color()
  direction = Direction.DOWN
  req = 0
  chrono = 0
  seuil = 100
}

export default function initGrid(s: number, g: HTMLDivElement){
  size = s
  grid = g
  if(size && grid && size > 6){

    grid.innerHTML = ''
    grid.style.display = 'grid'
    grid.style.gridTemplateColumns = `repeat(${size},1fr)`
    for(let i = 0; i < size; i++){
  
      for(let j = 0; j < size; j++){
  
        let newElement = document.createElement('Div')
        newElement.classList.add('square')
        newElement.dataset['x'] = j.toString()
        newElement.dataset['y'] = i.toString()
  
        grid.appendChild(newElement)
      }
  
    }
  }else{
    throw new Error("bad initialization.")
  }
}

function initSnake(){
  if(size){
    arr.push(new Coord(Math.floor(size/2), Math.floor(size/2) - 2))
    arr.push(new Coord(Math.floor(size/2), Math.floor(size/2) - 1))
    arr.push(new Coord(Math.floor(size/2), Math.floor(size/2)))
    color()
  }else{
    throw new Error("Cant init snake, size not initialized.")
  }
}

function eatApple(){

}

function addAppleToGrid(){
  if(allCoord.length == 0){
    initAllCoord()
  }
  let tempAllCoord = 
  arr.forEach(arrElement=> {

  })

}

function initAllCoord(){
  if(size){
    for(let i = 0; i < size; i++){
      for(let j = 0; j < size; j++){
        allCoord.push(new Coord(j,i))
      }
    }
  }
}

export function setDirection(dir: Direction){
  direction = dir
}


export function stopAnimation(){
  window.cancelAnimationFrame(req)
}

export function startAnimation(){
  initSnake()
  animate()
}

function animate(){
  chrono++
  if(chrono > seuil){
    update(direction)
    chrono = 0
  }
  req = window.requestAnimationFrame(animate)
}

function move(direction: Direction){
  console.log("-------")
  arr.forEach(e => console.log(e.tostring()))
  if(size){
    let lastItem = arr[arr.length - 1]
    if(direction == Direction.DOWN){
      if(lastItem.y + 1 >= size){
        arr.push(new Coord(lastItem.x, 0))
      }else{
        arr.push(new Coord(lastItem.x, lastItem.y + 1))
      }
    }
    if(direction == Direction.UP){
      if(lastItem.y - 1 < 0){
        arr.push(new Coord(lastItem.x, size - 1))
      }else{
        arr.push(new Coord(lastItem.x, lastItem.y - 1))
      }
    }
    if(direction == Direction.RIGHT){
      if(lastItem.x + 1 >= size){
        arr.push(new Coord(0, lastItem.y))
      }else{
        arr.push(new Coord(lastItem.x + 1, lastItem.y))
      }
    }
    if(direction == Direction.LEFT){
      if(lastItem.x - 1 < 0){
        arr.push(new Coord(size - 1, lastItem.y))
      }else{
        arr.push(new Coord(lastItem.x - 1, lastItem.y))
      }
    }
    arr.shift()
    
    arr.forEach(e => console.log(e.tostring()))
    console.log("-------")
  }
}

function update(direction: Direction){
  move(direction)
  color()
}

function color(){
  if(grid != null){
    Array.from((grid as HTMLDivElement).children).forEach(element => {
      if(element instanceof HTMLDivElement){
        element.classList.remove('snackActive')
      }
    });
    arr.forEach(coord => {
      console.log("yea")
      Array.from((grid as HTMLDivElement).children).forEach(element => {
        if(element instanceof HTMLDivElement){
          if(element.dataset['x'] && parseInt(element.dataset['x']) === coord.x &&
            element.dataset['y'] && parseInt(element.dataset['y']) === coord.y ){
              element.classList.add('snackActive')
          }
        }
      })
    })
  }
}

export class Coord{
  constructor(x: number, y: number){
    this.x = x
    this.y = y
  }
  x!: number
  y!: number

  tostring(){
    return `x: ${this.x} y: ${this.y}`
  }
}
