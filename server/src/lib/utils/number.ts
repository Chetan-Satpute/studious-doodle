export function uniqueIdGenerator() {
  let i = 1;
  return () => ++i;
}
