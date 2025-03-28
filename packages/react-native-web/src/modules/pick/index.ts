/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default function pick<T extends Record<string, any>, K extends string>(obj: T, list: Record<K, boolean>): PickTrue<T, K> {
  const nextObj = {} as PickTrue<T, K>;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (list[key as unknown as K] === true) {
        // @ts-ignore come back to this
        nextObj[key] = obj[key];
      }
    }
  }
  return nextObj;
}

type PickTrue<T extends Record<string, unknown>, K extends string> = Pick<T, {
  [P in Extract<keyof T, string>]: P extends K ? P : never;
}[Extract<keyof T, string>]>;
