declare namespace RequestForInfoNamespace {
    export interface IRequestForInfoScss {
        rfiBox: string;
    }
  }

declare const RequestForInfoScssModule: RequestForInfoNamespace.IRequestForInfoScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: RequestForInfoNamespace.IRequestForInfoScss;
  };

  export = RequestForInfoScssModule;
