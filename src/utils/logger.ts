import chalk from "chalk";

export const logger = {
	info: (message: string): void => {
		console.log(chalk.blue("ℹ"), message);
	},
	success: (message: string): void => {
		console.log(chalk.green("✓"), message);
	},
	warning: (message: string): void => {
		console.log(chalk.yellow("⚠"), message);
	},
	error: (message: string): void => {
		console.log(chalk.red("✗"), message);
	},
	step: (message: string): void => {
		console.log(chalk.cyan("▸"), message);
	},
	title: (message: string): void => {
		console.log();
		console.log(chalk.bold.white(message));
		console.log();
	},
	newline: (): void => {
		console.log();
	},
};
