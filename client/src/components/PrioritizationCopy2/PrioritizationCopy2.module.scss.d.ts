declare namespace PrioritizationCopy2Namespace {
    export interface IPrioritizationCopy2Scss {
      prioritizationCopy2Container: string;
    }
  }

declare const PrioritizationCopy2ScssModule: PrioritizationCopy2Namespace.IPrioritizationCopy2Scss & {
    /** WARNING: Only available when "css-loader" is used without "style-loader" or "mini-css-extract-plugin" */
    locals: PrioritizationCopy2Namespace.IPrioritizationCopy2Scss;
  };

  export = PrioritizationCopy2ScssModule;
