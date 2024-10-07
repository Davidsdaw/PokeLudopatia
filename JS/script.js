(function() {
  const wheel = document.querySelector('.wheel');
  const startButton = document.getElementById('button');
  const element = document.getElementById('result');
  const bg = document.getElementById('resultt');
  const wl = document.getElementById('wl');
  const userInput = document.getElementById('userInput');
  const volumeControl = document.getElementById('volumeControl');
  const results = document.getElementById('results');
  const fondochk = document.getElementById('fondoder');
  const opc = document.getElementById('opc')
  const opcbar = document.getElementById('opcbar')
  const rasca = document.getElementById('rasca');

  let deg = 0;
  alert("Ruletita de ChetiiKo \n A girar perros");

  const spinWheel = () => {
    bg.style.backgroundImage='';
    bg.style.backgroundColor='';
    element.textContent='RESULTADO';
    element.style.backgroundColor ='';
    wl.textContent='100K';
    wl.style.backgroundColor='';
    var audio = new Audio('Assets/Sounds/girar.mp3');
    audio.volume = 0.4;
    audio.play();
    deg = Math.floor(5000 + Math.random() * 5000);
    wheel.style.transition = 'all 10s ease';
    wheel.style.transform = `rotate(${deg}deg)`;
    wheel.classList.add('blur');
  };

  startButton.addEventListener('click', () => {
    if(isNaN(parseInt(userInput.value))){
      alert('Escriba un numero')
    } else {
      spinWheel();
      const userNumber = parseInt(userInput.value); 
      checkWin(userNumber);
      
    }
  });

  volumeControl.addEventListener('input', () => {
    grito.volume = volumeControl.value;
  });

  function checkWin(userNumber) {
    wheel.addEventListener('transitionend', () => {
      wheel.classList.remove('blur');
      wheel.style.transition = 'none';
      const actualDeg = deg % 360;
      wheel.style.transform = `rotate(${actualDeg}deg)`;

      let number = 60 - Math.floor(actualDeg / 6);

      let resultText = '';
      let backgroundColor = '';

      if (number >= 1 && number <= 60) {
        resultText = number.toString();
        backgroundColor = number % 2 !== 0 ? '#501f4e' : '#7f307c';
      }
      if (userNumber == parseInt(resultText)) {
        wl.textContent = 'Ganaste';
        wl.style.backgroundColor = '#14b509';
      } else {
        wl.textContent = 'Perdiste';
        wl.style.backgroundColor = '#b50909';
      }

      console.log('Numero buscado : ' + userNumber);
      console.log('Numero ruleta : ' + resultText);
      var grito = new Audio(`Assets/Sounds/${resultText}.mp3`);
      grito.volume = volumeControl.value;
      grito.play();
      bg.style.backgroundImage = `url('Assets/Pokes/${resultText}.png')`;
      bg.style.backgroundColor = backgroundColor;
      element.textContent = resultText;
      element.style.backgroundColor = backgroundColor;
      anteriores(resultText,userNumber);
    }, { once: true });
  }

  function anteriores(resultText,userNumber) {
    if(userNumber == parseInt(resultText)){
      if(resultText%2==0){
        results.insertAdjacentHTML('afterbegin', '<div class="resultado" style="background-image: url('+"../Assets/Pokes/"+resultText+'.png")"><span class="resultado__numero">'+resultText+'</span></div>');
      } else {
        results.insertAdjacentHTML('afterbegin', '<div class="resultado" style="background-image: url('+"../Assets/Pokes/"+resultText+'.png")"><span class="resultado__numero">'+resultText+'</span></div>');
      }
      
    }else{
      if(resultText%2==0){
        results.insertAdjacentHTML('afterbegin', '<div class="resultado" style="background-image: url('+"../Assets/Pokes/"+resultText+'.png")"><span class="resultado__numero">'+resultText+'</span></div>');
      } else {
        results.insertAdjacentHTML('afterbegin', '<div class="resultado" style="background-image: url('+"../Assets/Pokes/"+resultText+'.png")"><span class="resultado__numero">'+resultText+'</span></div>');
      }
    }
    userNumber = -1;
  }
  function opcion(){
    if(opcbar.style.display=='flex'){
      opcbar.style.display='none';
    }else {
      opcbar.style.display='flex';
    }
  }

  function fond(){
    results.classList.toggle('resultsfondo')
  }

  // opc.addEventListener("click",opcion)
  // fondochk.addEventListener("change",fond)
})();