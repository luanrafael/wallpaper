var helloPlugin = {
	CallNativeFunction : function(success, fail, resultType) {
		cordova.exec(success, fail, "HelloPlugin", "nativeAction", [ resultType ]);
	}
};