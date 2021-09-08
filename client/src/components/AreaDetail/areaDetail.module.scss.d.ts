declare namespace MapModuleScssNamespace {
  export interface IMapModuleScss {
    areaDetailContainer: string;
    topRow:string;
    cumulativeIndexScore:string;
    scoreSuperscript: string;
    topRowTitle:string;
    topRowSubTitle:string;
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
    indicatorBox:string;
    indicatorDescription:string;
    indicatorValue:string;
    score:string;
    indicatorSuperscript: string;
  }
}

declare const MapModuleScssModule: MapModuleScssNamespace.IMapModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MapModuleScssNamespace.IMapModuleScss;
};

export = MapModuleScssModule;
