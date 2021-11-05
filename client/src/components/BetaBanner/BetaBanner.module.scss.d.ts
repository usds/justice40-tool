declare namespace BetaBannerNamespace {
    export interface IBetaBannerScss {
        betaBannerContainer: string;
        betaBanner:string;
        betaPillIcon:string;
        betaHeading: string;
    }
  }

declare const BetaBannerScssModule: BetaBannerNamespace.IBetaBannerScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: BetaBannerNamespace.IBetaBannerScss;
  };

  export = BetaBannerScssModule;
