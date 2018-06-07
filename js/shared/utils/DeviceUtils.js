/**
 * @providesModule utils.DeviceUtils
 * @flow
 */

import DeviceInfo from 'react-native-device-info';

function getDeviceInfo() {
    const appInfo = `App version: ${DeviceInfo.getVersion()}.${DeviceInfo.getBuildNumber()}`;
    const deviceInfo = `Device: ${DeviceInfo.getBrand()} ${DeviceInfo.getModel()}`;
    const osInfo = `Operating system: ${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()}`;
    const deviceCountryCarrierInfo = `Device country/carrier info: ${DeviceInfo.getDeviceCountry()}, ${DeviceInfo.getCarrier()}`;
    const timezoneInfo = `Timezone: ${DeviceInfo.getTimezone()}`;
    return `----\n${appInfo}\n${deviceInfo}\n${osInfo}\n${timezoneInfo}\n${deviceCountryCarrierInfo}\n----\n`;
}

const DeviceUtils = {
    getDeviceInfo,
};

export default DeviceUtils;
