/* eslint-disable no-restricted-globals */
import getDeviceType from "@/utils/core/getDeviceType";
import { getCookie } from "@/utils/browser/cookies";
import colors from "./colorTheme";

const custom = getCookie('customConfig');

export const activateColorDrawer = true;
export const topBarHeight = '3em';
export const bottomBarHeight = '3em';
export const testSiteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
export const apiURL = process.env.REACT_APP_API_URL;
export const deviceType = getDeviceType();
export const onMobile = deviceType === 'mobile' || deviceType === 'tablet';
export const backgroundColor = colors.primary.one
export const backgroundOpacity = custom.backgroundOpacity || 1
// export const backgroundImage = `${apiURL.substring(0, apiURL.length-4)}/background`;
export const backgroundImage = custom.backgroundImage || null;
export const backgroundGradientEffect = custom.backgroundGradientEffect || false
export const commonFormColor = colors.secondary.one
export const commonFormOpacity = custom.commonFormOpacity || 0.8
export const buttonColor = colors.secondary.two
export const buttonOpacity = custom.buttonOpacity || 1
export const consoleColor = colors.secondary.three
export const buttonBarOpacity = custom.buttonBarOpacity || 0.6
export const titleBarOpacity = custom.titleBarOpacity || 0
export const drawerOpacity = custom.drawerOpacity || 0.8
export const componentColor = colors.primary.two
export const componentOpacity = custom.componentOpacity || 0.15
export const backgroundImageCode = `url(${backgroundImage}) no-repeat center top fixed; background-size: cover; background-color: rgba(${backgroundColor.main}, ${backgroundOpacity});`;
export const touchConfig = {
  swipe: {
    YTolerance: 35,
    XTolerance: 50,
  }
}