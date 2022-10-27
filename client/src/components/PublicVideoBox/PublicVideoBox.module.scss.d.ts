declare namespace PublicVideoBoxNamespace {
    export interface IPublicVideoBoxScss {
        publicVideoContainer: string;
        publicVideoContainerBeta: string;
        publicVideoLink: string;
        youTubeBtn: string;
        buttonContainer: string;
        buttonText: string;
        buttonImage: string;
    }
  }

declare const PublicVideoBoxScssModule: PublicVideoBoxNamespace.IPublicVideoBoxScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: PublicVideoBoxNamespace.IPublicVideoBoxScss;
  };

  export = PublicVideoBoxScssModule;
