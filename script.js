var script = "sophia.txt";
var lastFrameTimeMs = 0; // The last time the loop was run
var maxFPS = 10; // The maximum FPS we want to allow
var step = 0;

var startTime = Date.now();

var currentLine = 0;
var currentText = "";
var cursor = 0;
var skipTimer = 0;
var skipMode = false;
var wasPausing = false;

var speedTypewriter = 0.15;
var speedSlow = 0.09;
var speedNormal = 0.06;
var speedFast = 0.03;
var textSpeed = speedNormal;
var textColor = '#fff';
var forceNext = false;

var maleblip = new Audio('sounds/sfx-blipmale.wav');
var femaleblip = new Audio('sounds/sfx-blipfemale.wav');
var typewriter = new Audio('sounds/sfx-typwriter.wav');
var selectblip = new Audio('sounds/sfx-selectblip.wav');

var music = new Audio('music/act_one.mp3');
music.volume = 0.2;

maleblip.volume = 0.1;
femaleblip.volume = 0.1;
typewriter.volume = 0.1;
selectblip.volume = 0.1;


var audio = typewriter;
var initialStart = false;

function mainLoop(timestamp) {
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        requestAnimationFrame(mainLoop);
        return;
    }
    lastFrameTimeMs = timestamp;

    if (isSpacing() || forceNext)
        next();

    sleep = speedNormal;
    if (cursor == currentText.length) {
        endOfText();
        cursor += 1;
    } else if (cursor < currentText.length) {
        sleep = 0;
        while (sleep == 0 && cursor < currentText.length && !forceNext) {
            sleep = animateLetter();
        }
    }

    maxFPS = 1.0 / sleep;
    step += 1;
    requestAnimationFrame(mainLoop);
}


String.prototype.splice = function (start, delCount, newSubStr) {
    return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
};

function setColor(color) {
    var c = '<span style="color: ' + color + '"></span>'
    var text = $("#text").html();
    $("#text").html(text + c);
}

function addLetter(letter) {
    var text = $("#text").html();
    $("#text").html(text.splice(text.length - 7, 0, letter));
}

function animateLetter() {
    var sleep = textSpeed / 2;
    if (skipMode)
        sleep = 0;

    var letter = currentText.substr(cursor, 1);
    skipTimer -= 1;
    if (skipTimer < 0) {
        skipTimer = 1 + (textSpeed == speedFast);
    }
    if ([' ', '\\', '_', '<', '#'].indexOf(letter) < 0) {
        addLetter(letter);
        if (skipTimer == 0 && !skipMode) {
            playSound(audio);
        }
    } else {
        if (letter == '<') {
            var pace = true;
            if (currentText.substr(cursor, 3) == '<s>')
                textSpeed = speedSlow;
            else if (currentText.substr(cursor, 3) == '<n>')
                textSpeed = speedNormal;
            else if (currentText.substr(cursor, 3) == '<f>')
                textSpeed = speedFast;
            else if (currentText.substr(cursor, 3) == '<t>')
                textSpeed = speedTypewriter;
            else if (currentText.substr(cursor, 6) == '<next>') {
                forceNext = true;
                sleep = speedNormal;
                cursor -= 1;
                pace = false;
            } else {
                addLetter('&lt;');
                pace = false;
            }
            if (pace) {
                cursor += 2;
                addLetter(' ');
            }
        }
        if (letter == '#') {
            if (currentText.substr(cursor, 4).search(/\#[0-9a-fA-F]{3}/) == 0) {
                setColor(currentText.substr(cursor, 4));
                cursor += 3;
            } else if (currentText.substr(cursor, 5).search(/\#blue/) == 0) {
                setColor('#99f');
                cursor += 4;
            } else if (currentText.substr(cursor, 6).search(/\#green/) == 0) {
                setColor('#2d2');
                cursor += 5;
            } else {
                addLetter('#');
            }
        }
        if (letter == '\\') {
            addLetter('<br>');
            sleep += 0.00001;
        }
        if (letter == ' ') {
            addLetter(' ');
        }
        if (letter == '_') {
            sleep = 2 * speedSlow;
            if ($("#text").html().substr($("#text").html().length - 8, 1) != '-') // Due to </span>
                addLetter(' ');
        } else if (skipTimer > 0 && !skipMode) {
            sleep += textSpeed / 2;
        }
        skipTimer = 1;
    }
    cursor += 1;

    if (skipMode && sleep > 0) {
        if (!wasPausing) {
            playSound(audio);
            sleep = speedFast;
            wasPausing = true;
        }
    } else
        wasPausing = false;

    return sleep;
}

var variables = {};
var dialogue = [];
var choices = {};
var musicCues = {};

var lines = RAW_SCRIPT.split('\n');
for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line) {

        // Comment
        if (line.search(/^#/) == 0) {}

        // Label
        else if (params = /\{label}\s+(\w+)/.exec(line)) {
            if (params[1] in variables)
                console.error("Label already exists:", params[1]);
            variables[params[1]] = dialogue.length;
        }

        // Choice
        else if (line.search(/\{choice}(\s+\[.+?\]\s+\w+)+/) == 0) {
            var choice = [];
            var reg = /\s+\[(.+?)\]\s+(\w+)/g;
            while ((params = reg.exec(line)) !== null) {
                choice.push([params[1], params[2]]);
            }
            choices[dialogue.length - 1] = choice;
        } else
            dialogue.push(line);
    }
}

function getNextLine() {
    while (currentLine < dialogue.length) {
        var line = dialogue[currentLine];

        // Music
        if (params = /\{music}\s+(\w+)/.exec(line)) {
            playMusic(params[1]);
            currentLine += 1;
        }

        // Stop Music
        else if (params = /\{stop-music}\s+(\w+)/.exec(line)) {
            stopMusic(); // TODO
            currentLine += 1;
        }

        // Background
        else if (params = /\{background}\s+(\w+)/.exec(line)) {
            setBackground(params[1]);
            console.log('Setting background');
            currentLine += 1;
        }

        // Dialogue
        else if (params = /\[(.*?)\]\s+(.+)$/.exec(line)) {
            return [params[1], params[2]];
        }

        // Goto
        else if (params = /\{goto}\s+(\w+)/.exec(line)) {
            currentLine = parseValue(params[1]);
        }

        // Set (=)
        else if (params = /\{set}\s+(\w+)\s*=\s*(.+)/.exec(line)) {
            variables[params[1]] = parseValue(params[2]);
            currentLine += 1;
        }

        // Set (+=)
        else if (params = /\{set}\s+(\w+)\s*\+=\s*(.+)/.exec(line)) {
            if (checkVariable(params[1]))
                variables[params[1]] += parseValue(params[2]);
            currentLine += 1;
        }

        // If then
        else if (params = /\{if}\s+(.+?)\s*{then}\s+(.+)/.exec(line)) {
            var check = false;
            if (p = /^([\w.-_]+)\s*((==|!=|<=|>=|<|>)\s*([\w.-_]+)\s*)*$/.exec(params[1])) {
                if (p[2] == undefined)
                    check = parseComparison(parseValue(p[1]), 0, '>');
                else
                    check = parseComparison(parseValue(p[1]), parseValue(p[4]), p[3]);
            } else console.error("Syntax error in {if} expression:", params[1]);

            if (p = /^(\w+)\s*({else}\s*(\w+))*$/.exec(params[2])) {
                if (check)
                    currentLine = parseValue(p[1]);
                else if (p[3])
                    currentLine = parseValue(p[3]);
                else
                    currentLine += 1;
            }
        } else {
            console.error('UNKNOWN', line);
            currentLine += 1;
        }
    }

    return undefined;
}

function readLine() {
    var line = getNextLine();
    if (line) {
        clear();
        currentText = line[1];
        if (!forceNext) currentText = '_' + currentText
        currentText = currentText.replace(/  +/g, ' ');
        currentText = currentText.replace(/\\ /g, '\\');
        currentText = currentText.replace(/ \\/g, '\\');
        currentText = currentText.replace(/_ /g, '_');
        currentText = currentText.replace(/ _/g, '_');

        var name = line[0];
        audio = maleblip;
        if (name == 'LOG') {
            audio = typewriter;
            name = '';
        }
        if (name == 'Text') {
            audio = typewriter;
        }
        if (name == 'Sophia') {
            audio = femaleblip;
        }

        $("#name").html(name);
        $("#measure").html(name);
        if (name.length > 2) {
            var width = Math.min(100, 12 * name.length);
            var steps = (width - $("#measure").width()) / (name.length - 1);

            $("#name").css({
                letterSpacing: steps
            });
            $("#name").css({
                marginRight: -steps
            });
        }
    }

    $("#buttonArea").empty();
    if (currentLine in choices) {
        for (i in choices[currentLine]) {
            var $input = $('<input type="button" />');
            $input.attr('id', 'button' + i);
            $input.attr('value', choices[currentLine][i][0]);
            $input.attr('onclick', 'pickChoice("' + choices[currentLine][i][1] + '")');
            $input.appendTo($("#buttonArea"));
        }
    } else if (currentLine >= dialogue.length - 1) {
        var $input = $('<input type="button" />');
        $input.attr('id', 'button0');
        $input.attr('value', "Replay");
        $input.attr('onclick', 'restart()');
        $input.appendTo($("#buttonArea"));
    }
}


function pickChoice(label) {
    playSound(selectblip);

    if (parseValue(label)) {
        currentLine = parseValue(label);
    } else {
        console.error('Illegal label:', label);
        currentLine += 1;
    }
    readLine();
}


function checkVariable(string) {
    if (!(string in variables))
        console.error('Undefined variable:', params[1]);
    return (string in variables);
}

function parseValue(string) {
    if (!isNaN(string))
        return parseFloat(string);
    else if (string === 'true')
        return 1;
    else if (string === 'false')
        return 0;
    else if (string in variables)
        return variables[string];
    else if (string == 'RANDOM')
        return Math.random();
    else
        console.error("Illegal value:", string);
    return undefined;
}

function parseComparison(a, b, op) {
    if (op == '==')
        return (a == b);
    if (op == '!=')
        return (a != b);
    if (op == '<=')
        return (a <= b);
    if (op == '>=')
        return (a >= b);
    if (op == '<')
        return (a < b);
    if (op == '>')
        return (a > b);
}


function next() {
    if (cursor <= currentText.length && !forceNext) {
        skipMode = true;
    } else if (!(currentLine in choices) && currentLine < dialogue.length - 1) {
        currentLine += 1;
        readLine();
    }
    forceNext = false;
}

function clear() {
    $("#text").html('<span style="color: #fff"></span>');
    $("#next").css('visibility', 'hidden');
    textSpeed = speedNormal;
    textColor = '#fff';
    cursor = 0;
    skipMode = false;
}

function restart() {
    currentLine = 0;
    readLine();
}

function endOfText() {
    if (skipMode)
        playSound(audio);
    if (currentLine in choices || currentLine >= dialogue.length - 1) {
        $("input[type=button]").css({
            opacity: 0.0
        });
        $("input[type=button]").stop().animate({
            opacity: 1.0
        }, 200, "swing");
    } else {
        $("#next").css('visibility', 'visible');
    }
}


function isSpacing() {
    return spaceHold && (spaceTimer == step || spaceTimer + 15 < step);
}

function playSound(sound) {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
}

function playMusic(songName) {
    music.pause();
    music = new Audio('music/' + songName + '.mp3');
    music.loop = true;
    music.play();
}

function stopMusic(){
    music.pause();
}

function setBackground(backgroundName) {
    $('#image').attr('src', 'backgrounds/' + backgroundName + '.jpg');
}

var spaceHold = false;
var spaceTimer = 0;
$(function () {
    $(document).keydown(function (evt) {
        if (evt.which == 32) {
            spaceHold = true;
            spaceTimer = step;
        }
        if (currentLine in choices) {
            for (i in choices[currentLine]) {
                i = parseInt(i);
                if (evt.which == 49 + i) {
                    $('#button' + i).addClass('clicked');
                }
            }
        }
    }).keyup(function (evt) {
        if (evt.which == 32) {
            spaceHold = false;
        }
        if (currentLine in choices) {
            for (i in choices[currentLine]) {
                i = parseInt(i);
                if (evt.which == 49 + i) {
                    $('#button' + i).removeClass('clicked');
                    pickChoice(choices[currentLine][i][1]);
                }
            }
        }
    });
});


$(document).ready(function () {
    clear();
    readLine();
    requestAnimationFrame(mainLoop);
});
