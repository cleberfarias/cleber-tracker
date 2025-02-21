import type { Config } from 'tailwindcss'

const config: Config = {
  prefix: 'tw-',
  important: true,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: ['class', '.dark-theme'],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        'white-soft': '#F6F6F6',
        'light-gray': '#F9FAFC',
        'light-blue': '#EAEFFE',
        'light-red': '#FFECEC',
        'light-yellow': '#FEF7E5',
        'light-orange': '#FFF5F0',
        'divider-light-1': '#EAEAEA',
        'divider-light-2': '#E7E7E7',
        heading: '#17191C',
        'light-gray-body': '#828A91',
        'gray-body': '#4E555A',
        'dark-gray-body': '#3D3D3D',
        'light-blue-body': '#2F60F0',
        'light-red-body': '#F44B3B',
        'light-yellow-body': '#F9BD24',
        'light-orange-body': '#FE7427',
        'light-green-body': '#19AE79',
        black: '#000'
      },
      transitionProperty: {
        spacing: 'transform, margin, padding, width, height, opacity'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-out-down': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)'
          },
          to: {
            opacity: '0',
            transform: 'translateY(10px)'
          }
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-out-up': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)'
          },
          to: {
            opacity: '0',
            transform: 'translateY(10px)'
          }
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'fade-out-down': 'fade-out-down 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'fade-out-up': 'fade-out-up 0.3s ease-out'
      },
      backgroundImage: {
        'green-gradient': 'linear-gradient(135deg, #1bc487 0%, #17a270 100%)',
        'white-gradient':
          'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%)',
        'white-vertical-gradient':
          'linear-gradient(180deg, #F9FAFC 0%, rgba(249, 250, 252, 0) 100%)'
      },
      boxShadow: {
        'dark-blue': '0px -8px 32px 0px rgba(7, 17, 54, 0.15)'
      }
    },
    fontFamily: {
      poppins: ['Poppins'],
      nunito: ['Nunito Sans', 'sans-serif'],
      appleEmoji: ['Apple Color Emoji', 'sans-serif'],
      googleEmoji: ['Noto Color Emoji', 'sans-serif'],
      twitterEmoji: ['Twemoji Mozilla', 'sans-serif'],
      joypixelsEmoji: ['JoyPixels', 'sans-serif'],
      openmojiEmoji: ['OpenMoji', 'sans-serif'],
      roboto: ['Roboto']

    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      }
    }
  },
  plugins: []
}

export default config
