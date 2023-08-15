// Improts
import * as cli from "./cli.js";
import converter from "./solvers/converter.js";
import dictionary from "./solvers/dictionary.js";

// Creates debug tag
const debug = false;

// Hides cursor
cli.hideCursor();

// Creates selection screen
const selection = {
	Converter: converter,
	Dictionary: dictionary
} as const;
const selectionList = Object.keys(selection);
const selectionRange = 10;
let selectionPage = 0;
let selectionIndex = 0;
let selectionLocked = false;

// Handles keypress events
cli.keyboard.on("key", async (key) => {
	// Handles exit
	if (key.ctrl && key.name === "c") {
		// Shows cursor
		cli.showCursor();

		// Exits
		process.exit(0);
	}

	// Handles selection menu
	else if (!selectionLocked) {
		if (key.name === "up") previousSelectionIndex();
		else if (key.name === "down") nextSelectionIndex();
		else if (key.name === "left") previousSelectionPage();
		else if (key.name === "right") nextSelectionPage();
		else if (key.name === "return") {
			// Locks selection
			selectionLocked = true;

			// Selects solver
			const selectionWindow = selectionList.slice(
				selectionPage * selectionRange,
				(selectionPage + 1) * selectionRange
			);
			const selectionSelected = selectionWindow[selectionIndex] as keyof typeof selection;

			// Sets up solver
			cli.clear();
			cli.showCursor();

			// Executes solver
			try {
				await selection[selectionSelected]();
			} catch (error) {
				cli.print(error instanceof Error ? error.message : "[Error] Unknown error", "error");
				if (debug) console.log(error);
			}

			// Cleans up solver
			cli.gap();
			cli.print("Press [Enter] to Return", "highlight");
			await cli.prompt();
			cli.hideCursor();
			cli.clear();

			// Unlocks selection
			selectionLocked = false;

			// Refreshes selection display
			displaySelection();
		} else displaySelection();
	}
});

// Displays selection menu
displaySelection();

// Creates selection helpers
function previousSelectionIndex() {
	// Decrements index if possible
	if (selectionIndex > 0) selectionIndex -= 1;
	// Decrements page if possible
	else if (selectionPage > 0) {
		selectionPage -= 1;
		selectionIndex = selectionRange - 1;
	}

	// Refreshes selection menu
	displaySelection();
}
function nextSelectionIndex() {
	// Increments index if possible
	if (selectionPage * selectionRange + selectionIndex < selectionList.length - 1) {
		if (selectionIndex === selectionRange - 1) {
			selectionPage += 1;
			selectionIndex = 0;
		} else selectionIndex += 1;
	}

	// Refreshes selection menu
	displaySelection();
}
function previousSelectionPage() {
	// Decrements page if possible
	if (selectionPage > 0) {
		selectionPage -= 1;
		selectionIndex = 0;
	}

	// Refreshes selection menu
	displaySelection();
}
function nextSelectionPage() {
	// Increments page if possible
	if ((selectionPage + 1) * selectionRange < selectionList.length - 1) {
		selectionPage += 1;
		selectionIndex = 0;
	}

	// Refreshes selection menu
	displaySelection();
}
function displaySelection() {
	// Clears sceren
	cli.clear();

	// Prints title
	cli.print("TUI Solver", "important");
	cli.print("A terminal-based utility solver");
	cli.gap();

	// Prints selection window
	cli.print("--- [Choose Solver] ---", "separator");
	const selectionWindow = selectionList.slice(selectionPage * selectionRange, (selectionPage + 1) * selectionRange);
	for (let index = 0; index < selectionWindow.length; index++) {
		cli.print(selectionWindow[index], index === selectionIndex ? "highlight" : "hidden");
	}
	cli.print(
		"--- Up: Previous Solver | Down: Next Solver | Left: Previous Page | Right: Next Page | Enter: Select ---",
		"separator"
	);
	cli.gap();

	// Prints footer
	cli.print("Credits");
	cli.print("DmmD GM © 2023 | iiPythonx © 2023", "hidden");
}
