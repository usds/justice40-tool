declare namespace MapSidePanelScssNamespace {
    export interface IMapSidePanelScss {

    }
  }

declare const MapSidePanelScssModule: MapSidePanelScssNamespace.IMapSidePanelScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: MapSidePanelScssNamespace.IMapSidePanelScss;
  };

export = MapSidePanelScssModule;
