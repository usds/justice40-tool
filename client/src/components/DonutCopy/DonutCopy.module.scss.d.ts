declare namespace DonutCopyNamespace {
    export interface IDonutCopyScss {
      donutCopyContainer: string;
      donutRow: string;
      donutRowLabel: string;
      invert: string;
      noInvert: string;
      valueSubTextContainer: string;
      subTextContainer: string;
    }
  }

declare const DonutCopyScssModule: DonutCopyNamespace.IDonutCopyScss & {
    /** WARNING: Only available when "css-loader" is used without "style-loader" or "mini-css-extract-plugin" */
    locals: DonutCopyNamespace.IDonutCopyScss;
  };

  export = DonutCopyScssModule;
