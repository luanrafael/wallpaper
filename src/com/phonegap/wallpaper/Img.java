package com.phonegap.wallpaper;
import java.io.IOException;
import java.net.URL;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.apache.cordova.api.PluginResult;
import org.apache.cordova.api.PluginResult.Status;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.WallpaperManager;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

public class Img extends CordovaPlugin {
    public final String ACTION_SET_WALLPAPER = "setWallPaper";
    
    @Override
    public boolean execute(String action, JSONArray arg1, CallbackContext callbackContext) {
        PluginResult result = new PluginResult(Status.INVALID_ACTION);
        Log.i("IMG","CONSEGUI ENTRAR");
        System.out.println(arg1.toString());
        if (action.equals(ACTION_SET_WALLPAPER)) {
        	Context ctx = this.cordova.getActivity().getApplicationContext();
            BitmapFactory.Options options = new BitmapFactory.Options();
            options.inSampleSize = 2;
            WallpaperManager wallpaperManager = WallpaperManager.getInstance(ctx);
            
            try {
                Bitmap bitmap=null;
                try {
                	System.out.println(arg1.getString(0));
                	Log.i("IMG",arg1.getString(0));
                	bitmap = BitmapFactory.decodeStream(new URL(arg1.getString(0)).openStream(),null,options);
                } catch (JSONException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }

//                Bitmap bit=BitmapFactory.decodeStream(bitmap);
                wallpaperManager.setBitmap(bitmap);
                result = new PluginResult(Status.OK);
            } catch (IOException e) {

                e.printStackTrace();
                result = new PluginResult(Status.ERROR, e.getMessage());
            }
        }
        callbackContext.sendPluginResult(result);
        return true;
    }
}