const HEADINGSLIST = ["h1", "h2", "h3", "h4", "h5", "h6"];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

jQuery.fn.tagNameLowerCase = function () {
    return this.prop("tagName").toLowerCase();
};

function findHeadingChildren(parentNode, childTag) {
    var tag = parentNode.tagNameLowerCase();
    var index = HEADINGSLIST.indexOf(tag);
    var items = parentNode.nextUntil(HEADINGSLIST[index], childTag);
    while (index >= 0) {
        var temp = parentNode.nextUntil(HEADINGSLIST[index], childTag);

        if (temp.length < items.length) {
            console.log("parent to " + HEADINGSLIST[index] + " is closer to " + HEADINGSLIST.indexOf(tag));
            items = temp;
            if (temp.length === 0) {
                break;
            }
        }
        index--;
    }
    return items;
}

function createAjax(url, type, db, q, doneCallback, failCallback, alwaysCallback) {
    $.ajax({
        url: url,
        data: {
            type: type,
            db: db,
            q: q
        },

        type: "POST",
        dataType: "json"
    })
        .done(function (json) {
            if (typeof doneCallback !== "undefined") {
                doneCallback(json);
            }
            console.log(json);
        })

        .fail(function (xhr, status, errorThrown) {
            if (typeof failCallback !== "undefined") {
                failCallback(xhr, status, errorThrown);
            } else {
                console.log("Problem occurred when " + type + " data.");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
            }
        })
        .always(function (xhr, status) {
            if (typeof alwaysCallback !== "undefined") {
                alwaysCallback(xhr, status);
            }
        });
}