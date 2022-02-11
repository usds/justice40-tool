declare namespace ZoomWarningModuleScssNamespace {
    export interface IZoomWarningModuleScss {
        zoomWarning: string;
    }
  }

declare const ZoomWarningModuleScssModule: ZoomWarningModuleScssNamespace.IZoomWarningModuleScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: ZoomWarningModuleScssNamespace.IZoomWarningModuleScss;
  };

export = ZoomWarningModuleScssModule;
