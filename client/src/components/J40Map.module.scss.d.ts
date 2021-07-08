declare namespace J40MapModuleScssNamespace {
  export interface IJ40MapModuleScss {
    mapContainer: string;
    j40Popup: string;
    navigationControls: string;
  }
}

declare const J40MapModuleScssModule: J40MapModuleScssNamespace.IJ40MapModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: J40MapModuleScssNamespace.IJ40MapModuleScss;
};

export = J40MapModuleScssModule;
