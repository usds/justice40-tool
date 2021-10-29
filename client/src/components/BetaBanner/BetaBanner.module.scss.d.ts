declare namespace BetaBannerNamespace {
    export interface IDatasetCardScss {
        betaBannerContainer: string;
        betaBanner:string;
        betaPillIcon:string;
        betaHeading: string;
    }
  }

declare const DatasetCardScssModule: BetaBannerNamespace.IDatasetCardScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: BetaBannerNamespace.IDatasetCardScss;
  };

  export = DatasetCardScssModule;
