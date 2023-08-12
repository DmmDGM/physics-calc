// Imports
import Solver from "../classes/solver.js";
import { toRadians } from "../converter.js";

// Type
export type Result = {
	angle: number;
	gravity: number;
	impactTime: number;
	initialHorizontalVelocity: number;
	initialVelocity: number;
	initialVerticalVelocity: number;
	maximumHorizontalDisplacement: number;
	maximumVerticalDisplacement: number;
	peakTime: number;
}

// Class
export class ProjectileMotion extends Solver {
	// Properties
	static readonly description = "Calculates projectile motion from initial velocity and angle.";
	static readonly id = "Projectile Motion";
	description = ProjectileMotion.description;
	id = ProjectileMotion.id;

	// Methods
	async solve(solvers: { [ solver: string ]: Solver }, defaultValues: Partial<Result> = {}): Promise<Result> {
		// Defines initial velocity
		let initialVelocity: number | null | undefined = defaultValues["initialVelocity"];
		if(typeof initialVelocity === "undefined") {
			this.printInput("Input: Initial Velocity | Default = 0 (m/s)");
			initialVelocity = await this.promptNumber(0);
			if(initialVelocity === null) throw new Error("Invalid initial velocity");
		}
		this.printAnswer(`Given: vel_init = ${initialVelocity} (m/s)`);

		// Defines angle
		let angle: number | null | undefined = defaultValues["angle"];
		if(typeof angle === "undefined") {
			this.printInput("Input: Angle | Default = 0 (°)");
			angle = await this.promptNumber(0);
			if(angle === null) throw new Error("Invalid angle");
		}
		this.printAnswer(`Given: angle = ${angle} (°)`);
		const radians = toRadians(angle);

		// Defines gravity
		let gravity: number | null | undefined = defaultValues["gravity"];
		if(typeof gravity === "undefined") {
			this.printInput("Input: Gravity | Default = 9.8 (m/s^2)");
			gravity = await this.promptNumber(9.8);
			if(gravity === null) throw new Error("Invalid gravity");
		}
		this.printAnswer(`Given: gravity = ${gravity} (N)`);

		// Calculates horizontal and vertical initial velocity
		const initialHorizontalVelocity = initialVelocity * Math.cos(radians);
		this.printStep("Formula: vel_init_x = vel_init * cos(angle)");
		this.printAnswer(`Evaluate: vel_init_x = ${initialHorizontalVelocity} (m/s)`);
		const initialVerticalVelocity = initialVelocity * Math.sin(radians);
		this.printStep("Formula: vel_init_y = vel_init * sin(angle)");
		this.printAnswer(`Evaluate: vel_init_y = ${initialVerticalVelocity} (m/s)`);

		// Calculates peak time
		const peakTime = initialVerticalVelocity / gravity;
		this.printStep("Formula: vel_final = vel_init + acc * time");
		this.printStep("Substitute: 0 = vel_init_y + -acc_gravity * time_peak");
		this.printStep("Rearrange: time_peak = vel_init_y / acc_gravity");
		this.printAnswer(`Evaluate: time_peak = ${peakTime} (s)`);

		// Calculates impact time
		const impactTime = 2 * peakTime;
		this.printStep("Formula: time_total = 2 * time_peak");
		this.printAnswer(`Evaluate: time_impact = ${impactTime} (s)`);

		// Calculates maximum horizontal displacement
		const maximumHorizontalDisplacement = initialHorizontalVelocity * impactTime;
		this.printStep("Formula: disp = vel * time");
		this.printStep("Substitute: disp_max_x = vel_init_x * time_impact");
		this.printAnswer(`Evaluate: disp_max_x = ${maximumHorizontalDisplacement}`);

		// Calculates maximum vertical displacement
		const maximumVerticalDisplacement = 0.5 * -gravity * Math.pow(peakTime, 2) + initialVerticalVelocity * peakTime;
		this.printStep("Formula: disp = 0.5 * acc * time^2 + vel * time");
		this.printStep("Substitute: disp_max_y = 0.5 * -acc_gravity * time_peak^2 + vel_init_y * time_peak");
		this.printAnswer(`Evaluate: disp_max_y = ${maximumVerticalDisplacement}`);

		// Returns result
		return {
			angle,
			gravity,
			impactTime,
			initialVelocity,
			initialHorizontalVelocity,
			initialVerticalVelocity,
			maximumHorizontalDisplacement,
			maximumVerticalDisplacement,
			peakTime
		};
	}
}

// Exports
export default ProjectileMotion;
