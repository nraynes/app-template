/* eslint-disable no-restricted-globals */
import getDeviceType from "@/utils/core/getDeviceType";
import colors from "./colorTheme";

export const topBarHeight = '3em';
export const bottomBarHeight = '3em';
export const apiURL = process.env.REACT_APP_API_URL;
export const deviceType = getDeviceType();
export const onMobile = deviceType === 'mobile' || deviceType === 'tablet';
export const backgroundColor = colors.primary.one
export const backgroundOpacity = 1
export const backgroundImage = `${apiURL.substring(0, apiURL.length-4)}/background`;
export const backgroundGradientEffect = false
export const commonFormColor = colors.secondary.one
export const commonFormOpacity = 0.8
export const buttonColor = colors.secondary.two
export const buttonOpacity = 1
export const consoleColor = colors.secondary.three
export const buttonBarOpacity = 0.6
export const titleBarOpacity = 0
export const notificationsOpacity = 0.9
export const drawerOpacity = 0.8
export const postColor = colors.primary.two
export const postOpacity = 0.15
export const postFrostedGlassEffect = true
export const postFrostLevel = 10
export const backgroundImageCode = `url(${backgroundImage}) no-repeat center top fixed; background-size: cover; background-color: rgba(${backgroundColor.main}, ${backgroundOpacity});`;
// export const backgroundImageCode = `url(${backgroundImage}) no-repeat center top fixed; background-size: cover; background-color: rgba(${backgroundColor.main}, ${backgroundOpacity});`;
export const showGlow = true;
export const touchConfig = {
  swipe: {
    YTolerance: 35,
    XTolerance: 50,
  }
}