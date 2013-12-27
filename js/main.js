var minCntcts = 1;
var maxCntcts = 2000;
var letters = "abcdefghijklmnopqrstuvwxyz";
var numbers = "0123456789";
var indexChars = numbers + letters.toUpperCase();
var fileNameBase = "vcf_gmail";

function rndTxt(len, chars) {
    var text = "";

    for(var i = 0; i < len; i++) {
        text += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return text;
}

function rndStr(len) {
    return rndTxt(len, letters);
}

function rndNum(len) {
    return rndTxt(len, numbers);
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function rndStrUp(len) {
    return capitalize(rndStr(len));
}

function indexChar(index) {
    return indexChars.charAt(index % indexChars.length);
}

function validFields() {
    for(var i = 0; i < arguments.length; i++) {
        if(isNaN(arguments[i]) || arguments[i] < minCntcts || arguments[i] > maxCntcts) {
            return false;
        }
    }
    return true;
}

function Names() {
    this.first = $("input[id=first]").val();
    this.middle = $("input[id=middle]").val();
    this.last = $("input[id=last]").val();
}

function name(index, offset, names) {
    var indx = (index + offset).toString()
    var indxChr = indexChar(index);
    return sprintf("N:%s_%s_%s;%s_%s_%s;%s_%s_%s;;\n", indxChr, names.last, indx, indxChr, names.first, indx, indxChr, names.middle, indx);
}

function fullName(index, offset, names) {
    var indx = (index + offset).toString()
    var indxChr = indexChar(index);
    return sprintf("FN:%s_%s_%s %s_%s_%s\n", indxChr, names.first, indx, indxChr, names.last, indx);
}

function fileName(contacts) {
    return sprintf("%s_%d.vcf", fileNameBase, contacts);
}

function org(len) {
    return sprintf("ORG:%s\n", rndStrUp(len));
}

function title(len) {
    return sprintf("TITLE:%s\n", rndStrUp(len));
}

function telephone(type, len) {
    return sprintf("TEL;TYPE=%s,VOICE:%s\n", type.toUpperCase(), rndNum(len));
}

function photo(b64Arr, put) {
    if(put === true) {
        var pic = b64Arr[Math.floor(Math.random() * b64Arr.length)];
        return sprintf("PHOTO;TYPE=JPEG;ENCODING=B:%s\n", pic);
    } else {
        return "";
    }
}

function vcfAsStr(contacts, offset, names, photos, put) {
    var result = "";
    var temp = "";
    
    for(var i = 0; i < contacts; i++) {
        temp = 
            "BEGIN:VCARD\n" +
            "VERSION:3.0\n" +
            name(i, offset, names) +
            fullName(i, offset, names) +
            photo(photos, put) +
            org(10) +
            title(8) +
            telephone("home", 8) +
            telephone("work", 9) +
            "END:VCARD\n\n";
        result += temp;
    }
    
    return result;
}

$(document).ready(function() {
    $('button#generate').click(function() {
        var cntcts = parseInt($("input[id=contacts]").val());
        var start = parseInt($("input[id=start]").val());

        if(validFields(cntcts, start)) {
            var names = new Names();
            var putPhotos = $('#photos').is(':checked');
                
            saveAs(new Blob([vcfAsStr(cntcts, start, names, photosArr, putPhotos)], {type: "text/plain;charset=utf-8"}), fileName(cntcts));
        } else {
            window.alert("Please provide a number in range <" + minCntcts + ", " + maxCntcts + ">.");
        }
    });
});
