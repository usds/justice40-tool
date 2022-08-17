declare namespace LayerSelectorNamespace {
    export interface ILayerSelectorScss {
        layerSelectorContainer: string;
    }
  }

declare const LayerSelectorScssModule: LayerSelectorNamespace.ILayerSelectorScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: LayerSelectorNamespace.ILayerSelectorScss;
  };

  export = LayerSelectorScssModule;
