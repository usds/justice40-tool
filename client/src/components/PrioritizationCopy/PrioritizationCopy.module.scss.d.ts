declare namespace PrioritizationCopyNamespace {
    export interface IPrioritizationCopyScss {
      prioCopyPara2: string;
    }
  }

declare const PrioritizationCopyScssModule: PrioritizationCopyNamespace.IPrioritizationCopyScss & {
    /** WARNING: Only available when "css-loader" is used without "style-loader" or "mini-css-extract-plugin" */
    locals: PrioritizationCopyNamespace.IPrioritizationCopyScss;
  };

  export = PrioritizationCopyScssModule;
