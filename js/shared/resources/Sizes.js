/**
 * @providesModule resources.Sizes
 * @flow
 */

import { Dimensions, PixelRatio } from 'react-native';
import { clamp } from 'moremath';

const WINDOW = Dimensions.get('window');
const MAX_PPI_FOR_IMAGES = 240; // Maximum desired PPI for images

// Platform values
const Window = {
    fontScale: PixelRatio.get(),
    width: WINDOW.width,
    height: WINDOW.height,
    scale: PixelRatio.get(),
    scaleForImages: Math.min(MAX_PPI_FOR_IMAGES, PixelRatio.get() * 160) / 160,
};

// Functions
const SizeFunctions = {
    // should used scaled 90% of the time
    scaled: (s: number, min: number = 0, max: number = Number.MAX_VALUE) => {
        return clamp(s / 375 * Window.width, min, max);
    },
    // should use round for dividers, underlines, etc...
    scaledRound: (s: number, min: number = 0, max: number = Number.MAX_VALUE) => {
        return Math.round(clamp(s / 375 * Window.width, min, max));
    },
    // should use font for fonts, size, letter spacing, line height, etc..
    scaledFont: (s: number) => {
        return Math.round((s / 375 * Window.width) * (Window.fontScale / Window.scale));
    },
    // viewport width
    vw: (s: number) => {
        return (s / 100) * Window.width;
    },
    // viewport height
    vh: (s: number) => {
        return (s / 100) * Window.height;
    },
    vd: (s: number) => {
        return (s / 100) * (Window.height - Window.width);
    },
};

// Size literals
const BasicSizes = {
    exampleDivider: SizeFunctions.scaledRound(1, 1),
    examplePadding: SizeFunctions.scaled(10),
    exampleButtonLetterSpacing: SizeFunctions.scaledFont(1),
    exampleButtonFontSize: SizeFunctions.scaledFont(16),
    exampleButtonLineHeight: SizeFunctions.scaledFont(21),
};

// Final export composition
const Sizes = {
    ...BasicSizes,
    ...SizeFunctions,
    Window,
};

export default Sizes;
