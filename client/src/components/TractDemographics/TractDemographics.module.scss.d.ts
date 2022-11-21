declare namespace TractDemographicsNamespace {
    export interface ITractDemographicsScss {
      demographicsContainer: string;
      demographicsTitle: string;
      demographicHeading: string;
      showHideText: string;
      showHideIcon: string;
      demographicItem: string;
    }
  }

declare const TractDemographicsScssModule: TractDemographicsNamespace.ITractDemographicsScss & {
    /** WARNING: Only available when "css-loader" is used without "style-loader" or "mini-css-extract-plugin" */
    locals: TractDemographicsNamespace.ITractDemographicsScss;
  };

  export = TractDemographicsScssModule;
