/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/browser/**/*.{js,ts,jsx,tsx,mdx}',
    './src/common/components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#fcf4f5',
  				'100': '#fae9ec',
  				'200': '#f4d7dc',
  				'300': '#ebb6c1',
  				'400': '#df8da0',
  				'500': '#d36e88',
  				'600': '#ba4468',
  				'700': '#9c3457',
  				'800': '#832e4d',
  				'900': '#712a46',
  				'950': '#3e1323',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#f5f8f5',
  				'100': '#e8f0e8',
  				'200': '#d1e1d2',
  				'300': '#adc8ae',
  				'400': '#80a881',
  				'500': '#557c56',
  				'600': '#4a6f4b',
  				'700': '#3c593d',
  				'800': '#334834',
  				'900': '#2b3c2c',
  				'950': '#141f15',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			gray: {
  				'25': '#fcfcfd',
  				'50': '#f9fafb',
  				'100': '#f2f4f7',
  				'200': '#e4e7ec',
  				'300': '#d0d5dd',
  				'400': '#98a2b3',
  				'500': '#667085',
  				'600': '#475467',
  				'700': '#344054',
  				'800': '#1d2939',
  				'900': '#101828'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		gridTemplateColumns: {
  			'auto-fill-minmax': 'repeat(auto-fill, minmax(10rem, 1fr))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
}
