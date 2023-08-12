#!/usr/bin/env node

// Imports
import solvers from "./solvers.js";
import * as Terminal from "./classes/terminal.js";
import terminal from "./terminal.js";

// Initializes menu
const scrollChoices = Object.keys(solvers);
const scrollRange = 5;
let scrollPosition = scrollRange;
let scrollSelected = 0;
let scrollPaused = false;
printMenu();

// Handles keypress events
terminal.on("key", async (string: string, key: Terminal.Key) => {
	// Handles scrolling
	if (scrollPaused) return;
	if (key.name === "up") {
		scrollSelected = Math.max(scrollSelected - 1, 0);
		if (Math.abs(scrollPosition - scrollSelected) > scrollRange) scrollPosition -= 1;
	} else if (key.name === "down") {
		scrollSelected = Math.min(scrollSelected + 1, scrollChoices.length - 1);
		if (Math.abs(scrollPosition - scrollSelected) > scrollRange) scrollPosition += 1;
	} else if (key.name === "return") {
		try {
			scrollPaused = true;
			await solvers[scrollChoices[scrollSelected]].solve(solvers);
			await terminal.prompt();
			scrollPaused = false;
		} catch (error) {
			terminal.print(error instanceof Error ? error.message : "An error occurred", "error");
			await terminal.prompt();
		}
	}

	// Prints menu
	printMenu();
});

// Functions
function printMenu() {
	// Clears terminal
	terminal.clear();

	// Prints choices
	const scrollWindow = scrollChoices.slice(scrollPosition - scrollRange, scrollPosition + scrollRange + 1);
	terminal.print("Tui Solvers", "critical");
	terminal.gap();
	terminal.print("Solver:", "critical");
	for (let index = 0; index < scrollWindow.length; index++)
		terminal.print(
			` - ${scrollWindow[index]}`,
			scrollPosition - scrollRange + index === scrollSelected ? "default" : "log"
		);
	terminal.gap();
	terminal.print("Description:", "critical");
	terminal.print(solvers[scrollChoices[scrollSelected]].description);
}
