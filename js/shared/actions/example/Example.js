/**
 * @providesModule actions.Example
 * @flow
 */

import { EXAMPLE_ACTION_BOOLEAN_VALUE } from './types';

export const toggleExampleReduxBooleanValue = (value: boolean) => {
    return {
        type: EXAMPLE_ACTION_BOOLEAN_VALUE,
        payload: value,
    };
};
