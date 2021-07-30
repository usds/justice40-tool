declare namespace DatasetContainerScssNamespace {
    export interface IDatasetContainerScss {
      datasetContainer:string;
      datasetCardsContainer: string;
      datasetContainerHeader: string;
      datasetContainerSubTitle: string;
      j40AlertContainer: string;
    }
  }

declare const DatasetContainerScssModule: DatasetContainerScssNamespace.IDatasetContainerScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: DatasetContainerScssNamespace.IDatasetContainerScss;
  };

  export = DatasetContainerScssModule;
