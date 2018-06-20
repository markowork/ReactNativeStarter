/**
 * @flow
 */

import { EXAMPLE_ACTION_BOOLEAN_VALUE } from 'actionTypes.Example';

type InitialState = {
    exampleBooleanValue: boolean,
};

const INITIAL_STATE: InitialState = {
    exampleBooleanValue: false,
};

export default (state: InitialState = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case EXAMPLE_ACTION_BOOLEAN_VALUE:
            return {
                ...state,
                exampleBooleanValue: action.payload,
            };
        default:
            return state;
    }
};
