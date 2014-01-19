var minCntcts = 1;
var maxCntcts = 2000;
var letters = "abcdefghijklmnopqrstuvwxyz";
var numbers = "0123456789";
var indexChars = numbers + letters.toUpperCase();
var fileNameBase = "vcf";

$(document).ready(function() {
    var imgType = setDropDown('img_type', 'img_type', 'span#include_text', photos);
        
    $('button#generate').click(function() {
        var cntcts = parseInt($("input[id=contacts]").val());
        var start = parseInt($("input[id=start]").val());

        if(validFields(cntcts, start)) {
            var names = new Names();
            var putPhotos = $('#photos').is(':checked');
            var photosType = imgType.val();
            var vcfStr = vcfAsStr(cntcts, start, names, photos, photosType, putPhotos);
            var fName = fileName(cntcts, putPhotos, photosType);
            
            saveAs(new Blob([vcfStr], {type: "text/plain;charset=utf-8"}), fName);
            vcfStr = null;
        } else {
            window.alert("Please provide a number in range <" + minCntcts + ", " + maxCntcts + ">.");
        }
    });
});

