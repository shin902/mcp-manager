export function addFunc(
	name: string,
	command: string,
	args: string[],
	force?: boolean,
	config?: string[],
	env?: string[],
) {
	console.log(
		`name: ${name}\ncommand: ${command}\nargs: ${args}\nforce: ${force}\nenv: ${env}\nconfig: ${config}`,
	);
}
