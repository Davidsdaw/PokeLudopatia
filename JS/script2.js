const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const img3 = document.getElementById('img3');
const img4 = document.getElementById('img4');
const img5 = document.getElementById('img5');
const img6 = document.getElementById('img6');


let imagen = ["avatar1","avatar2","avatar3","avatar4","avatar5","avatar6","avatar7","avatar8","avatar9","avatar10","avatar11"]

let isScratching = false;




ctx.fillStyle = 'silver';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Función para rascar (borrar el área alrededor del mouse)
function scratch(e) {
    if (!isScratching) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out'; // Borra en lugar de dibujar
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 20, 0, Math.PI * 2); // Círculo pequeño alrededor del mouse
    ctx.fill();
}


const cargar = () => {
    random = Math.floor(Math.random() * 11)+1;
    img1.src = "../Assets/Images/avatar" + random + ".png"
    random = Math.floor(Math.random() * 11)+1;
    img2.src = "../Assets/Images/avatar" + random + ".png"
    random = Math.floor(Math.random() * 11)+1;
    img3.src = "../Assets/Images/avatar" + random + ".png"
    random = Math.floor(Math.random() * 11)+1;
    img4.src = "../Assets/Images/avatar" + random + ".png"
    random = Math.floor(Math.random() * 11)+1;
    img5.src = "../Assets/Images/avatar" + random + ".png"
    random = Math.floor(Math.random() * 11)+1;
    img6.src = "../Assets/Images/avatar" + random + ".png"
}


document.addEventListener('DOMContentLoaded',cargar);

canvas.addEventListener('mousedown', () => {
    isScratching = true;
});
canvas.addEventListener('mouseup', () => {
    isScratching = false;
});
canvas.addEventListener('mousemove', scratch);
