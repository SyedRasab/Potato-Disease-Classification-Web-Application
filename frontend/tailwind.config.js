/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                nature: {
                    900: '#1a4731', // Deep Forest Green
                    800: '#2d5e40',
                    700: '#427855',
                    600: '#5ba375',
                    500: '#7bc494',
                    100: '#eefcf4',
                    50: '#f7fff9',
                },
                earth: {
                    500: '#a68a64',
                    100: '#f5f0e6',
                }
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
