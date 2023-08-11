// Imports
import { cliClear, cliError, cliImportant, cliLog, cliPrompt } from "./cli.js";
import * as solvers from "./solvers.js";

// Creates loop
while (true) {
	// Prints all solvers
	cliClear();
	cliImportant("Select solver:");
	for (const solver in solvers) cliLog(` - ${solver}`);

	// Fetches solver
	const answer = await cliPrompt();
	const solver = answer.toLowerCase();
	if (solver in solvers) {
		try {
			await solvers[solver as keyof typeof solvers]();
		} catch (error) {
			cliError(error instanceof Error ? error.message : "An error occurred.");
		}
		await cliPrompt();
	} else {
		cliError("Invalid solver.");
		await cliPrompt();
	}
}
