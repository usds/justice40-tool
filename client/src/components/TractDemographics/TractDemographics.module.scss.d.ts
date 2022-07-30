declare namespace TractDemographicsNamespace {
    export interface ITractDemographicsScss {
      demographicsContainer: string;
      demographicItem: string;
      demographicsLabel: strring;
      customDemographicItemToggle: string;
      customDemographicHeading: string;
    }
  }

declare const TractDemographicsScssModule: TractDemographicsNamespace.ITractDemographicsScss & {
    /** WARNING: Only available when "css-loader" is used without "style-loader" or "mini-css-extract-plugin" */
    locals: TractDemographicsNamespace.ITractDemographicsScss;
  };

  export = TractDemographicsScssModule;
