declare namespace CejstModuleScssNamespace {
  export interface ICejstModuleScss {
    disclaimer: string;
    textBox: string;
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

declare const CejstModuleScssModule: CejstModuleScssNamespace.ICejstModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CejstModuleScssNamespace.ICejstModuleScss;
};

export = CejstModuleScssModule;
