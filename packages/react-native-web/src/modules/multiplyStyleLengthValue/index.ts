/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const CSS_UNIT_RE = /^[+-]?\d*(?:\.\d+)?(?:[Ee][+-]?\d+)?(%|\w*)/;

const getUnit = (str: string) => str.match(CSS_UNIT_RE)?.[1];

const isNumeric = (n): n is number => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const multiplyStyleLengthValue = <T extends string | number>(
  value: T,
  multiple: number
): T => {
  if (typeof value === 'string') {
    const number = parseFloat(value) * multiple;
    const unit = getUnit(value);
    return `${number}${unit || ''}` as T;
  } else if (isNumeric(value)) {
    return (value * multiple) as T;
  }

  return value;
};

export default multiplyStyleLengthValue;
