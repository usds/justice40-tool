declare namespace MapboxMapModuleScssNamespace {
  export interface IMapboxMapModuleScss {
    sidebar: string;
    mapContainer: string;
  }
}

declare const MapboxMapModuleScssModule: MapboxMapModuleScssNamespace.IMapboxMapModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MapboxMapModuleScssNamespace.IMapboxMapModuleScss;
};

export = MapboxMapModuleScssModule;
