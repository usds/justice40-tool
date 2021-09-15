declare namespace MapModuleScssNamespace {
  export interface IMapModuleScss {
    areaDetailContainer: string;
    categorization:string;
    prioritized:string;
    threshold:string;
    nonPrioritized:string;
    priority:string;
    prioritization:string;
    censusRow:string;
    censusText: string;
    censusLabel:string;
    divider:string;
    indicatorBoxMain:string;
    indicatorBoxAdditional:string;
    indicatorRow:string;
    indicatorValue:string;
    indicatorName:string;
    indicatorDesc:string;
    indicatorBoxAdditional:string;
  }
}

declare const MapModuleScssModule: MapModuleScssNamespace.IMapModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MapModuleScssNamespace.IMapModuleScss;
};

export = MapModuleScssModule;
