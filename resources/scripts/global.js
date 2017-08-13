$(document).ready(function () {
    $("#copyright").click(function () {
        if ($(window).width() >= 768) {
            $("#contact").animate({
                width: "toggle"
            });
        } else {
            $("#contact").animate({
                height: "toggle"
            });
        }
    });


    prepareLineNumbers();
    prepareCopyBtn();
    prepareOutline();
});

function prepareLineNumbers() {
    $(".line-numbers .code").prepend(generateLineNumbers(this.$("code")));
}

function generateLineNumbers(src) {
    var str = "";
    if (typeof src !== "string") {
        str = src.html();
    } else {
        str = src;
    }
    var number = 0;
    var reg = /\r\n|\r|\n/g;
    var length = str.length;

    //count line number
    var match = reg.exec(str);
    while (match !== null) {
        number++;
        match = reg.exec(str);
        console.log(number);
    }
    if (str.charAt(length) !== "") {
        if (str.charAt(str.length) !== '\n' || str.charAt(str.length) !== '\r') {
            number++;
        }
    }

    //generate <code> for line numbering
    var code = $("<code/>", {
        "class": "code-numbering"
    });
    for (var i = 1; i <= number; i++) {
        code.text(code.text() + i + '\n');
    }
    return code;
}

function prepareCopyBtn() {
    $(".code-panel").append($("<a/>", {
        "class": "copy",
        "text": "COPY"
    }));
    $(".copy").click(function () {
        var code = $(this).parent(".code-panel").find(".code-content")[0];

        if (document.selection) {
            var range = document.body.createTextRange();
            range.moveToElementText(code);
            range.select();
        } else if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(code);
            window.getSelection().empty();
            window.getSelection().addRange(range);
        }
        try {
            var successful = document.execCommand('copy');
            if (successful) {
                var copy = this;
                this.innerHTML = "COPIED";
                setTimeout(function () {
                    copy.innerHTML = "COPY";
                    window.getSelection().empty();
                }, 1000);
            } else {
                this.innerHTML = "Failed. Please press Ctrl+C to copy.";
            }
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    });
}

function prepareOutline() {
    var outline = $("#outline");
    $("article h1").clone().appendTo(outline);
    $("section h3").clone().appendTo(outline);
}