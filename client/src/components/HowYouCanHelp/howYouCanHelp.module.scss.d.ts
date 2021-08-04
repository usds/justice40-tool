declare namespace HowYouCanHelpModuleScssNamespace {
  export interface IHowYouCanHelpModuleScss {
    howYouCanHelpContainer: string;
    howYouCanHelpHeader: string;
    howYouCanHelpBullet: string,
    listWrapper: string;
    howYouCanHelpText: string;
    howYouCanHelpList: string;
    howYouCanHelpListWrapper: string;
  }
}

declare const HowYouCanHelpModuleScssModule: HowYouCanHelpModuleScssNamespace.IHowYouCanHelpModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HowYouCanHelpModuleScssNamespace.IHowYouCanHelpModuleScss;
};

export = HowYouCanHelpModuleScssModule;
