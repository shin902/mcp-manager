export function addFunc(
  name: string,
  command: string,
  force?: boolean,
  config?: string[],
  env?: string[],
) {
  console.log(
    `name: ${name}\ncommand: ${command}\nforce: ${force}\nenv: ${env}\nconfig: ${config}`,
  );
}
