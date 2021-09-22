declare namespace DatasetCardScssNamespace {
    export interface IDatasetCardScss {
        datasetCard: string;
        datasetCardAdditional:string;
        datasetCardIndicator:string;
        datasetCardWhatIsIt: string;
        datasetCardDescription: string;
        datasetCardLabels: string;
        datasetCardList: string;
        datasetCardListItem: string;
    }
  }

declare const DatasetCardScssModule: DatasetCardScssNamespace.IDatasetCardScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: DatasetCardScssNamespace.IDatasetCardScss;
  };

  export = DatasetCardScssModule;
