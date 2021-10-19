var timerVars = {};

function next() { //next page
    sessionStorage.setItem("minRemaining", timerVars.minutes);
    sessionStorage.setItem("secRemaining", timerVars.seconds);
    if (window.location.href.includes('timerdemo.html')) { 
        window.location.href = 'timerdemo2.html';
    }
    else if (window.location.href.includes('timerdemo2.html')) {
        window.location.href = 'timerdemo3.html';
    }
    else {
        window.location.href = 'timerdemo.html';
    }
}

function startTimer(duration) { //start the countdown
    var timer = duration, minutes, seconds;
    var display = document.querySelector('#time');
    window.myTimer = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        timerVars.minutes = minutes;
        timerVars.seconds = seconds;
        
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);

    if (window.location.href.includes('timerdemo2.html')) { //if it's on this page, stop the countdown
        var minutes = parseInt(sessionStorage.getItem("minRemaining"));
        var seconds = parseInt(sessionStorage.getItem("secRemaining"));

        timerVars.minutes = minutes; //make variables global
        timerVars.seconds = seconds;
        
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds; //write down the time
        clearInterval(window.myTimer); //stop the countdown
    }
}

window.onload = function () {
    var tenMinutes = 60 * 10;
    var minRemaining = parseInt(sessionStorage.getItem("minRemaining"));
    var secRemaining = parseInt(sessionStorage.getItem("secRemaining"));
    console.log(minRemaining, secRemaining);
    
    if (sessionStorage.getItem("minRemaining") == null){ //if it's the first time counting down
        startTimer(tenMinutes);
    }
    else {
        startTimer(minRemaining * 60 + secRemaining);
    }
};