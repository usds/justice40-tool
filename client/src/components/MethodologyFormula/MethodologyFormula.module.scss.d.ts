declare namespace MethodologyFormulaNamespace {
    export interface IMethodologyFormulaScss {
        formulaContainer: string;
    }
  }

declare const MethodologyFormulaScssModule: MethodologyFormulaNamespace.IMethodologyFormulaScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: MethodologyFormulaNamespace.IMethodologyFormulaScss;
  };

  export = MethodologyFormulaScssModule;
