/** @type {import('tailwindcss').Config} */
module.exports = {
   // NOTE: Update this to include the paths to all files that contain Nativewind classes.
   content: [
      './App.tsx',
      './app/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
   ],
   presets: [require('nativewind/preset')],
   theme: {
      extend: {
         fontFamily: {
            primary: 'Poppins-Regular',
            medium: 'Poppins-Medium',
            bold: 'Poppins-Bold',
         },
         colors: {
            // Base colors
            background: 'var(--color-background)',
            foreground: 'var(--color-foreground)',

            // Brand and UI colors
            primary: {
               500: 'var(--color-primary-500)',
               600: 'var(--color-primary-600)',
            },
            secondary: {
               500: 'var(--color-secondary-500)',
            },
            accent: {
               500: 'var(--color-accent-500)',
            },
            muted: {
               100: 'var(--color-muted-100)',
               500: 'var(--color-muted-500)',
            },

            // Semantic colors
            success: 'var(--color-success)',
            destructive: 'var(--color-destructive)',
         },
      },
   },
   plugins: [],
};
