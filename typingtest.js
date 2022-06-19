const textList = ["JavaScript is a wildly popular interpreted scripting language that in early 2019 became the language most frequently learned by developers.",
    "JavaScript is an open standard, not controlled by any single vendor, with numerous implementations and an easy-to-learn syntax that makes it popular with beginners and veteran developers alike.",
    "JavaScript dates from the earliest days of the World Wide Web.",
    "The language was first rolled out as a way to add lightweight client-side functionality to Web pages, and is widely used for that purpose today.",
    "Just about anything interactive or animated on a Web page today is rendered in JavaScript, including basically the entire ecosystems of online advertising and metrics.",
    "But JavaScript doesn’t just run in the browser.",
    "Thanks to development frameworks such as Node.,js, JavaScript is now used to write code for just about any niche you can think of, from clients to servers to the cloud.",
    "As its name implies, JavaScript is a scripting language.",
    "Traditional languages such as C++ are compiled before they’re run into executable binary form, with the compiler checking for any errors in the entire program before the process is complete.",
    "Scripting languages, by contrast, are executed one line at a time by another program called an interpreter.",
    "Scripting languages got their start as simple series of shell commands used to execute other programs, but their flexibility and ease of use made them a popular type of programming language in their own right, and they particularly became important with the rise of the Web.",
    "JavaScript itself arose in those early days of the Web, and its history explains the somewhat anomalous Java part of its name.",
    "In 1995, Netscape had just signed a deal with Sun Microsystems to become the first licensee of Sun’s Java language, gaining the ability to run Java applets in the pioneering and then-dominant Netscape Navigator Web browser.",
    "But some within the company believed that supporting a more lightweight scripting language in Navigator was also important.",
    "Brendan Eich, a Netscape employee at the time, explained, There were people who argued strongly that Java’s fine for programmers who build components, but there’s a much larger audience of people who write scripts or maybe copy a script from somebody else and tweak it.",
    "These people are less specialized and may be paid to do something other than programming, like administer a network, and they write scripts part-time or on the side.",
    "If they’re writing small pieces of code, they just want to get their code done with the minimal amount of fuss.",
    "Java applets never really took off, whereas the scripting language he created (very quickly) for Netscape remains the backbone of interactive websites.",
    "Originally called LiveScript, the language was created with syntax that was superficially similar to Java in many ways in order to tap into the Java developer community, though in fact there is no direct relationship between the two languages.",
    "Still, because Netscape already had a deal with Sun, just before its release the language was rebranded as JavaScript and billed by the two companies as a complement to the Java language.",
    "In practice, everyone refers to the language as JavaScript."]


const container = document.querySelector(".container"),
timer = container.querySelector(".timer"),
cpm = timer.querySelector(".cpm");
cpm_text = cpm.querySelector(".cpm_text");
wpm = timer.querySelector(".wpm");
wpm_text = wpm.querySelector(".wpm_text");
error = timer.querySelector(".error"),
error_text = error.querySelector(".error_text");
time = timer.querySelector(".time"),
timer_text = time.querySelector(".timer_text"),
accuracy = timer.querySelector(".accuracy"),
acc_text = accuracy.querySelector(".acc_text");
sampleText = container.querySelector(".sampletext"),
testarea = document.querySelector(".testarea"),
test = testarea.querySelector(".test");

let gametimer = null;

let timeLeft = 60;
let timeElapsed = 0;
let errors = 0;
let total_errors = 0;
let enteredCharCount = 0;
let currentText = '';
let cpmValue = 0;
let wpmValue = 0;


let isTestStarted = false;

test.addEventListener("click", e => {
    if (!isTestStarted) {
        startTest();
    }
}, false);

test.addEventListener("input", event => {
    processTypedText()
}, false);

function startTest() {
    console.log("starting test");
    console.log(sampleText);
    isTestStarted = true;
    getRandomLine();
    clearInterval(gametimer);
    gametimer = setInterval(updateTimer, 1000);
}

function getRandomLine() {
    sampleText.textContent = null;
    currentText = textList[Math.floor(Math.random() * textList.length)];
    currentText.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        sampleText.appendChild(charSpan)
    });
}

function processTypedText() {
    currentEnteredText = test.value;
    currentTextArray = currentEnteredText.split('');

    enteredCharCount++;

    errors = 0;


    sampleTextArray = sampleText.querySelectorAll('span');
    sampleTextArray.forEach((char, index) => {
        let typedChar = currentTextArray[index]

        if (typedChar == null) {
            char.classList.remove('correct');
            char.classList.remove('incorrect');

        } else if (typedChar === char.innerText) {
            char.classList.add('correct');
            char.classList.remove('incorrect');

        } else {
            char.classList.add('incorrect');
            char.classList.remove('correct');

            errors++;
        }
    });

    error_text.textContent = total_errors + errors;

    let correctCharacters = (enteredCharCount - (total_errors + errors));
    let accuracyVal = ((correctCharacters / enteredCharCount) * 100);
    acc_text.textContent = Math.round(accuracyVal) + ' %';

    if (currentText.length == currentEnteredText.length) {
        getRandomLine();

        total_errors += errors;

        test.value = "";
    }
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeElapsed++;
        timer_text.textContent = timeLeft + "s";
    }
    else {
        endGame();
    }
}

function endGame() {

    test.disabled = true;
    clearInterval(timer);
    cpmValue = Math.round(((enteredCharCount / timeElapsed) * 60));
    wpmValue = Math.round((((enteredCharCount / 5) / timeElapsed) * 60));

    cpm_text.textContent = cpmValue;
    wpm_text.textContent = wpmValue;

    cpm.style.display = "inline-block";
    wpm.style.display = "inline-block";
}





