declare namespace DownloadButtonNamespace {
    export interface IDownloadButtonScss {
      downloadButtonLink: string;
      buttonComponent: string;
      buttonComponentYellow: string;
      buttonComponentGray: string;
      buttonContainer: string;
      buttonText: string;
      buttonImageBlue: string;
      buttonImageYellow: string;
      buttonImageGray: string;
    }
  }

declare const DownloadButtonScssModule: DownloadButtonNamespace.IDownloadButtonScss & {
    /** WARNING: Only available when "css-loader" is used without "style-loader" or "mini-css-extract-plugin" */
    locals: DownloadButtonNamespace.IDownloadButtonScss;
  };

  export = DownloadButtonScssModule;
