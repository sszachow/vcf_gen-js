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

function name(index, offset, names) {
    var indx = (index + offset).toString()
    var indxChr = indexChar(index);
    return "N:" + indx + "_" + names.last + "_" + indxChr + ";" + indx + "_" + names.first + "_" + indxChr + ";" + indx + "_" + names.middle + "_" + indxChr + ";;\n";
}

function fullName(index, offset, names) {
    var indx = (index + offset).toString()
    var indxChr = indexChar(index);
    return "FN:" + indx + "_" + names.first + "_" + indxChr + " " + indx + "_" + names.last + "_" + indxChr + "\n";
}

function fileName(contacts, putPhotos, type) {
    if(putPhotos === true) {
        var suff = "_" + type.toLowerCase();
    } else {
        var suff = "";
    }
    return fileNameBase + "_" + contacts + suff + ".vcf";
}

function org(len) {
    return "ORG:" + rndStrUp(len) + "\n";
}

function title(len) {
    return "TITLE:" + rndStrUp(len) + "\n";
}

function telephone(type, len) {
    return "TEL;TYPE=" + type.toUpperCase() + ",VOICE:" + rndNum(len) + "\n";
}

function photo(b64Arr, type, put) {
    if(put === true) {
        var pic = b64Arr[type][Math.floor(Math.random() * b64Arr[type].length)];
        return "PHOTO;TYPE=" + type.toUpperCase() + ";ENCODING=B:" + pic + "\n";
    } else {
        return "";
    }
}

function address(type) {
    return "ADR;TYPE=" + type.toUpperCase() + ":;;" + rndNum(3) + " " + rndStrUp(6) + " " + rndStrUp(4) + ";" + rndStrUp(8) + ";" + rndStrUp(5) + ";" + rndNum(5) + ";" + rndStrUp(9) + "\n";
}

function email(type) {
    return "EMAIL;TYPE=" + type.toUpperCase() + ",INTERNET:" + rndStr(5) + "." + rndStr(8) + "@" + rndStr(5) + "." + rndStr(2) + "\n";
}

function vcfAsStr(contacts, offset, names, photos, type, put) {
    var result = "";
    var temp = "";
    
    for(var i = 0; i < contacts; i++) {
        temp = 
            "BEGIN:VCARD\n" +
            "VERSION:3.0\n" +
            name(i, offset, names) +
            fullName(i, offset, names) +
            photo(photos, type, put) +
            org(10) +
            title(8) +
            telephone("home", 8) +
            telephone("work", 9) +
            address("home") +
            address("work") +
            email("home") +
            email("work") +
            "END:VCARD\n\n";
        result += temp;
    }
    
    return result;
}

