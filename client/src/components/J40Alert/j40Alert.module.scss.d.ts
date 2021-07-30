declare namespace J40AlertScssNamespace {
    export interface IJ40AlertScss {
        j40Alert: string;
    }
  }

declare const J40AlertScssModule: J40AlertScssNamespace.IJ40AlertScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: J40AlertScssNamespace.IJ40AlertScss;
  };

  export = J40AlertScssModule;
