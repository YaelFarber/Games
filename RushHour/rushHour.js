//stages array : array of arrays wich contain the car objects of onc's stage.
/*
Ruth_Gol
car object contains: 
id - name 
x,y: quardinats of its begining spot on the board
orientation: vertical or horizonal
type : reference to picture name in the media file 
*/

//stages array : array of arrays wich contain the car objects of onc's stage.
const levels = [
    
    [
        { id: 'target', x: 0, y: 2, length: 2, orientation: 'h', type: 'red_car' },
        { id: 'v1', x: 2, y: 0, length: 3, orientation: 'v', type: 'bus' },
        { id: 'v2', x: 4, y: 3, length: 2, orientation: 'h', type: 'blue_car' }
    ],
    
    [
    { id: 'target', x: 1, y: 2, length: 2, orientation: 'h', type: 'red_car' },
    { id: 'v1', x: 3, y: 0, length: 3, orientation: 'v', type: 'pink_limo' },
    { id: 'v2', x: 0, y: 0, length: 2, orientation: 'v', type: 'green_car' },
    { id: 'v3', x: 3, y: 4, length: 3, orientation: 'h', type: 'orange_taxi' }
    ],
    [ 
    { id: 'target', x: 0, y: 2, length: 2, orientation: 'h', type: 'red_car' },
    { id: 'v1', x: 2, y: 0, length: 3, orientation: 'v', type: 'bus' }, 
    { id: 'v2', x: 4, y: 1, length: 2, orientation: 'v', type: 'yellow_car' },
    { id: 'v3', x: 1, y: 4, length: 3, orientation: 'h', type: 'pink_limo' }
],
    [ 
        { id: 'target', x: 0, y: 2, length: 2, orientation: 'h', type: 'red_car' },
        { id: 'v1', x: 3, y: 2, length: 3, orientation: 'v', type: 'bus' },
        { id: 'v2', x: 1, y: 1, length: 2, orientation: 'h', type: 'blue_car' },
        { id: 'v3', x: 4, y: 0, length: 3, orientation: 'v', type: 'orange_taxi' }
    ],
    [ 
        { id: 'target', x: 2, y: 2, length: 2, orientation: 'h', type: 'red_car' },
        { id: 'v1', x: 0, y: 0, length: 3, orientation: 'h', type: 'orange_taxi' },
        { id: 'v2', x: 0, y: 1, length: 3, orientation: 'v', type: 'bus' },
        { id: 'v3', x: 4, y: 2, length: 3, orientation: 'v', type: 'pink_limo' }
    ],
    [ 
        { id: 'target', x: 0, y: 2, length: 2, orientation: 'h', type: 'red_car' },
        { id: 'v1', x: 2, y: 0, length: 3, orientation: 'v', type: 'bus' },
        { id: 'v2', x: 3, y: 0, length: 3, orientation: 'v', type: 'pink_limo' },
        { id: 'v3', x: 5, y: 3, length: 3, orientation: 'v', type: 'orange_taxi' }
    ],
    [ 
        { id: 'target', x: 0, y: 2, length: 2, orientation: 'h', type: 'red_car' },
        { id: 'v1', x: 2, y: 1, length: 3, orientation: 'v', type: 'bus' },
        { id: 'v2', x: 3, y: 1, length: 2, orientation: 'h', type: 'green_car' },
        { id: 'v3', x: 5, y: 0, length: 3, orientation: 'v', type: 'pink_limo' },
        { id: 'v4', x: 3, y: 4, length: 3, orientation: 'h', type: 'orange_taxi' }
    ],
    [ 
        { id: 'target', x: 1, y: 2, length: 2, orientation: 'h', type: 'red_car' },
        { id: 'v1', x: 3, y: 0, length: 3, orientation: 'v', type: 'bus' },
        { id: 'v2', x: 0, y: 3, length: 3, orientation: 'v', type: 'pink_limo' },
        { id: 'v3', x: 1, y: 4, length: 2, orientation: 'h', type: 'blue_car' },
        { id: 'v4', x: 4, y: 3, length: 2, orientation: 'h', type: 'yellow_car' }
    ],
    [ 
        { id: 'target', x: 0, y: 2, length: 2, orientation: 'h', type: 'red_car' },
        { id: 'v1', x: 2, y: 0, length: 3, orientation: 'v', type: 'bus' },
        { id: 'v2', x: 3, y: 0, length: 3, orientation: 'v', type: 'pink_limo' },
        { id: 'v3', x: 4, y: 0, length: 3, orientation: 'v', type: 'orange_taxi' },
        { id: 'v4', x: 1, y: 4, length: 2, orientation: 'h', type: 'green_car' }
    ],
    [ 
    { id: 'target', x: 0, y: 2, length: 2, orientation: 'h', type: 'red_car' },
    { id: 'v1', x: 2, y: 0, length: 3, orientation: 'v', type: 'bus' },
    { id: 'v2', x: 5, y: 0, length: 3, orientation: 'v', type: 'pink_limo' },
    { id: 'v3', x: 0, y: 4, length: 3, orientation: 'h', type: 'orange_taxi' },
    { id: 'v4', x: 4, y: 3, length: 2, orientation: 'v', type: 'blue_car' },
    { id: 'v5', x: 3, y: 5, length: 2, orientation: 'h', type: 'yellow_car' }
    ]

];

let currentLevelIndex = 0;// always stating in level :0
const CELL_SIZE = 400 / 6; // board size is 400*400 so this variable calculates the size 
                            // of a single spot in the bord divided to 6*6 spots

function initLevel(index) {
    const board = document.getElementById('game-board');
    if (!board) return;
    
    board.innerHTML = ''; // cleans the board from previous stage.
    document.getElementById('level-num').textContent = index + 1;

    levels[index].forEach(v => {
        const vehicleEl = document.createElement('div');
        vehicleEl.className = `vehicle ${v.type}`;
        vehicleEl.id = v.id;
        
        const width = v.orientation === 'h' ? v.length * CELL_SIZE : CELL_SIZE;
        const height = v.orientation === 'v' ? v.length * CELL_SIZE : CELL_SIZE;
        // assighning the car css rules on the board .
        vehicleEl.style.width = `${width - 6}px`;
        vehicleEl.style.height = `${height - 6}px`;
        vehicleEl.style.left = `${v.x * CELL_SIZE + 3}px`;
        vehicleEl.style.top = `${v.y * CELL_SIZE + 3}px`;
        vehicleEl.style.position = 'absolute';

        // bottom squares to refernce it to the phycial game
        vehicleEl.style.backgroundColor = v.type === 'red_player' ? '#ff4d4d' : '#4d94ff';
        vehicleEl.style.borderRadius = '4px';

        //which pic to load if horizonal -load regular else load with "_v"
        const imageSuffix = v.orientation === 'v' ? '_v' : '';
        // connecting the image path
        vehicleEl.style.backgroundImage = `url('./Assets/${v.type}${imageSuffix}.png')`;
        
        vehicleEl.style.backgroundSize = '100% 100%';
        vehicleEl.style.backgroundRepeat = 'no-repeat';// if th car is too big dont muliply the pic inside the div
        vehicleEl.style.backgroundPosition = 'center';

        board.appendChild(vehicleEl);// add the veiachle as a son element to the board 
    });

    setupDrag(); // for each car on the board - sticking an event listener .
}

window.onload = () => initLevel(currentLevelIndex);// command to the browser
 // wait untill all page is loadd than keep going

// Movement logic
let draggedVehicle = null;// which cars moved
let offset = 0;// distance between car edge and press spot to help keeping smooth movement


// for each car keep the occupied spots without excludeId
function getOccupiedCells(excludeId) {
    const occupied = [];
    const vehicles = levels[currentLevelIndex];
    vehicles.forEach(v => {
        if (v.id === excludeId) return;//dont wanna put the current car place occupied so it can move
        for (let i = 0; i < v.length; i++) {
            if (v.orientation === 'h') {
                occupied.push(`${v.x + i},${v.y}`);
            } else {
                occupied.push(`${v.x},${v.y + i}`);
            }
        }
    });
    return occupied;
}

// this func makes every car an interactive object that can move according to event 
function setupDrag() {
    const vehicleElements = document.querySelectorAll('.vehicle');
    vehicleElements.forEach(el => {
        el.onmousedown = (e) => {
            draggedVehicle = levels[currentLevelIndex].find(v => v.id === el.id);
            if (!draggedVehicle) return;
            
            const rect = el.getBoundingClientRect();// system func that returns the accurate position of el- current car
            /*When directly updating an object’s position based on the mouse click event, the object jumps to the cursor position, 
            which results in an unnatural dragging behavior.
            To prevent this, an offset is calculated as the distance between the click point and the object’s leading edge
             (left or top, depending on orientation) and kept constant during the drag.
            This way, the clicked point inside the object stays attached to the cursor, 
            while the object itself moves smoothly along its allowed path without sudden jumps.*/
            offset = draggedVehicle.orientation === 'h' ? e.clientX - rect.left : e.clientY - rect.top;
            // till the user is leaving the mouse keep dragging it . 
            document.onmousemove = handleMove;// as long as the mouse is moving keep miving the car.
            document.onmouseup = stopDrag;
        };
    });
}


function handleMove(e) {
    if (!draggedVehicle) return;

    const board = document.getElementById('game-board').getBoundingClientRect();// board location 
    const el = document.getElementById(draggedVehicle.id);
    const occupied = getOccupiedCells(draggedVehicle.id);//array of occupied spots.

    if (draggedVehicle.orientation === 'h') {
        let newX = Math.round((e.clientX - board.left - offset) / CELL_SIZE);
        // according to corsor position - board left limit - offset = new positoin .
        // divided by cell_size gives us the slot the car will move to.
        newX = Math.max(0, Math.min(newX, 6 - draggedVehicle.length));
        // constraining the car to move only inside the board by max left spot and 0 - right edge.
        let final= draggedVehicle.x;
        const step = newX > draggedVehicle.x ? 1: -1; // left or right 
        while (final !== newX){
            let next = final +step;
            if (isPathClear(draggedVehicle.x,draggedVehicle.y,next,draggedVehicle.y,draggedVehicle.length,'h',occupied)){
                final= next;
            }
            else{
                break;
            }
        }
        draggedVehicle.x=final;
        el.style.left = `${final * CELL_SIZE + 3}px`;
    } else {
        let newY = Math.round((e.clientY - board.top - offset) / CELL_SIZE);
        newY = Math.max(0, Math.min(newY, 6 - draggedVehicle.length));
        let final = draggedVehicle.y;
        const step = newY > draggedVehicle.y ? 1:-1;
        while(final !== newY){
            let next =final +step;
            if(isPathClear(draggedVehicle.x,draggedVehicle.y,draggedVehicle.x,next,draggedVehicle.length,'v',occupied)){
                final= next;
            }
            else{
                break;
            }
        }
        draggedVehicle.y= final;
        el.style.top = `${final * CELL_SIZE + 3}px`;
    }
}
// checks if the destination is in the occupied slots array .
function isPathClear(oldX, oldY, newX, newY, length, orientation, occupied) {
    for (let i = 0; i < length; i++) {
        const checkX = orientation === 'h' ? newX + i : newX;
        const checkY = orientation === 'v' ? newY + i : newY;
        if (occupied.includes(`${checkX},${checkY}`)) return false;// using literal beacause include gets only one value.
    }
    return true;
}

// when user lifts finger - check if we won and stop the current viachle dragging
function stopDrag() {
    checkWin();
    document.onmousemove = null;
    document.onmouseup = null;
    draggedVehicle = null;// restarting the global variable 
}
// branching func for game end 
function checkWin() {
    const target = levels[currentLevelIndex].find(v => v.id === 'red_player' || v.id === 'target');
    if (target && target.x === 4 && target.y === 2) {// the exit slot (4,2)
        updateScore();
        // finished level curentLevelIndex
        alert("out of Parking Lot! Well done.");
        if (currentLevelIndex < levels.length - 1) {
            // next level havent finished the game yet .
            currentLevelIndex++;
            initLevel(currentLevelIndex);
        } else {
            // END GAME -completed all stages
            alert("Congratulations! You completed all levels!");
            window.location.href = '../html/index.html';
        }
    }
}

// update user score
function updateScore() {
  GameStorageManager.updateCurrentUser((u) => {
    u.totalScore = (u.totalScore || 0) + 50;
    u.lastGamePlayed = "Rush Hour";
    u.lastPlayedAt = Date.now();
  });
}

// botton ewrstart func
function resetLevel() {
    initLevel(currentLevelIndex);
}
// botton ewrstart func
function resetLevel() {
    initLevel(currentLevelIndex);
}
