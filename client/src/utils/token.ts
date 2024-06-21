const styleTokens = {
  primaryColor: 'var(--primary-color )',
  darkerColor: 'var(--darker-color )',
  greyColor: 'var(--grey-color )',
  lightGreyColor: 'var(--light-grey-color )',
  accentColor: 'var(--accent-color )',
}

export const getStyleToken = (token: keyof typeof styleTokens) => styleTokens[token]
