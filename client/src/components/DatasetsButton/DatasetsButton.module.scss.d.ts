declare namespace DatasetsButtonNamespace {
    export interface IDatasetsButtonScss {
      datasetsButtonContainer: string;
      launchIcon: string;
    }
  }

declare const DatasetsButtonScssModule: DatasetsButtonNamespace.IDatasetsButtonScss & {
    /** WARNING: Only available when "css-loader" is used without "style-loader" or "mini-css-extract-plugin" */
    locals: DatasetsButtonNamespace.IDatasetsButtonScss;
  };

  export = DatasetsButtonScssModule;
