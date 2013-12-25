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

function name(index, first, middle, last) {
	var indx = index.toString()
	var indxChr = indexChar(index);
	return sprintf("N:%s_%s_%s;%s_%s_%s;%s_%s_%s;;\n", indxChr, last, indx, indxChr, first, indx, indxChr, middle, indx);
}

function fullName(index, first, middle, last) {
	var indx = index.toString()
	var indxChr = indexChar(index);
	return sprintf("FN:%s_%s_%s %s_%s_%s\n", indxChr, first, indx, indxChr, last, indx);
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

function vcfAsStr(contacts, first, middle, last) {
	var result = "";
	var temp = "";
	
	for(var i = 0; i < contacts; i++) {
		temp = 
			"BEGIN:VCARD\n" +
			"VERSION:3.0\n" +
			name(i, first, middle, last) +
			fullName(i, first, middle, last) +
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
		var cntctsRaw = $("input[id=contacts]").val();
		var cntcts = parseInt(cntctsRaw);

		if(!isNaN(cntcts) && cntcts >= minCntcts && cntcts <= maxCntcts) {
			var first = $("input[id=first]").val();
			var middle = $("input[id=middle]").val();
			var last = $("input[id=last]").val();
				
			saveAs(new Blob([vcfAsStr(cntcts, first, middle, last)], {type: "text/plain;charset=utf-8"}), fileName(cntcts));
		} else {
			window.alert("Please provide a number in range <" + minCntcts + ", " + maxCntcts + ">.");
		}
	});
});
