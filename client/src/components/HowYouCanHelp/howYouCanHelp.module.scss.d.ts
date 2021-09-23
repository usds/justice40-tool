declare namespace HowYouCanHelpModuleScssNamespace {
  export interface IHowYouCanHelpModuleScss {
    howYouCanHelpContainer: string;
    listWrapper: string;
    howYouCanHelpList: string;
    howYouCanHelpListWrapper: string;
  }
}

declare const HowYouCanHelpModuleScssModule: HowYouCanHelpModuleScssNamespace.IHowYouCanHelpModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HowYouCanHelpModuleScssNamespace.IHowYouCanHelpModuleScss;
};

export = HowYouCanHelpModuleScssModule;
