/**
 * @providesModule utils.PressUtils
 * @flow
 */

import { Times } from 'Resources';

let lastPressActivation: number = Date.now();

/**
 * Checks if user can press the button. 
 * Used to prevent double clicks
 * @param fn - function to call
 */
function canPress() {
    return Date.now() - lastPressActivation > Times.doubleTapPreventingDelay;
}

/**
* Call the function and save last press time so we can check
* in the future again
*/
function pressIfAllowed(fn: any, args?: any[]) {
    if (canPress()) {
        if (fn) fn.apply(null, args);
        lastPressActivation = Date.now();
    }
}

// Final export composition
const PressUtils = {
    canPress,
    pressIfAllowed,
};

export default PressUtils;
