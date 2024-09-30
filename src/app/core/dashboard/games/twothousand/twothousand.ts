import { Direction } from '../enum';

let size = 4;
let stateValueArray: Square[] = [];

export function initGrid() {
  let grid = document.getElementById('grid');
  if (!grid) throw new Error('Element #grid missing.');
  grid.innerHTML = '';
  for (let i = 0; i < Math.pow(size, 2); i++) {
    stateValueArray.push(new Square());
    let element = document.createElement('DIV');
    element.classList.add('_square');
    grid.appendChild(element);
  }
}

function addValue() {
  let tempArr = stateValueArray.filter((f) => f.number === 0);
  let count = tempArr.length;
  let randomIndex = Math.floor(Math.random() * count);

  let valueToAdd = 2;
  if(Math.random()*9 < 1) valueToAdd = 4
  let countindex = 0
  stateValueArray.forEach((element, index) => {
    if(element.number === 0){
      let s = new Square()
      s.number = valueToAdd
      s.new = true
      if(countindex == randomIndex) stateValueArray[index] = s;
      countindex++
    }
  });

  if (stateValueArray.length != Math.pow(size, 2))
    throw new Error('Error when adding value, state array wrong length.');
}
export function reset(){
  stateValueArray = []
}
export function start(){
  addValue()
  draw()
}
export function action(direction: Direction){
  beforeMove()
  if(checkIfMovePossible(direction, stateValueArray)){
    move(direction)
    addValue()
    draw()
  }else{
    console.log("Move cant be executed.")
  }

}

function draw(){
  let grid = document.getElementById('grid');
  if(grid && grid instanceof HTMLDivElement){
    Array.from(grid.children).forEach((element, index) => {
      element.innerHTML = ''
      element.className = ''
      element.classList.add('_square')
      if(stateValueArray[index].number != 0 && element instanceof HTMLDivElement){
        let square = stateValueArray[index]
        element.innerHTML = square.number.toString()
        if(square.new) element.classList.add('appearance')
        color(element, square.number)
      }
    });
  }else{
    throw new Error("Grid is null or not a div.")
  }
    
}

function color(div: HTMLDivElement, number: number){
  div.classList.add('square_color_' + number)

}

function beforeMove(){
  stateValueArray.forEach(square => {
    square.new = false
  })
}

function move(direction: Direction) {
  let stateValueArrayAfterMove: Square[] = [];
  if (direction === Direction.RIGHT || direction === Direction.LEFT) {
    for (let i = 0; i < size; i++) {
      let temp = getLine(i,stateValueArray);
      if(direction === Direction.LEFT){
        temp = reverseArray(temp)
      }
      let e = handleSwitch(temp)
      if(direction === Direction.LEFT){
        e = reverseArray(e)
      }
      stateValueArrayAfterMove = stateValueArrayAfterMove.concat(e)
    }
  } else {
    for (let i = 0; i < size; i++) {
      let temp = getColumn(i,stateValueArray);
      if(direction === Direction.UP){
        temp = reverseArray(temp)
      }
      let e = handleSwitch(temp)
      if(direction === Direction.UP){
        e = reverseArray(e)
      }
      stateValueArrayAfterMove = setColumn(i,stateValueArrayAfterMove,e)
    }
  }

  stateValueArray = stateValueArrayAfterMove
  if (stateValueArrayAfterMove.length != Math.pow(size, 2))
    throw new Error(
      'Error when adding value,new state array after move wrong length.'
    );
}

function checkIfMovePossible(direction: Direction, arrTot:Square[]): boolean{
  if (direction === Direction.RIGHT || direction === Direction.LEFT) {
    for (let i = 0; i < size; i++) {
      let temp = getLine(i,arrTot);
      if(direction === Direction.LEFT){
        temp = reverseArray(temp)
      }
      if(checkValidityForMove(temp)) return true
    }
  } else {
    for (let i = 0; i < size; i++) {
      let temp = getColumn(i,arrTot);
      if(direction === Direction.UP){
        temp = reverseArray(temp)
      }
      if(checkValidityForMove(temp)) return true
    }
  }
  return false
}

function checkValidityForMove(arr:Square[]): boolean{
  let index = arr.findIndex((element) => element.number!=0)

  if(index === -1){
    // all array full of 0
    return false
  }else{
    for(let i = index; i < arr.length; i++){
      if(arr[i + 1 ] != null){
        if(arr[i + 1].number == 0){
          // Value follow by a 0 => return true
          return true
        }else{
          if(arr[i].number === arr[i + 1].number){
            return true
          }
        }
      }
      
    }
  }
  return false
}

function reverseArray(arr: Square[]){
  let tempArr: Square[] = []
  arr.forEach((v) => {
    tempArr.unshift(v)
  })
  return tempArr
}

function getLine(index: number, arr:Square[]) {
  return arr.slice(index * size, index * size + size);
}


function getColumn(index: number, arr:Square[]) {
  let temp = [];
  for (let i = 0; i < size; i++) {
    temp.push(arr[index + i * size]);
  }
  return temp;
}
function setColumn(index: number, arrayReturn:Square[], temp2: Square[]): Square[] {
  for (let i = 0; i < size; i++) {
    arrayReturn[index + i * size] = temp2[i];
  }
  return arrayReturn;
}

function handleSwitch(arr: Square[]) : Square[]{

  let arrTemp: Square[] = []
  while(arr.length > 0 && arrTemp.length < size){
    if(arr[arr.length - 2] && arr[arr.length - 2].number == 0){
      arr.splice(arr.length - 2, 1)
    }else if(arr[arr.length - 1].number == 0){
      arr.pop()
    }else if(arr[arr.length - 2] && arr[arr.length - 2].number == arr[arr.length - 1].number){
      let value = arr.pop()
      arr.pop()

      if(value){
        let s = new Square()
        s.number = value.number*2
        arrTemp.unshift(s)
      }else{
        throw new Error("Erreur lors du pop.")
      }
    }else{
      arrTemp.unshift(arr[arr.length - 1])
      arr.pop()
    }
  }
  
  let length = arrTemp.length
  for(let i = 0; i < Math.abs(length - size); i++){
    arrTemp.unshift(new Square())
  }
  return arrTemp
}

class Square{
  number: number = 0
  new: boolean = false
}



