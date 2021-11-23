const answer = ["4", "2", "6", "1", "7"]

invulveld__1 = document.getElementById("invulveld1__js")
invulveld__2 = document.getElementById("invulveld2__js")
invulveld__3 = document.getElementById("invulveld3__js")
invulveld__4 = document.getElementById("invulveld4__js")
invulveld__5 = document.getElementById("invulveld5__js")
hint__scherm = document.getElementById("hints__js")

function delete__input(){
    invulveld__1.innerHTML = ""
    invulveld__2.innerHTML = ""
    invulveld__3.innerHTML = ""
    invulveld__4.innerHTML = ""
    invulveld__5.innerHTML = ""
}


function invullen(getal){
    if (invulveld__1.innerHTML == ""){
        invulveld__1.innerHTML = getal
    } else if (invulveld__2.innerHTML == ""){
        invulveld__2.innerHTML = getal
    } else if (invulveld__3.innerHTML == ""){
        invulveld__3.innerHTML = getal
    } else if (invulveld__4.innerHTML == ""){
        invulveld__4.innerHTML = getal
    } else if (invulveld__5.innerHTML == ""){
        invulveld__5.innerHTML = getal
        if (check__input() == false) {
            let new_hint = "<br>" + invulveld__1.innerHTML + invulveld__2.innerHTML + invulveld__3.innerHTML + invulveld__4.innerHTML + invulveld__5.innerHTML + 
            " ==> " + maakhint(invulveld__1.innerHTML, invulveld__2.innerHTML, invulveld__3.innerHTML, invulveld__4.innerHTML, invulveld__5.innerHTML)
            hint__scherm.innerHTML += new_hint;
            
        } else {
            window.location.href = 'puzzle1done.html'
        }
    } 
}

function check__input(){
    if (invulveld__1.innerHTML == answer[0] && invulveld__2.innerHTML == answer[1] && invulveld__3.innerHTML == answer[2] && invulveld__4.innerHTML == answer[3] && invulveld__5.innerHTML == answer[4]){
        console.log("yay")
    } else {
        return false
    }
}

function maakhint(getal1, getal2, getal3, getal4, getal5){
    let CC = 0
    let CW = 0
    const input = [getal1, getal2, getal3, getal4, getal5]
    for (let i = 0; i < input.length; i++){
        if (input[i] == answer[i]){
            CC += 1
        } else if (answer.includes(input[i])){
            CW += 1

        }
    }
    delete__input()
    return(CW + "CW & " + CC + "CC ")
}

let options = ["1","2","3","4","5","6","7","8","9","0"]

function backspace(){
    if (options.includes(invulveld__5.innerHTML)){
        invulveld__5.innerHTML = ""
    } else if (options.includes(invulveld__4.innerHTML)){
        invulveld__4.innerHTML = ""
    } else if (options.includes(invulveld__3.innerHTML)){
        invulveld__3.innerHTML = ""
    } else if (options.includes(invulveld__2.innerHTML)){
        invulveld__2.innerHTML = ""
    } else if (options.includes(invulveld__1.innerHTML)){
        invulveld__1.innerHTML = ""
    }
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

  
function checkTime() {
    let minRemaining = parseInt(sessionStorage.getItem("minRemaining"));
    if (minRemaining < 7) { //Verander naar minuut waar je wilt dat de hint beschikbaar is
        document.getElementById("js__hint").style.visibility = "visible";
    }
}