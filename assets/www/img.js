var imagens = new Array();

var imgPlugin = {
	aplica : function(successCallback, errorCallback) {
		cordova.exec(successCallback, // success callback function
		errorCallback, // error callback function
		'ImgPlugin', // mapped to our native Java class called
		'setWallPaper', // with this action name
		[ document.getElementById("img").src ]);
	}
}

// Pega imagem do flickr
function procurarImg() {

	if (imagens.length > 0) {
		var div = document.getElementById("images");
		div.removeChild(document.getElementById("img"));
		imagens = new Array();
	}

	var argsearch = document.getElementById("argsearch").value;

	$
			.getJSON(
					"http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
					{
						tags : argsearch,
						tagmode : "any",
						format : "json"
					},

					function(data) {

						$.each(data.items, function(i, item) {
							var img = document.createElement("IMG");
							img.setAttribute("src", item.media.m);
							img.setAttribute("id", "img");
							img.setAttribute("data-indice", i);
							imagens[i] = img;
							if (i === 10)
								return false;
						});
						document.getElementById("images").appendChild(
								imagens[0]);
					});
}

function troca() {
	var img = document.getElementById("img");
	var ind = img.getAttribute("data-indice");
	ind = parseInt(ind) + 1;
	if (ind == imagens.length) {
		ind = 0;
	}
	document.getElementById("images").removeChild(img);
	document.getElementById("images").appendChild(imagens[ind]);
}

function onBodyLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {

	var element = document.getElementById("images");
	Hammer(element).on("swipeleft", function() {
		troca();
	});
	Hammer(element).on("doubletap", function() {
		setP();
	});
	
}

function setP() {
	var success = function() {
		alert("Success");
	};
	var error = function(message) {
		alert("Oopsie! " + message);
	};
	imgPlugin.aplica(success, error);
}