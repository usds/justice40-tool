declare namespace TerritoryFocusControlModuleScssNamespace {
    export interface ITerritoryFocusControlModuleScss {
      territoryFocusContainer: string;
    }
  }

declare const TerritoryFocusControlModuleScssModule:
TerritoryFocusControlModuleScssNamespace.ITerritoryFocusControlModuleScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: TerritoryFocusControlModuleScssNamespace.ITerritoryFocusControlModuleScss;
  };

export = TerritoryFocusControlModuleScssModule;

