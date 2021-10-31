var timerVars = {};


// Voeg hier de pagina naam toe van spellen, de timer is gepauzeerd als het niet op 1 van deze pagina's is
let run_on_pages = [
    'puzzle2.html',
    'spel3.html',
    'puzzle1.html',
]

const next = () => { //next page
    // test functie?
    saveTime()
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

const saveTime = () => {
    sessionStorage.setItem("minRemaining", timerVars.minutes);
    sessionStorage.setItem("secRemaining", timerVars.seconds);
    console.log('Session stored!');
}

const isTimerPaused = () => {
    let out = true
    run_on_pages.forEach(element => {
        if (window.location.href.includes(element)) {
            out = false
        }
    })
    return out
}

const getTimeStrings = (minutes, seconds) => {
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return [minutes, seconds]
}

const getTimeString = (minutes, seconds) => {
    let res = getTimeStrings(minutes, seconds)
    return res[0] + ':' + res[1]
}

const stopTimer = () => {
    clearInterval(window.myTimer)
}

const doPortraitCheck = () => {
    if (window.screen.height > window.screen.width) {
        clearInterval(window.portraitchecker)
        alert('This game can only be played in landscape mode, please turn your phone 90 degrees, or make the browser window wider')
        // h = window.screen.height
        // window.screen.height = window.screen.width
        // window.screen.width = h
        setTimeout(() => {window.portraitchecker = setInterval(doPortraitCheck, 500)}, 5000)
        return false
    }
    return true
}

const startTimer = (duration) => { //start the countdown
    if (isTimerPaused()) {
        console.log('timer is NOT running');
        return
    }
    var timer = duration, minutes, seconds;
    window.myTimer = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        timerVars.minutes = minutes;
        timerVars.seconds = seconds;
        
        // save the time every 15 seconds
        if (seconds % 15 == 0){
            saveTime()
        }

        updateDisplay(minutes, seconds)

        if (--timer < 0) {
            console.log('TIMER RAN OUT!');
            window.location.href = 'out_of_time.html'
            timer = duration;
        }
    }, 1000);
}

const updateDisplay = (minutes, seconds) => {

    let display = document.getElementById('time__js')
    display.textContent = getTimeString(minutes, seconds);

}
    // was dit voor testen?
    // if (window.location.href.includes('timerdemo2.html')) { //if it's on this page, stop the countdown
    //     var minutes = parseInt(sessionStorage.getItem("minRemaining"));
    //     var seconds = parseInt(sessionStorage.getItem("secRemaining"));

    //     timerVars.minutes = minutes; //make variables global
    //     timerVars.seconds = seconds;
        
    //     minutes = minutes < 10 ? "0" + minutes : minutes;
    //     seconds = seconds < 10 ? "0" + seconds : seconds;

    //     display.textContent = minutes + ":" + seconds; //write down the time
    //     clearInterval(window.myTimer); //stop the countdown
    // }


window.addEventListener("load", () => {
    var tenMinutes = 60 * 10;
    // console.log(minRemaining, secRemaining);
    
    if (sessionStorage.getItem("minRemaining") == null){ //if it's the first time counting down
        // startTimer(tenMinutes);
        console.log('New session created')
        timerVars.minutes = 10
        timerVars.seconds = 0
        saveTime()
    } else {
        console.log('Session exists: ',sessionStorage.getItem("minRemaining"));
        if (sessionStorage.getItem("minRemaining") == 0 && sessionStorage.getItem("secRemaining") == 0){
            console.log('Timer expired, resetting')
            timerVars.minutes = 10
            timerVars.seconds = 0
            saveTime()
        }
    }
    
    
    let minRemaining = parseInt(sessionStorage.getItem("minRemaining"));
    let secRemaining = parseInt(sessionStorage.getItem("secRemaining"));
    updateDisplay(minRemaining, secRemaining)
    startTimer(minRemaining * 60 + secRemaining);


    window.portraitchecker = setInterval(doPortraitCheck, 500)
    if (isTimerPaused()) {
        document.getElementById('time__js').style = 'color: gray;';
    } else {
        document.getElementById('skip__knop__js').disabled = true;
    }
}
, true)