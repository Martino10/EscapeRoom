function puzzle2Next() {
    if (window.location.href.includes('dialoog3')) {
        location.href = 'puzzle2done.html';
    }
    else if (window.location.href.includes('dialoog2')) {
        document.body.style.background = "url('img/second_frame.png')";
        location.href = 'puzzle2-2.html';
    }
    else {
        location.href = 'puzzle2.html';
    }
   
}