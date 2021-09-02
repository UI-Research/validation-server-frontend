function getReleaseId(commandId: number, epsilon: string): string {
  return `${commandId}-${epsilon}`;
}

export default getReleaseId;
