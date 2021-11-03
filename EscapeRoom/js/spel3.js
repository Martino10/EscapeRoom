
var current_round = 0
const max_rounds = 10

var display_time = 750

const max_hp = 3
var current_hp = max_hp
var hearts = []

const round_nums = [1, 2, 2, 3, 3, 4, 4, 5, 5, 6]

var entered_sequence = []
var current_sequence = []

const promptimg = document.getElementById('promptimg')

const imgs = [
'spel3_icon_face_angry.png',
'spel3_icon_face_neutral.png',
'spel3_icon_face_sad.png',
'spel3_icon_face_smile.png',
'spel3_icon_number_1.png',
'spel3_icon_number_2.png',
'spel3_icon_number_3.png',
'spel3_icon_number_4.png',
'spel3_icon_shape_circle.png',
'spel3_icon_shape_plus.png',
'spel3_icon_shape_square.png',
'spel3_icon_shape_triangle.png',
'spel3_icon_strikes_1.png',
'spel3_icon_strikes_2.png',
'spel3_icon_strikes_3.png',
'spel3_icon_strikes_4.png'
]


const enter_button = (object) => {
    entered_sequence.push(obj_to_character(object))
    print('pressed '+entered_sequence.at(-1 ))
    if (validate_input(entered_sequence, current_sequence)) {
        if (entered_sequence.length == current_sequence.length) {
            display_item('spel3_icon_correct')
            disallow_input(true)
            setTimeout(() => {
                next_round()
                
            }, 2000);
        }
    } else {
        print('incorrect!')
        disallow_input(true)
        display_item('spel3_icon_wrong')
        let end = damage(1)
        setTimeout(() => {
            if (end) {
            reset_round()} else {
                lose()
            } 
        }, 2000);
    }
}

const reset_round = () => {
    entered_sequence.splice(0, entered_sequence.length);
    display_sequence()
}

const lose = () => {
    // called when you lose. lol.
    disallow_input(true)
    display_item('spel3_icon_forbidden')
    setTimeout(reset_game, 3000)
}

const win = () => {
    // guess when this is called
    disallow_input(true)
    display_item('spel3_icon_win')
    window.location.href = "choice.html"
}

// const print_to_paper = print
const print = (...args) => (
    console.log(...args)
)

const update_bar = () => {
    let bar = document.getElementById('progressbar')
    bar.value = Math.floor(100*(current_round/max_rounds))
}

const scramble_buttons = () => {
    
}


const next_round = () => {
    current_round += 1
    if (current_round > max_rounds) {
        win()
    }
    update_bar()
    change_curr_sequence(generate_sequence(current_round))
    reset_round()
}

const disallow_input = (state) => {
    // disables or enables the input buttons according to the given boolean value
    let frames = Array.from(document.getElementsByClassName('buttons'))
    // print(typeof frames)
    frames.forEach((element) => {
        Array.from(element.getElementsByTagName('button')).forEach((el) => {
            el.disabled = state
        });
    });
}

const display_sequence = (seq = current_sequence) => {
    disallow_input(true)
    let i = 0
    seq.forEach(element => {
        let mytime = display_time*i;
        print('queueing at ', mytime, '  seconds');
        setTimeout(display_item, mytime, element);
        i += 1;
    });
    let mytime = (display_time)*i
    setTimeout(() => {
        display_item('spel3_icon_none')
        disallow_input(false)
    }, mytime);
}

const display_item = (itemname) => {
    if (itemname.endsWith('.png') == false) {
        itemname += '.png'
    }
    print('showing ',itemname)
    if (itemname == 'spel3_icon_none'){
        promptimg.classList.remove('fadein')
    } else {
        promptimg.classList.add('fadein')
    }
    promptimg.src = 'img/'+itemname

}

const validate_input = (ent = entered_sequence, cor = current_sequence) => {
// checks if the entered sequence corrosponds with the current (correct) sequence
    for (let i = 0; i < ent.length; i++) {
        if (ent[i] != cor[i]) {
            print('invalid entry at',i+':',ent[i], '!=', cor[i])
            return false
        }
    }
    return true
}


const obj_to_character = (obj) => { 
// returns the filename of the entered button without the trailing extension
    return obj.childNodes[0].src.split('/').at(-1).split('.png')[0]
}

const change_curr_sequence = (newseq) => {
    // replacess the current_sequence to a given sequence *without breaking refrences*
    current_sequence.splice(0, current_sequence.length);
    newseq.forEach(element => {
        current_sequence.push(element)
    });
    print('sequence changed to '+current_sequence)
}

const damage = (amount=1) => {
    // reduce HP, returns true if you're still alive and false if youre not 
    current_hp = Math.max(0, current_hp - amount)
    update_hearts()
    return current_hp > 0
}

const update_hearts = () => {
    for (let i of Array(current_hp).keys()) {
        hearts[i].innerHTML = '<img src="img/spel3_icon_heart.png">'
    }
    for (let i of Array(max_hp-current_hp).keys()) {
        hearts[i].innerHTML = '<img src="img/spel3_icon_broken_heart.png">'
    }
}


const generate_sequence = (length=1) => {
    let seq = []
    for (let i = 0; i < length; i++) {
        seq.push(imgs[Math.floor(Math.random()*imgs.length)].replace('.png',''))
    }
    print('generatied '+seq)
    return seq
}


const reset_game = () => {
    entered_sequence = []
    current_round = 0
    current_hp = max_hp
    update_hearts()
    update_bar()
    change_curr_sequence(generate_sequence(1))
    display_sequence()
}

const onload = () => {
    console.log('hi')


    let hp_container = document.getElementById('hplist')
    console.log(hp_container)

    for (let i of Array(max_hp).keys()) {
        let hp_icon = document.createElement('li')
        hp_icon.innerHTML += '<img src="img/spel3_icon_heart.png">'
        hp_container.appendChild(hp_icon)
        hearts.push(hp_icon)
    }
    disallow_input(true)
    change_curr_sequence(generate_sequence(1))
    setTimeout(() => {
        display_sequence()
    }, 2500);

}

window.onload = onload

//Voor de hints
function showHint() {
    document.getElementById('hintbox__js').classList.remove('hidden'); //Verander naar je eigen hintpagina
}

function closeHint() {
    document.getElementById('hintbox__js').classList.add('hidden'); //Verander naar je eigen hintpagina
    // window.history.back();
}

var check_time = window.setInterval(() => {
    checkTime();
  }, 1000);

const checkTime = () => {
    let minRemaining = parseInt(sessionStorage.getItem("minRemaining"));
    if (minRemaining < 3) { //Verander naar minuut waar je wilt dat de hint beschikbaar is
        document.getElementById("js__hint").style.visibility = "visible";
}}