    let currentMousePosition = 0;
    let piano = document.querySelector('.piano');    

    function removeActiveClass() {
      let lastPlay = document.querySelector('.playing');
      if(lastPlay){
        lastPlay.classList.remove('playing');
        lastPlay.classList.remove('playing-pseudo');
      }
    }

    function playAudio(e){
      let dataKeyCode = '';
      if(e.srcElement.attributes[2]){ // нажатие мыши
        dataKeyCode = e.srcElement.attributes[2]['value'];
      }
      else if(e.keyCode){// нажатие клавиатуры
        dataKeyCode = e.keyCode;
      }
      else if(e.target.classList[0] === 'piano-key'){
        console.log('mousemove');
        dataKeyCode =  e.target.dataset['keyCode']
      }
      else
        return;

      const audio = document.querySelector(`audio[data-key-code="${dataKeyCode}"]`);
      const key = document.querySelector(`div[data-key-code="${dataKeyCode}"]`);

      if (!audio) return;

      key.classList.add('playing');
      if(e.srcElement.attributes[2])
        key.classList.add('playing-pseudo');

      audio.currentTime = 0;
      audio.play();
    }

    piano.onmousedown = function(event){
      playAudio(event);
    }
    piano.onmouseup = function(event){
      removeActiveClass();
    }

    window.addEventListener('keydown', (event) => playAudio(event));   
    window.addEventListener('keyup', (event) => removeActiveClass());  

    window.addEventListener('mousemove', function(event){
      if(event.buttons === 1 && event.target.classList.contains('piano-key')){ // зажата лекая кнопка и мышка над пианино
        if(currentMousePosition !== event.target.dataset['keyCode']){ // мышка идет над новой клавишей
            currentMousePosition = event.target.dataset['keyCode'];
            removeActiveClass();
            playAudio(event)
        }
      }
    });

    // Смена подписей клавиш

    let btn = document.querySelectorAll('.btn');
    let pianoKeys = document.querySelectorAll('.piano-key');

    btn.forEach(function(item){
      item.addEventListener('click', function(event){
        btn.forEach((i) => i.classList.remove('btn-active'));
        item.classList.add('btn-active');
        if(event.target.classList.contains('btn-notes')) //показать ноты
          pianoKeys.forEach((k) => k.classList.remove('letter'));
        if(event.target.classList.contains('btn-letters')) //показать буквы
          pianoKeys.forEach((k) => k.classList.add('letter'));
      })
    });

    // Full Screen

    function activateFullscreen(element) {
      if(element.requestFullscreen) {
        element.requestFullscreen();        // W3C spec
      }
      else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();     // Firefox
      }
      else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();  // Safari
      }
      else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();      // IE/Edge
      }
    };
    function deactivateFullscreen() {
      if(document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    };

    let btnFS = document.querySelector('.fullscreen');
    btnFS.addEventListener('click', (event) => {

      console.log(event);
      console.log(event.target.classList);
      if(event.target.classList.contains('openfullscreen')){
        activateFullscreen(document.documentElement);
        btnFS.classList.remove('openfullscreen');
      }
      else{
        deactivateFullscreen();
        btnFS.classList.add('openfullscreen');
      }
    });