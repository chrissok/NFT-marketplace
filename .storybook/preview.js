import React from 'react';
import "../src/app/globals.css";
import { Michroma, Blinker } from "next/font/google";

const michroma = Michroma({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--main-font",
});

const blinker = Blinker({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--body-font",
});


const preview = {
	decorators: [
		(Story) => (
			<div className={`${michroma.variable} ${blinker.variable}`}>
				<Story />
			</div>
		),
	],
};

export default preview;
