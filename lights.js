 //Game class
 function Grid(row,col) {
    const container = document.querySelector('.container');
    this.childDiv = document.createElement('div');
    this.childDiv.className = 'child';
    this.childDiv.id = `${row}${col}`
    this.childDiv.style.backgroundColor = "rgb(153, 177, 221)";

    this.litUp = false;

    this.childDiv.addEventListener("click",()=>{
        if (this.litUp === true){
            switches(row,col);
            gameWon(divArray);
        }
    })

    this.childDiv.addEventListener("mousemove",()=>{
        if (this.litUp === true){
            this.childDiv.style.cursor = "grab";
        }
    })

    container.appendChild(this.childDiv);
}

//Creates 2D array
function arrayHelper(col,arr=[],counter=0){
    for (let i = 0; i < col; i++){
        arr.push([])
        for (let j = 0; j < col; j++){
            arr[i].push(counter)
            counter++;  
        }
    }
    return arr;
}


//Applys class properties to each element in the 2D array
function divMaker(count){
    const container = document.querySelector('.container');

    container.style.width = `${count * 50}px`;
    container.style.height = `${count * 50}px`;
    container.style.gridTemplateColumns =  `repeat(${count}, 1fr)`;
    container.style.gridTemplateRows =  `repeat(${count}, 1fr`;

    container.innerHTML = '';

    return arrayHelper(count).map((row,rowNum)=>{
        return row.map((col,colNum)=>{
            return new Grid(rowNum,colNum);
        })
    })
}

//Sets up the game board
const count = parseInt(prompt("Size of your board, (Minimum is 2)"));
const divArray = divMaker(count);
const startCol = Math.floor(Math.random() * count);
const startRow = Math.floor(Math.random() * count);
divArray[startCol][startRow].litUp = true
divArray[startCol][startRow].childDiv.style.backgroundColor = "green"


function helperOne(arr,row,col){
    if(!arr[row][col].litUp){
        arr[row][col].childDiv.style.backgroundColor = "green"
        arr[row][col].litUp = true;
    }
    else{
        arr[row][col].childDiv.style.backgroundColor = "rgb(153, 177, 221)"
        arr[row][col].litUp = false;
    }
}

//Game Logic
function switches(row,col){
    divArray[row][col].childDiv.style.backgroundColor = "rgb(153, 177, 221)";
    divArray[row][col].litUp = false;
    if (document.getElementById(`${row+1}${col}`)){
        helperOne(divArray,row+1,col);
    }
    if (document.getElementById(`${row-1}${col}`)){
        helperOne(divArray,row-1,col);
    }
    if (document.getElementById(`${row}${col-1}`)){
        helperOne(divArray,row,col-1);
    }
    if (document.getElementById(`${row}${col+1}`)){
        helperOne(divArray,row,col+1);
    }  
}

//checks to see if game is won
function gameWon(arr){

    for (let i = 0; i < arr.length; i++){
        for (let j = 0; j < arr[i].length; j++){
            if(arr[i][j].litUp){
                return
            }
        }
    }
        alert("You've won!")
        location.reload();
}