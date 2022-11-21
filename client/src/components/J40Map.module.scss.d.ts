declare namespace J40MapModuleScssNamespace {
  export interface IJ40MapModuleScss {
    // main J40 map style
    j40Map: string;

    // map header row
    mapHeaderRow: string;
    geolocateBox: string;
    geolocateMessage: string;
    geolocateMessageHide: string;
    geolocateIcon: string;

    // nav control
    navigationControl: string;

    // feature flags
    fullscreenControl: string;
    j40Popup: string;

    mapInfoPanel: string;
  }
}

declare const J40MapModuleScssModule: J40MapModuleScssNamespace.IJ40MapModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: J40MapModuleScssNamespace.IJ40MapModuleScss;
};

export = J40MapModuleScssModule;
