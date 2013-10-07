package com.phonegap.wallpaper;

import org.apache.cordova.DroidGap;

import android.os.Bundle;

public class Wallpaper extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.loadUrl("file:///android_asset/www/wallpaper.html");
	}

	

}
