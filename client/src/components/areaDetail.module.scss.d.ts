declare namespace MapModuleScssNamespace {
  export interface IMapModuleScss {
    areaDetailContainer: string;
    areaDetailTable:string;
    areaDetailTableContainer:string;
    titleContainer:string;
    titleIndicatorName:string;
  }
}

declare const MapModuleScssModule: MapModuleScssNamespace.IMapModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MapModuleScssNamespace.IMapModuleScss;
};

export = MapModuleScssModule;
