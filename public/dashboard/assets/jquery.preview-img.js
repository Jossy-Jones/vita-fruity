$.fn.previewImageFrom =  function (fileInputSelector) {
    //Image to preview
    imageObj = $(this);
    function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    imageObj.attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }

    $(fileInputSelector).change(function () {
        readURL(this);
    });

};
