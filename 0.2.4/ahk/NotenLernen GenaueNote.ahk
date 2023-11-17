#include Midi.ahk

midi := new Midi()
midi.OpenMidiIn( 0 )
Return

; [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8]
;"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"


;-2:

MidiNoteOnC-2:
Send C-2{enter}
Return

MidiNoteOnC#-2:
Send C{#}-2{enter}
Return

MidiNoteOnD-2:
Send D-2{enter}
Return

MidiNoteOnD#-2:
Send D{#}-2{enter}
Return

MidiNoteOnE-2:
Send E-2{enter}
Return

MidiNoteOnF-2:
Send F-2{enter}
Return

MidiNoteOnF#-2:
Send F{#}-2{enter}
Return

MidiNoteOnG-2:
Send G-2{enter}
Return

MidiNoteOnG#-2:
Send G{#}-2{enter}
Return

MidiNoteOnA-2:
Send A-2{enter}
Return

MidiNoteOnA#-2:
Send A{#}-2{enter}
Return

MidiNoteOnB-2:
Send {H}-2{enter}
Return

;-1:

MidiNoteOnC-1:
Send C-1{enter}
Return

MidiNoteOnC#-1:
Send C{#}-1{enter}
Return

MidiNoteOnD-1:
Send D-1{enter}
Return

MidiNoteOnD#-1:
Send D{#}-1{enter}
Return

MidiNoteOnE-1:
Send E-1{enter}
Return

MidiNoteOnF-1:
Send F-1{enter}
Return

MidiNoteOnF#-1:
Send F{#}-1{enter}
Return

MidiNoteOnG-1:
Send G-1{enter}
Return

MidiNoteOnG#-1:
Send G{#}-1{enter}
Return

MidiNoteOnA-1:
Send A-1{enter}
Return

MidiNoteOnA#-1:
Send A{#}-1{enter}
Return

MidiNoteOnB-1:
Send {H}-1{enter}
Return

;0:

MidiNoteOnC0:
Send C0{enter}
Return

MidiNoteOnC#0:
Send C{#}0{enter}
Return

MidiNoteOnD0:
Send D0{enter}
Return

MidiNoteOnD#0:
Send D{#}0{enter}
Return

MidiNoteOnE0:
Send E0{enter}
Return

MidiNoteOnF0:
Send F0{enter}
Return

MidiNoteOnF#0:
Send F{#}0{enter}
Return

MidiNoteOnG0:
Send G0{enter}
Return

MidiNoteOnG#0:
Send G{#}0{enter}
Return

MidiNoteOnA0:
Send A0{enter}
Return

MidiNoteOnA#0:
Send A{#}0{enter}
Return

MidiNoteOnB0:
Send {H}0{enter}
Return

;1:

MidiNoteOnC1:
Send C1{enter}
Return

MidiNoteOnC#1:
Send C{#}1{enter}
Return

MidiNoteOnD1:
Send D1{enter}
Return

MidiNoteOnD#1:
Send D{#}1{enter}
Return

MidiNoteOnE1:
Send E1{enter}
Return

MidiNoteOnF1:
Send F1{enter}
Return

MidiNoteOnF#1:
Send F{#}1{enter}
Return

MidiNoteOnG1:
Send G1{enter}
Return

MidiNoteOnG#1:
Send G{#}1{enter}
Return

MidiNoteOnA1:
Send A1{enter}
Return

MidiNoteOnA#1:
Send A{#}1{enter}
Return

MidiNoteOnB1:
Send {H}1{enter}
Return

;2:

MidiNoteOnC2:
Send C2{enter}
Return

MidiNoteOnC#2:
Send C{#}2{enter}
Return

MidiNoteOnD2:
Send D2{enter}
Return

MidiNoteOnD#2:
Send D{#}2{enter}
Return

MidiNoteOnE2:
Send E2{enter}
Return

MidiNoteOnF2:
Send F2{enter}
Return

MidiNoteOnF#2:
Send F{#}2{enter}
Return

MidiNoteOnG2:
Send G2{enter}
Return

MidiNoteOnG#2:
Send G{#}2{enter}
Return

MidiNoteOnA2:
Send A2{enter}
Return

MidiNoteOnA#2:
Send A{#}2{enter}
Return

MidiNoteOnB2:
Send {H}2{enter}
Return

;3:

MidiNoteOnC3:
Send C3{enter}
Return

MidiNoteOnC#3:
Send C{#}3{enter}
Return

MidiNoteOnD3:
Send D3{enter}
Return

MidiNoteOnD#3:
Send D{#}3{enter}
Return

MidiNoteOnE3:
Send E3{enter}
Return

MidiNoteOnF3:
Send F3{enter}
Return

MidiNoteOnF#3:
Send F{#}3{enter}
Return

MidiNoteOnG3:
Send G3{enter}
Return

MidiNoteOnG#3:
Send G{#}3{enter}
Return

MidiNoteOnA3:
Send A3{enter}
Return

MidiNoteOnA#3:
Send A{#}3{enter}
Return

MidiNoteOnB3:
Send {H}3{enter}
Return

;4:

MidiNoteOnC4:
Send C4{enter}
Return

MidiNoteOnC#4:
Send C{#}4{enter}
Return

MidiNoteOnD4:
Send D4{enter}
Return

MidiNoteOnD#4:
Send D{#}4{enter}
Return

MidiNoteOnE4:
Send E4{enter}
Return

MidiNoteOnF4:
Send F4{enter}
Return

MidiNoteOnF#4:
Send F{#}4{enter}
Return

MidiNoteOnG4:
Send G4{enter}
Return

MidiNoteOnG#4:
Send G{#}4{enter}
Return

MidiNoteOnA4:
Send A4{enter}
Return

MidiNoteOnA#4:
Send A{#}4{enter}
Return

MidiNoteOnB4:
Send {H}4{enter}
Return

;5:

MidiNoteOnC5:
Send C5{enter}
Return

MidiNoteOnC#5:
Send C{#}5{enter}
Return

MidiNoteOnD5:
Send D5{enter}
Return

MidiNoteOnD#5:
Send D{#}5{enter}
Return

MidiNoteOnE5:
Send E5{enter}
Return

MidiNoteOnF5:
Send F5{enter}
Return

MidiNoteOnF#5:
Send F{#}5{enter}
Return

MidiNoteOnG5:
Send G5{enter}
Return

MidiNoteOnG#5:
Send G{#}5{enter}
Return

MidiNoteOnA5:
Send A5{enter}
Return

MidiNoteOnA#5:
Send A{#}5{enter}
Return

MidiNoteOnB5:
Send {H}5{enter}
Return

;6:

MidiNoteOnC6:
Send C6{enter}
Return

MidiNoteOnC#6:
Send C{#}6{enter}
Return

MidiNoteOnD6:
Send D6{enter}
Return

MidiNoteOnD#6:
Send D{#}6{enter}
Return

MidiNoteOnE6:
Send E6{enter}
Return

MidiNoteOnF6:
Send F6{enter}
Return

MidiNoteOnF#6:
Send F{#}6{enter}
Return

MidiNoteOnG6:
Send G6{enter}
Return

MidiNoteOnG#6:
Send G{#}6{enter}
Return

MidiNoteOnA6:
Send A6{enter}
Return

MidiNoteOnA#6:
Send A{#}6{enter}
Return

MidiNoteOnB6:
Send {H}6{enter}
Return

;7:

MidiNoteOnC7:
Send C7{enter}
Return

MidiNoteOnC#7:
Send C{#}7{enter}
Return

MidiNoteOnD7:
Send D7{enter}
Return

MidiNoteOnD#7:
Send D{#}7{enter}
Return

MidiNoteOnE7:
Send E7{enter}
Return

MidiNoteOnF7:
Send F7{enter}
Return

MidiNoteOnF#7:
Send F{#}7{enter}
Return

MidiNoteOnG7:
Send G7{enter}
Return

MidiNoteOnG#7:
Send G{#}7{enter}
Return

MidiNoteOnA7:
Send A7{enter}
Return

MidiNoteOnA#7:
Send A{#}7{enter}
Return

MidiNoteOnB7:
Send {H}7{enter}
Return

;8:

MidiNoteOnC8:
Send C8{enter}
Return

MidiNoteOnC#8:
Send C{#}8{enter}
Return

MidiNoteOnD8:
Send D8{enter}
Return

MidiNoteOnD#8:
Send D{#}8{enter}
Return

MidiNoteOnE8:
Send E8{enter}
Return

MidiNoteOnF8:
Send F8{enter}
Return

MidiNoteOnF#8:
Send F{#}8{enter}
Return

MidiNoteOnG8:
Send G8{enter}
Return

MidiNoteOnG#8:
Send G{#}8{enter}
Return

MidiNoteOnA8:
Send A8{enter}
Return

MidiNoteOnA#8:
Send A{#}8{enter}
Return

MidiNoteOnB8:
Send {H}8{enter}
Return