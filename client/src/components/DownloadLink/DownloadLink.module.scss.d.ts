declare namespace DownloadLinkNamespace {
    export interface IDownloadLink {
        downloadIcon: string;
    }
  }

declare const DownloadLinkModule: DownloadLinkNamespace.IDownloadLink & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: DownloadLinkNamespace.IDownloadLink;
  };

  export = DownloadLinkModule;

