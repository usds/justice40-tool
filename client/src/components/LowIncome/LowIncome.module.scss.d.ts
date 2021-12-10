declare namespace LowIncomeNamespace {
    export interface ILowIncomeScss {
        lowIncomeContainer: string;
        lowIncomeTitle: string;
        lowIncomeText: string;
    }
  }

declare const LowIncomeScssModule: LowIncomeNamespace.ILowIncomeScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: LowIncomeNamespace.ILowIncomeScss;
  };

  export = LowIncomeScssModule;
