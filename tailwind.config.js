const defaultTheme = require('tailwindcss/defaultTheme');
const _ = require('lodash');
const plugin = require('tailwindcss/plugin');

module.exports = {
    mode : 'jit',
    darkMode : 'class',
    purge: [
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    corePlugins: {
     preflight: false,
    },
    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },
    plugins: [
        plugin(function({ addUtilities, theme, e }) {
            const calcUtilities = _.map(theme('spacing'), (value, key) => {
                return {
                [`.${e(`calc-h-full-${key}`)}`]: {
                    height: `calc(100% - ${value})`
                },
                [`.${e(`calc-w-full-${key}`)}`]: {
                    width: `calc(100% - ${value})`
                }
                }
            })
            addUtilities(calcUtilities, {
                variants: ['responsive', 'hover'],
            })
        }),
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography')
    ],
};
