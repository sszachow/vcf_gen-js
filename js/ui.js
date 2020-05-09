function Names() {
    this.first = $("input[id=first]").val();
    this.middle = $("input[id=middle]").val();
    this.last = $("input[id=last]").val();
}

function setDropDown(id, options) {
    for(var val in options) {
        $(id).append(new Option(val, val));
    }
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
