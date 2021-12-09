declare namespace DisadvantagedDotNamespace {
    export interface IDisadvantagedDot {
        disadvantagedDotBig: string;
        disadvantagedDotSmall: string;
    }
  }

declare const DisadvantagedDotModule: DisadvantagedDotNamespace.IDisadvantagedDot & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: DisadvantagedDotNamespace.IDisadvantagedDot;
  };

  export = DisadvantagedDotModule;

