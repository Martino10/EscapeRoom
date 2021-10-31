let msg_index = 0;
let txt_index = 0;
let speed = 4;
let speed_modifier = 1.0;
let all_msg = [HTMLCollection]
let chunk = 1
let wait = 500

const generate_html = (naam, tekst, add_naam=false) => {    
    let out = ''

    if (add_naam) {
        out += '<section data-joined="false" class="dialogcontainer">'
        out += '<h1 class="dialogname">'+naam+'</h1>'
    } else {
        out += '<section data-joined="true" class="dialogcontainer">'
        out += '<h1 class="dialogname"></h1>'
    }
    out += '<p class="dialogtext">'+tekst+'</p>'
    out += '</section>'
    return out
}
const update_element = (obj, html) => {
    obj.innerHTML = html
    // console.log('updated ',obj)
}

const substep = () => {

}

const step = () => {
    console.log('step');
    let msg = all_msg[msg_index]
    let tekst = msg.dataset.tekst
    let naam = msg.dataset.naam

    let add_naam = true
    if (msg_index > 0) {
        if (all_msg[msg_index-1].dataset.naam == naam) {
            add_naam = false;
        }
    }

    update_element(msg, generate_html(naam, tekst.slice(0, txt_index+chunk), add_naam))
    txt_index += chunk
    // console.log(txt_index)
    
    if (txt_index >= tekst.length) {
        txt_index = 0;
        msg_index++;
        if (msg_index < all_msg.length) {
            setTimeout(step, wait)
        }
    } else {
        setTimeout(step, 1000/(speed*speed_modifier))
    }
    // for (let i = 0; i < speed; i++) {
    //     if (txt_index+i <= tekst.length ) {
    //         setTimeout(() => {
    //             const myindex = txt_index + i
    //             update_element(msg, generate_html(naam, tekst.slice(0, myindex), add_naam))
    //             txt_index++;
    //         }, (1500/speed)*i);
    //     }
        
    // }
    // if (txt_index+speed >= tekst.length) {
    //     setTimeout(() => {
    //     msg_index = Math.min(all_msg.length-1, msg_index+1)
    //     txt_index = 0
    //     }, 2000)
    // }
    
}

const main = () => {
    let grandpa = document.getElementById('js__dialogs')
    all_msg = grandpa.children
    console.log(all_msg)
    console.log(all_msg[0])

    speed = parseInt(grandpa.dataset.snelheid)
    chunk = parseInt(grandpa.dataset.chunk)
    wait = parseInt(grandpa.dataset.wait)
    // console.log('speed set to',speed)
    // console.log('chunk set to',chunk)
    console.log(chunk,'letters every',1000/speed,'seconds, with',wait/1000,'seconds between dialogs')

    step();
    // setInterval(step, 1000)
}


window.onload = main