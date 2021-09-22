declare namespace J40MapModuleScssNamespace {
  export interface IJ40MapModuleScss {
    j40Popup: string;
    territoryFocusButton: string;
    territoryFocusContainer: string;
    navigationControl: string;
    fullscreenControl: string;
    geolocateControl: string;
    detailView: string;
    mapInfoPanel: string;
  }
}

declare const J40MapModuleScssModule: J40MapModuleScssNamespace.IJ40MapModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: J40MapModuleScssNamespace.IJ40MapModuleScss;
};

export = J40MapModuleScssModule;
