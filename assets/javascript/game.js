window.onload = function () {

// Global Variables

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

  var categories;
  var chosenCategory;
  var getHint ;
  var word ;
  var guess ;
  var geusses = [ ];
  var lives ;
  var counter ;
  var space;

  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");

// Functions

  // Create letter ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }

  // Categories
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "Topic: Video Games";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "Topic: Famous Pet Names";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "Topic: Facts about Michelle";
    }
  }

  // Create guesses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');
    incorrect = document.createElement('ul')

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  // Lives Counter
   comments = function () {
    showLives.innerHTML = "You currently have " + lives + " lives";
    if (lives < 1) {
      var audioElement = document.createElement("audio");
      audioElement.setAttribute("src", "assets/sad.wav");
      showLives.innerHTML = "Game Over";
      audioElement.play();
    }
    for (var i = 0; i < geusses.length; i++) {
      var audioElement = document.createElement("audio");
      audioElement.setAttribute("src", "assets/tada.wav");
      if (counter + space === geusses.length) {
        showLives.innerHTML = "You Win!";
        audioElement.play();
      }
    }
  }

  // Animate Hangman
  var animate = function () {
    var drawMe = lives ;
    drawArray[drawMe]();
  }

  canvas =  function(){

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#FF69B4";
    context.lineWidth = 2;
  };

    head = function(){
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI*2, true);
      context.stroke();
    }

  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {

    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
}

   frame1 = function() {
     draw (0, 150, 150, 150);
   };

   frame2 = function() {
     draw (10, 0, 10, 600);
   };

   frame3 = function() {
     draw (0, 5, 70, 5);
   };

   frame4 = function() {
     draw (60, 5, 60, 15);
   };

   torso = function() {
     draw (60, 36, 60, 70);
   };

   rightArm = function() {
     draw (60, 46, 100, 50);
   };

   leftArm = function() {
     draw (60, 46, 20, 50);
   };

   rightLeg = function() {
     draw (60, 70, 100, 100);
   };

   leftLeg = function() {
     draw (60, 70, 20, 100);
   };

  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1];

// Onclick Functions
   check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        }
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    }
  }

// Main Processes

  // Start Play
  play = function () {
    categories = [
        ["zelda", "super-mario", "street-fighter", "skyrim"],
        ["bubbles", "grumpy-cat", "bo", "maru", "wishbone"],
        ["twin", "henry", "languages", "chess", "thirty-one"]
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    geusses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
    canvas();
  }

  play();

    hint.onclick = function() {

      hints = [
        ["Main character who travels through Hyrule to rescue a princess", "Duo brothers traveling through a kingdom named after a vegetable to rescue a princess named after a fruit", "A popular fighting game that has spawned movies and game conventions", "A game to defeat Alduin, the World-Eater"],
        ["Michael Jackson's chimpanzee", "A famous feline with a grumpy disposition", "Sasha and Malia's Portuguese Water Dog", "A famous Youtube cat from Japan", "A clever and adventurous Jack Russell Terrier"],
        ["Another word for monozygotic", "Name of Michelle's son", "She speaks many ---", "She's obsessed with this 8x8 strategy game", "Michelle's age"]
    ];

    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = hints [catagoryIndex][hintIndex];
  };

  // Reset
  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  }
}
