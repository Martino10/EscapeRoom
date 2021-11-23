function registerName() {
    let input = document.getElementById("userInput").value;
    
    //set name
    if (input != "") {
        if (input.length > 15) {
            alert("Error: Your name should be 15 characters or less.");
            input = "";
        }
        else {
            sessionStorage.setItem("playerName", input);
            location.href = 'dialoog_1.html';
        }
    }
    else {
        alert("Error: Please register your name.");
    }


}