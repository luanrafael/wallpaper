var imgPlugin = {
    aplica: function(title,successCallback, errorCallback) {
        cordova.exec(
            successCallback, // success callback function
            errorCallback, // error callback function
            'ImgPlugin', // mapped to our native Java class called "CalendarPlugin"
            'setWallPaper', // with this action name
            [document.getElementById("img").src]
        );
     }
}

$(document).ready(function () {
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
        tags: "cachorro",
        tagmode: "any",
        format: "json"
    },

    function (data) {
        
        $.each(data.items, function (i, item) {
            var img = document.createElement("IMG");
            img.setAttribute("src", item.media.m);
            img.setAttribute("id", "img");
            document.getElementById("images").appendChild(img);
            
            if (i == 0) return false;
        });
    });
});