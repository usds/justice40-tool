declare namespace DidYouKnowModuleScssNamespace {
    export interface IDidYouKnowModuleScss {
        didYouKnowContainer: string;
        didYouKnowText: string;
        didYouKnowLightbulb: string;
    }
  }

declare const DidYouKnowModuleScssModule: DidYouKnowModuleScssNamespace.IDidYouKnowModuleScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: DidYouKnowModuleScssNamespace.IDidYouKnowModuleScss;
  };

export = DidYouKnowModuleScssModule;
