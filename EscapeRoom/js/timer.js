var timerVars = {};


// Voeg hier de pagina naam toe van spellen, de timer is gepauzeerd als het niet op 1 van deze pagina's is
let run_on_pages = [
    'puzzle2.html',
    'puzzle3.html',
    'puzzle1.html',
    'puzzle2-window.html',
    'puzzle2-2.html'
]

const saveTime = () => {
    sessionStorage.setItem("minRemaining", timerVars.minutes);
    sessionStorage.setItem("secRemaining", timerVars.seconds);
    // console.log('Session stored!');
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
        
        // save the time every second
        if (seconds % 1 == 0){
            saveTime()
        }

        updateDisplay(minutes, seconds)

        if (--timer < 0) {  
            console.log('TIMER RAN OUT!');
            window.location.href = 'out_of_time.html';
            timer = duration;
        }
    }, 1000);
}

const updateDisplay = (minutes, seconds) => {

    let display = document.getElementById('time__js');
    display.textContent = getTimeString(minutes, seconds);

}

const getTimeRemaining = (minutes, seconds) => {

    let timeRemaining = document.getElementById('js__timeleft');
    timeRemaining.textContent = getTimeString(minutes, seconds);

}

const getTimeElapsed = (minutes, seconds) => {
    let minRemaining = minutes;
    let secRemaining = seconds;

    let secElapsed = 60 - secRemaining;
    let minElapsed = 9 - minRemaining;

    // insert elapsed time into ending text, change grammar when minElapsed and/or secElapsed is 1
    if (minElapsed == 1) {
        let text_minElapsed = document.getElementById('js__minElapsed');
        text_minElapsed.textContent = minElapsed + " minute";
    }
    else {
        let text_minElapsed = document.getElementById('js__minElapsed');
        text_minElapsed.textContent = minElapsed + " minutes";
    }

    if (secElapsed == 1) {
        let text_secElapsed = document.getElementById('js__secElapsed');
        text_secElapsed.textContent = secElapsed + " second";
    }
    else {
        let text_secElapsed = document.getElementById('js__secElapsed');
        text_secElapsed.textContent = secElapsed + " seconds";
    }
}

window.addEventListener("load", () => {
    
    if (sessionStorage.getItem("minRemaining") == null){ //if it's the first time counting down
        console.log('New session created');
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
    if (window.location.href.includes('done')) {
        getTimeRemaining(minRemaining, secRemaining)
        document.getElementById('skip__knop__js').disabled = true;
    }
    else if (window.location.href.includes('EINDE')) {
        getTimeElapsed(minRemaining, secRemaining)
    }
    startTimer(minRemaining * 60 + secRemaining);

    window.portraitchecker = setInterval(doPortraitCheck, 500)
    if (isTimerPaused()) {
        document.getElementById('time__js').style = 'color: gray;';}
    else {
        document.getElementById('skip__knop__js').disabled = true;
    }
    }, true)