declare namespace HowYouCanHelpModuleScssNamespace {
  export interface IHowYouCanHelpModuleScss {
    legendContainer: string;
    legendTextBox: string;
    legendRow: string;
  }
}

declare const HowYouCanHelpModuleScssModule: HowYouCanHelpModuleScssNamespace.IHowYouCanHelpModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HowYouCanHelpModuleScssNamespace.IHowYouCanHelpModuleScss;
};

export = HowYouCanHelpModuleScssModule;
