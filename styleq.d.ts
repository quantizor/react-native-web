
type CompiledStyle = {
  [key: string]: string,
} & { $$css: boolean };

type InlineStyle = {
  [key: string]: unknown,
};

type EitherStyle = CompiledStyle | InlineStyle;

declare module 'styleq' {
  type StylesArray<T> = T | ReadonlyArray<StylesArray<T>>;
  type Styles = StylesArray<EitherStyle | false | void>;
  type Style<T extends {} = EitherStyle> = StylesArray<false | T | undefined>;

  type StyleqOptions = {
    disableCache?: boolean,
    disableMix?: boolean,
    transform?: (style: EitherStyle) => EitherStyle,
  };

  type StyleqResult = [string, InlineStyle | null];
  type Styleq = (styles: Styles) => StyleqResult;

  type StyleqObject = {
    factory: (options?: StyleqOptions) => Styleq,
    (styles: ReadonlyArray<Styles>): StyleqResult,
  };

  export const styleq: StyleqObject;
  export { EitherStyle };
}

declare module "styleq/transform-localize-style" {
  type LocalizeStyleFn = (style: EitherStyle, isRTL: boolean) => EitherStyle;
  export const localizeStyle: LocalizeStyleFn;
}
