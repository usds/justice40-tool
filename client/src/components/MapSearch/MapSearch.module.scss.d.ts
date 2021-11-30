declare namespace MapSearchModuleScssNamespace {
    export interface IMapSearchModuleScss {
      mapSearch: string;
    }
  }

declare const MapSearchModuleScssModule: MapSearchModuleScssNamespace.IMapSearchModuleScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: MapSearchModuleScssNamespace.IMapSearchModuleScss;
  };

  export = MapSearchModuleScssModule;

