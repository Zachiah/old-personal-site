module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      maxWidth: {
        "fit-content": "fit-content"
      }
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    visiblity: ['responsive', 'group-hover', 'hover']
  },
  plugins: [],
}
