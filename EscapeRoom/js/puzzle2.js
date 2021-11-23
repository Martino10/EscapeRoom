//variables
buttonClicked = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false
}
clickOrder = [];

const checkAll = () => {
    if (buttonClicked[1] && buttonClicked[2] && buttonClicked[3] && buttonClicked[4] && buttonClicked[5] && buttonClicked[6]) {
        if (clickOrder[0] == 1 && clickOrder[1] == 2 && clickOrder[2] == 3 && clickOrder[3] == 4 && clickOrder[4] == 5 && clickOrder[5] == 6) {
            location.href = 'puzzle2-dialoog2.html';
            return;
        }
        else { console.log("try again.");}

        //reset buttons
        setTimeout(() => { for (i = 1; i <= 6; i++) {
            document.getElementById("buttonimg" + i).src = "img/button_unpressed.png";
            document.getElementById("js__button" + i).disabled = false;
            
        } }, 1000);
        buttonClicked = {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false
        }
        clickOrder = [];
    }
}

const button_clicked = (num) => {
    document.getElementById("buttonimg" + num).src = "img/button_pressed.png";
    document.getElementById("js__button" + num).disabled = true;
    buttonClicked[num] = true;
    clickOrder.push(num);
    checkAll();
}

const viewWindow = () => {
    location.href = 'puzzle2-window.html';
}

const foundDoorhandle = () => {
    location.href = 'puzzle2-dialoog3.html';
}

//Voor de hints
const showHint = () => {
    document.getElementById('hintbox__js').classList.remove('hidden');
    document.getElementById('js__hint').classList.add('hidden');
}

const closeHint = () => {
    document.getElementById('hintbox__js').classList.add('hidden');
    document.getElementById('js__hint').classList.remove('hidden');
}

var check_time = window.setInterval(function(){
        checkTime();
  }, 1000);

const checkTime = () => {
    let minRemaining = parseInt(sessionStorage.getItem("minRemaining"));
    if (minRemaining < 5) {
        document.getElementById("js__hint").style.visibility = "visible";
    }
}