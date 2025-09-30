import { exportMCPSettings } from "../export-settings";
import { importMCPSettings } from "../import-settings";

export function addFunc(
	name: string,
	command: string,
	args: string[],
	force?: boolean,
	config?: string,
	env?: string[],
) {
	console.log(
		`name: ${name}\ncommand: ${command}\nargs: ${args}\nforce: ${force}\nenv: ${env}\nconfig: ${config}`,
	);
	const obj = importMCPSettings(config ? config : undefined);
	obj.mcpServers[name] = { command: command, args: args, env: env };
}
