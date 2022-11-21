declare namespace IndicatorNamespace {
    export interface IIndicatorScss {
      indicatorBoxMain:string;
      indicatorBoxAdditional:string;
      indicatorRow:string;
      indicatorName:string;
      indicatorValueCol:string;
      indicatorValueRow:string;
      indicatorValue:string;
      disIndicatorValue:string;
      indicatorSuperscript:string;
      indicatorInfo:string;
      info:string;
      infoTilde: string;
      indicatorValueSubText:string;
      indicatorDesc:string;
      disadvantagedIndicator:string;
    }
  }

declare const IndicatorScssModule: IndicatorNamespace.IIndicatorScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: IndicatorNamespace.IIndicatorScss;
  };

  export = IndicatorScssModule;
