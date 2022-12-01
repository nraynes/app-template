import { modifier, darkModifier, lightModifier, myTheme } from './colors';

const getColors = () => {
  // checkType will get whether or not a color is light or dark.
  const checkType = (r, g, b) => {
    const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    if (hsp > 127.5) {
      return 'light';
    }
    return 'dark';
  };
  
  const primaryOneType = checkType(myTheme.primaryOne.red, myTheme.primaryOne.green, myTheme.primaryOne.blue);
  const primaryTwoType = checkType(myTheme.primaryTwo.red, myTheme.primaryTwo.green, myTheme.primaryTwo.blue);
  const secondaryOneType = checkType(myTheme.secondaryOne.red, myTheme.secondaryOne.green, myTheme.secondaryOne.blue);
  const secondaryTwoType = checkType(myTheme.secondaryTwo.red, myTheme.secondaryTwo.green, myTheme.secondaryTwo.blue);
  const secondaryThreeType = checkType(myTheme.secondaryThree.red, myTheme.secondaryThree.green, myTheme.secondaryThree.blue);
  
  const dm = modifier ? modifier : darkModifier;
  const lm = modifier ? modifier : lightModifier;
  
  const textLightDark = `${myTheme.textLight.red-dm >= 0 ? myTheme.textLight.red-dm : 0}, ${myTheme.textLight.green-dm >= 0 ? myTheme.textLight.green-dm : 0}, ${myTheme.textLight.blue-dm >= 0 ? myTheme.textLight.blue-dm : 0}`;
  const textLight = `${myTheme.textLight.red}, ${myTheme.textLight.green}, ${myTheme.textLight.blue}`;
  const textLightLight = `${myTheme.textLight.red+lm <= 255 ? myTheme.textLight.red+lm : 255}, ${myTheme.textLight.green+lm <= 255 ? myTheme.textLight.green+lm : 255}, ${myTheme.textLight.blue+lm <= 255 ? myTheme.textLight.blue+lm : 255}`;
  
  const textDarkDark = `${myTheme.textDark.red-dm >= 0 ? myTheme.textDark.red-dm : 0}, ${myTheme.textDark.green-dm >= 0 ? myTheme.textDark.green-dm : 0}, ${myTheme.textDark.blue-dm >= 0 ? myTheme.textDark.blue-dm : 0}`;
  const textDark = `${myTheme.textDark.red}, ${myTheme.textDark.green}, ${myTheme.textDark.blue}`;
  const textDarkLight = `${myTheme.textDark.red+lm <= 255 ? myTheme.textDark.red+lm : 255}, ${myTheme.textDark.green+lm <= 255 ? myTheme.textDark.green+lm : 255}, ${myTheme.textDark.blue+lm <= 255 ? myTheme.textDark.blue+lm : 255}`;
  
  const hardSetTextDark = `${myTheme.hardWireTextColor.red-dm >= 0 ? myTheme.hardWireTextColor.red-dm : 0}, ${myTheme.hardWireTextColor.green-dm >= 0 ? myTheme.hardWireTextColor.green-dm : 0}, ${myTheme.hardWireTextColor.blue-dm >= 0 ? myTheme.hardWireTextColor.blue-dm : 0}`;
  const hardSetText = `${myTheme.hardWireTextColor.red}, ${myTheme.hardWireTextColor.green}, ${myTheme.hardWireTextColor.blue}`;
  const hardSetTextLight = `${myTheme.hardWireTextColor.red+lm <= 255 ? myTheme.hardWireTextColor.red+lm : 255}, ${myTheme.hardWireTextColor.green+lm <= 255 ? myTheme.hardWireTextColor.green+lm : 255}, ${myTheme.hardWireTextColor.blue+lm <= 255 ? myTheme.hardWireTextColor.blue+lm : 255}`;
  
  const hardSetOpposingPrimaryOneDark = `${myTheme.hardWireOpposingPrimaryOneColor.red-dm >= 0 ? myTheme.hardWireOpposingPrimaryOneColor.red-dm : 0}, ${myTheme.hardWireOpposingPrimaryOneColor.green-dm >= 0 ? myTheme.hardWireOpposingPrimaryOneColor.green-dm : 0}, ${myTheme.hardWireOpposingPrimaryOneColor.blue-dm >= 0 ? myTheme.hardWireOpposingPrimaryOneColor.blue-dm : 0}`;
  const hardSetOpposingPrimaryOne = `${myTheme.hardWireOpposingPrimaryOneColor.red}, ${myTheme.hardWireOpposingPrimaryOneColor.green}, ${myTheme.hardWireOpposingPrimaryOneColor.blue}`;
  const hardSetOpposingPrimaryOneLight = `${myTheme.hardWireOpposingPrimaryOneColor.red+lm <= 255 ? myTheme.hardWireOpposingPrimaryOneColor.red+lm : 255}, ${myTheme.hardWireOpposingPrimaryOneColor.green+lm <= 255 ? myTheme.hardWireOpposingPrimaryOneColor.green+lm : 255}, ${myTheme.hardWireOpposingPrimaryOneColor.blue+lm <= 255 ? myTheme.hardWireOpposingPrimaryOneColor.blue+lm : 255}`;
  
  const hardSetOpposingPrimaryTwoDark = `${myTheme.hardWireOpposingPrimaryTwoColor.red-dm >= 0 ? myTheme.hardWireOpposingPrimaryTwoColor.red-dm : 0}, ${myTheme.hardWireOpposingPrimaryTwoColor.green-dm >= 0 ? myTheme.hardWireOpposingPrimaryTwoColor.green-dm : 0}, ${myTheme.hardWireOpposingPrimaryTwoColor.blue-dm >= 0 ? myTheme.hardWireOpposingPrimaryTwoColor.blue-dm : 0}`;
  const hardSetOpposingPrimaryTwo = `${myTheme.hardWireOpposingPrimaryTwoColor.red}, ${myTheme.hardWireOpposingPrimaryTwoColor.green}, ${myTheme.hardWireOpposingPrimaryTwoColor.blue}`;
  const hardSetOpposingPrimaryTwoLight = `${myTheme.hardWireOpposingPrimaryTwoColor.red+lm <= 255 ? myTheme.hardWireOpposingPrimaryTwoColor.red+lm : 255}, ${myTheme.hardWireOpposingPrimaryTwoColor.green+lm <= 255 ? myTheme.hardWireOpposingPrimaryTwoColor.green+lm : 255}, ${myTheme.hardWireOpposingPrimaryTwoColor.blue+lm <= 255 ? myTheme.hardWireOpposingPrimaryTwoColor.blue+lm : 255}`;
  
  const hardSetOpposingSecondaryOneDark = `${myTheme.hardWireOpposingSecondaryOneColor.red-dm >= 0 ? myTheme.hardWireOpposingSecondaryOneColor.red-dm : 0}, ${myTheme.hardWireOpposingSecondaryOneColor.green-dm >= 0 ? myTheme.hardWireOpposingSecondaryOneColor.green-dm : 0}, ${myTheme.hardWireOpposingSecondaryOneColor.blue-dm >= 0 ? myTheme.hardWireOpposingSecondaryOneColor.blue-dm : 0}`;
  const hardSetOpposingSecondaryOne = `${myTheme.hardWireOpposingSecondaryOneColor.red}, ${myTheme.hardWireOpposingSecondaryOneColor.green}, ${myTheme.hardWireOpposingSecondaryOneColor.blue}`;
  const hardSetOpposingSecondaryOneLight = `${myTheme.hardWireOpposingSecondaryOneColor.red+lm <= 255 ? myTheme.hardWireOpposingSecondaryOneColor.red+lm : 255}, ${myTheme.hardWireOpposingSecondaryOneColor.green+lm <= 255 ? myTheme.hardWireOpposingSecondaryOneColor.green+lm : 255}, ${myTheme.hardWireOpposingSecondaryOneColor.blue+lm <= 255 ? myTheme.hardWireOpposingSecondaryOneColor.blue+lm : 255}`;
  
  const hardSetOpposingSecondaryTwoDark = `${myTheme.hardWireOpposingSecondaryTwoColor.red-dm >= 0 ? myTheme.hardWireOpposingSecondaryTwoColor.red-dm : 0}, ${myTheme.hardWireOpposingSecondaryTwoColor.green-dm >= 0 ? myTheme.hardWireOpposingSecondaryTwoColor.green-dm : 0}, ${myTheme.hardWireOpposingSecondaryTwoColor.blue-dm >= 0 ? myTheme.hardWireOpposingSecondaryTwoColor.blue-dm : 0}`;
  const hardSetOpposingSecondaryTwo = `${myTheme.hardWireOpposingSecondaryTwoColor.red}, ${myTheme.hardWireOpposingSecondaryTwoColor.green}, ${myTheme.hardWireOpposingSecondaryTwoColor.blue}`;
  const hardSetOpposingSecondaryTwoLight = `${myTheme.hardWireOpposingSecondaryTwoColor.red+lm <= 255 ? myTheme.hardWireOpposingSecondaryTwoColor.red+lm : 255}, ${myTheme.hardWireOpposingSecondaryTwoColor.green+lm <= 255 ? myTheme.hardWireOpposingSecondaryTwoColor.green+lm : 255}, ${myTheme.hardWireOpposingSecondaryTwoColor.blue+lm <= 255 ? myTheme.hardWireOpposingSecondaryTwoColor.blue+lm : 255}`;
  
  const hardSetOpposingSecondaryThreeDark = `${myTheme.hardWireOpposingSecondaryThreeColor.red-dm >= 0 ? myTheme.hardWireOpposingSecondaryThreeColor.red-dm : 0}, ${myTheme.hardWireOpposingSecondaryThreeColor.green-dm >= 0 ? myTheme.hardWireOpposingSecondaryThreeColor.green-dm : 0}, ${myTheme.hardWireOpposingSecondaryThreeColor.blue-dm >= 0 ? myTheme.hardWireOpposingSecondaryThreeColor.blue-dm : 0}`;
  const hardSetOpposingSecondaryThree = `${myTheme.hardWireOpposingSecondaryThreeColor.red}, ${myTheme.hardWireOpposingSecondaryThreeColor.green}, ${myTheme.hardWireOpposingSecondaryThreeColor.blue}`;
  const hardSetOpposingSecondaryThreeLight = `${myTheme.hardWireOpposingSecondaryThreeColor.red+lm <= 255 ? myTheme.hardWireOpposingSecondaryThreeColor.red+lm : 255}, ${myTheme.hardWireOpposingSecondaryThreeColor.green+lm <= 255 ? myTheme.hardWireOpposingSecondaryThreeColor.green+lm : 255}, ${myTheme.hardWireOpposingSecondaryThreeColor.blue+lm <= 255 ? myTheme.hardWireOpposingSecondaryThreeColor.blue+lm : 255}`;
  
  return {
    primary: {
      one: {
        extraDark: `${myTheme.primaryOne.red-(dm*2) >= 0 ? myTheme.primaryOne.red-(dm*2) : 0}, ${myTheme.primaryOne.green-(dm*2) >= 0 ? myTheme.primaryOne.green-(dm*2) : 0}, ${myTheme.primaryOne.blue-(dm*2) >= 0 ? myTheme.primaryOne.blue-(dm*2) : 0}`,
        dark: `${myTheme.primaryOne.red-dm >= 0 ? myTheme.primaryOne.red-dm : 0}, ${myTheme.primaryOne.green-dm >= 0 ? myTheme.primaryOne.green-dm : 0}, ${myTheme.primaryOne.blue-dm >= 0 ? myTheme.primaryOne.blue-dm : 0}`,
        main: `${myTheme.primaryOne.red}, ${myTheme.primaryOne.green}, ${myTheme.primaryOne.blue}`,
        light: `${myTheme.primaryOne.red+lm <= 255 ? myTheme.primaryOne.red+lm : 255}, ${myTheme.primaryOne.green+lm <= 255 ? myTheme.primaryOne.green+lm : 255}, ${myTheme.primaryOne.blue+lm <= 255 ? myTheme.primaryOne.blue+lm : 255}`,
        extraLight: `${myTheme.primaryOne.red+(lm*2) <= 255 ? myTheme.primaryOne.red+(lm*2) : 255}, ${myTheme.primaryOne.green+(lm*2) <= 255 ? myTheme.primaryOne.green+(lm*2) : 255}, ${myTheme.primaryOne.blue+(lm*2) <= 255 ? myTheme.primaryOne.blue+(lm*2) : 255}`,
        type: primaryOneType,
        opposingText: {
          dark: myTheme.hardWireOpposingPrimaryOneColor.set ? hardSetOpposingPrimaryOneDark : myTheme.hardWireTextColor.set ? hardSetTextDark : primaryOneType === 'dark' ? textLightDark : textDarkDark,
          main: myTheme.hardWireOpposingPrimaryOneColor.set ? hardSetOpposingPrimaryOne : myTheme.hardWireTextColor.set ? hardSetText : primaryOneType === 'dark' ? textLight : textDark,
          light: myTheme.hardWireOpposingPrimaryOneColor.set ? hardSetOpposingPrimaryOneLight : myTheme.hardWireTextColor.set ? hardSetTextLight : primaryOneType === 'dark' ? textLightLight : textDarkLight,
        },
      },
      two: {
        extraDark: `${myTheme.primaryTwo.red-(dm*2) >= 0 ? myTheme.primaryTwo.red-(dm*2) : 0}, ${myTheme.primaryTwo.green-(dm*2) >= 0 ? myTheme.primaryTwo.green-(dm*2) : 0}, ${myTheme.primaryTwo.blue-(dm*2) >= 0 ? myTheme.primaryTwo.blue-(dm*2) : 0}`,
        dark: `${myTheme.primaryTwo.red-dm >= 0 ? myTheme.primaryTwo.red-dm : 0}, ${myTheme.primaryTwo.green-dm >= 0 ? myTheme.primaryTwo.green-dm : 0}, ${myTheme.primaryTwo.blue-dm >= 0 ? myTheme.primaryTwo.blue-dm : 0}`,
        main: `${myTheme.primaryTwo.red}, ${myTheme.primaryTwo.green}, ${myTheme.primaryTwo.blue}`,
        light: `${myTheme.primaryTwo.red+lm <= 255 ? myTheme.primaryTwo.red+lm : 255}, ${myTheme.primaryTwo.green+lm <= 255 ? myTheme.primaryTwo.green+lm : 255}, ${myTheme.primaryTwo.blue+lm <= 255 ? myTheme.primaryTwo.blue+lm : 255}`,
        extraLight: `${myTheme.primaryTwo.red+(lm*2) <= 255 ? myTheme.primaryTwo.red+(lm*2) : 255}, ${myTheme.primaryTwo.green+(lm*2) <= 255 ? myTheme.primaryTwo.green+(lm*2) : 255}, ${myTheme.primaryTwo.blue+(lm*2) <= 255 ? myTheme.primaryTwo.blue+(lm*2) : 255}`,
        type: primaryTwoType,
        opposingText: {
          dark: myTheme.hardWireOpposingPrimaryTwoColor.set ? hardSetOpposingPrimaryTwoDark : myTheme.hardWireTextColor.set ? hardSetTextDark : primaryTwoType === 'dark' ? textLightDark : textDarkDark,
          main: myTheme.hardWireOpposingPrimaryTwoColor.set ? hardSetOpposingPrimaryTwo : myTheme.hardWireTextColor.set ? hardSetText : primaryTwoType === 'dark' ? textLight : textDark,
          light: myTheme.hardWireOpposingPrimaryTwoColor.set ? hardSetOpposingPrimaryTwoLight : myTheme.hardWireTextColor.set ? hardSetTextLight : primaryTwoType === 'dark' ? textLightLight : textDarkLight,
        },
      }
    },
    secondary: {
      one: {
        extraDark: `${myTheme.secondaryOne.red-(dm*2) >= 0 ? myTheme.secondaryOne.red-(dm*2) : 0}, ${myTheme.secondaryOne.green-(dm*2) >= 0 ? myTheme.secondaryOne.green-(dm*2) : 0}, ${myTheme.secondaryOne.blue-(dm*2) >= 0 ? myTheme.secondaryOne.blue-(dm*2) : 0}`,
        dark: `${myTheme.secondaryOne.red-dm >= 0 ? myTheme.secondaryOne.red-dm : 0}, ${myTheme.secondaryOne.green-dm >= 0 ? myTheme.secondaryOne.green-dm : 0}, ${myTheme.secondaryOne.blue-dm >= 0 ? myTheme.secondaryOne.blue-dm : 0}`,
        main: `${myTheme.secondaryOne.red}, ${myTheme.secondaryOne.green}, ${myTheme.secondaryOne.blue}`,
        light: `${myTheme.secondaryOne.red+lm <= 255 ? myTheme.secondaryOne.red+lm : 255}, ${myTheme.secondaryOne.green+lm <= 255 ? myTheme.secondaryOne.green+lm : 255}, ${myTheme.secondaryOne.blue+lm <= 255 ? myTheme.secondaryOne.blue+lm : 255}`,
        extraLight: `${myTheme.secondaryOne.red+(lm*2) <= 255 ? myTheme.secondaryOne.red+(lm*2) : 255}, ${myTheme.secondaryOne.green+(lm*2) <= 255 ? myTheme.secondaryOne.green+(lm*2) : 255}, ${myTheme.secondaryOne.blue+(lm*2) <= 255 ? myTheme.secondaryOne.blue+(lm*2) : 255}`,
        type: secondaryOneType,
        opposingText: {
          dark: myTheme.hardWireOpposingSecondaryOneColor.set ? hardSetOpposingSecondaryOneDark : myTheme.hardWireTextColor.set ? hardSetTextDark : secondaryOneType === 'dark' ? textLightDark : textDarkDark,
          main: myTheme.hardWireOpposingSecondaryOneColor.set ? hardSetOpposingSecondaryOne : myTheme.hardWireTextColor.set ? hardSetText : secondaryOneType === 'dark' ? textLight : textDark,
          light: myTheme.hardWireOpposingSecondaryOneColor.set ? hardSetOpposingSecondaryOneLight : myTheme.hardWireTextColor.set ? hardSetTextLight : secondaryOneType === 'dark' ? textLightLight : textDarkLight,
        },
      },
      two: {
        extraDark: `${myTheme.secondaryTwo.red-(dm*2) >= 0 ? myTheme.secondaryTwo.red-(dm*2) : 0}, ${myTheme.secondaryTwo.green-(dm*2) >= 0 ? myTheme.secondaryTwo.green-(dm*2) : 0}, ${myTheme.secondaryTwo.blue-(dm*2) >= 0 ? myTheme.secondaryTwo.blue-(dm*2) : 0}`,
        dark: `${myTheme.secondaryTwo.red-dm >= 0 ? myTheme.secondaryTwo.red-dm : 0}, ${myTheme.secondaryTwo.green-dm >= 0 ? myTheme.secondaryTwo.green-dm : 0}, ${myTheme.secondaryTwo.blue-dm >= 0 ? myTheme.secondaryTwo.blue-dm : 0}`,
        main: `${myTheme.secondaryTwo.red}, ${myTheme.secondaryTwo.green}, ${myTheme.secondaryTwo.blue}`,
        light: `${myTheme.secondaryTwo.red+lm <= 255 ? myTheme.secondaryTwo.red+lm : 255}, ${myTheme.secondaryTwo.green+lm <= 255 ? myTheme.secondaryTwo.green+lm : 255}, ${myTheme.secondaryTwo.blue+lm <= 255 ? myTheme.secondaryTwo.blue+lm : 255}`,
        extraLight: `${myTheme.secondaryTwo.red+(lm*2) <= 255 ? myTheme.secondaryTwo.red+(lm*2) : 255}, ${myTheme.secondaryTwo.green+(lm*2) <= 255 ? myTheme.secondaryTwo.green+(lm*2) : 255}, ${myTheme.secondaryTwo.blue+(lm*2) <= 255 ? myTheme.secondaryTwo.blue+(lm*2) : 255}`,
        type: secondaryTwoType,
        opposingText: {
          dark: myTheme.hardWireOpposingSecondaryTwoColor.set ? hardSetOpposingSecondaryTwoDark : myTheme.hardWireTextColor.set ? hardSetTextDark : secondaryTwoType === 'dark' ? textLightDark : textDarkDark,
          main: myTheme.hardWireOpposingSecondaryTwoColor.set ? hardSetOpposingSecondaryTwo : myTheme.hardWireTextColor.set ? hardSetText : secondaryTwoType === 'dark' ? textLight : textDark,
          light: myTheme.hardWireOpposingSecondaryTwoColor.set ? hardSetOpposingSecondaryTwoLight : myTheme.hardWireTextColor.set ? hardSetTextLight : secondaryTwoType === 'dark' ? textLightLight : textDarkLight,
        },
      },
      three: {
        extraDark: `${myTheme.secondaryThree.red-(dm*2) >= 0 ? myTheme.secondaryThree.red-(dm*2) : 0}, ${myTheme.secondaryThree.green-(dm*2) >= 0 ? myTheme.secondaryThree.green-(dm*2) : 0}, ${myTheme.secondaryThree.blue-(dm*2) >= 0 ? myTheme.secondaryThree.blue-(dm*2) : 0}`,
        dark: `${myTheme.secondaryThree.red-dm >= 0 ? myTheme.secondaryThree.red-dm : 0}, ${myTheme.secondaryThree.green-dm >= 0 ? myTheme.secondaryThree.green-dm : 0}, ${myTheme.secondaryThree.blue-dm >= 0 ? myTheme.secondaryThree.blue-dm : 0}`,
        main: `${myTheme.secondaryThree.red}, ${myTheme.secondaryThree.green}, ${myTheme.secondaryThree.blue}`,
        light: `${myTheme.secondaryThree.red+lm <= 255 ? myTheme.secondaryThree.red+lm : 255}, ${myTheme.secondaryThree.green+lm <= 255 ? myTheme.secondaryThree.green+lm : 255}, ${myTheme.secondaryThree.blue+lm <= 255 ? myTheme.secondaryThree.blue+lm : 255}`,
        extraLight: `${myTheme.secondaryThree.red+(lm*2) <= 255 ? myTheme.secondaryThree.red+(lm*2) : 255}, ${myTheme.secondaryThree.green+(lm*2) <= 255 ? myTheme.secondaryThree.green+(lm*2) : 255}, ${myTheme.secondaryThree.blue+(lm*2) <= 255 ? myTheme.secondaryThree.blue+(lm*2) : 255}`,
        type: secondaryThreeType,
        opposingText: {
          dark: myTheme.hardWireOpposingSecondaryThreeColor.set ? hardSetOpposingSecondaryThreeDark : myTheme.hardWireTextColor.set ? hardSetTextDark : secondaryThreeType === 'dark' ? textLightDark : textDarkDark,
          main: myTheme.hardWireOpposingSecondaryThreeColor.set ? hardSetOpposingSecondaryThree : myTheme.hardWireTextColor.set ? hardSetText : secondaryThreeType === 'dark' ? textLight : textDark,
          light: myTheme.hardWireOpposingSecondaryThreeColor.set ? hardSetOpposingSecondaryThreeLight : myTheme.hardWireTextColor.set ? hardSetTextLight : secondaryThreeType === 'dark' ? textLightLight : textDarkLight,
        },
      },
    },
    text: {
      light: {
        dark: textLightDark,
        main: textLight,
        light: textLightLight,
      },
      dark: {
        dark: textDarkDark,
        main: textDark,
        light: textDarkLight,
      },
    },
  };
};

let colors = getColors();

export const setColors = () => {
  const newColors = getColors();
  colors = newColors;
};

export default colors;