var boxes;
var dataFile;
var apiKey = "MY_REBRICKABLE_API_KEY";
var apiBaseUrl = "https://rebrickable.com/api/v3/lego/";

$(document).ready(function() {
    document.getElementById('fileinput').addEventListener('change', getFile, false);
    document.getElementById('render').addEventListener('click', readFile, false);
});

function getFile(evt) {
    dataFile = evt.target.files[0];
}


function readFile() {
    var r = new FileReader();
    r.onloadend = function(e) {
        $('#labels').empty();
        boxes = JSON.parse(e.target.result);
        getParts(boxes);
    }
    r.readAsText(dataFile);
}

function getBoxParts(box) {
    return new Promise((resolve) => {
        if (box.allParts.length === 0) {
            box.resolvedParts = [];
            resolve(box);
        } else {
            var url = apiBaseUrl + "parts/?part_nums=" + box.allParts.join();
            $.ajax({
                url: url,
                type: "GET",
                async: false,
                dataType: "json",
                headers: { "Authorization": "key " + apiKey },
                complete: function(result) {
                    var parts = []
                    if (typeof(result.responseJSON.results) === 'undefined') {
                        console.log('undefined');
                    } else {
                        for (resultIndex = 0; resultIndex < result.responseJSON.results.length; resultIndex++) {
                            parts.push({
                                part_num: result.responseJSON.results[resultIndex].part_num,
                                part_img_url: result.responseJSON.results[resultIndex].part_img_url
                            })
                        }
                        box.resolvedParts = parts;
                    }
                    resolve(box);
                }
            });
        }
    });
}

function getParts(data) {
    for (boxIndex = 0; boxIndex < data.boxes.length; boxIndex++) {
        data.boxes[boxIndex].allParts = [];
        for (var drawerIndex = 0; drawerIndex < data.boxes[boxIndex].drawers.length; drawerIndex++) {
            data.boxes[boxIndex].allParts = data.boxes[boxIndex].allParts.concat(data.boxes[boxIndex].drawers[drawerIndex]);
        }
    }
    Promise.all(data.boxes.map(box => getBoxParts(box))).then(function(box) {
        box.map(renderBox);
    });
}

function renderBox(box) {
    var clientId = "box" + box.id;
    var boxHtml = "<div id='" + clientId + "' class='box'><div class='boxheader'><span>Box: <b>" + box.id + "</b> || Drawer Size: <b>" + box.size + "</b></span></div><div class='boxdrawers'></div></div>"
    $('#labels').append(boxHtml);
    for (drawerIndex = 0; drawerIndex < box.drawers.length; drawerIndex++) {
        var drawer = box.drawers[drawerIndex];
        var drawerHtml = "<div class='drawer " + box.size + "'>";
        for (partIndex = 0; partIndex < drawer.length; partIndex++) {
            var partnum = drawer[partIndex];
            var imageUrl = "";
            if (partnum != 0) {
                var resolvedPart = box.resolvedParts.find(resolvedPart => {
                    return resolvedPart.part_num == partnum;
                })
                imageUrl = typeof(resolvedPart) === "undefined" ? "" : resolvedPart.part_img_url;
            } else {
                partnum = "";
            }
            drawerHtml += "<div class='part'>"
            drawerHtml += "<div class='partimage' style='background-image: url(" + imageUrl + ")'></div>"
            drawerHtml += "<div class='partnum'>" + partnum + "</div>"
            drawerHtml += "</div>"
        }
        drawerHtml += "</div>"
        $('#' + clientId + " .boxdrawers").append(drawerHtml);
        //boxHtml += drawerHtml;
    }
    //boxHtml += "</div></div>";

}



function renderDrawer(drawer) {

    return drawerHtml;
}