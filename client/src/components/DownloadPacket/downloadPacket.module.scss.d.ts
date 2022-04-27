declare namespace DownloadPacketModuleScssNamespace {
    export interface IDownloadPacketModuleScss {
        downloadBoxContainer: string;
        downloadBox: string;
        downloadBoxTextBox: string;
        downloadBoxTitle: string;
        downloadSourceText: string;
        downloadButtonContainer: string;
        downloadBoxButton: string;
        downloadButtonText: string;
        downloadButtonIconSpan: string;
        downloadButtonIcon: string;
        tagContainer: string;
        newTag: string;
        updateTag: string;
        newCalloutFontColor: string;
        lastUpdated:string;
    }
  }

declare const DownloadPacketModuleScssModule: DownloadPacketModuleScssNamespace.IDownloadPacketModuleScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: DownloadPacketModuleScssNamespace.IDownloadPacketModuleScss;
  };

export = DownloadPacketModuleScssModule;
