import { getCookie } from "@/utils/browser/cookies";

const currentTheme = getCookie('theme');

export const modifier = 20;
export const lightModifier = 20;
export const darkModifier = 20;

const defaultTheme = {
  primaryOne: {
    red: 255,
    green: 255,
    blue: 255,
  },
  primaryTwo: {
    red: 255,
    green: 255,
    blue: 255,
  },
  secondaryOne: {
    red: 200,
    green: 200,
    blue: 200,
  },
  secondaryTwo: {
    red: 255,
    green: 255,
    blue: 255,
  },
  secondaryThree: {
    red: 12,
    green: 18,
    blue: 117,
  },
  hardWireTextColor: {
    set: false,
    red: 255,
    green: 255,
    blue: 255,
  },
  hardWireOpposingPrimaryOneColor: {
    set: true,
    red: 0,
    green: 0,
    blue: 0,
  },
  hardWireOpposingPrimaryTwoColor: {
    set: false,
    red: 255,
    green: 255,
    blue: 255,
  },
  hardWireOpposingSecondaryOneColor: {
    set: false,
    red: 255,
    green: 255,
    blue: 255,
  },
  hardWireOpposingSecondaryTwoColor: {
    set: false,
    red: 255,
    green: 255,
    blue: 255,
  },
  hardWireOpposingSecondaryThreeColor: {
    set: false,
    red: 255,
    green: 255,
    blue: 255,
  },
  textLight: {
    red: 255,
    green: 255,
    blue: 255,
  },
  textDark: {
    red: 0,
    green: 0,
    blue: 0,
  },
}
export const myTheme = currentTheme || defaultTheme;