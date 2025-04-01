/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { atomic, classic, inline } from './compiler';
import { createSheet } from './dom';
import { localizeStyle } from 'styleq/transform-localize-style';
import { preprocess } from './preprocess';
import { styleq } from 'styleq';
import { validate } from './validate';
import canUseDOM from '../../modules/canUseDom';
import { ViewStyle } from '../View';

declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__: {
      resolveRNStyle: (style: any) => any;
    };
  }
}

const staticStyleMap: WeakMap<Object, Object> = new WeakMap();
const sheet = createSheet();

const defaultPreprocessOptions = { shadow: true, textShadow: true };

function customStyleq(styles, options: Options = {}) {
  const { writingDirection, ...preprocessOptions } = options;
  const isRTL = writingDirection === 'rtl';
  return styleq.factory({
    transform(style) {
      const compiledStyle = staticStyleMap.get(style);
      if (compiledStyle != null) {
        return localizeStyle(compiledStyle, isRTL);
      }
      return preprocess(style, {
        ...defaultPreprocessOptions,
        ...preprocessOptions
      });
    }
  })(styles);
}

function insertRules(compiledOrderedRules) {
  compiledOrderedRules.forEach(([rules, order]) => {
    if (sheet != null) {
      rules.forEach((rule) => {
        sheet.insert(rule, order);
      });
    }
  });
}

function compileAndInsertAtomic(style) {
  const [compiledStyle, compiledOrderedRules] = atomic(
    preprocess(style, defaultPreprocessOptions)
  );
  insertRules(compiledOrderedRules);
  return compiledStyle;
}

function compileAndInsertReset(style, key) {
  const [compiledStyle, compiledOrderedRules] = classic(style, key);
  insertRules(compiledOrderedRules);
  return compiledStyle;
}

/* ----- API ----- */

const absoluteFillObject = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

const absoluteFill = create({ x: { ...absoluteFillObject } }).x;

/**
 * create
 */
function create<T extends Record<string, unknown>>(styles: T): Readonly<T> {
  Object.keys(styles).forEach((key) => {
    const styleObj = styles[key];
    // Only compile at runtime if the style is not already compiled
    if (styleObj != null && styleObj.$$css !== true) {
      let compiledStyles;
      if (key.indexOf('$raw') > -1) {
        compiledStyles = compileAndInsertReset(styleObj, key.split('$raw')[0]);
      } else {
        if (process.env.NODE_ENV !== 'production') {
          validate(styleObj);
          styles[key] = Object.freeze(styleObj);
        }
        compiledStyles = compileAndInsertAtomic(styleObj);
      }
      staticStyleMap.set(styleObj, compiledStyles);
    }
  });
  return styles;
}

/**
 * compose
 */
function compose(style1: any, style2: any): any {
  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable prefer-rest-params */
    const len = arguments.length;
    if (len > 2) {
      const readableStyles = [...arguments].map((a) => flatten(a));
      throw new Error(
        `StyleSheet.compose() only accepts 2 arguments, received ${len}: ${JSON.stringify(
          readableStyles
        )}`
      );
    }
    /* eslint-enable prefer-rest-params */
    /*
    console.warn(
      'StyleSheet.compose(a, b) is deprecated; use array syntax, i.e., [a,b].'
    );
    */
  }
  return [style1, style2];
}

/**
 * flatten
 */
function flatten(...styles: any): ViewStyle {
  const flatArray = styles.flat(Infinity);
  const result = {};
  for (let i = 0; i < flatArray.length; i++) {
    const style = flatArray[i];
    if (style != null && typeof style === 'object') {
      Object.assign(result, style);
    }
  }
  return result;
}

/**
 * getSheet
 */
function getSheet(): { id: string; textContent: string } {
  return {
    id: sheet.id,
    textContent: sheet.getTextContent()
  };
}

/**
 * resolve
 */
type StyleProps = [string, { [key: string]: string } | null];
type Options = {
  shadow?: boolean;
  textShadow?: boolean;
  writingDirection?: 'ltr' | 'rtl' | 'auto';
};

function StyleSheet(styles: any, options: Options = {} as Options): StyleProps {
  const isRTL = options.writingDirection === 'rtl';
  const styleProps: StyleProps = customStyleq(styles, options);
  if (Array.isArray(styleProps) && styleProps[1] != null) {
    styleProps[1] = inline(styleProps[1], isRTL);
  }
  return styleProps;
}

StyleSheet.absoluteFill = absoluteFill;
StyleSheet.absoluteFillObject = absoluteFillObject;
StyleSheet.create = create;
StyleSheet.compose = compose;
StyleSheet.flatten = flatten;
StyleSheet.getSheet = getSheet;
// `hairlineWidth` is not implemented using screen density as browsers may
// round sub-pixel values down to `0`, causing the line not to be rendered.
StyleSheet.hairlineWidth = 1;

if (canUseDOM && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.resolveRNStyle = StyleSheet.flatten;
}

export type IStyleSheet = {
  (styles: ReadonlyArray<any>, options?: Options): StyleProps;
  absoluteFill: Object;
  absoluteFillObject: Object;
  create: typeof create;
  compose: typeof compose;
  flatten: typeof flatten;
  getSheet: typeof getSheet;
  hairlineWidth: number;
};

const stylesheet: IStyleSheet = StyleSheet;

export default stylesheet;
