declare namespace MapModuleScssNamespace {
  export interface IMapModuleScss {
    areaDetailContainer: string;
    categorization:string;
    communityOfFocus:string;
    censusRow:string;
    censusLabel:string;
    censusText: string;
    feedbackLink:string;
    isInFocus:string;
    versionInfo: string;
    showThresholdExceed:string;
    hideThresholdExceed:string;
    categoryHeader:string;
    sendFeedbackBtn: string;
    categorySpacer: string;
  }
}

declare const MapModuleScssModule: MapModuleScssNamespace.IMapModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MapModuleScssNamespace.IMapModuleScss;
};

export = MapModuleScssModule;
