function registerName() {
    var input = document.getElementById("userInput").value;
    
    //set name
    if (input != "") {
        sessionStorage.setItem("playerName", input);
        location.href = 'Dialoog_1.html';
    }
    else {
        alert("Error: Please register your name.");
    }


}