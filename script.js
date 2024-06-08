// Generate random numbers
let firstNumber = parseInt(Math.random() * 10);
let secondNumber = parseInt(Math.random() * 10);

// Get the total
let total = firstNumber + secondNumber;

// Display numbers on the canvas
let primary = document.getElementById('primary-number');
primary.innerHTML = `<p>${firstNumber}</p>`;

let secondary = document.getElementById('secondary-number');
secondary.innerHTML = `<p>${secondNumber}</p>`;

// Get guess from user
let button = document.getElementById('btn');

button.addEventListener('click', function () {
    let guess = document.getElementById('guess').value;
    guess = Number(guess);
    // Check answer
    if (guess === total) {
        alert('Correct');
        window.location.reload();
    } else {
        alert('Sorry. Incorrect. The correct answer was ' + total + '.');
        window.location.reload();
    }
});

let numSelected = null;
let tileSelected = null;
let errors = 0;

const board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
];

const solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
];

window.onload = function () {
    setGame();
};

function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        let coords = this.id.split("-"); 
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
        } else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}

const canvas = document.getElementById("canva");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle array to store randomized particles
let particleArray;
// Get mouse cursor position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
};

window.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#F64C72';
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }

        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        let opacityvalue = 1;
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dis = Math.sqrt(dx * dx + dy * dy);
        if (dis < mouse.radius + this.size) {
            if (mouse.x < this.size && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function getParticles() {
    particleArray = [];
    let numParticle = (canvas.height * canvas.width) / 10000;
    for (let i = 0; i < numParticle * 2; i++) {
        let size = 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#99738E';

        particleArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connectPossible() {
    let opacityvalue = 0.25;
    for (let i = 0; i < particleArray.length; i++) {
        for (let j = i; j < particleArray.length; j++) {
            let distance = ((particleArray[i].x - particleArray[j].x) * (particleArray[i].x - particleArray[j].x)) + ((particleArray[i].y - particleArray[j].y) * (particleArray[i].y - particleArray[j].y));
            if (distance < (canvas.width / 8) * (canvas.height / 8)) {
                ctx.strokeStyle = 'rgba(255,255,255,' + opacityvalue + ')';
                ctx.linewidth = 1;
                ctx.beginPath();
                ctx.moveTo(particleArray[i].x, particleArray[i].y);
                ctx.lineTo(particleArray[j].x, particleArray[j].y);
                ctx.stroke();
            }
        }
    }
}

function sunray() {
    let opacityvalue = 1;
    for (let i = 0; i < particleArray.length; i++) {
        let dx = mouse.x - particleArray[i].x;
        let dy = mouse.y - particleArray[i].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + particleArray[i].size) {
            let opacityvalue = 1 - (distance / 20000);
            ctx.strokeStyle = 'rgba(0,0,0,' + opacityvalue + ')';
            ctx.linewidth = 1;
            ctx.beginPath();
            ctx.moveTo(particleArray[i].x, particleArray[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    }
}

window.addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = (canvas.width / 80) * (canvas.height / 80);
    getParticles();
});

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
    sunray();
    connectPossible();
}

window.addEventListener('mouseout', function () {
    mouse.x = undefined;
    mouse.y = undefined;
});

getParticles();
animate();

document.addEventListener("DOMContentLoaded", () => {
    const btns = document.querySelectorAll("[data-play]");
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", () => {
            playMusic();
        });
    }
});

function playMusic() {
    const music = new Audio(
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/161676/music.mp3"
    );

    music.addEventListener("canplay", () => {
        music.play();
    });
}
