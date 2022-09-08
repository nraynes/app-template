import { getCookie } from '@/utils/browser/cookies';

// Custom default theme editor. Setting these values will change what initially shows up on page as a color theme.

// A cookie is used to store any custom theme the user might implement using the built in tool.
const currentTheme = getCookie('theme');

/* The modifier variable modifies how drastic the light and dark versions of a color will change.
The higher the number, the darker or lighter the other versions of a color will be.*/
export const modifier = 20;

/* If you choose to use light or dark modifiers you can individually set each modifier,
however you must set the modifier variable to null in order to do this.*/
export const lightModifier = 20;
export const darkModifier = 20;

/* There are 5 colors in the color theme,
and light and dark versions of each color will be created in the colorTheme.js file automatically.*/
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
  hardWireTextColor: {  /* If this is set to true then all text will be the same color specified here. */
    set: false,
    red: 255,
    green: 255,
    blue: 255,
  },
  hardWireOpposingPrimaryOneColor: { // The next hard wire objects if set to true will individual set
    set: true,                       // what color the text will be when on top of the corresponding color in the color theme.
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
  textLight: {  // Text light and dark specify what color the light text and dark text will be.
    red: 255,
    green: 255,
    blue: 255,
  },
  textDark: {
    red: 0,
    green: 0,
    blue: 0,
  },
};

// The user's custom theme is applied here if the cookie is found.
export const myTheme = currentTheme || defaultTheme;