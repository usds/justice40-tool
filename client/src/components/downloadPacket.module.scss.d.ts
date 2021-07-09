declare namespace DownloadPacketModuleScssNamespace {
    export interface IDownloadPacketModuleScss {
        downloadBoxContainer: string;
        downloadBox: string;
        downloadBoxTextBox: string;
        downloadBoxTitle: string;
        downloadBoxText: string;
        downloadBoxButtonContainer: string;
        downloadBoxButton: string;
        downloadPacketText: string;
    }
  }

declare const DownloadPacketModuleScssModule: DownloadPacketModuleScssNamespace.IDownloadPacketModuleScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: DownloadPacketModuleScssNamespace.IDownloadPacketModuleScss;
  };

export = DownloadPacketModuleScssModule;
