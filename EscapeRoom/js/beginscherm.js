window.onload = () => {
    window.portraitchecker = setInterval(doPortraitCheck, 500)
}

const doPortraitCheck = () => {
    if (window.screen.height > window.screen.width) {
        clearInterval(window.portraitchecker)
        alert('This game can only be played in landscape mode, please turn your phone 90 degrees, or make the browser window wider')
        setTimeout(() => {window.portraitchecker = setInterval(doPortraitCheck, 500)}, 5000)
        return false
    }
    return true
}