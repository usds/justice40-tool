declare namespace MapModuleScssNamespace {
  export interface IMapModuleScss {
    popupContainer: string;
    popupContentTable:string;
    titleContainer:string;
    titleIndicatorName:string;
  }
}

declare const MapModuleScssModule: MapModuleScssNamespace.IMapModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MapModuleScssNamespace.IMapModuleScss;
};

export = MapModuleScssModule;
