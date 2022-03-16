declare namespace MapIntroductionModuleScssNamespace {
    export interface IMapIntroductionModuleScss {
        sidePanelInfoContainer: string;
        sidePanelInfoHeading: string;
        sidePanelInfoIcon: string;
    }
  }

declare const MapIntroductionModuleScssModule: MapIntroductionModuleScssNamespace.IMapIntroductionModuleScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: MapIntroductionModuleScssNamespace.IMapIntroductionModuleScss;
  };

export = MapIntroductionModuleScssModule;
