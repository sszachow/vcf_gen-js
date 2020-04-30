var minContacts = 1;
var maxContacts = 2000;
var letters = "abcdefghijklmnopqrstuvwxyz";
var numbers = "0123456789";
var indexChars = numbers + letters.toUpperCase();
var maxIndexDigits = 4;
var allowedAddressTypes = ["Home", "Work", "Other"];

$(document).ready(function() {
    var $imgType = setDropDown('img_type', 'img_type', 'span#include_text', photos);
    var $genButton = $('button#generate');
    setAddressTypes(allowedAddressTypes, "addressTypes");
    
    $genButton.click(function() {
        var cntcts = parseInt($("input[id=contacts]").val());
        var start = parseInt($("input[id=start]").val());
        
        if(validFields(cntcts, start)) {
            var names = new Names();
            var putPhotos = $('#photos').is(':checked');
            var photosType = $imgType.val();
            var addressTypes = new AddressTypes();
                        
            $genButton.animate({
                disabled: true
            }, 100, function() {
                var vcfStr = vcfAsStr(cntcts, start, names, photos, photosType, putPhotos, addressTypes);
                var fName = fileName(cntcts, putPhotos, photosType);

                var blob = new Blob([vcfStr], {type: "text/plain;charset=utf-8"});
                saveAs(blob, fName);
                vcfStr = null;
                $genButton.prop('disabled', false);
            });            
        } else {
            window.alert("Please provide a number in range <" + minContacts + ", " + maxContacts + ">.");
        }
    });
});

