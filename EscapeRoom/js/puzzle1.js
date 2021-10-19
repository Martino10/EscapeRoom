var sound__icon = document.getElementById('signal__icon__js');
var x__mark__icon = document.getElementById('x__mark__js');

var state__sound = 1;

function switch__icons__sound(){
  if (state__sound == 1){
    state__sound = 0;
    sound__icon.style.display = "none";
    x__mark__icon.style.display = "block";
  } else {
    state__sound = 1;
    sound__icon.style.display = "block";
    x__mark__icon.style.display = "none";
  }
  console.log(state__sound)
  console.log(sound__icon)
  console.log(x__mark__icon)
}
