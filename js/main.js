var minContacts = 1;
var maxContacts = 2000;
var letters = "abcdefghijklmnopqrstuvwxyz";
var numbers = "0123456789";
var indexChars = numbers + letters.toUpperCase();
var maxIndexDigits = 4;
var allowedAddressTypes = ["Home", "Work", "Other"];
// TODO: function for setting up drop downs expects dicts. This has to be fixed
var generateAddressTypes = {"real addresses":"", "random strings":""};

$(document).ready(function() {
    setDropDown("#photoTypes", photos);
    setAddressTypes(allowedAddressTypes);
    setDropDown('#generateAddressTypes', generateAddressTypes);
    
    $('#generate').click(function() {
        var cntcts = parseInt($("input[id=contacts]").val());
        var start = parseInt($("input[id=start]").val());
        
        if(validFields(cntcts, start)) {
            var names = new Names();
            var putPhotos = $('#includePhotos').is(':checked');
            var photoType = $("#photoTypes").val();
            var addressTypes = getSelectedAddressTypes();
            var generateAddressType = $('#generateAddressTypes').val();
                        
            $('#generate').animate({
                disabled: true
            }, 100, function() {
                var vcfStr = vcfAsStr(cntcts, start, names, photoType, putPhotos, addressTypes, generateAddressType);
                var fName = fileName(cntcts, putPhotos, photoType);

                var blob = new Blob([vcfStr], {type: "text/plain;charset=utf-8"});
                saveAs(blob, fName);
                vcfStr = null;
                $('#generate').prop('disabled', false);
            });            
        } else {
            window.alert("Please provide a number in range <" + minContacts + ", " + maxContacts + ">.");
        }
    });
});

