declare namespace MapSearchMessageModuleScssNamespace {
    export interface IMapSearchMessageModuleScss {
      mapSearch: string;
      showMessage: string;
      hideMessage: string;
    }
  }

declare const MapSearchMessageModuleScssModule: MapSearchMessageModuleScssNamespace.IMapSearchMessageModuleScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: MapSearchMessageModuleScssNamespace.IMapSearchMessageModuleScss;
  };

  export = MapSearchMessageModuleScssModule;

