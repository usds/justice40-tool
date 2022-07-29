declare namespace TractInfoNamespace {
    export interface ITractInfoScss {
      tractInfoContainer: string;
    }
  }

declare const TractInfoScssModule: TractInfoNamespace.ITractInfoScss & {
    /** WARNING: Only available when "css-loader" is used without "style-loader" or "mini-css-extract-plugin" */
    locals: TractInfoNamespace.ITractInfoScss;
  };

  export = TractInfoScssModule;
