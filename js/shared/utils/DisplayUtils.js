/**
 * @providesModule utils.DisplayUtils
 * @flow
 */

import { Dimensions, Platform, ViewPropTypes } from 'react-native';

export function isDeviceIphoneX() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height === 812 || dimen.width === 812)
    );
}

export function iPhoneXStyles(iphoneXStyle: ViewPropTypes.style) {
    if (isDeviceIphoneX()) {
        return iphoneXStyle;
    }
    return undefined;
}

export default {
    isDeviceIphoneX,
    iPhoneXStyles,
};
