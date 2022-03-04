declare namespace PublicEventNamespace {
    export interface IPublicEventScss {
        eventField: string;
    }
  }

declare const PublicEventScssModule: PublicEventNamespace.IPublicEventScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: PublicEventNamespace.IPublicEventScss;
  };

  export = PublicEventScssModule;
