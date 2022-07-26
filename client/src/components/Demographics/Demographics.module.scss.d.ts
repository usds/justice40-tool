declare namespace DemographicsNamespace {
    export interface IDemographicsScss {
      demographicsContainer: string;
      demographicItem: string;
    }
  }

declare const DemographicsScssModule: DemographicsNamespace.IDemographicsScss & {
    /** WARNING: Only available when "css-loader" is used without "style-loader" or "mini-css-extract-plugin" */
    locals: DemographicsNamespace.IDemographicsScss;
  };

  export = DemographicsScssModule;
