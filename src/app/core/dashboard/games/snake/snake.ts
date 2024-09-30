import { BehaviorSubject, Subject } from 'rxjs';
import { Direction } from '../enum';
let arr: Coord[] = []
let size: number | null = null
let speedTemp: number | null = null
let speedIncrementation: number | null = null
let grid: HTMLDivElement | null = null
let direction: Direction = Direction.DOWN
let lastDirection: Direction = Direction.DOWN
let chrono: number = 0
let req: number = 0
let allCoord: Coord[] = []
let appleActive: boolean = false
let appleCoord: null | Coord = null
export let $loose = new BehaviorSubject<boolean>(false)
let stop: boolean = false
let previousLastCoord: Coord | null = null 

export function setVariable(grid: number, speed: number, incrementation: number ){
  size = grid 
  speedTemp = speed
  speedIncrementation = incrementation/10
}

export function reset(){
  stopAnimation()
  arr = []
  color()
  direction = Direction.DOWN
  req = 0
  chrono = 0
  clearApple()
  $loose.next(false)
  stop = false
  speedTemp = null
}

export default function initGrid(g: HTMLDivElement){
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

export function setPause(){
  stop = true
}

export function restart(){
  if(stop)
  stop = false
}

function initSnake(){
  if(size){
    previousLastCoord = new Coord(Math.floor(size/2), Math.floor(size/2))
    arr.push(new Coord(Math.floor(size/2), Math.floor(size/2) - 2))
    arr.push(new Coord(Math.floor(size/2), Math.floor(size/2) - 1))
    arr.push(new Coord(Math.floor(size/2), Math.floor(size/2)))
    color()
  }else{
    throw new Error("Cant init snake, size not initialized.")
  }
}



function clearApple(){
  Array.from((grid as HTMLDivElement).children).forEach(element => {
    if(element instanceof HTMLDivElement){
        element.classList.remove('apple')
      }
    })
    appleActive = false
    appleCoord = null
}

function addAppleToGrid(){

  initAllCoord()
  let tempAllCoord: Coord[] = []
  console.log(allCoord)
  allCoord.forEach((item)=>{
    let tempBool = true
    for(let i = 0; i < arr.length; i++){
      if(item.x === arr[i].x && item.y === arr[i].y){
        tempBool = false
      }
    }
    tempBool ? tempAllCoord.push(item) : ''
  })
  let choosen = Math.floor(tempAllCoord.length * Math.random())
  appleCoord = tempAllCoord[choosen]
  console.log(appleCoord)
  Array.from((grid as HTMLDivElement).children).forEach(element => {
    if(element instanceof HTMLDivElement){
      if(element.dataset['x'] && parseInt(element.dataset['x']) === appleCoord?.x &&
        element.dataset['y'] && parseInt(element.dataset['y']) === appleCoord?.y ){
          element.classList.add('apple')
      }
    }
  })
  appleActive = true
}

function initAllCoord(){
  allCoord = []
  if(size){
    for(let i = 0; i < size; i++){
      for(let j = 0; j < size; j++){
        allCoord.push(new Coord(j,i))
      }
    }
  }else{
    throw new Error("Size not init")
  }
}

export function setDirection(dir: Direction){
  if((lastDirection == Direction.DOWN && dir == Direction.UP) ||
  (lastDirection == Direction.UP && dir == Direction.DOWN) ||
  (lastDirection == Direction.RIGHT && dir == Direction.LEFT) ||
  (lastDirection == Direction.LEFT && dir == Direction.RIGHT) 
  ){

  }else{
    direction = dir
  }
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
  if(speedTemp && chrono > (1/speedTemp) * 100){
    update(direction)
    previousLastCoord = arr[2]
    chrono = 0
  }
  req = window.requestAnimationFrame(animate)
}

function move(direction: Direction){
  if(size){
    let tempArr = [...arr]
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
    let newLastItem = arr[arr.length - 1]
    if(!checkNewCoord(newLastItem, tempArr)){
      // nouveau carré non valide, le serpent se mort lui même
      $loose.next(true)
      arr.pop()
    }
    else if(!(appleCoord && appleCoord.x === newLastItem.x && appleCoord.y === newLastItem.y)){
      arr.shift()
    }else{
      clearApple()
      accelerate()
      previousLastCoord = arr[1]
    }

    lastDirection = direction
  }
}

function checkNewCoord(lastitem: Coord, a: Coord[]): boolean{
  for(let i = 0; i < a.length; i++){
    if(a[i].x == lastitem.x && a[i].y == lastitem.y){
      return false
    }
  }
  return true
}

function accelerate(){
  if(speedTemp && speedIncrementation){
    speedTemp = speedTemp + speedIncrementation
  }else{
    throw new Error("Cant accelerate, cos variable speed and incrementation null.")
  }
}

function update(direction: Direction){
  if(!$loose.getValue() && !stop){
    move(direction)
    if(!appleActive) addAppleToGrid()
    color()
  }
}

function color(){
  let previousYeux = document.getElementById('yeux')
  previousYeux?.remove()

  if(grid != null){
    Array.from((grid as HTMLDivElement).children).forEach(element => {
      if(element instanceof HTMLDivElement){
        element.classList.remove('snackActive')
        element.classList.remove('snackActiveHeadTail')
        element.classList.remove('snackActiveHead')
        element.classList.remove('up')
        element.classList.remove('down')
        element.classList.remove('right')
        element.classList.remove('left')
        element.classList.remove('snackTop')
        element.classList.remove('snackBottom')
        element.classList.remove('snackLeft')
        element.classList.remove('snackRight')
      }
    });
    arr.forEach((coord, index) => {
      Array.from((grid as HTMLDivElement).children).forEach(element => {
        if(element instanceof HTMLDivElement){
          if(element.dataset['x'] && parseInt(element.dataset['x']) === coord.x &&
            element.dataset['y'] && parseInt(element.dataset['y']) === coord.y ){

              if(index === arr.length - 1){
                element.classList.add('snackActiveHeadTail')
                element.classList.add('snackActiveHead')
                if(direction === Direction.UP) element.classList.add('up')
                if(direction === Direction.DOWN) element.classList.add('down')
                if(direction === Direction.RIGHT) element.classList.add('right')
                if(direction === Direction.LEFT) element.classList.add('left')

                let yeux = document.createElement('DIV')
                yeux.setAttribute('id', 'yeux')
                element.appendChild(yeux)
              }else if(index === 0){
                element.classList.add('snackActiveHeadTail')
                if(previousLastCoord){
                  if(previousLastCoord.x == arr[index].x){
                    if(previousLastCoord.y > arr[index].y){
                      if( Math.abs(previousLastCoord.y - arr[index].y) < 3){
                        element.classList.add('up')
                      }else{
                        element.classList.add('down')
                      }
                    }else{
                      if( Math.abs(previousLastCoord.y - arr[index].y) < 3){
                        element.classList.add('down')
                      }else{
                        element.classList.add('up')
                      }
                    }
                  }else{
                    if(previousLastCoord.x > arr[index].x){
                      if( Math.abs(previousLastCoord.x - arr[index].x) < 3){
                        element.classList.add('left')
                      }else{
                        element.classList.add('right')
                      }
                    }else{
                      if( Math.abs(previousLastCoord.x - arr[index].x) < 3){
                        element.classList.add('right')
                      }else{
                        element.classList.add('left')
                      }
                    }
                  }
                }
              }else{
                let previousValue = arr[index - 1]
                let nextValue = arr[index + 1]
                let s = new Square()
                if(coord.x == previousValue.x){
                  if(coord.y > previousValue.y){
                    s.top = true
                  }else{
                    s.bottom = true
                  }
                }else{
                  if(coord.x > previousValue.x){
                    s.left = true
                  }else{
                    s.right = true
                  }
                }
                if(coord.x == nextValue.x){
                  if(coord.y > nextValue.y){
                    s.top = true
                  }else{
                    s.bottom = true
                  }
                }else{
                  if(coord.x > nextValue.x){
                    s.left = true
                  }else{
                    s.right = true
                  }
                }


                element.classList.add('snackActive')
                if(s.top) element.classList.add('snackTop')
                if(s.bottom) element.classList.add('snackBottom')
                if(s.left) element.classList.add('snackLeft')
                if(s.right) element.classList.add('snackRight')

              }
              



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

class Square{
  top: boolean = false
  bottom: boolean = false
  left: boolean = false
  right: boolean = false
}
