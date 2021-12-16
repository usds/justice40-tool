declare namespace DatasetContainerScssNamespace {
    export interface IDatasetContainerScss {
      datasetCardsContainer: string;
      returnToTop: string;
    }
  }

declare const DatasetContainerScssModule: DatasetContainerScssNamespace.IDatasetContainerScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: DatasetContainerScssNamespace.IDatasetContainerScss;
  };

  export = DatasetContainerScssModule;
