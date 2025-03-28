/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default function pick<T extends Record<string, unknown>, K extends Record<Extract<keyof T, string>, boolean>>(obj: T, list: K): PickTrue<T, Extract<keyof K, string>> {
  const nextObj = {} as PickTrue<T, Extract<keyof K, string>>;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (list[key] === true) {
        // @ts-ignore come back to this
        nextObj[key] = obj[key];
      }
    }
  }
  return nextObj;
}

type PickTrue<T extends Record<string, unknown>, K extends keyof T> = Pick<T, {
  [P in K]: T[P] extends true ? P : never;
}[K]>;


