declare namespace ExploreDataBoxNamespace {
    export interface IExploreDataBoxScss {
      summaryBoxContainer: string;
      fileDownIcon: string;
    }
  }

declare const ExploreDataBoxScssModule: ExploreDataBoxNamespace.IExploreDataBoxScss & {
    /** WARNING: Only available when "css-loader" is used without "style-loader" or "mini-css-extract-plugin" */
    locals: ExploreDataBoxNamespace.IExploreDataBoxScss;
  };

  export = ExploreDataBoxScssModule;
