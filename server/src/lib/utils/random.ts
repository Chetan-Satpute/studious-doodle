export function randomValue(minValue: number, maxValue: number) {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

export function randomNumberArray(
  length: number,
  minValue: number,
  maxValue: number
) {
  const randomIntegerArray: number[] = [];

  for (let i = 0; i < length; i++) {
    const randomValue =
      Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    randomIntegerArray.push(randomValue);
  }

  return randomIntegerArray;
}
