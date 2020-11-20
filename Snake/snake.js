import { getInputDirection } from "./input.js"

export const SNAKE_SPEED = 5
const snakeBody = [
   // {x: 10, y: 11 },
    {x: 11, y: 11 },
   // {x: 12, y: 11 },
   // {x: 13, y: 11 },
   // {x: 14, y: 11 }
]

let newSegments = 0

export function update(){
    //console.log("update snake")
    addSegments()
    const inputDirection = getInputDirection()
    for(let i = snakeBody.length - 2; i >=0; i--){
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    //snakeBody[0].x += 0
    //snakeBody[0].y += 1
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y

}

export function draw(gameBoard){
   // console.log("draw snake")
   snakeBody.forEach(segment => {
       const snakeElement  = document.createElement("div")
       snakeElement.style.gridRowStart = segment.y
       snakeElement.style.gridColumnStart = segment.x
       snakeElement.classList.add("snake")
       gameBoard.appendChild(snakeElement)
   })
}

export function expandSnake(amount){
    newSegments += amount
}

export function onSnake(position){
    return snakeBody.some(segment => { //.some means "is it true for any element?"
        return equalPositions(segment, position)
    })
}

function equalPositions(position1, position2){
    return position1.x === position2.x && position1.y === position2.y
}

function addSegments() {
    for (let i = 0; i < newSegments; i++ ) {    
    snakeBody.push({...snakeBody[snakeBody.length - 1]})
    }
}