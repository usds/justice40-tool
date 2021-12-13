declare namespace CategoriesNamespace {
    export interface ICategoriesScss {
        categoriesContainer: string;
    }
  }

declare const CategoriesScssModule: CategoriesNamespace.ICategoriesScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: CategoriesNamespace.ICategoriesScss;
  };

  export = CategoriesScssModule;
