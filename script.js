const targetDiv = document.getElementById("fp");
var massage = document.getElementById("msg");

// Difficulties elements
const easy = document.getElementById("easy");
const easy2 = document.getElementById("easy2");
const normal = document.getElementById("normal");
const normal2 = document.getElementById("normal2");
const hard = document.getElementById("hard");
const hard2 = document.getElementById("hard2");
const wordleft = document.getElementById("wLeft");

var words = document.querySelector(".words");
var result = document.getElementById("res");
var scoreShower = document.querySelector(".playerScore");

var temp = document.querySelector(".timer");
var timerDiv = document.querySelector(".time");
const gameOver = document.getElementById("Lp");

// Audios variables start
var carStartSound = document.getElementById("crStrt");
var carRidingSound = document.getElementById("garir");
var backgrounMusic = document.getElementById("bgMusic");
var wrongMusic = document.getElementById("wrong");
var correctMusic = document.getElementById("right");
var speedIncreasingSound = document.getElementById("speed");
var brakeSound = document.getElementById("brake");
var wonSound = document.getElementById("won");
var lostSound = document.getElementById("lost");
var keyPessingSound = document.getElementById("kPres");
var finishingTimer = document.getElementById("L10s");

var seconds = 0;
var scoreKeeper = 0;
var wordLengthKeeper = 0;
var wordsLeft;
var spans;
var typed;
var musicCheck=1;
var counter = 0;
var passedCar = 0;
var currentWord = "";
var checkingIndex = 0;
var difficultyChek = 0;
var carPaddings = ["2%","5%","11%","13%","16%","18%","21%","23%","26%","28%","31%","33%","36%","38%","41%","43%","46%","49%","51%","53%","56%","58%","61%","63%","66%","67%","69%","71%","73%","74%","75%"];
//var wheelPadding = ["8%","11%","17%","19%","22%","24%","27%","29%","32%","34%","37%","39%","42%","44%","47%","49%","52%","54%","57%","59%","62%","64%","67%","69%","71%","72%","75%","77%","79%","80%","81%"];

easy.onclick = function () {
  if (targetDiv.style.display !== "none") {
    targetDiv.style.display = "none";
  }
  difficultyChek = 1;
  seconds = 120;
  playGame();
};

normal.onclick = function () {
  if (targetDiv.style.display !== "none") {
    targetDiv.style.display = "none";
  }
  difficultyChek = 2;
  seconds = 90;
  playGame();
};

hard.onclick = function () {
  if (targetDiv.style.display !== "none") {
    targetDiv.style.display = "none";
  }
  difficultyChek = 3;
  seconds = 60;
  playGame();
};

function playGame() {
  backgrounMusic.currentTime = 0;
  carStartSound.play(); //music playing
  carRidingSound.play();
  if(musicCheck==1){
  backgrounMusic.play();
  }
  showWord(); //Showing Words for typing

  var timer = setInterval(function () {
    seconds--; //Timer count
    if (seconds == 10) {
      finishingTimer.play(); // Last 10 seconds alert Timer
    }

    temp.innerHTML = "Time Left : " + seconds; //timer box showing

    if (seconds === 0 || passedCar === 30) {
      //game ending condition
      finishingTimer.pause();
      finishingTimer.currentTime = 0;
      backgrounMusic.pause();
      backgrounMusic.currentTime = 0;
      brakeSound.play();
      carRidingSound.pause();
      carRidingSound.currentTime = 0;
      massage.innerHTML =
        "Your Score is: " + scoreKeeper + ", Word Typed: " + counter; //Score and typed word count showing
      if (counter >= 30) {                          //Win or lost massage
        result.style.color = "lime";
        result.innerHTML = "You Won!!!";
        wonSound.play();
      } 
      else {
        lostSound.play();
        result.style.color = "red";
        result.innerHTML = "You Lost!!!";
      }
      counter = 0;
      scoreKeeper = 0; //setting all variables to their default values after game ends
      wordLengthKeeper = 0;
      wordleft.innerHTML = "Word Left- 30";
      checkingIndex = 0;
      scoreShower.innerHTML = "Score : " + scoreKeeper;
      genText();
      clearInterval(timer);
      timerDiv.innerHTML = "sec";
      passedCar = 0;
      gameOver.style.display = "block"; //Showing Game ending page
    }
  }, 1000);
}

easy2.onclick = function () {
  // difficulty selection to play again after the game ends
  if (gameOver.style.display != "none") {
    gameOver.style.display = "none";
  }
  wonSound.pause();
  wonSound.currentTime = 0;
  lostSound.pause();
  lostSound.currentTime = 0;
  difficultyChek = 1;
  seconds = 120;
  playGame(); //restart the game
};

normal2.onclick = function () {
  if (gameOver.style.display != "none") {
    gameOver.style.display = "none";
  }
  wonSound.pause();
  wonSound.currentTime = 0;
  lostSound.pause();
  lostSound.currentTime = 0;
  difficultyChek = 2;
  seconds = 90;
  playGame();
};

hard2.onclick = function () {
  if (gameOver.style.display != "none") {
    gameOver.style.display = "none";
  }
  wonSound.pause();
  wonSound.currentTime = 0;
  lostSound.pause();
  lostSound.currentTime = 0;
  difficultyChek = 3;
  seconds = 60;
  playGame();
};

function typing(e) {
  // matching typed wort with displayed word
  typed = String.fromCharCode(e.which);
  if (typed >= "A" && typed <= "Z") {
    if (spans[checkingIndex].innerHTML === typed) {
      spans[checkingIndex].classList.add("bg"); //green marking correct typed letter
      checkingIndex++;
      keyPessingSound.play();
    }
    else {
      if (passedCar > 0) {
        scoreKeeper -= 1;
        wrongMusic.play();
        brakeSound.play();
        passedCar -= 1;
        wordsLeft = 30 - passedCar;
        wordleft.innerHTML = "Word Left- " + wordsLeft;
        scoreShower.innerHTML = "Score : " + scoreKeeper;
        if (seconds > 10 && difficultyChek == 2) {
          seconds -= 2;
        }
        if (seconds > 10 && difficultyChek == 3) {
          seconds -= 3;
        }
      }
      if (passedCar <= 0) {
        passedCar = 0;
      }
      moveCar(passedCar); //move the car according typing
    }
    if (checkingIndex === spans.length) {
      //acivity after type all letter correct
      document.removeEventListener("keydown", typing, false);
      passedCar += 1;
      counter += 1;
      scoreKeeper += wordLengthKeeper;
      wordsLeft = 30 - passedCar;
      wordleft.innerHTML = "Word Left- " + wordsLeft;
      scoreShower.innerHTML = "Score : " + scoreKeeper;
      correctMusic.play();
      speedIncreasingSound.play();

      if (passedCar == carPaddings.length) {
        passedCar -= 1;
      }
      checkingIndex = 0;
      moveCar(passedCar);
      setTimeout(function () {
        words.className = "words"; // restart the classes
        showWord(); // give another word
        document.addEventListener("keydown", typing, false);
      }, 400);
    } 
    
  }
}
function moveCar(passedCar) {
  //Mopving car to frontward or backward
  var myCar = document.getElementsByClassName("car");
  setInterval(cAnim, 40);
 // var myWheel = document.getElementsByClassName("wheel");
  //setInterval(wAnim, 40);
}

function cAnim() {
  document.getElementById("myCar").style.left = carPaddings[passedCar];
  document.getElementById("myCar").style.transition = "all 2s"; //transition for smooth move
}

//function wAnim() {
  //document.getElementById("caka").style.left = wheelPadding[passedCar];
  //document.getElementById("caka").style.transition = "all 2s";
//}

document.addEventListener("keydown", typing, false);

function showWord() {
  words.innerHTML = "";
  var wordArray = genText().split(""); //score+=wordArray.length;
  for (var i = 0; i < wordArray.length; i++) {
    var span = document.createElement("span"); //building the words with spans around the letters
    span.classList.add("span");
    span.innerHTML = wordArray[i];
    words.appendChild(span);
  }
  spans = document.querySelectorAll(".span");
}

function genText() {
  //function for generate a word
  var x = Math.floor(Math.random() * word.length);
  var sWord = word[x];
  wordLengthKeeper = sWord.length;
  return sWord;
}

function playAudio() { 
  musicCheck=2;
  backgrounMusic.play();
}
function pauseAudio() {
  musicCheck=0;
  backgrounMusic.pause();
}

const word = ['ACCOUNT', 'ACCURATE', 'ACRES', 'ACROSS', 'ACT', 'ACTION', 'ACTIVE', 'ACTIVITY',
  'ACTUAL', 'ACTUALLY', 'ADD', 'ADDITION', 'ADDITIONAL', 'ADJECTIVE', 'ADULT', 'ADVENTURE',
  'ADVICE', 'AFFECT', 'AFRAID', 'AFTER', 'AFTERNOON', 'AGAIN', 'AGAINST', 'AGE',
  'AGO', 'AGREE', 'AHEAD', 'AID', 'AIR', 'AIRPLANE', 'ALIKE', 'ALIVE',
  'ALL', 'ALLOW', 'ALMOST', 'ALONE', 'ALONG', 'ALOUD', 'ALPHABET', 'ALREADY',
  'ALSO', 'ALTHOUGH', 'AM', 'AMONG', 'AMOUNT', 'ANCIENT', 'ANGLE', 'ANGRY',
  'ANIMAL', 'ANNOUNCED', 'ANOTHER', 'ANSWER', 'ANTS', 'ANY', 'ANYBODY', 'ANYONE',
  'ANYTHING', 'ANYWAY', 'ANYWHERE', 'APART', 'APARTMENT', 'APPEARANCE', 'APPLE', 'APPLIED',
  'APPROPRIATE', 'ARE', 'AREA', 'ARM', 'ARMY', 'AROUND', 'ARRANGE', 'ARRANGEMENT',
  'ARRIVE', 'ARROW', 'ART', 'ARTICLE', 'AS', 'ASIDE', 'ASK', 'ASLEEP',
  'AT', 'ATE', 'ATMOSPHERE', 'ATOM', 'ATOMIC', 'ATTACHED', 'ATTACK', 'ATTEMPT',
  'ATTENTION', 'AUDIENCE', 'AUTHOR', 'AUTOMOBILE', 'AVAILABLE', 'AVERAGE', 'AVOID', 'AWARE',
  'AWAY', 'BABY', 'BACK', 'BAD', 'BADLY', 'BAG', 'BALANCE', 'BALL',
  'BALLOON', 'BAND', 'BANK', 'BAR', 'BARE', 'BARK', 'BARN', 'BASE',
  'BASEBALL', 'BASIC', 'BASIS', 'BASKET', 'BAT', 'BATTLE', 'BE', 'BEAN',
  'BEAR', 'BEAT', 'BEAUTIFUL', 'BEAUTY', 'BECAME', 'BECAUSE', 'BECOME', 'BECOMING',
  'BEE', 'BEEN', 'BEFORE', 'BEGAN', 'BEGINNING', 'BEGUN', 'BEHAVIOR', 'BEHIND',
  'BEING', 'BELIEVED', 'BELL', 'BELONG', 'BELOW', 'BELT', 'BEND', 'BENEATH',
  'BENT', 'BESIDE', 'BEST', 'BET', 'BETTER', 'BETWEEN', 'BEYOND', 'BICYCLE',
  'BIGGER', 'BIGGEST', 'BILL', 'BIRDS', 'BIRTH', 'BIRTHDAY', 'BIT', 'BITE',
  'BLACK', 'BLANK', 'BLANKET', 'BLEW', 'BLIND', 'BLOCK', 'BLOOD', 'BLOW',
  'BLUE', 'BOARD', 'BOAT', 'BODY', 'BONE', 'BOOK', 'BORDER', 'BORN',
  'BOTH', 'BOTTLE', 'BOTTOM', 'BOUND', 'BOW', 'BOWL', 'BOX', 'BOY',
  'BRAIN', 'BRANCH', 'BRASS', 'BRAVE', 'BREAD', 'BREAK', 'BREAKFAST', 'BREATH',
  'BREATHE', 'BREATHING', 'BREEZE', 'BRICK', 'BRIDGE', 'BRIEF', 'BRIGHT', 'BRING',
  'BROAD', 'BROKE', 'BROKEN', 'BROTHER', 'BROUGHT', 'BROWN', 'BRUSH', 'BUFFALO',
  'BUILD', 'BUILDING', 'BUILT', 'BURIED', 'BURN', 'BURST', 'BUS', 'BUSH',
  'BUSINESS', 'BUSY', 'BUT', 'BUTTER', 'BUY', 'BY', 'CABIN', 'CAGE',
  'CAKE', 'CALL', 'CALM', 'CAME', 'CAMERA', 'CAMP', 'CAN', 'CANAL',
  'CANNOT', 'CAP', 'CAPITAL', 'CAPTAIN', 'CAPTURED', 'CAR', 'CARBON', 'CARD',
  'CARE', 'CAREFUL', 'CAREFULLY', 'CARRIED', 'CARRY', 'CASE', 'CAST', 'CASTLE',
  'CAT', 'CATCH', 'CATTLE', 'CAUGHT', 'CAUSE', 'CAVE', 'CELL', 'CENT',
  'CENTER', 'CENTRAL', 'CENTURY', 'CERTAIN', 'CERTAINLY', 'CHAIN', 'CHAIR', 'CHAMBER',
  'CHANCE', 'CHANGE', 'CHANGING', 'CHAPTER', 'CHARACTER', 'CHARACTERISTIC', 'CHARGE', 'CHART',
  'CHECK', 'CHEESE', 'CHEMICAL', 'CHEST', 'CHICKEN', 'CHIEF', 'CHILD', 'CHILDREN',
  'CHOICE', 'CHOOSE', 'CHOSE', 'CHOSEN', 'CHURCH', 'CIRCLE', 'CIRCUS', 'CITIZEN',
  'CITY', 'CLASS', 'CLASSROOM', 'CLAWS', 'CLAY', 'CLEAN', 'CLEAR', 'CLEARLY',
  'CLIMATE', 'CLIMB', 'CLOCK', 'CLOSE', 'CLOSET', 'CLOSELY', 'CLOSER', 'CLOTH', 'CLOTHES',
  'CLOTHING', 'CLOUD', 'CLUB', 'COACH', 'COAL', 'COAST', 'COAT', 'CODEPEN', 'COFFEE',
  'COLD', 'COLLECT', 'COLLEGE', 'COLONY', 'COLOR', 'COLUMN', 'COMBINATION', 'COMBINE',
  'COME', 'COMFORTABLE', 'COMING', 'COMMAND', 'COMMON', 'COMMUNITY', 'COMPANY', 'COMPARE',
  'COMPASS', 'COMPLETE', 'COMPLETELY', 'COMPLEX', 'COMPOSED', 'COMPOSITION', 'COMPOUND', 'CONCERNED',
  'CONDITION', 'CONGRESS', 'CONNECTED', 'CONSIDER', 'CONSIST', 'CONSONANT', 'CONSTANTLY', 'CONSTRUCTION',
  'CONTAIN', 'CONTINENT', 'CONTINUED', 'CONTRAST', 'CONTROL', 'CONVERSATION', 'COOK', 'COOKIES',
  'COOL', 'COPPER', 'COPY', 'CORN', 'CORNER', 'CORRECT', 'CORRECTLY', 'COST',
  'COTTON', 'COULD', 'COUNT', 'COUNTRY', 'COUPLE', 'COURAGE', 'COURSE', 'COURT',
  'COVER', 'COW', 'COWBOY', 'CRACK', 'CREAM', 'CREATE', 'CREATURE', 'CREW',
  'CROP', 'CROSS', 'CROWD', 'CRY', 'CUP', 'CURIOUS', 'CURRENT', 'CURVE',
  'CUSTOMS', 'CUT', 'CUTTING', 'DAILY', 'DAMAGE', 'DANCE', 'DANGER', 'DANGEROUS',
  'DARK', 'DARKNESS', 'DATE', 'DAUGHTER', 'DAWN', 'DAY', 'DEAD', 'DEAL',
  'DEAR', 'DEATH', 'DECIDE', 'DECLARED', 'DEEP', 'DEEPLY', 'DEER', 'DEFINITION',
  'DEGREE', 'DEPEND', 'DEPTH', 'DESCRIBE', 'DESERT', 'DESIGN', 'DESK', 'DETAIL',
  'DETERMINE', 'DEVELOP', 'DEVELOPMENT', 'DIAGRAM', 'DIAMETER', 'DID', 'DIE', 'DIFFER',
  'DIFFERENCE', 'DIFFERENT', 'DIFFICULT', 'DIFFICULTY', 'DIG', 'DINNER', 'DIRECT', 'DIRECTION',
  'DIRECTLY', 'DIRT', 'DIRTY', 'DISAPPEAR', 'DISCOVER', 'DISCOVERY', 'DISCUSS', 'DISCUSSION',
  'DISEASE', 'DISH', 'DISTANCE', 'DISTANT', 'DIVIDE', 'DIVISION', 'DO', 'DOCTOR',
  'DOES', 'DOG', 'DOING', 'DOLL', 'DOLLAR', 'DONE', 'DONKEY', 'DOOR',
  'DOT', 'DOUBLE', 'DOUBT', 'DOWN', 'DOZEN', 'DRAW', 'DRAWN', 'DREAM',
  'DRESS', 'DREW', 'DRIED', 'DRINK', 'DRIVE', 'DRIVEN', 'DRIVER', 'DRIVING',
  'DROP', 'DROPPED', 'DROVE', 'DRY', 'DUCK', 'DUE', 'DUG', 'DULL',
  'DURING', 'DUST', 'DUTY', 'EACH', 'EAGER', 'EAR', 'EARLIER', 'EARLY',
  'EARN', 'EARTH', 'EASIER', 'EASILY', 'EAST', 'EASY', 'EAT', 'EATEN',
  'EDGE', 'EDUCATION', 'EFFECT', 'EFFORT', 'EGG', 'EIGHT', 'EITHER', 'ELECTRIC',
  'ELECTRICITY', 'ELEMENT', 'ELEPHANT', 'ELEVEN', 'ELSE', 'EMPTY', 'END', 'ENEMY',
  'ENERGY', 'ENGINE', 'ENGINEER', 'ENJOY', 'ENOUGH', 'ENTER', 'ENTIRE', 'ENTIRELY',
  'ENVIRONMENT', 'EQUAL', 'EQUALLY', 'EQUATOR', 'EQUIPMENT', 'ESCAPE', 'ESPECIALLY', 'ESSENTIAL',
  'ESTABLISH', 'EVEN', 'EVENING', 'EVENT', 'EVENTUALLY', 'EVER', 'EVERY', 'EVERYBODY',
  'EVERYONE', 'EVERYTHING', 'EVERYWHERE', 'EVIDENCE', 'EXACT', 'EXACTLY', 'EXAMINE', 'EXAMPLE',
  'EXCELLENT', 'EXCEPT', 'EXCHANGE', 'EXCITED', 'EXCITEMENT', 'EXCITING', 'EXCLAIMED', 'EXERCISE',
  'EXIST', 'EXPECT', 'EXPERIENCE', 'EXPERIMENT', 'EXPLAIN', 'EXPLANATION', 'EXPLORE', 'EXPRESS',
  'EXPRESSION', 'EXTRA', 'EYE', 'FACE', 'FACING', 'FACT', 'FACTOR', 'FACTORY',
  'FAILED', 'FAIR', 'FAIRLY', 'FALL', 'FALLEN', 'FAMILIAR', 'FAMILY', 'FAMOUS',
  'FAR', 'FARM', 'FARMER', 'FARTHER', 'FAST', 'FASTENED', 'FASTER', 'FAT',
  'FATHER', 'FAVORITE', 'FEAR', 'FEATHERS', 'FEATURE', 'FED', 'FEED', 'FEEL',
  'FEET', 'FELL', 'FELLOW', 'FELT', 'FENCE', 'FEW', 'FEWER', 'FIELD',
  'FIERCE', 'FIFTEEN', 'FIFTH', 'FIFTY', 'FIGHT', 'FIGHTING', 'FIGURE', 'FILL',
  'FILM', 'FINAL', 'FINALLY', 'FIND', 'FINE', 'FINEST', 'FINGER', 'FINISH',
  'FIRE', 'FIREPLACE', 'FIRM', 'FIRST', 'FISH', 'FIVE', 'FIX', 'FLAG',
  'FLAME', 'FLAT', 'FLEW', 'FLIES', 'FLIGHT', 'FLOATING', 'FLOOR', 'FLOW',
  'FLOWER', 'FLY', 'FOG', 'FOLKS', 'FOLLOW', 'FOOD', 'FOOT', 'FOOTBALL',
  'FOR', 'FORCE', 'FOREIGN', 'FOREST', 'FORGET', 'FORGOT', 'FORGOTTEN', 'FORM',
  'FORMER', 'FORT', 'FORTH', 'FORTY', 'FORWARD', 'FOUGHT', 'FOUND', 'FOUR',
  'FOURTH', 'FOX', 'FRAME', 'FREE', 'FREEDOM', 'FREQUENTLY', 'FRESH', 'FRIEND',
  'FRIENDLY', 'FRIGHTEN', 'FROG', 'FROM', 'FRONT', 'FROZEN', 'FRUIT', 'FUEL',
  'FULL', 'FULLY', 'FUN', 'FUNCTION', 'FUNNY', 'FUR', 'FURNITURE', 'FURTHER',
  'FUTURE', 'GAIN', 'GAME', 'GARAGE', 'GARDEN', 'GAS', 'GASOLINE', 'GATE',
  'GATHER', 'GAVE', 'GENERAL', 'GENERALLY', 'GENTLE', 'GENTLY', 'GET', 'GETTING',
  'GIANT', 'GIFT', 'GIRL', 'GIVE', 'GIVEN', 'GIVING', 'GLAD', 'GLASS',
  'GLOBE', 'GO', 'GOES', 'GOLD', 'GOLDEN', 'GONE', 'GOOD', 'GOOSE',
  'GOT', 'GOVERNMENT', 'GRABBED', 'GRADE', 'GRADUALLY', 'GRAIN', 'GRANDFATHER', 'GRANDMOTHER',
  'GRAPH', 'GRASS', 'GRAVITY', 'GRAY', 'GREAT', 'GREATER', 'GREATEST', 'GREATLY',
  'GREEN', 'GREW', 'GROUND', 'GROUP', 'GROW', 'GROWN', 'GROWTH', 'GUARD',
  'GUESS', 'GUIDE', 'GULF', 'GUN', 'HABIT', 'HAD', 'HAIR', 'HALF',
  'HALFWAY', 'HALL', 'HAND', 'HANDLE', 'HANDSOME', 'HANG', 'HAPPEN', 'HAPPENED',
  'HAPPILY', 'HAPPY', 'HARBOR', 'HARD', 'HARDER', 'HARDLY', 'HAS', 'HAT',
  'HAVE', 'HAVING', 'HAY', 'HE', 'HEADED', 'HEADING', 'HEALTH', 'HEARD',
  'HEARING', 'HEART', 'HEAT', 'HEAVY', 'HEIGHT', 'HELD', 'HELLO', 'HELP',
  'HELPFUL', 'HER', 'HERD', 'HERE', 'HERSELF', 'HIDDEN', 'HIDE', 'HIGH',
  'HIGHER', 'HIGHEST', 'HIGHWAY', 'HILL', 'HIM', 'HIMSELF', 'HIS', 'HISTORY',
  'HIT', 'HOLD', 'HOLE', 'HOLLOW', 'HOME', 'HONOR', 'HOPE', 'HORN',
  'HORSE', 'HOSPITAL', 'HOT', 'HOUR', 'HOUSE', 'HOW', 'HOWEVER', 'HUGE',
  'HUMAN', 'HUNDRED', 'HUNG', 'HUNGRY', 'HUNT', 'HUNTER', 'HURRIED', 'HURRY',
  'HURT', 'HUSBAND', 'ICE', 'IDEA', 'IDENTITY', 'IF', 'ILL', 'IMAGE',
  'IMAGINE', 'IMMEDIATELY', 'IMPORTANCE', 'IMPORTANT', 'IMPOSSIBLE', 'IMPROVE', 'IN', 'INCH',
  'INCLUDE', 'INCLUDING', 'INCOME', 'INCREASE', 'INDEED', 'INDEPENDENT', 'INDICATE', 'INDIVIDUAL',
  'INDUSTRIAL', 'INDUSTRY', 'INFLUENCE', 'INFORMATION', 'INSIDE', 'INSTANCE', 'INSTANT', 'INSTEAD',
  'INSTRUMENT', 'INTEREST', 'INTERIOR', 'INTO', 'INTRODUCED', 'INVENTED', 'INVOLVED', 'IRON',
  'IS', 'ISLAND', 'IT', 'ITS', 'ITSELF', 'JACK', 'JAR', 'JET',
  'JOB', 'JOIN', 'JOINED', 'JOURNEY', 'JOY', 'JUDGE', 'JUMP', 'JUNGLE',
  'JUST', 'KEEP', 'KEPT', 'KEY', 'KIDS', 'KILL', 'KIND', 'KITCHEN',
  'KNEW', 'KNIFE', 'KNOW', 'KNOWLEDGE', 'KNOWN', 'LABEL', 'LABOR', 'LACK',
  'LADY', 'LAID', 'LAKE', 'LAMP', 'LAND', 'LANGUAGE', 'LARGE', 'LARGER',
  'LARGEST', 'LAST', 'LATE', 'LATER', 'LAUGH', 'LAW', 'LAY', 'LAYERS',
  'LEAD', 'LEADER', 'LEAF', 'LEARN', 'LEAST', 'LEATHER', 'LEAVE', 'LEAVING',
  'LED', 'LEFT', 'LEG', 'LENGTH', 'LESSON', 'LET', 'LETTER', 'LEVEL',
  'LIBRARY', 'LIE', 'LIFE', 'LIFT', 'LIGHT', 'LIKE', 'LIKELY', 'LIMITED',
  'LINE', 'LION', 'LIPS', 'LIQUID', 'LIST', 'LISTEN', 'LITTLE', 'LIVE',
  'LIVING', 'LOAD', 'LOCAL', 'LOCATE', 'LOCATION', 'LOG', 'LONELY', 'LONG',
  'LONGER', 'LOOK', 'LOOSE', 'LOSE', 'LOSS', 'LOST', 'LOT', 'LOUD',
  'LOVE', 'LOVELY', 'LOW', 'LOWER', 'LUCK', 'LUCKY', 'LUNCH', 'LUNGS',
  'LYING', 'MACHINE', 'MACHINERY', 'MAD', 'MADE', 'MAGIC', 'MAGNET', 'MAIL',
  'MAIN', 'MAINLY', 'MAJOR', 'MAKE', 'MAKING', 'MAN', 'MANAGED', 'MANNER',
  'MANUFACTURING', 'MANY', 'MAP', 'MARK', 'MARKET', 'MARRIED', 'MASS', 'MASSAGE',
  'MASTER', 'MATERIAL', 'MATHEMATICS', 'MATTER', 'MAY', 'MAYBE', 'ME', 'MEAL',
  'MEAN', 'MEANS', 'MEANT', 'MEASURE', 'MEAT', 'MEDICINE', 'MEET', 'MELTED',
  'MEMBER', 'MEMORY', 'MEN', 'MENTAL', 'MERELY', 'MET', 'METAL', 'METHOD',
  'MICE', 'MIDDLE', 'MIGHT', 'MIGHTY', 'MILE', 'MILITARY', 'MILK', 'MILL',
  'MIND', 'MINE', 'MINERALS', 'MINUTE', 'MIRROR', 'MISSING', 'MISSION', 'MISTAKE',
  'MIX', 'MIXTURE', 'MODEL', 'MODERN', 'MOLECULAR', 'MOMENT', 'MONEY', 'MONKEY',
  'MONTH', 'MOOD', 'MOON', 'MORE', 'MORNING', 'MOST', 'MOSTLY', 'MOTHER',
  'MOTION', 'MOTOR', 'MOUNTAIN', 'MOUSE', 'MOUTH', 'MOVE', 'MOVEMENT', 'MOVIE',
  'MOVING', 'MUD', 'MUSCLE', 'MUSIC', 'MUSICAL', 'MUST', 'MY', 'MYSELF',
  'MYSTERIOUS', 'NAILS', 'NAME', 'NATION', 'NATIONAL', 'NATIVE', 'NATURAL', 'NATURALLY',
  'NATURE', 'NEAR', 'NEARBY', 'NEARER', 'NEAREST', 'NEARLY', 'NECESSARY', 'NECK',
  'NEEDED', 'NEEDLE', 'NEEDS', 'NEGATIVE', 'NEIGHBOR', 'NEIGHBORHOOD', 'NERVOUS', 'NEST',
  'NEVER', 'NEW', 'NEWS', 'NEWSPAPER', 'NEXT', 'NICE', 'NIGHT', 'NINE',
  'NO', 'NOBODY', 'NODDED', 'NOISE', 'NONE', 'NOON', 'NOR', 'NORTH',
  'NOSE', 'NOT', 'NOTE', 'NOTED', 'NOTHING', 'NOTICE', 'NOUN', 'NOW',
  'NUMBER', 'NUMERAL', 'NUTS', 'OBJECT', 'OBSERVE', 'OBTAIN', 'OCCASIONALLY', 'OCCUR',
  'OCEAN', 'OF', 'OFF', 'OFFER', 'OFFICE', 'OFFICER', 'OFFICIAL', 'OIL',
  'OLD', 'OLDER', 'OLDEST', 'ON', 'ONCE', 'ONE', 'ONLY', 'ONTO',
  'OPEN', 'OPERATION', 'OPINION', 'OPPORTUNITY', 'OPPOSITE', 'OR', 'ORANGE', 'ORBIT',
  'ORDER', 'ORDINARY', 'ORGANIZATION', 'ORGANIZED', 'ORIGIN', 'ORIGINAL', 'OTHER', 'OUGHT',
  'OUR', 'OURSELVES', 'OUT', 'OUTER', 'OUTLINE', 'OUTSIDE', 'OVER', 'OWN',
  'OWNER', 'OXYGEN', 'PACK', 'PACKAGE', 'PAGE', 'PAID', 'PAIN', 'PAINT',
  'PAIR', 'PALACE', 'PALE', 'PAN', 'PAPER', 'PARAGRAPH', 'PARALLEL', 'PARENT',
  'PARK', 'PART', 'PARTICLES', 'PARTICULAR', 'PARTICULARLY', 'PARTLY', 'PARTS', 'PARTY',
  'PASS', 'PASSAGE', 'PAST', 'PATH', 'PATTERN', 'PAY', 'PEACE', 'PEN',
  'PENCIL', 'PEOPLE', 'PER', 'PERCENT', 'PERFECT', 'PERFECTLY', 'PERHAPS', 'PERIOD',
  'PERSON', 'PERSONAL', 'PET', 'PHRASE', 'PHYSICAL', 'PIANO', 'PICK', 'PICTURE',
  'PICTURED', 'PIE', 'PIECE', 'PIG', 'PILE', 'PILOT', 'PINE', 'PINK',
  'PIPE', 'PITCH', 'PLACE', 'PLAIN', 'PLAN', 'PLANE', 'PLANET', 'PLANNED',
  'PLANNING', 'PLANT', 'PLASTIC', 'PLATE', 'PLATES', 'PLAY', 'PLEASANT', 'PLEASE',
  'PLEASURE', 'PLENTY', 'PLURAL', 'PLUS', 'POCKET', 'POEM', 'POET', 'POETRY',
  'POINT', 'POLE', 'POLICE', 'POLICEMAN', 'POLITICAL', 'POND', 'PONY', 'POOL',
  'POOR', 'POPULAR', 'POPULATION', 'PORCH', 'PORT', 'POSITION', 'POSITIVE', 'POSSIBLE',
  'POSSIBLY', 'POST', 'POT', 'POTATOES', 'POUND', 'POUR', 'POWDER', 'POWER',
  'POWERFUL', 'PRACTICAL', 'PRACTICE', 'PREPARE', 'PRESENT', 'PRESIDENT', 'PRESS', 'PRESSURE',
  'PRETTY', 'PREVENT', 'PREVIOUS', 'PRICE', 'PRIDE', 'PRIMITIVE', 'PRINCIPAL', 'PRINCIPLE',
  'PRINTED', 'PRIVATE', 'PRIZE', 'PROBABLY', 'PROBLEM', 'PROCESS', 'PRODUCE', 'PRODUCT',
  'PRODUCTION', 'PROGRAM', 'PROGRESS', 'PROMISED', 'PROPER', 'PROPERLY', 'PROPERTY', 'PROTECTION',
  'PROUD', 'PROVE', 'PROVIDE', 'PUBLIC', 'PULL', 'PUPIL', 'PURE', 'PURPLE',
  'PURPOSE', 'PUSH', 'PUT', 'PUTTING', 'QUARTER', 'QUEEN', 'QUESTION', 'QUICK',
  'QUICKLY', 'QUIET', 'QUIETLY', 'QUITE', 'RABBIT', 'RACE', 'RADIO', 'RAILROAD',
  'RAIN', 'RAISE', 'RAN', 'RANCH', 'RANGE', 'RAPIDLY', 'RATE', 'RATHER',
  'RAW', 'RAYS', 'REACH', 'READ', 'READER', 'READY', 'REAL', 'REALIZE',
  'REAR', 'REASON', 'RECALL', 'RECEIVE', 'RECENT', 'RECENTLY', 'RECOGNIZE', 'RECORD',
  'RED', 'REFER', 'REFUSED', 'REGION', 'REGULAR', 'RELATED', 'RELATIONSHIP', 'RELIGIOUS',
  'REMAIN', 'REMARKABLE', 'REMEMBER', 'REMOVE', 'REPEAT', 'REPLACE', 'REPLIED', 'REPORT',
  'REPRESENT', 'REQUIRE', 'RESEARCH', 'RESPECT', 'REST', 'RESULT', 'RETURN', 'REVIEW',
  'RHYME', 'RHYTHM', 'RICE', 'RICH', 'RIDE', 'RIDING', 'RIGHT', 'RING',
  'RISE', 'RISING', 'RIVER', 'ROAD', 'ROAR', 'ROCK', 'ROCKET', 'ROCKY',
  'ROD', 'ROLL', 'ROOF', 'ROOM', 'ROOT', 'ROPE', 'ROSE', 'ROUGH',
  'ROUND', 'ROUTE', 'ROW', 'RUBBED', 'RUBBER', 'RULE', 'RULER', 'RUN',
  'RUNNING', 'RUSH', 'SAD', 'SADDLE', 'SAFE', 'SAFETY', 'SAID', 'SAIL',
  'SALE', 'SALMON', 'SALT', 'SAME', 'SAND', 'SANG', 'SAT', 'SATELLITES',
  'SATISFIED', 'SAVE', 'SAVED', 'SAW', 'SAY', 'SCALE', 'SCARED', 'SCENE',
  'SCHOOL', 'SCIENCE', 'SCIENTIFIC', 'SCIENTIST', 'SCORE', 'SCREEN', 'SEA', 'SEARCH',
  'SEASON', 'SEAT', 'SECOND', 'SECRET', 'SECTION', 'SEE', 'SEED', 'SEEING',
  'SEEMS', 'SEEN', 'SELDOM', 'SELECT', 'SELECTION', 'SELL', 'SEND', 'SENSE',
  'SENT', 'SENTENCE', 'SEPARATE', 'SERIES', 'SERIOUS', 'SERVE', 'SERVICE', 'SETS',
  'SETTING', 'SETTLE', 'SETTLERS', 'SEVEN', 'SEVERAL', 'SHADE', 'SHADOW', 'SHAKE',
  'SHAKING', 'SHALL', 'SHALLOW', 'SHAPE', 'SHARE', 'SHARP', 'SHE', 'SHEEP',
  'SHEET', 'SHELF', 'SHELLS', 'SHELTER', 'SHINE', 'SHINNING', 'SHIP', 'SHIRT',
  'SHOE', 'SHOOT', 'SHOP', 'SHORE', 'SHORT', 'SHORTER', 'SHOT', 'SHOULD',
  'SHOULDER', 'SHOUT', 'SHOW', 'SHOWN', 'SHUT', 'SICK', 'SIDES', 'SIGHT',
  'SIGN', 'SIGNAL', 'SILENCE', 'SILENT', 'SILK', 'SILLY', 'SILVER', 'SIMILAR',
  'SIMPLE', 'SIMPLEST', 'SIMPLY', 'SINCE', 'SING', 'SINGLE', 'SINK', 'SISTER',
  'SIT', 'SITTING', 'SITUATION', 'SIX', 'SIZE', 'SKILL', 'SKIN', 'SKY',
  'SLABS', 'SLAVE', 'SLEEP', 'SLEPT', 'SLIDE', 'SLIGHT', 'SLIGHTLY', 'SLIP',
  'SLIPPED', 'SLOPE', 'SLOW', 'SLOWLY', 'SMALL', 'SMALLER', 'SMALLEST', 'SMELL',
  'SMILE', 'SMOKE', 'SMOOTH', 'SNAKE', 'SNOW', 'SO', 'SOAP', 'SOCIAL',
  'SOCIETY', 'SOFT', 'SOFTLY', 'SOIL', 'SOLAR', 'SOLD', 'SOLDIER', 'SOLID',
  'SOLUTION', 'SOLVE', 'SOME', 'SOMEBODY', 'SOMEHOW', 'SOMEONE', 'SOMETHING', 'SOMETIME',
  'SOMEWHERE', 'SON', 'SONG', 'SOON', 'SORT', 'SOUND', 'SOURCE', 'SOUTH',
  'SOUTHERN', 'SPACE', 'SPEAK', 'SPECIAL', 'SPECIES', 'SPECIFIC', 'SPEECH', 'SPEED',
  'SPELL', 'SPEND', 'SPENT', 'SPIDER', 'SPIN', 'SPIRIT', 'SPITE', 'SPLIT',
  'SPOKEN', 'SPORT', 'SPREAD', 'SPRING', 'SQUARE', 'STAGE', 'STAIRS', 'STAND',
  'STANDARD', 'STAR', 'STARED', 'START', 'STATE', 'STATEMENT', 'STATION', 'STAY',
  'STEADY', 'STEAM', 'STEEL', 'STEEP', 'STEMS', 'STEP', 'STEPPED', 'STICK',
  'STIFF', 'STILL', 'STOCK', 'STOMACH', 'STONE', 'STOOD', 'STOP', 'STOPPED',
  'STORE', 'STORM', 'STORY', 'STOVE', 'STRAIGHT', 'STRANGE', 'STRANGER', 'STRAW',
  'STREAM', 'STREET', 'STRENGTH', 'STRETCH', 'STRIKE', 'STRING', 'STRIP', 'STRONG',
  'STRONGER', 'STRUCK', 'STRUCTURE', 'STRUGGLE', 'STUCK', 'STUDENT', 'STUDIED', 'STUDYING',
  'SUBJECT', 'SUBSTANCE', 'SUCCESS', 'SUCCESSFUL', 'SUCH', 'SUDDEN', 'SUDDENLY', 'SUGAR',
  'SUGGEST', 'SUIT', 'SUM', 'SUMMER', 'SUN', 'SUNLIGHT', 'SUPPER', 'SUPPLY',
  'SUPPORT', 'SUPPOSE', 'SURE', 'SURFACE', 'SURPRISE', 'SURROUNDED', 'SWAM', 'SWEET',
  'SWEPT', 'SWIM', 'SWIMMING', 'SWING', 'SWUNG', 'SYLLABLE', 'SYMBOL', 'SYSTEM',
  'TABLE', 'TAIL', 'TAKE', 'TAKEN', 'TALES', 'TALK', 'TALL', 'TANK',
  'TAPE', 'TASK', 'TASTE', 'TAUGHT', 'TAX', 'TEA', 'TEACH', 'TEACHER',
  'TEAM', 'TEARS', 'TEETH', 'TELEPHONE', 'TELEVISION', 'TELL', 'TEMPERATURE', 'TEN',
  'TENT', 'TERM', 'TERRIBLE', 'TEST', 'THAN', 'THANK', 'THAT', 'THEE',
  'THEM', 'THEMSELVES', 'THEN', 'THEORY', 'THERE', 'THEREFORE', 'THESE', 'THEY',
  'THICK', 'THIN', 'THING', 'THINK', 'THIRD', 'THIRTY', 'THIS', 'THOSE',
  'THOU', 'THOUGH', 'THOUGHT', 'THOUSAND', 'THREAD', 'THREE', 'THREW', 'THROAT',
  'THROUGH', 'THROUGHOUT', 'THROW', 'THROWN', 'THUMB', 'THUS', 'THY', 'TIDE',
  'TIE', 'TIGHT', 'TIGHTLY', 'TILL', 'TIME', 'TIN', 'TINY', 'TIP',
  'TIRED', 'TITLE', 'TO', 'TOBACCO', 'TODAY', 'TOGETHER', 'TOLD', 'TOMORROW',
  'TONE', 'TONGUE', 'TONIGHT', 'TOO', 'TOOK', 'TOOL', 'TOP', 'TOPIC',
  'TORN', 'TOTAL', 'TOUCH', 'TOWARD', 'TOWER', 'TOWN', 'TOY', 'TRACE',
  'TRACK', 'TRADE', 'TRAFFIC', 'TRAIL', 'TRAIN', 'TRANSPORTATION', 'TRAP', 'TRAVEL',
  'TREATED', 'TREE', 'TRIANGLE', 'TRIBE', 'TRICK', 'TRIED', 'TRIP', 'TROOPS',
  'TROPICAL', 'TROUBLE', 'TRUCK', 'TRUNK', 'TRUTH', 'TRY', 'TUBE', 'TUNE',
  'TURN', 'TWELVE', 'TWENTY', 'TWICE', 'TWO', 'TYPE', 'TYPICAL', 'UNCLE',
  'UNDER', 'UNDERLINE', 'UNDERSTANDING', 'UNHAPPY', 'UNION', 'UNIT', 'UNIVERSE', 'UNKNOWN',
  'UNLESS', 'UNTIL', 'UNUSUAL', 'UP', 'UPON', 'UPPER', 'UPWARD', 'US',
  'USE', 'USEFUL', 'USING', 'USUAL', 'USUALLY', 'VALLEY', 'VALUABLE', 'VALUE',
  'VAPOR', 'VARIETY', 'VARIOUS', 'VAST', 'VEGETABLE', 'VERB', 'VERTICAL', 'VERY',
  'VESSELS', 'VICTORY', 'VIEW', 'VILLAGE', 'VISIT', 'VISITOR', 'VOICE', 'VOLUME',
  'VOTE', 'VOWEL', 'VOYAGE', 'WAGON', 'WAIT', 'WALK', 'WALL', 'WANT',
  'WAR', 'WARM', 'WARN', 'WAS', 'WASH', 'WASTE', 'WATCH', 'WATER',
  'WAVE', 'WAY', 'WE', 'WEAK', 'WEALTH', 'WEAR', 'WEATHER', 'WEEK',
  'WEIGH', 'WEIGHT', 'WELCOME', 'WELL', 'WENT', 'WERE', 'WEST', 'WESTERN',
  'WET', 'WHALE', 'WHAT', 'WHATEVER', 'WHEAT', 'WHEEL', 'WHEN', 'WHENEVER',
  'WHERE', 'WHEREVER', 'WHETHER', 'WHICH', 'WHILE', 'WHISPERED', 'WHISTLE', 'WHITE',
  'WHO', 'WHOLE', 'WHOM', 'WHOSE', 'WHY', 'WIDE', 'WIDELY', 'WIFE',
  'WILD', 'WILL', 'WILLING', 'WIN', 'WIND', 'WINDOW', 'WING', 'WINTER',
  'WIRE', 'WISE', 'WISH', 'WITH', 'WITHIN', 'WITHOUT', 'WOLF', 'WOMEN',
  'WON', 'WONDER', 'WONDERFUL', 'WOOD', 'WOODEN', 'WOOL', 'WORD', 'WORE',
  'WORK', 'WORKER', 'WORLD', 'WORRIED', 'WORRY', 'WORSE', 'WORTH', 'WOULD',
  'WRAPPED', 'WRITE', 'WRITER', 'WRITING', 'WRITTEN', 'WRONG', 'WROTE', 'YARD',
  'YEAR', 'YELLOW', 'YES', 'YESTERDAY', 'YET', 'YOU', 'YOUNG', 'YOUNGER',
  'YOUR', 'YOURSELF', 'YOUTH', 'ZERO', 'ZOO'];

