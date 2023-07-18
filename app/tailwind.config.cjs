/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors:{
			"color": {
				primary: "#2C3639",
				secondary: "#3F4E4F",
				tercelary: "#A27B5C",
				tercelary2: "#dd7421",
				whitesh: "#F9F5EB",
				grey: "#DCD7C9",
				white: "#fffefa",
				truewhite: "#ffffff",
				shadow: "#808e91"
			},
			"priority-high":{
				primary: "#F67280",
				secondary: "#C06C84",
				tercelary: "#F6E1C3",
			},
			"priority-medium":{
				primary: "#6E85B7",
				secondary: "#B2C8DF",
				tercelary: "#F8F9D7"
			},
			"priority-low":{
				primary: "#789395",
				secondary: "#94B49F",
				tercelary: "#B4CFB0"
			},
			"tag":{
				design: "#FAAB78",
				coding: "#BA94D1",
				work: "#EEBB4D",
				personal: "#92817A",
				bug: "#99BBAD"
			}

		},
	  extend: {
		boxShadow:{
			"rounded": "0px 0px 5px 2px rgba(0,0,0,0)"
		},
		screens:{
		 '3xl': '1890px'
		}
	  },
	},
	plugins: [],
  }