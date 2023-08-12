// Imports
import Solver from "./classes/solver.js";
import ProjectileMotion from "./solvers/projectileMotion.js";
import terminal from "./terminal.js";

// Initializes solvers
export const solvers: { [ solver: string ]: Solver } = {
	[ProjectileMotion.id]: new ProjectileMotion(terminal)
};

// Exports
export default solvers;
