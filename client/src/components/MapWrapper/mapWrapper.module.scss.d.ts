declare namespace MapWrapperScssNamespace {
    export interface IMapWrapperScss {
        mapCaptionTextLink: string;

    }
  }

declare const MapWrapperScssModule: MapWrapperScssNamespace.IMapWrapperScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: MapWrapperScssNamespace.IMapWrapperScss;
  };

  export = MapWrapperScssModule;
