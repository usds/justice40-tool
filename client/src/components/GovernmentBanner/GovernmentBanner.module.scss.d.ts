declare namespace GovernmentBannerNamespace {
    export interface IGovernmentBannerScss {
      fullScreenContainer: string;
      bannerContainer:string;
    }
  }

declare const GovernmentBannerScssModule: GovernmentBannerNamespace.IGovernmentBannerScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: GovernmentBannerNamespace.IGovernmentBannerScss;
  };

  export = GovernmentBannerScssModule;
