function Names() {
    this.first = $("input[id=first]").val();
    this.middle = $("input[id=middle]").val();
    this.last = $("input[id=last]").val();
}

function AddressTypes() {
    this.home = $('#home').is(':checked');
    this.work = $('#work').is(':checked');
    this.other = $('#other').is(':checked');
}

function setDropDown(id, name, after, photos) {
    var dropDown = $("<select id=\"" + id + "\" name=\"" + name + "\" />");

    for(var val in photos) {
        $("<option />", {value: val, text: val}).appendTo(dropDown);
    }
    $(after).after(dropDown);
    
    return dropDown;
}

function setAddressTypes(allowedTypes, id) {
    var length = allowedTypes.length;
    for(var i = 0; i < length; i++) {
        var id = allowedTypes[i].toLowerCase();
        var type = allowedTypes[i];
        $("#addressTypes").append("<input id=" + id + " type=\"checkbox\" checked=\"checked\" /><span>" + type + "</span>");
    }
}

