declare namespace PageStylesNamespace {
    export interface IPageStylesScss {
        pageHeading1: string;
        surveyButtonContainer: string;
    }
  }

declare const PageStylesScssModule: PageStylesNamespace.IPageStylesScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: PageStylesNamespace.IPageStylesScss;
  };

  export = PageStylesScssModule;
