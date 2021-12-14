declare namespace CategoryNamespace {
    export interface ICategoryScss {
        categoryContainer: string;
        category:string;
        disadvantageDot: string;
    }
  }

declare const CategoryScssModule: CategoryNamespace.ICategoryScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: CategoryNamespace.ICategoryScss;
  };

  export = CategoryScssModule;
