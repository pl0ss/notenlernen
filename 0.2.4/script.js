// made by Kev - kevinploss.de - 2021

// ToDo
// =======================================================================
// =======================================================================

//ToDo Töne beim notenimput
    //Ton Toggle 

// Settings
// =======================================================================
// =======================================================================

version = "0.2.4";
document.getElementById("version").innerHTML = version;
document.getElementById("settings_current_version").innerHTML = version;
version_check();

var instrument_array = ["piano", "guitare"];
var instrument_name_array = ["Piano", "Guitare"];
var instrument_emoji_array = ["🎹", "🎸"];
var difficulty_array = ["noob", "easy", "normal", "hard", "individuell"];
var difficulty_name_array = ["Anfänger", "Einfach", "Normal", "Schwer", "Individuell"];
var notes_array = ["C", "D", "E", "F", "G", "A", "H"];
var notes_per_page = 4;

//Cis Des; Dis Ees/Es; Fis Ges; Gis Aes/As; Ais Hes/B;

var keyboard_input = true;
var keyboard_input_exact = true;
var normal_keyboard_input = false; //* kann nicht in der GUI getoggelt werden
var offset_middle_c = 0; // -21; -28 // offset_middle_c = -28; // SIEHE settings_oktaven_offset_change()

// Homescreen
// =======================================================================
// =======================================================================

var instrument;
var difficulty;
var timer;
var streak;
var richtig_count;
var all_note_count;
var note_count;
var challenge_notes;
var answer_ises;
var answer_ises_show;
var answer_note;
var challenge_vorzeichen;
var vorzeichen_activ_change;

var option_normalnotes;
var option_bassnotes;
var option_is;
var option_es;
var option_extraoctaven;
var input_type = "letters";
var piano_ises;

var noten_type; // normal / bass

function set_vars() {
    instrument = undefined;
    difficulty_selector("normal");
    timer = 0;
    streak = 0;
    richtig_count = 0;
    all_note_count = 0;
    challenge_notes = [];
    challenge_vorzeichen = [];
    vorzeichen_activ_change = []; //is: vorzeichen_change; es: MINUS -vorzeichen_change
}
set_vars();


function homescreen(){
    document.getElementById("play").style.display = "none";
    document.getElementById("daily_challenge").style.display = "none";
    document.getElementById("settings").style.display = "none";
    document.getElementById("help").style.display = "none";
    document.getElementById("share").style.display = "none";
    document.getElementById("bug_report").style.display = "none";
    document.getElementById("donation").style.display = "none";
    document.getElementById("install").style.display = "none";

    document.getElementById("play_instrument_selector").style.display = "none";
    document.getElementById("play_difficulty").style.display = "none";

    document.getElementById("homescreen").style.removeProperty("display");

    document.body.style.alignItems = "center"; //wegen help/übersicht
}

function homescreen_play(){
    document.getElementById("homescreen").style.display = "none";
    document.getElementById("play").style.removeProperty("display");
    document.getElementById("play_instrument_selector").style.removeProperty("display");

    //fix: nach beenden hat ein instrument eine class ist aber nicht wirklich ausgewählt
    while(document.getElementById('play_instrument_selector').getElementsByClassName('instrument_selector')[0].getElementsByClassName('selected').length > 0){
        document.getElementById('play_instrument_selector').getElementsByClassName('instrument_selector')[0].getElementsByClassName('selected')[0].classList.remove("selected");
    }

    document.getElementById("play_instrument_selector_weiter").classList.remove("weiter_button_animation_active");
    document.getElementById("play_instrument_selector_start").classList.remove("weiter_button_animation_active");
}

function homescreen_daily_challenge(){
    document.getElementById("homescreen").style.display = "none";
    document.getElementById("daily_challenge").style.removeProperty("display"); 
}

function homescreen_settings(){
    document.getElementById("homescreen").style.display = "none";
    document.getElementById("settings").style.removeProperty("display"); 
}

function homescreen_help(){
    document.getElementById("homescreen").style.display = "none";
    document.getElementById("help").style.removeProperty("display");
    document.body.style.removeProperty("align-items");
}

function homescreen_share(){
    document.getElementById("homescreen").style.display = "none";
    document.getElementById("share").style.removeProperty("display");

    document.getElementById("share_copy_status").style.display = "none";
}

function homescreen_bug_report(){
    document.getElementById("homescreen").style.display = "none";
    document.getElementById("bug_report").style.removeProperty("display"); 
}

function homescreen_donation(){
    document.getElementById("homescreen").style.display = "none";
    document.getElementById("donation").style.removeProperty("display"); 
}

function homescreen_install(){
    document.getElementById("homescreen").style.display = "none";
    document.getElementById("install").style.removeProperty("display"); 
}

// Play
// =======================================================================
// =======================================================================
function instrument_selector(this_instrument){
    for (let index = 0; index < instrument_array.length; index++) {
        document.getElementById("instrument_selector_" + instrument_array[index]).classList.remove("selected");
    }
    document.getElementById("instrument_selector_" + this_instrument).classList.add("selected");
    instrument = this_instrument;

    document.getElementById("play_instrument_selector_weiter").classList.add("weiter_button_animation_active");
}

function play_next(){
    if(instrument != undefined){
        document.getElementById("play_instrument_selector").style.display = "none";
        document.getElementById("play_difficulty").style.removeProperty("display"); 
    }
    for (let index = 0; index < difficulty_array.length; index++) {
        document.getElementById("difficulty_selector_" + difficulty_array[index]).classList.remove("selected");
    }
    document.getElementById("difficulty_selector_" + difficulty).classList.add("selected");
}

function difficulty_selector(this_difficulty){
    for (let index = 0; index < difficulty_array.length; index++) {
        document.getElementById("difficulty_selector_" + difficulty_array[index]).classList.remove("selected");
    }
    document.getElementById("difficulty_selector_" + this_difficulty).classList.add("selected");
    difficulty = this_difficulty;

    document.getElementById("difficulty_individuell").style.display = "none";
    if(difficulty == "noob"){option_normalnotes = true; option_bassnotes = false; option_is = false; option_es = false; option_extraoctaven = false;}
    if(difficulty == "easy"){option_normalnotes = true; option_bassnotes = false; option_is = true; option_es = true; option_extraoctaven = false;}
    if(difficulty == "normal"){option_normalnotes = true; option_bassnotes = true; option_is = true; option_es = true; option_extraoctaven = false;}
    if(difficulty == "hard"){option_normalnotes = true; option_bassnotes = true; option_is = true; option_es = true; option_extraoctaven = true;}
    if(difficulty == "individuell"){
        document.getElementById("difficulty_individuell").style.removeProperty("display");
    }
    
    document.getElementById("play_instrument_selector_start").classList.add("weiter_button_animation_active");
}

function play_start(){
    if(difficulty == "individuell"){
        if(document.getElementById("difficulty_individuell_normalnotes").checked){option_normalnotes = true;} else {option_normalnotes = false;}
        if(document.getElementById("difficulty_individuell_bassnotes").checked){option_bassnotes = true;} else {option_bassnotes = false;}
        if(document.getElementById("difficulty_individuell_is").checked){option_is = true;} else {option_is = false;}
        if(document.getElementById("difficulty_individuell_es").checked){option_es = true;} else {option_es = false;}
        if(document.getElementById("difficulty_individuell_extraoctave").checked){option_extraoctaven = true;} else {option_extraoctaven = false;}
    }
    if(difficulty != undefined){
        document.getElementById("play_difficulty").style.display = "none";
        document.getElementById("play").style.display = "none";
        document.getElementById("play_ground").style.removeProperty("display");

        document.getElementById("play_ground_instrument_name").innerText = `${instrument_name_array[instrument_array.indexOf(instrument)]} ${instrument_emoji_array[instrument_array.indexOf(instrument)]} ${difficulty_name_array[difficulty_array.indexOf(difficulty)]}`;
        timer_interval = setInterval(timer_start, 1000);
        next_notes();

        document.getElementById('play_ground_richtig').innerText = richtig_count;
        document.getElementById('play_ground_all_notes_count').innerText = all_note_count;
        document.getElementById('play_ground_streak').innerText = streak;
    }
}

function timer_start(){
    timer++;
    show_timer = Math.floor(timer / 60) + ':' + ("0" + timer % 60).slice(-2); 
    document.getElementById("play_ground_timer").innerHTML = show_timer;
}

function play_pause(){
    clearInterval(timer_interval);
    document.getElementById("play_ground").style.display = "none";
    document.getElementById("play_pause").style.removeProperty("display");
}

function play_fortsetzen(){
    document.getElementById("play_pause").style.display = "none";
    document.getElementById("play_ground").style.removeProperty("display");
    timer_interval = setInterval(timer_start, 1000);
}

function play_stop(){
    document.getElementById("play_pause").style.display = "none";
    document.getElementById("homescreen").style.removeProperty("display");
    set_vars();
}

function next_notes(){
    while(document.getElementsByClassName('note_text').length > 0){
        document.getElementsByClassName('note_text')[0].remove();
    }
    while(document.getElementsByClassName('note').length > 0){
        document.getElementsByClassName('note')[0].remove();
    }
    while(document.getElementsByClassName('vorzeichen').length > 0){
        document.getElementsByClassName('vorzeichen')[0].remove();
    }
    while(document.getElementsByClassName('answer').length > 0){
        document.getElementsByClassName('answer')[0].remove();
    }
    while(document.getElementsByClassName('hilfslinien').length > 0){
        document.getElementsByClassName('hilfslinien')[0].remove();
    }

    document.getElementById('input_note').innerText = " ";
    document.getElementById('input_ises').innerText = " ";

    document.getElementsByClassName('note').remove;
    summon_notes();
    if(option_is || option_es){summon_vorzeichen();}

    answer_ises = undefined;
    answer_note = undefined;
    note_count = 0;

    summon_note_text(note_count, "⬆️");
}

function summon_note_text(count, text, y_offset){
    x = 590 + 268 * count;
    y = 820;

    if(y_offset == undefined){
        if(document.getElementById(`note_text_${count}`) == undefined){
            document.getElementById("svg").insertAdjacentHTML('beforeend', `<text id="note_text_${count}" class="note_text" x="${x}" y="${y}" text-anchor="middle">${text}</text>`);
        } else {
            document.getElementById(`note_text_${count}`).innerHTML = text;
        }
    } else {
        y = 820 + 130 * y_offset;
        document.getElementById("svg").insertAdjacentHTML('beforeend', `<text class="note_text" x="${x}" y="${y}" text-anchor="middle">${text}</text>`);
    }
}

function summon_notes(){
    //https://commons.wikimedia.org/wiki/File:Quarter_note_with_upwards_stem.svg

    if(option_normalnotes == option_bassnotes){
        ranNum = Math.floor(Math.random() * 2); //1: normaleNoten; 0: bassNoten
        if(ranNum){noten_type = "normal";}
        else {noten_type = "bass";}
    } else {
        if(option_normalnotes){noten_type = "normal";}
        if(option_bassnotes){noten_type = "bass";}
    }

    if(noten_type == "normal"){document.getElementById("notenkey").style.removeProperty("display"); document.getElementById("basskey").style.display = "none";}
    else {document.getElementById("basskey").style.removeProperty("display"); document.getElementById("notenkey").style.display = "none";}

    challenge_notes = [];
    whilecount = 0;
    while(whilecount < notes_per_page){
        max = 8;
        if(option_extraoctaven){max = 12;}
        if(noten_type == "normal" && option_extraoctaven){max = 15;}
        min = 0;
        if(noten_type == "bass" && option_extraoctaven){min = -2;}

        while(true){
            random_note = Math.floor(Math.random() * (max - min) + min);

            if(random_note != challenge_notes[challenge_notes.length -1]){
                break;
            }
        }
        
        challenge_notes.push(random_note);
        summon_this_note(whilecount, random_note);

        whilecount++;
    }
}

function summon_this_note(whilecount, random_note){
    y = 365 - random_note * 60;
    //if(option_is || option_es){x = 3600;} else {x = 3900;}
    x = 3600;
    x -= whilecount * 380;

    node = document.createElementNS("http://www.w3.org/2000/svg", "g");
    node.setAttribute("transform", `translate(-${x} ${y}) scale (10)`);
    node.setAttribute("class", "note");
    node.innerHTML = ('<path d="m451.09 49.39c3.3958-1.82 5.2053-5.1146 4.0922-7.593-1.1873-2.6436-5.267-3.3897-9.1066-1.6654-3.8396 1.7244-5.9922 5.2694-4.8049 7.913 1.1873 2.6436 5.267 3.3897 9.1066 1.6654 0.23997-0.10777 0.48628-0.19874 0.71268-0.32007z" fill-rule="evenodd" stroke="var(--color)" fill="var(--color)" style="opacity:0.9;"/><path d="m454.73 43.056v-33.588" fill="none" stroke="var(--color)" stroke-width="1.5" style="opacity:0.9;"/>');
    document.getElementById("svg_root").appendChild(node);

    if(random_note == -2){summon_hilfslinien(whilecount, -1); summon_hilfslinien(whilecount, 0);}
    if(random_note == -1){summon_hilfslinien(whilecount, 0);}
    if(random_note == 0){summon_hilfslinien(whilecount, 0);}
    if(random_note == 12){summon_hilfslinien(whilecount, 6);}
    if(random_note == 13){summon_hilfslinien(whilecount, 6);}
    if(random_note == 14){summon_hilfslinien(whilecount, 6); summon_hilfslinien(whilecount, 7);}
}

function summon_all_notes(){
    while(document.getElementsByClassName('note').length > 0){
        document.getElementsByClassName('note')[0].remove();
    }
    while(document.getElementsByClassName('vorzeichen').length > 0){
        document.getElementsByClassName('vorzeichen')[0].remove();
    }
    while(document.getElementsByClassName('answer').length > 0){
        document.getElementsByClassName('answer')[0].remove();
    }
    while(document.getElementsByClassName('hilfslinien').length > 0){
        document.getElementsByClassName('hilfslinien')[0].remove();
    }

    whilecount = 0;
    while(whilecount < 15){
        summon_this_note(-1 + whilecount * 0.7, whilecount);
        whilecount++;
    }
}

function summon_help_letters(){
    whilecount = 0;
    x = 60;
    y = 175;
    while(whilecount < 29){
        if(whilecount > 6){y = 75;}
        this_x = x + 22 * whilecount;
        this_y = y - 8 * whilecount;
        if(whilecount > 16){this_y = this_y = -30 - 8 * whilecount;}
        padding = "";
        if(whilecount == 28){padding = "padding-right: 50px;";}

        node = document.createElement("p");
        node.setAttribute("style", `position: relative; left: ${this_x}px; top: ${this_y}px; ${padding}`);
        node.innerHTML = (notes_array[whilecount%7]);
        document.getElementById("help_letters").appendChild(node);

        whilecount++;
    }                                                                                                
}
summon_help_letters();

function summon_hilfslinien(pos_x, pos_y){ //x: 0 1 2 3; y: -1 0 6 7
    //https://commons.wikimedia.org/wiki/File:B3_flat.svg

    x = 305 + 76 * pos_x;
    y = 161 - 24 * pos_y;

    node = document.createElementNS("http://www.w3.org/2000/svg", "g");
    node.setAttribute("transform", "translate(-750,0) scale (5)");
    node.setAttribute("class", "hilfslinien");
    node.innerHTML = (`<rect y="${y}" x="${x}" height="3.7" width="44" style="opacity:0.5; fill:var(--color); stroke:none"/>`);
    document.getElementById("svg_root").appendChild(node);
}

function summon_vorzeichen_kreuz(pos_x, pos_y){
    //https://de.wikipedia.org/wiki/Liste_von_musikalischen_Symbolen
    x = 50 + 100 * pos_x;
    y = 340 - 62 * pos_y;

    node = document.createElementNS("http://www.w3.org/2000/svg", "g");
    node.setAttribute("transform", `translate(${x} ${y}) scale (4)`);
    node.setAttribute("class", "vorzeichen");
    node.innerHTML = ('<path style="fill:var(--color);opacity:0.9" d="m 79.903152,145.91202 0,-17.00357 7.046381,-1.99531 0,16.91681 -7.046381,2.08207 z m 13.874322,-4.11353 -4.844386,1.42418 0,-16.91681 4.844386,-1.38804 0,-7.02698 -4.844386,1.38804 0,-17.28468 -1.983555,0 0,17.80881 -7.046381,2.07845 0,-16.80753 -1.870814,0 0,17.44734 -4.844386,1.39166 0,7.04144 4.844386,-1.38805 0,16.88428 -4.844386,1.38444 0,7.01252 4.844386,-1.38804 0,17.18708 1.870814,0 0,-17.80159 7.046381,-1.98808 0,16.72079 1.983555,0 0,-17.34975 4.844386,-1.39166 0,-7.03782 z"/>');
    document.getElementById("svg_root").appendChild(node);
}

function summon_vorzeichen_b(pos_x, pos_y){
    //https://de.wikipedia.org/wiki/Liste_von_musikalischen_Symbolen
    x = 50 + 100 * pos_x;
    y = 340 - 62 * pos_y;

    node = document.createElementNS("http://www.w3.org/2000/svg", "g");
    node.setAttribute("transform", `translate(${x} ${y}) scale (4)`);
    node.setAttribute("class", "vorzeichen");
    node.innerHTML = ('<path style="fill:var(--color);opacity:0.9" d="m 76.082718,89.459865 0,30.818095 c -2e-6,1e-5 -2e-6,2.07737 0,6.23206 2.760333,-2.6616 5.858041,-4.02486 9.293135,-4.0898 2.146916,3e-5 3.987139,0.94133 5.520675,2.8239 1.349483,1.75278 2.054897,3.7003 2.116256,5.84256 0.0613,1.68785 -0.337388,3.63536 -1.196145,5.84255 -0.306719,0.90884 -0.981468,1.8826 -2.024245,2.92127 -0.797446,0.77901 -1.625547,1.59047 -2.484304,2.4344 -4.539231,3.50552 -9.078447,7.0435 -13.617664,10.61396 l 0,-63.438995 2.392292,0 m 7.452911,39.192415 c -0.736099,-0.90883 -1.686881,-1.36325 -2.852349,-1.36325 -1.472185,0 -2.66833,0.87638 -3.588438,2.62914 -0.674752,1.36326 -1.012126,4.57666 -1.012124,9.64021 l 0,8.37432 c 0.06134,0.25965 1.77888,-1.33081 5.152629,-4.77142 1.840216,-1.81768 3.036361,-3.95996 3.588439,-6.4268 0.245352,-0.97377 0.368034,-1.94751 0.368045,-2.92128 -1.1e-5,-2.14227 -0.552078,-3.86257 -1.656202,-5.16092"/>');
    document.getElementById("svg_root").appendChild(node);
}

function summon_vorzeichen_kreuz_fc(){
    if(noten_type == "normal"){
        summon_vorzeichen_kreuz(1, 11);
        summon_vorzeichen_kreuz(2, 8);
    } else {
        summon_vorzeichen_kreuz(1, 9);
        summon_vorzeichen_kreuz(2, 6);
    }
}

function summon_vorzeichen_kreuz_fcg(){
    if(noten_type == "normal"){
        summon_vorzeichen_kreuz(1, 11);
        summon_vorzeichen_kreuz(2, 8);
        summon_vorzeichen_kreuz(3, 12);
    } else {
        summon_vorzeichen_kreuz(1, 9);
        summon_vorzeichen_kreuz(2, 6);
        summon_vorzeichen_kreuz(3, 10);
    }
}

function all(){
    summon_vorzeichen_kreuz(1, 1);
    summon_vorzeichen_kreuz(2, 2);
    summon_vorzeichen_kreuz(3, 3);
    summon_vorzeichen_kreuz(4, 4);
    summon_vorzeichen_kreuz(5, 5);
    summon_vorzeichen_kreuz(6, 6);
    summon_vorzeichen_kreuz(7, 7);
    summon_vorzeichen_kreuz(8, 8);
    summon_vorzeichen_kreuz(9, 9);
    summon_vorzeichen_kreuz(10, 10);
}

function summon_vorzeichen_b_dg(){
    if(noten_type == "normal"){
        summon_vorzeichen_b(1, 9);
        summon_vorzeichen_b(2, 12);
    } else {
        summon_vorzeichen_b(1, 7);
        summon_vorzeichen_b(2, 10);
    }
}

function summon_vorzeichen_b_eh(){
    if(noten_type == "normal"){
        summon_vorzeichen_b(1, 10);
        summon_vorzeichen_b(2, 14);
    } else {
        summon_vorzeichen_b(1, 8);
        summon_vorzeichen_b(2, 12);
    }
}


function all(){
    summon_vorzeichen_b(1, 1);
    summon_vorzeichen_b(2, 2);
    summon_vorzeichen_b(3, 3);
    summon_vorzeichen_b(4, 4);
    summon_vorzeichen_b(5, 5);
    summon_vorzeichen_b(6, 6);
    summon_vorzeichen_b(7, 7);
    summon_vorzeichen_b(8, 8);
    summon_vorzeichen_b(9, 9);
    summon_vorzeichen_b(10, 10);
}

function summon_vorzeichen(){
    min = 0;
    max = 0;
    if(option_is && option_es){
        min = 0;
        max = 5;
    } else if(option_is){
        min = 0;
        max = 4;
    } else if(option_es){
        min = 2;
        max = 5;
    }
    random = Math.floor(Math.random() * (max - min) + min);
    if(random == 0){summon_vorzeichen_kreuz_fc(); challenge_vorzeichen = ["+", ["F", "C"]];}
    if(random == 1){summon_vorzeichen_kreuz_fcg(); challenge_vorzeichen = ["+", ["F", "C", "G"]];}
    if(random == 2 || random == 3){challenge_vorzeichen = [];}
    if(random == 4){summon_vorzeichen_b_dg(); challenge_vorzeichen = ["-", ["D", "G"]];}
    if(random == 5){summon_vorzeichen_b_eh(); challenge_vorzeichen = ["-", ["E", "H"]];}
}


// Input Types
// =======================================================================

function switch_input_scroll(){
    scroll_value = document.getElementById("input_div").scrollLeft;
    if(scroll_value < 360 * 0.1){
        switch_input2("letters");
    }
    if(scroll_value > 360 * 0.9){
        switch_input2("piano");
    }
}

function switch_input_dots(){
    if(document.getElementById("input_side_dot_2").classList.contains("input_side_dots_selected")){
        switch_input2("letters");
        document.getElementById("input_div").scrollLeft = 0;
    }
    else if(document.getElementById("input_side_dot_1").classList.contains("input_side_dots_selected")){
        switch_input2("piano");
        document.getElementById("input_div").scrollLeft = document.getElementById("input_div").scrollWidth;
    }
}

function switch_input2(type){
    if(type == "letters"){
        input_type = "letters";
        document.getElementById("input_ises_div").style["visibility"] = "visible";
        document.getElementById("input_side_dot_2").classList.remove("input_side_dots_selected");
        document.getElementById("input_side_dot_1").classList.add("input_side_dots_selected");
    }
    if(type == "piano"){
        input_type = "piano";
        document.getElementById("input_ises_div").style["visibility"] = "hidden";
        document.getElementById("input_side_dot_1").classList.remove("input_side_dots_selected");
        document.getElementById("input_side_dot_2").classList.add("input_side_dots_selected");
    }
}

// Input Type - Letters
// =======================================================================

var input_letters = [];

function input_note(note){
    if(note_count < notes_per_page){
        input_letters[0] = note;
        document.getElementById('input_note').innerText = note;
    }
    //document.getElementById("submit_button").classList.add("submit_button_animation_active");
}

function input_ises(ises){
    if(note_count < notes_per_page){
        if(document.getElementById('input_ises').innerText == ises){
            document.getElementById('input_ises').innerText = "";
            input_letters[1] = "";
        } else {
            document.getElementById('input_ises').innerText = ises;
            input_letters[1] = ises;
        }
    }
}

function input_submit_letters(){
    if(note_count == notes_per_page){
        next_notes();
    }
    if(input_letters[0] != undefined){
        answer_note = notes_array.indexOf(input_letters[0]);
        if(input_letters[1] == "is"){answer_note += 0.5;}
        if(input_letters[1] == "es"){answer_note -= 0.5;}
        input_letters = [];
        input_submit(answer_note, "notexact");
    }
}

// Input Type - OnScreen Piano
// =======================================================================

function input_piano(note){
    if(note_count < notes_per_page){
        document.getElementById('input_note').innerText = note;
        answer_note = notes_array.indexOf(note.substring(0,1));
        answer_ises = note.substring(1,2);
        if(answer_ises == "#"){answer_note += 0.5;}
    }
    input_submit(answer_note, "notexact");
}

// Input Type - Keyboard
// =======================================================================

var key_set = {" ": " ", "C": "C", "D": "D", "E": "E", "F": "F", "G": "G", "A": "A", "H": "H", "1": "Cis", "2": "Dis", "3": "Fis", "4": "Gis", "5": "Ais"};
var keystring = "";

document.addEventListener('keydown', (event) => {
    //console.log(event.key)

    if(!keyboard_input && normal_keyboard_input){ // Normal Keyboard
        this_key = key_set[event.key.toLocaleUpperCase()];
        if (this_key != undefined) {
            input_piano(this_key);
        }
    }

    if(keyboard_input){ // Midi Keyboard
        if(event.key != "Enter"){
            keystring += event.key.replace(/Shift/gi, "");
        } else {
            if(keyboard_input_exact){ // Midi Keyboard - Genaue Note
                console.log(keystring)
                input_piano_exact(keystring);
                keystring = "";
            } else { // Midi Keyboard - Oktave egal
                keystring = keystring.replace(/-/gi, "").replace(/[0-9]/gi, "");
                console.log(keystring)
                input_piano(keystring);
                keystring = "";
            }

        }
    }

});

function input_piano_exact(this_note){
    this_note_value = 0;
    this_note_value += offset_middle_c;

    // 1 Letter
    this_note_value += notes_array.indexOf(this_note.substring(0, 1));
    // prüfen ob ein # vorkommt, wenn ja dann + .5 und # ersetzen
    if(this_note.split("#").length == 2){
        this_note_value += 0.5;
        this_note = this_note.replace(/#/gi, "");
    }
    //Octave
    this_note_value += Number(this_note.substring(1, 3)) * notes_array.length;

    answer_note = this_note_value;
    input_submit(answer_note, "exact");
}

// Verify Input
// =======================================================================

function input_submit(answer_note, submit_input_type){
    if(note_count == notes_per_page){
        next_notes();
    } else {
        //challenge_notes
        //challenge_vorzeichen
        //note_count

        if(submit_input_type == "notexact"){
            answer_note = answer_note %7;
            answer_note_show = notes_array[parseInt(answer_note)];
            if(answer_note %1 != 0){answer_note_show += "is";}
        } else { // submit_input_type == "exact"
            answer_note_show = ""
            answer_note_show += notes_array[parseInt((answer_note + 70) %7)]; // +70, sodass negative zahlen ins positive geschoben werden
            answer_note_show += Math.floor(answer_note /7);
            if(answer_note %1 != 0){answer_note_show += "#";}
        }

        //console.log("Answer", answer_note, answer_note_show)

        richtige_note = challenge_notes[note_count];

        plus = 0;
        if(noten_type == "bass"){
            richtige_note += 2;
            plus = 2;
        }

        if(submit_input_type == "notexact"){
            richtige_note = richtige_note %7;
            richtige_note_show = notes_array[parseInt(richtige_note)];

            if(challenge_vorzeichen.length != 0){
                if(challenge_vorzeichen[1].includes(notes_array[(challenge_notes[note_count] + plus)%7])){
                    if(challenge_vorzeichen[0] == "+"){richtige_note += 0.5; richtige_note_show += "is";}
                    if(challenge_vorzeichen[0] == "-"){richtige_note -= 0.5; richtige_note_show += "es";}
                }
            }
        } else {// submit_input_type == "exact"
            richtige_note_show_half = "";
            if(challenge_vorzeichen.length != 0){
                if(challenge_vorzeichen[1].includes(notes_array[(challenge_notes[note_count] + plus)%7])){
                    if(challenge_vorzeichen[0] == "+"){richtige_note += 0.5;}
                    if(challenge_vorzeichen[0] == "-"){richtige_note -= 0.5;}
                }
            }

            if(noten_type == "bass"){
                richtige_note += -14;
            }

            richtige_note_show = "";
            richtige_note_show += notes_array[parseInt((richtige_note + 70) %7)]; // +70, sodass negative zahlen ins positive geschoben werden
            if(richtige_note %1 != 0){richtige_note_show += "#";}
            richtige_note_show += Math.floor(richtige_note /7);

        }

        //console.log("Richtige", richtige_note, richtige_note_show)


        if(answer_note == richtige_note){
            streak++;
            richtig_count++;
        } else {
            streak = 0;
        }

        if(answer_note == richtige_note){
            summon_note_text(note_count, `<tspan>✅</tspan>`);
            summon_note_text(note_count, `<tspan class="answer_correct">${richtige_note_show}</tspan>`, 1);
        } else {
            summon_note_text(note_count, `<tspan>❌</tspan>`);
            summon_note_text(note_count, `<tspan class="answer_correct">${answer_note_show}</tspan>`, 1);
            summon_note_text(note_count, `<tspan class="answer_incorrect">${richtige_note_show}</span>`, 2);
        }

        note_count++;
        all_note_count++;

        if(note_count < notes_per_page){
            summon_note_text(note_count, "⬆️");
        }

        document.getElementById('play_ground_richtig').innerText = richtig_count;
        document.getElementById('play_ground_all_notes_count').innerText = all_note_count;
        document.getElementById('play_ground_streak').innerText = streak;
        
        answer_note = undefined;
        document.getElementById('input_note').innerText = " ";
        answer_ises = undefined;
        piano_ises = undefined;
        document.getElementById('input_ises').innerText = " ";
    }
}

// CSS & Stuff
// =======================================================================
// =======================================================================

function share_copy(){
    var tempInput = document.createElement("textarea"); tempInput.value = 'https://kevinploss.de/page/notenlernen/'; document.body.appendChild(tempInput); tempInput.select(); document.execCommand("copy"); document.body.removeChild(tempInput);
    document.getElementById("share_copy_status").style.removeProperty("display");
}

function toggle_nightmode(){
    if(window.matchMedia("(prefers-color-scheme: dark)").matches){
        document.body.classList.toggle("theme_day");
    } else {
        document.body.classList.toggle("theme_night");
    }
    update_theme_status();
}

function update_theme_status(){
    if(window.getComputedStyle( document.body ,null).getPropertyValue('background-color') == "rgb(255, 255, 255)"){
        document.getElementById('settings_nachtmodus_btn').classList.remove("button_on");
        document.getElementById('settings_nachtmodus_status').innerText = "Aus";
        document.getElementById('settings_nachtmodus_btn').classList.add("button_off");

        document.getElementById('pause_nachtmodus_btn').classList.remove("button_on");
        document.getElementById('pause_nachtmodus_status').innerText = "Aus";
        document.getElementById('pause_nachtmodus_btn').classList.add("button_off");
    } else {
        document.getElementById('settings_nachtmodus_btn').classList.remove("button_off");
        document.getElementById('settings_nachtmodus_status').innerText = "Ein";
        document.getElementById('settings_nachtmodus_btn').classList.add("button_on");

        document.getElementById('pause_nachtmodus_btn').classList.remove("button_off");
        document.getElementById('pause_nachtmodus_status').innerText = "Ein";
        document.getElementById('pause_nachtmodus_btn').classList.add("button_on");
    }
}
update_theme_status();

// Settings
// =======================================================================
// =======================================================================

function pause_settings() {
    if(document.getElementById("pause_settings").style.display == "none"){
        document.getElementById("play_pause_pause").style.display = "none";
        document.getElementById("pause_settings").style.removeProperty("display");
    } else {
        document.getElementById("pause_settings").style.display = "none";
        document.getElementById("play_pause_pause").style.removeProperty("display");
    }
}

function toggle_keyboardinput(onload){
    if(onload != true){keyboard_input = !keyboard_input;}
    if(keyboard_input){
        document.getElementById('pause_keyboardinput_btn').classList.remove("button_off");
        document.getElementById('pause_keyboardinput_status').innerText = "Ein";
        document.getElementById('pause_keyboardinput_btn').classList.add("button_on");
        document.getElementById('pause_keyboardinput_type').style.removeProperty("display");
    } else {
        document.getElementById('pause_keyboardinput_btn').classList.remove("button_on");
        document.getElementById('pause_keyboardinput_status').innerText = "Aus";
        document.getElementById('pause_keyboardinput_btn').classList.add("button_off");
        document.getElementById('pause_keyboardinput_type').style.display = 'none';
    }
}
toggle_keyboardinput(true);

function keyboardinput_type_set(){
    if(keyboard_input_exact){
        document.getElementById("keyboardinput_type_exact").checked = true;
    } else {
        document.getElementById("keyboardinput_type_notexact").checked = true;
    }
}
keyboardinput_type_set();

function keyboardinput_type_toggle(id){
    if(id == "keyboardinput_type_exact"){
        keyboard_input_exact = true;
        document.getElementById("keyboardinput_type_notexact").checked = false;
        document.getElementById("keyboardinput_type_exact").checked = true;
        document.getElementById("settings_oktaven_offset_div").style.removeProperty("display");
    } else {
        keyboard_input_exact = false;
        document.getElementById("keyboardinput_type_exact").checked = false;
        document.getElementById("keyboardinput_type_notexact").checked = true;
        document.getElementById("settings_oktaven_offset_div").style.display = "none";
    }
}

function settings_oktaven_offset_change(){
    offset_middle_c = 7* Number(document.getElementById("settings_oktaven_offset").value);
}
settings_oktaven_offset_change();

// PWA
// =======================================================================
// =======================================================================

//https://www.youtube.com/watch?v=WbbAPfDVqfY
if('serviceWorker' in navigator){
    navigator.serviceWorker.register("service-worker.js");
}

//https://pwa-workshop.js.org/5-pwa-install/#add-an-installation-button
let deferredPrompt; // Allows to show the install prompt
const installButton = document.getElementById("install_button");
const installPWA = document.getElementById("install_pwa");

window.addEventListener("beforeinstallprompt", e => {
  console.log("beforeinstallprompt fired");
  // Prevent Chrome 76 and earlier from automatically showing a prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Show the install button
  installPWA.hidden = false;
  installButton.addEventListener("click", installApp);
});

function installApp() {
  // Show the prompt
  deferredPrompt.prompt();
  installPWA.disabled = true;

  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then(choiceResult => {
    if (choiceResult.outcome === "accepted") {
      console.log("PWA setup accepted");
      installPWA.hidden = true;
    } else {
      console.log("PWA setup rejected");
    }
    installPWA.disabled = false;
    deferredPrompt = null;
  });
}

window.addEventListener("appinstalled", evt => {
  console.log("appinstalled fired", evt);
});

function reload_data(){
    caches.delete('static/music/notenlernen/');
    navigator.serviceWorker.controller.postMessage('cache_files');
}

async function version_check(){
    url = 'https://kevinploss.de/page/notenlernen/version.php';
    latest_version = await (await fetch(url)).text();
    if(version != latest_version){
        reload_data();
    }
    document.getElementById("settings_latest_version").innerHTML = latest_version;
}