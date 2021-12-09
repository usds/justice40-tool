declare namespace IndicatorNamespace {
    export interface IIndicatorScss {
      indicatorBoxMain:string;
      indicatorBoxAdditional:string;
      indicatorRow:string;
      indicatorName:string;
      indicatorValue:string;
      indicatorSuperscript:string;
      indicatorDesc:string;
    }
  }

declare const IndicatorScssModule: IndicatorNamespace.IIndicatorScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: IndicatorNamespace.IIndicatorScss;
  };

  export = IndicatorScssModule;
