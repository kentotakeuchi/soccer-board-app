export const COLORS = {
  white: 'hsl(240 11% 96%)',
  transparentWhite: {
    10: 'hsl(0 0% 100% / 0.1)',
    15: 'hsl(0 0% 100% / 0.15)',
    90: 'hsl(0 0% 100% / 0.9)'
  },
  black: 'hsl(24 5% 6%)',
  transparentBlack: {
    10: 'hsl(0 0% 0% / 0.1)',
    15: 'hsl(0 0% 0% / 0.15)',
    70: 'hsl(0 0% 0% / 0.7)',
    90: 'hsl(0 0% 0% / 0.9)'
  },
  gray: {
    100: 'hsl(40 12% 95%)',
    300: 'hsl(35 8% 80%)',
    500: 'hsl(30 4% 60%)',
    700: 'hsl(28 5% 40%)',
    900: 'hsl(24 6% 16%)'
  },
  field: 'hsl(124 59% 33%)'
}

export const WEIGHTS = {
  normal: 400,
  medium: 550,
  bold: 700
}

// mobile first
export const BREAKPOINTS = {
  tabletMin: 550,
  laptopMin: 800,
  desktopMin: 1500
}

export const QUERIES = {
  // default: min - 550px(mobile)
  tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin / 16}rem)`, // 551px - (tablet)
  laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin / 16}rem)`, // 801px - (laptop)
  desktopAndUp: `(min-width: ${BREAKPOINTS.desktopMin / 16}rem)` // 1501px - (desktop)
}

export const FAMILIES = {
  serif: '"Crimson Pro", Georgia, serif',
  sansSerif:
    '"Helvetica Neue", Helvetica, "Franklin Gothic Medium", "Franklin Gothic", "ITC Franklin Gothic", sans-serif',
  logo: 'Chomsky'
}
