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
        if(isNaN(arguments[i]) || arguments[i] < minContacts || arguments[i] > maxContacts) {
            return false;
        }
    }
    return true;
}

function pad(num) {
    var s = "000000000" + num;
    return s.substr(s.length - maxIndexDigits);
}

function name(index, offset, names) {
    var indx = pad(index + offset);
    var indxChr = indexChar(index);
    return "N:" + indx + "_" + names.last + "_" + indxChr + ";" + indx + "_" + names.first + "_" + indxChr + ";" + indx + "_" + names.middle + "_" + indxChr + ";;\n";
}

function fullName(index, offset, names) {
    var indx = pad(index + offset);
    var indxChr = indexChar(index);
    return "FN:" + indx + "_" + names.first + "_" + indxChr + " " + indx + "_" + names.last + "_" + indxChr + "\n";
}

function fileName(contacts, putPhotos, type) {
    if(putPhotos === true) {
        var suff = "_" + type.toLowerCase();
    } else {
        var suff = "";
    }
    return "vcf_" + contacts + suff + ".vcf";
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

function photo(type, put) {
    if(put === true) {
        var pic = photos[type][Math.floor(Math.random() * photos[type].length)];
        return "PHOTO;TYPE=" + type.toUpperCase() + ";ENCODING=B:" + pic + "\n";
    } else {
        return "";
    }
}

function addresses(addressTypes, generateAddressType) {
    var result = "";
    var length = addressTypes.length;
    for(i = 0; i < length; i++) {
        var type = addressTypes[i].toUpperCase();
        if(generateAddressType === "random string") {
            result += `ADR;TYPE=${type}:;;${rndNum(3)} ${rndStrUp(6)} ${rndStrUp(4)};${rndStrUp(8)};${rndStrUp(5)};${rndNum(5)};${rndStrUp(9)}\n`;
        } else if(generateAddressType === "real addresses") {
            var address = realAddresses[Math.floor(Math.random() * realAddresses.length)];
            result += `ADR;TYPE=${type}:;;${address["STREET"]} ${address["HOUSENUMBER"]};${address["CITY"]};;${address["POSTCODE"]};${address["COUNTRY"]}\n`;
        } else {
            result += "";
        }
    }
    return result;
}

function email(type) {
    return "EMAIL;TYPE=" + type.toUpperCase() + ",INTERNET:" + rndStr(5) + "." + rndStr(8) + "@" + rndStr(5) + "." + rndStr(2) + "\n";
}

function vcfAsStr(contacts, offset, names, type, put, addressTypes, generateAddressType) {
    var result = "";
    var temp = "";
    
    for(var i = 0; i < contacts; i++) {
        temp = 
            "BEGIN:VCARD\n" +
            "VERSION:3.0\n" +
            name(i, offset, names) +
            fullName(i, offset, names) +
            photo(type, put) +
            org(10) +
            title(8) +
            telephone("home", 8) +
            telephone("work", 9) +
            addresses(addressTypes, generateAddressType) +
            email("home") +
            email("work") +
            "END:VCARD\n\n";
        result += temp;
    }
    
    return result;
}

