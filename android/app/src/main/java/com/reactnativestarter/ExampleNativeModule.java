package com.reactnativestarter;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ExampleNativeModule extends ReactContextBaseJavaModule {

    private static final String MODULE_NAME = "ExampleNativeModule";

    public ExampleNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    // This is how RN bridge knows about our module
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    /**
     * Method called from RN app
     * Example method that reverses character order
     * @param text (string)
     */
    @ReactMethod
    public void reverseCharacterOrder(String text, Promise promise) {
        StringBuilder reversedString = new StringBuilder();
        reversedString.append(text);
        reversedString = reversedString.reverse();
        promise.resolve(reversedString.toString());
    }
}
