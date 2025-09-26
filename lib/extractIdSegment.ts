export function extractIdFromRequest(req: Request): string {
  const segments = new URL(req.url).pathname.split("/");
  return segments.pop()!;
}
