/**
 * @providesModule definitions.UI
 * @flow
 */

export const AppStateValues = {
    active: 'active',
    background: 'background',
    inactive: 'inactive',
    unknown: 'unknown',
};
export type AppState = $Keys<typeof AppStateValues> | null;
