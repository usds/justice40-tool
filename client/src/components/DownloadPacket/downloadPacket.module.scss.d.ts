declare namespace DownloadPacketModuleScssNamespace {
    export interface IDownloadPacketModuleScss {
        downloadBoxContainer: string;
        downloadBox: string;
        downloadBoxTextBox: string;
        downloadBoxTitle: string;
        dataSourceText: string;
        dataSourceButtonContainer: string;
        shapefileButtonContainer: string;
        downloadBoxButton: string;
        dataSourceButtonText: string;
        shapeFileText: string;
        shapeFileButtonText: string;
        newTagContainer: string;
        newtag: string;
        lastUpdated:string;
    }
  }

declare const DownloadPacketModuleScssModule: DownloadPacketModuleScssNamespace.IDownloadPacketModuleScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: DownloadPacketModuleScssNamespace.IDownloadPacketModuleScss;
  };

export = DownloadPacketModuleScssModule;
