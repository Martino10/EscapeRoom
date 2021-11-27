let sound__icon = document.getElementById('signal__icon__js');
let x__mark__icon = document.getElementById('x__mark__js');

let state__sound = 1;

let song_obj = document.getElementsByTagName('audio')[0];

const save_state = () => {
  sessionStorage.setItem('Muted',state__sound)
}

const mute = (state) => {
  if (song_obj != undefined) {
    if (state) {
      song_obj.volume = 0;  
    } else {
      song_obj.volume = 0.2;  

  }}
  save_state()
}




function switch__icons__sound(){
  if (state__sound == 1){
    state__sound = 0;
    sound__icon.style.display = "none";
    x__mark__icon.style.display = "block";
    mute(true);
    } else {
    state__sound = 1;
    sound__icon.style.display = "block";
    x__mark__icon.style.display = "none";
    mute(false)
  }
  // console.log(state__sound)
  // console.log(sound__icon)
  // console.log(x__mark__icon)
}

// window.addEventListener("load", () => {
window.onload = () => {
  let sesh = sessionStorage.getItem("Muted")
  if (sesh == null) {
    state__sound = 1;
  } else {
    if (sesh != state__sound) {
      switch__icons__sound()
    }
  }
}
// })