const wheel = document.querySelector('.wheel');
const startButton = document.getElementById('button');
const back = document.querySelector('.back');
const bg = document.getElementById('resultt');
const wl = document.getElementById('wl');
const userInput = document.getElementById('userInput');
const volumeControl = document.getElementById('volumeControl');
const results = document.getElementById('results');
const pokeball = document.getElementById('pokeball');
const animation = document.getElementById('ani')

var spin_track = new Audio('Assets/Sounds/girar.mp3'); 
var deg = 0;

function generateRandomNumber()
{
   deg = Math.floor(5000 + Math.random() * 5000);
   let number = 60 - Math.floor((deg % 360) / 6);
   return number;
}

function spinWheelStartEffect()
{
  resetResult();
  wheel.style.transition = 'all 10s ease';
  wheel.style.transform = `rotate(${deg}deg)`;
  wheel.classList.add('blur');
}

function spinWheelStopEffect(pokemon_id, is_winner)
{
  let backgroundColor = pokemon_id % 2 !== 0 ? '#501f4e' : '#7f307c';
  wheel.addEventListener('transitionend', () => 
  {
    
    let pokemon_id_text = pokemon_id.toString();
    var grito = new Audio(`Assets/Sounds/${pokemon_id_text}.mp3`);
    grito.volume = volumeControl.value;
    grito.play();

    wheel.classList.remove('blur');
    startButton.style.pointerEvents = 'auto';
    wheel.style.transition = 'none';
    wheel.style.transform = `rotate(${(deg % 360)}deg)`;

    

    if(is_winner)
    {
      wl.textContent = 'Ganaste';
      wl.style.backgroundColor= '#14b509';
    }
    else
    {
      wl.textContent = 'Perdiste';
      wl.style.backgroundColor= '#b50909';
    }

    results.insertAdjacentHTML('afterbegin', '<div class="resultado" style="background-image: url('+"./Assets/Pokes/"+pokemon_id+'.png")"><span class="resultado__numero">'+pokemon_id+'</span></div>');

    bg.style.backgroundImage = `url('Assets/Pokes/${pokemon_id_text}.png')`;
    bg.style.backgroundColor = backgroundColor;
    bg.classList.add("ani2")
    pokeball.classList.remove("pokeball");
    pokeball.classList.remove("ani");
  }, {once : true});
}

function generateRandomNumberByCondition(user_number, random_number, is_equals)
{
  if(is_equals)
  {
    while(user_number !== random_number)
      random_number = generateRandomNumber();
  }
  else
  {
    while(user_number === random_number)
      random_number = generateRandomNumber();
  }
  return random_number;
}

function spinWheel(user_number, force_loss,button)
{
  startButton.style.pointerEvents = 'none';

  if(isNaN(user_number) || user_number < 1 || user_number > 60)
  {
    console.log('user_number field has invalid value');
    return -1;
  }

  let random_number = generateRandomNumber();
  if(force_loss)
  {
    console.log('fake enabled');
    random_number = generateRandomNumberByCondition(user_number, random_number, false);
  }
  else
  {
    if(button){
      console.log('botton');
      random_number = generateRandomNumberByCondition(user_number, random_number, true);
    }
  }

  spinWheelStartEffect(deg);
  return random_number;
}

function resetResult(){
    pokeball.classList.add("pokeball");
    pokeball.classList.add("ani");
    bg.classList.remove("ani2")
    wl.textContent="100K";
    wl.style="";
    bg.style="";
}

function checkWin(userNumber, resultNumber) 
{
  if(resultNumber === -1)
    return;
  
  spinWheelStopEffect(resultNumber, userNumber === resultNumber);
  console.log('Numero buscado : ' + userNumber);
  console.log('Numero ruleta : ' + resultNumber);
}

startButton.addEventListener('click', () => 
{
  const userNumber = parseInt(userInput.value);
  const resultNumber = spinWheel(userNumber, false);
  const regex = /^(?:[1-9]|[1-5][0-9]|60)$/;
  if(regex.test(userNumber)){
    checkWin(userNumber, resultNumber);
    spin_track.volume = 0.4;
    spin_track.play();
  } else{
    alert('Debes introducir un numero mayor que 1 y menor que 60')
    userInput.value="";
    startButton.style.pointerEvents = 'auto';
  }
});

const tira = (event) => {
  if(event.keyCode=='90'){
    const userNumber = parseInt(userInput.value);
    const resultNumber = spinWheel(userNumber, false,true);
    const regex = /^(?:[1-9]|[1-5][0-9]|60)$/;
    if(regex.test(userNumber)){
        checkWin(userNumber, resultNumber);
        spin_track.volume = 0.4;
        spin_track.play();
      } else{
        alert('Debes introducir un numero mayor que 1 y menor que 60')
        userInput.value="";
        startButton.style.pointerEvents = 'auto';
      }
  }
}

document.addEventListener('keydown', tira);