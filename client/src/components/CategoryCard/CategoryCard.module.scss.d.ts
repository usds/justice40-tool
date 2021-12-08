declare namespace IndicatorCategoryNamespace {
    export interface IIndicatorCategoryScss {
      categoryCard: string;
    }
  }

declare const IndicatorCategoryScssModule: IndicatorCategoryNamespace.IIndicatorCategoryScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: IndicatorCategoryNamespace.IIndicatorCategoryScss;
  };

  export = IndicatorCategoryScssModule;
