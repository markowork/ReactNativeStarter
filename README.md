# React Native Starter

## Setup

First, you will need all the React Native dependencies. Follow the [Installing Dependencies](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies) section of the official guide for that.

Then, you need to install the local dependencies:

```shell
npm install
```

You can then start editing the app.

## Development

### Dependencies

node: v8.x (eg. v8.1.2)
npm: v5.3.x (eg. v5.3.0)
react-native-cli: 2.0.1

### Starting

To run the app on iOS, run this from the repository root:

```shell
react-native run-ios
```

Alternatively, you can also open `ios/ReactNativeStarter.xcodeproj` in Xcode and hit the "Run" button.

To run the app on Android, first have an emulator running (or a device connected in debug mode) and run this from the repository root:

```shell
react-native run-android
```

Alternatively, you can also open the project inside `android/` on Android Studio and hit the "Run" button.

### Reloading

To view any changes you perform in the code, you can either tap CMD+R (iOS Simulator) or R, R (Android Emulator), or enable auto reloading.

The application follows two concepts - *live reloading*, where the application is restarted every time a change is detected, and *hot reloading*, where the application is updated (new code or data is injected).

To enable either, access the debug menu by pressing CMD+D (iOS Simulator) or CRL+M (Android Emulator) and select the desired option from the menu.

### Flow

React Native Starter uses Facebook Flow to check on types, and then `flow-typed` to install definitions for third-party languages (so it can check types on arbitrary modules). This works out of the box, but it's a good idea to update the definitions from time to time.

Do:

```shell
npm install flow-typed -g
```

To install the flow-typed tool. Then, do:

```shell
flow-typed update
```

To update existing definitions and install new ones as needed.

## Maintenance

Here's a list of common tasks that may not have a obvious solution:

### Adding or removing fonts

They need to be inside `/assets/fonts`, and to be linked dynamically in both iOS and Android projects. Then `fontFamily` refers to their original font family name (not the file name). See [this article](https://medium.com/@danielskripnik/how-to-add-and-remove-custom-fonts-in-react-native-b2830084b0e4) for a guide.


### Adding or removing images

Place images in `/assets/images/`. They can have `@2x`, `@3x`, and `@4x` suffixes, as well as `.android` and `.ios` suffixes. Then, regardless of the suffixes used, you do:

```javascript
<Image source={ require('../../assets/images/someName.png') } />
```

Additionally it would be great to use `optipng` on photos (optipng is just a command-line tool. Good to optimize PNGs in a lossless way. You can install with `brew install optipng` if you use homebrew) since the bundles can get big and every amount helps.

Move to `assets/images` folder and run `optipng -o7 -strip all on pin_orange@1x.png` where `pin_orange@1x.png` is our image file name.

* Do not use dynamic strings inside the `require()` call as it is replaced with a hash during compile time and it won't work.
* The file path is relative.

See [the documentation](https://facebook.github.io/react-native/docs/images.html) for more information.

For SVGs we use a component called `SVGImage` and pass SVG content as `svgXmlData` prop. Usually we use `Icons` from `Resources` module to store our SVG content.

### Exporting module names

More generic components and classes that are supposed to be used anywhere have an exported module name in the format `group.ModuleName`. For example, for `Button`:

```javascript
/**
 * @providesModule components.Button
 * @flow
 */
```

And then, to import:

```javascript
import Button from 'components.Button';
```

The current `providesModule` groups are:

* `components.*`: generic, reusable components
* `data.*`: utilities related to data storage and manipulation.
* `resources.*`: global resource values. Normally imported from the top-level `Resources` module.
* `utils.*`: utility classes and functions
