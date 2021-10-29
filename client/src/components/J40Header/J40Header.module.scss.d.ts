declare namespace J40HeaderNamespace {
    export interface IDatasetCardScss {
        fullScreenContainer: string;
        bannerContainer: string;
        language: string;
        logoNavRow: string;
        logo: string;
        logoTitle: string;
        title2BetaPill: string;
        betaPill: string;
        navLinks: string;
    }
  }

declare const DatasetCardScssModule: J40HeaderNamespace.IDatasetCardScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: J40HeaderNamespace.IDatasetCardScss;
  };

  export = DatasetCardScssModule;
