declare namespace ReleaseUpdateNamespace {
    export interface IReleaseUpdateScss {
      releaseUpdateComponent: string;
      releaseUpdateContainer: string;
      releaseSectionTitle:string;
      releaseSectionBody:string;
      releaseHeader: string;
      showHideText: string;
      showHideIcon: string;
    }
  }

declare const ReleaseUpdateScssModule: ReleaseUpdateNamespace.IReleaseUpdateScss & {
    /** WARNING: Only available when "css-loader" is used without "style-loader" or "mini-css-extract-plugin" */
    locals: ReleaseUpdateNamespace.IReleaseUpdateScss;
  };

  export = ReleaseUpdateScssModule;
