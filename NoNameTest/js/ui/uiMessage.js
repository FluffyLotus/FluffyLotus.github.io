﻿var textToWrite = "";
var textToWriteSpeed = 10;
var textToWriteIndex = 0;

function uiDrawNewMessage() {
    if (messages.length > 0) {
        if ($("#showOverTooltip").is(':checked')) {
            if (document.getElementById("messageSection").style.display == "none") {
                document.getElementById("messageSection").style.display = "block";
                document.getElementById("tooltipSection").style.display = "none";

                var msg = messages[0];
                messages.shift();

                uiDrawMessage(msg);
            }
        }
        else {
            var msg = messages[0];
            messages.shift();

            uiAddToastMessage("Quest Update", msg);
        }
    }
}

function uiDrawMessage(msg) {
    textToWrite = msg;
    textToWriteIndex = 0;

    document.getElementById("messageInnerText").innerHTML = "";

    setTimeout(uiDrawMessageAnim, textToWriteSpeed);
}

function uiCloseMessage() {
    document.getElementById("messageSection").style.display = "none";
    document.getElementById("tooltipSection").style.display = "block";

    uiDrawNewMessage();
}

function uiDrawMessageAnim() {
    if (textToWriteIndex < textToWrite.length) {
        document.getElementById("messageInnerText").innerHTML += textToWrite.charAt(textToWriteIndex);
        textToWriteIndex++;
        setTimeout(uiDrawMessageAnim, textToWriteSpeed);
    }
}