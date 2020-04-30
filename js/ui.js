function Names() {
    this.first = $("input[id=first]").val();
    this.middle = $("input[id=middle]").val();
    this.last = $("input[id=last]").val();
}

function setDropDown(id, name, after, photos) {
    var dropDown = $("<select id=\"" + id + "\" name=\"" + name + "\" />");

    for(var val in photos) {
        $("<option />", {value: val, text: val}).appendTo(dropDown);
    }
    $(after).after(dropDown);
    
    return dropDown;
}

function setAddressTypes(allowedTypes) {
    var length = allowedTypes.length;
    for(var i = 0; i < length; i++) {
        var type = allowedTypes[i];
        if(i == 0) {
            var checked = "checked";
        } else {
            var checked = "";
        }
        $("#addressTypes").append(`<label><input type="checkbox" ${checked} value=${type}>${type}</label>`);
    }
}

function getSelectedAddressTypes() {
    var result = [];
    $("#addressTypes").children().children(":checked").each(function(){
        result.push($(this).attr("value"));
    });
    return result;
}
