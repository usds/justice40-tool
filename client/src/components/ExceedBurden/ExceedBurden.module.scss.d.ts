declare namespace ExceedBurdenNamespace {
    export interface IExceedBurden {
        exceedBurdenContainer: string;
        burdenQuestion: string;
        burdenValue: string;
    }
  }

declare const ExceedBurdenModule: ExceedBurdenNamespace.IExceedBurden & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: ExceedBurdenNamespace.IExceedBurden;
  };

  export = ExceedBurdenModule;
