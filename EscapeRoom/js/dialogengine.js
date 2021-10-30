let msg_index = 0;
let txt_index = 0;
let speed = 4;
let all_msg = [HTMLCollection]

const generate_html = (naam, tekst, add_naam=false) => {    
    let out = ''

    if (add_naam) {
        out += '<h1>'+naam+'</h1>'
    } else {
        out += '<h1></h1>'
    }
    out += '<p>'+tekst+'</p>'
    return out
}
const update_element = (obj, html) => {
    obj.innerHTML = html
    console.log('updated ',obj)
}

const step = () => {
    console.log('step');
    let msg = all_msg[msg_index]
    let tekst = msg.tekst
    let naam = msg.naam

    let add_naam = true
    if (msg_index > 0) {
        if (all_msg[msg_index-1].naam == naam) {
            add_naam = false;
        }
    }

    for (let i = 0; i < speed; i++) {
        setTimeout(() => {
            update_element(obj, generate_html(naam, tekst.slice(0, txt_index+i), add_naam))
            txt_index++;
        }, (1000/speed)*i);
        
    }
    
}

const main = () => {
    let grandpa = document.getElementById('js__dialogs')
    all_msg = grandpa.children
    console.log(all_msg)
    console.log(all_msg[0])

    speed = grandpa.snelheid

    setInterval(step, 1000)
}


window.onload = main