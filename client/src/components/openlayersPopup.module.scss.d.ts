declare namespace MapControlModuleScssNamespace {
  export interface IMapControlModuleScss {
    popupContainer: string;
    popupCloser: string;
    popupContent: string;
  }
}

declare const MapControlModuleScssModule: MapControlModuleScssNamespace.IMapControlModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MapControlModuleScssNamespace.IMapControlModuleScss;
};

export = MapControlModuleScssModule;
