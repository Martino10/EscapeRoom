function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + 
    ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x==c_name)
        {
        return unescape(y);
        }
      }
}


var song = document.getElementsByTagName('audio')[0];
song.volume = 0.2;
var played = false;
var tillPlayed = getCookie('timePlayed');
const tryplay = () => {
    try{
        song.play()
        played = true
    } catch {
        played= false
    }
}


function update()
{
    if(!played){
        if(tillPlayed){
        song.currentTime = tillPlayed;

        tryplay()
        }
        else {
            tryplay()
        }
    }

    else {
    setCookie('timePlayed', song.currentTime);
    }
}
setInterval(update,0); 