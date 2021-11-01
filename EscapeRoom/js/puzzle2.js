var buttonClicked = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false
}
var clickOrder = [];

document.getElementById("js__windowbutton").disabled = true;

function checkAll() {
    if (buttonClicked[1] && buttonClicked[2] && buttonClicked[3] && buttonClicked[4] && buttonClicked[5] && buttonClicked[6]) {
        if (clickOrder[0] == 1 && clickOrder[1] == 2 && clickOrder[2] == 3 && clickOrder[3] == 4 && clickOrder[4] == 5 && clickOrder[5] == 6) {
            console.log("Congrats!");
            document.body.style.background = "url('img/second_frame.png')";
            document.getElementById("js__windowbutton").disabled = false;
            return;
        }
        else { console.log("try again.");}
        setTimeout(() => { for (i = 1; i <= 6; i++) {
            document.getElementById("buttonimg" + i).src = "img/button_unpressed.png";
        } }, 1000);

        buttonClicked = {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false
        }
    }
}

function button_clicked(num) {
    document.getElementById("buttonimg" + num).src = "img/button_pressed.png";
    document.getElementById("js__button" + num).disabled = true;
    buttonClicked[num] = true;
    clickOrder.push(num);
    checkAll();
}

function viewWindow() {
    location.href = 'puzzle2-window.html';
}

function foundDoorhandle() {
    console.log("Doorhandle found!");
    location.href = 'puzzle2done.html';
}