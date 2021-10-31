var buttonClicked = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false
}
var clickOrder = [];

function checkAll() {
    if (buttonClicked[1] && buttonClicked[2] && buttonClicked[3] && buttonClicked[4] && buttonClicked[5] && buttonClicked[6]) {
        if (clickOrder[0] == 1 && clickOrder[1] == 2 && clickOrder[2] == 3 && clickOrder[3] == 4 && clickOrder[4] == 5 && clickOrder[5] == 6) {
            console.log("Congrats!");
            document.body.style.background = "url('img/second_frame.png')";
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

const onload = () => {
    button1 = document.getElementById("js__button1")
    button2 = document.getElementById("js__button2")
    button3 = document.getElementById("js__button3")
    button4 = document.getElementById("js__button4")
    button5 = document.getElementById("js__button5")
    button6 = document.getElementById("js__button6")
}

window.onload = onload