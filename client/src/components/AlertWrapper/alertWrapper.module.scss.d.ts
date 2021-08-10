declare namespace AlertWrapperScssNamespace {
    export interface IAlertWrapperScss {
        alertWrapper: string;
        alertHide: string;
        alertWarning: string;
    }
  }

declare const AlertWrapperScssModule: AlertWrapperScssNamespace.IAlertWrapperScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: AlertWrapperScssNamespace.IAlertWrapperScss;
  };

  export = AlertWrapperScssModule;
