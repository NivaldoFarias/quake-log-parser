export default class SystemError extends Error {
  readonly name: string;

  constructor(
    public message: string,
    readonly code: string,
    readonly errno: number,
    readonly syscall: string,
    readonly port?: string,
    readonly path?: string,
    readonly dest?: string,
    readonly address?: string,
    readonly info?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "SystemError";
  }
}
