declare namespace HowYouCanHelpModuleScssNamespace {
  export interface IHowYouCanHelpModuleScss {
    legendContainer: string;
    legendHeader: string;
    swatchContainer: string;
    colorSwatch: string;
    prioritized: string,
    threshold: string,
    nonPrioritized: string,
    legendItem: string
  }
}

declare const HowYouCanHelpModuleScssModule: HowYouCanHelpModuleScssNamespace.IHowYouCanHelpModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HowYouCanHelpModuleScssNamespace.IHowYouCanHelpModuleScss;
};

export = HowYouCanHelpModuleScssModule;
