declare namespace PublicEventsNamespace {
    export interface IPublicEventsScss {
        collectionContainer: string;
    }
  }

declare const PublicEventsScssModule: PublicEventsNamespace.IPublicEventsScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: PublicEventsNamespace.IPublicEventsScss;
  };

  export = PublicEventsScssModule;
