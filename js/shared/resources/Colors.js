/**
 * @providesModule resources.Colors
 * @flow
 */

import ColorString from 'color-string';

// Functions
const ColorFunctions = {
    // The >>> 0 is needed because JavaScript mis-manipulates uint32s
    // Set the alpha of a 0xrrggbbaa component, replacing the old alpha with the new one in the 0..1 range
    alpha: (color: string | number, a: number, preMultiplied: boolean = false) => {
        const numberColor = ColorFunctions.asNumber(color);
        const alphaScale = preMultiplied ? (numberColor & 0xff) / 0xff : 1;
        return ColorFunctions.asString(((numberColor & 0xffffff00) | Math.round(0xff * a * alphaScale)) >>> 0);
    },

    // Returns color as a string; needed in some cases where only string colors are accepted
    asString: (color: string | number) => {
        if (typeof(color) === 'string') return color;
        // Color() does not understand 0xrrggbbaa correctly, so we do it manually
        const r = color >>> 24 & 0xff;
        const g = color >>> 16 & 0xff;
        const b = color >>> 8 & 0xff;
        const a = (color & 0xff) / 0xff;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    },

    // Returns color as a number; needed in some cases where only number colors are accepted
    asNumber: (color: string | number) => {
        if (typeof(color) === 'number') return color;
        const colorArray = ColorString.get.rgb(color);
        return (
            colorArray[0] << 24 |
            colorArray[1] << 16 |
            colorArray[2] << 8 |
            Math.round(colorArray[3] * 0xff)
        ) >>> 0;
    },

    // Returns 0  1, light or dark content
    getBrightness: (color: string | number) => {
        const colorN = ColorFunctions.asNumber(color);
        const r = colorN >>> 24 & 0xff;
        const g = colorN >>> 16 & 0xff;
        const b = colorN >>> 8 & 0xff;
        return r / 255 * 0.2126 + g / 255 * 0.7152 + b / 255 * 0.0722; 
    },

};


// Color literals
const BasicColors = {
    black: ColorFunctions.asString(0x000000ff),
    blue: ColorFunctions.asString(0x0000ffff),
    green: ColorFunctions.asString(0x00ff00ff),
    red: ColorFunctions.asString(0xff0000ff),
    transparent: 'transparent',
    white: ColorFunctions.asString(0xffffffff),
};

// Complex colors are the one that are not described easily / basic
// the ones that require alpha for example
const ComplexColors = {
    exampleColorAsString: ColorFunctions.asString(0xfc9919ff),
    exampleColorWithAlpha: ColorFunctions.alpha(BasicColors.black, 0.3),
};

// Opacities used throughout the project
const Opacities = {
    exampleOpacity: 0.1,
};

// Final export composition
const Colors = {
    ...BasicColors,
    ...ComplexColors,
    ...ColorFunctions,
    Opacities,
};

export default Colors;
