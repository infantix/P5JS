
var axiom = "F";
var sentence = axiom;

var rules = [];

rules[0] = {
    in: "F",
    out: "FF+[+F-F-F]-[-F+F+F]"
}

var len = 100;
var angle;

function setup() {
    angle = radians(25);

    createCanvas(400, 400);
    stroke(255, 100);
    background(51);

    var button = createButton("Generate");
    button.mousePressed(buttonClick);

    turtle();
    createP(axiom);
}

function turtle() {
    resetMatrix();
    translate(width/2, height);

    for(let i=0; i<sentence.length; i++) {
        let c = sentence.charAt(i);

        if(c == "F") {
            line(0, 0, 0, -len);
            translate(0, -len);
        }
        else if(c == "+") {
            rotate(angle);
        } else if(c == "-") {
            rotate(-angle);
        }
        else if(c == "[") {
            push();
        }
        else if(c == "]") {
            pop();
        }
    }
}

function generate() {
    len *= 0.5;
    let newSentence = "";

    for(let i=0; i<sentence.length; i++) {
        let c = sentence.charAt(i);

        let found = false;

        rules.forEach(rule => {
            if(c === rule.in) {
                newSentence += rule.out;
                found = true;
            }
        });

        if(!found) {
            newSentence += c;
        }
    }

    sentence = newSentence;
}

function buttonClick() {
    background(51);
    
    generate();
    turtle();
    createP(sentence);
}