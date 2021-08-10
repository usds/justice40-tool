declare namespace CejstModuleScssNamespace {
  export interface ICejstModuleScss {
    explorePageHeader;
    explorePageSubHeader: string;
    explorePageHeaderText: string;
  }
}

declare const CejstModuleScssModule: CejstModuleScssNamespace.ICejstModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CejstModuleScssNamespace.ICejstModuleScss;
};

export = CejstModuleScssModule;
