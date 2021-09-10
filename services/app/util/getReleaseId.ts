function getReleaseId(
  commandId: number,
  confidentialDataRunId: number,
): string {
  return `${commandId}-${confidentialDataRunId}`;
}

export default getReleaseId;
