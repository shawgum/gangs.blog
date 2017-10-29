$(document).ready(function () {


    prepareCodeMain();
    prepareLineNumbers();
    prepareCopyBtn();
    prepareBookmark();
    prepareOutline($("article h1"), $("#outline_ul"), 2);
    prepareRef();
    prepareFooterAnimation();

});

function addToInflux(str) {
    var ran = getRandomInt(0, 100);
    switch (str) {
        case "RANDOM":
            $.ajax({
                url: "influx.php",
                data: {
                    type: "INSERT",
                    value: ran,
                    db: "mydb"
                },
                type: "POST"

            })
                .done(function (json) {
                    var tr = $("<tr>");
                    tr.insertAfter("#ajaxSent .header");
                    console.log(json + " sent.");

                    $("<td>").html(json).appendTo(tr);
                })
                .fail(function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                    console.dir(xhr);
                })
                .always(function (xhr, status) {
                    // console.log("Request is complete!");
                });
            break;
    }
}

function readFromInflux() {
    var resp = $("#ajaxResp");
    var maxTime = resp.find(":nth-child(2)").find("td:first-of-type").html();
    if (typeof maxTime === "undefined") {
        maxTime = "";
    }
    var q = "SELECT * FROM \"api_test\"" + (maxTime.length > 1 ? (" WHERE time>" + "'" + maxTime + "'") : "");
    $.ajax({
        url: "influx.php",
        data: {
            type: "SELECT",
            db: "mydb",
            q: q
        },

        type: "POST",
        dataType: "json"
    })
        .done(function (json) {
            console.log("Ajax Sent.");
            var values = json["results"][0]["series"][0]["values"];
            var tr;
            var rowNo = values.length;
            for (var i = 0; i < rowNo; i++) {
                tr = $("<tr>").insertAfter("#ajaxResp .header");
                var row = values[i];
                var colNo = row.length;
                for (var j = 0; j < colNo; j++) {
                    $("<td>").html(row[j].toString()).appendTo(tr);
                }
            }
        })
        .fail(function (xhr, status, errorThrown) {
            console.log("Problem occurred when selecting data.");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        })
        .always(function (xhr, status) {
            // console.log("Request is complete!");
        });
}

function clearTable(name) {
    $(name).find("tr[class!=header]").remove();
}

function deleteSchema(name) {
    clearTable(name);
    var q = "";
    createAjax("influx.php", "DROP", "mydb", "");
}

function prepareCodeMain() {
    $(".code-content").wrap("<div class=\"code-main\">");
}


function prepareLineNumbers() {
    $(".line-numbers .code-main").each(function (i, val) {
        $(val).prepend(generateLineNumbers($(val).find(".code-content")));
    });
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
    }
    if (str.charAt(length - 1) !== "") {
        if (str.charAt(length - 1) !== '\n' && str.charAt(length - 1) !== '\r') {
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
                window.getSelection().empty();
                setTimeout(function () {
                    copy.innerHTML = "COPY";
                }, 1000);
            } else {
                this.innerHTML = "Failed. Please press Ctrl+C to copy.";
            }
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    });
}

function prepareBookmark() {
    $("article h2").each(function (i, val) {
        val.id = val.innerHTML;
    });
}

function prepareOutline(parent, parentContainer, currentNo) {
    if (currentNo > 4) {
        return true;
    }

    var currents = findHeadingChildren(parent, "h" + currentNo);

    if (currents.length > 0) {
        var length = currents.length;
        for (var i = 0; i < length; i++) {
            console.log(i + " item of " + length + ": " + "id: " + currents[i].id + "\n html: " + currents[i].innerHTML);
            var currentLi = $("<li><a href=#" + currents[i].id + ">" + currents[i].innerHTML + "</a></li>");
            currentLi.appendTo(parentContainer);
            var currentUl = $("<ul>");
            currentUl.appendTo(currentLi);

            if (prepareOutline($(currents[i]), currentUl, currentNo + 1)) {
                return false;
            }
        }
    } else {
        console.log("Item h" + currentNo + " is all found. Proceed to find more.");
        prepareOutline(parent, parentContainer, currentNo + 1);
    }

    return false;
}

function prepareRef() {
    $("a.ref").wrap("<div class='ref'/>");
}

function prepareFooterAnimation() {
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
}
