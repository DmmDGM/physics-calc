// Imports
import { cliFloat, cliImportant, cliLog, cliPrint } from "./cli.js";
import { degreesToRadians } from "./functions.js";

// Functions
async function projectile(): Promise<void> {
	// Defines initial velocity
	cliImportant("Initial Velocity (m/s): ");
	const initialVelocity = await cliFloat();
	if (initialVelocity === null) throw new Error("Initial velocity is null.");

	// Defines tilt angle
	cliImportant("Tilt Angle (°): ");
	const tiltAngle = await cliFloat();
	if (tiltAngle === null) throw new Error("Initial velocity is null.");

	// Defines constants
	const earthGravity = 9.8;
	cliPrint(`Assume: acc_gravity = ${earthGravity} (m/s^2)`);

	// Calculates angled initial velocities
	const angledInitialVelocity = calculateAngledVelocity(initialVelocity, tiltAngle);
	cliLog("Formula: vel_init_x = vel_init * cos(angle)");
	cliPrint(`Evaluate: vel_init_x = ${angledInitialVelocity.horizontal} (m/s)`);
	cliLog("Formula: vel_init_y = vel_init * sin(angle)");
	cliPrint(`Evaluate: vel_init_y = ${angledInitialVelocity.vertical} (m/s)`);

	// Calculates time going upwards
	const timeUpwards = -angledInitialVelocity.vertical / -earthGravity;
	cliLog("Formula: vel_final = vel_init + -acc * time");
	cliLog("Rearrange: time_upwards = (vel_final_y - vel_init_y) / -acc_gravity");
	cliLog("Simplify: time_upwards = (0 - vel_init_y) / acc_gravity = -vel_init_y / -acc_gravity");
	cliPrint(`Evaluate: time_upwards = ${timeUpwards} (s)`);

	// Calculates time in air
	const timeTotal = 2 * timeUpwards;
	cliLog("Forumla: time_total = time_upwards + time_downwards = 2 * time_upwards");
	cliPrint(`Evaluate: time_total = ${timeTotal} (s)`);

	// Calculates horizontal distance
	const horizontalDistance = angledInitialVelocity.horizontal * timeTotal;
	cliLog("Formula: dist_x = vel_x * time");
	cliPrint(`Evaluate: dist_x = ${horizontalDistance} (m)`);

	// Calculates vertical range
	const verticalRange = 0.5 * -earthGravity * Math.pow(timeUpwards, 2) + angledInitialVelocity.vertical * timeUpwards;
	cliLog("Formula: dist = 0.5 * acc * time^2 + vel * time");
	cliLog("Substitute: range_y = 0.5 * -acc_gravity * top_upwards^2 + vel_init_y * top_upwards");
	cliPrint(`Evaluate: range_y = ${verticalRange} (m)`);

	// Calculates vertical range (alternative)
	const verticalRangeAlternative = Math.pow(angledInitialVelocity.vertical, 2) / 2 / earthGravity;
	cliLog("Alternative Formula: range_y = vel_init_y^2 / 2 / acc_gravity");
	cliPrint(`Evaluate: range_y = ${verticalRangeAlternative} (m)`);
}

function calculateAngledVelocity(velocity: number, angle: number): { horizontal: number; vertical: number } {
	const radians = degreesToRadians(angle);
	return {
		horizontal: velocity * Math.cos(radians),
		vertical: velocity * Math.sin(radians)
	};
}

// Exports
export { projectile };
