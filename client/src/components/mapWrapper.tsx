import React, {useState} from 'react';
import J40Map from './J40Map';
import * as constants from '../data/constants';
import AreaDetail from './areaDetail';

interface IDetailViewInterface {
  latitude: number
  longitude: number
  zoom: number
  properties: constants.J40Properties,
};


const MapWrapper = () => {
  const [detailViewData, setDetailViewData] = useState<IDetailViewInterface>(null);
  return (
    <div className="grid-row">
      <div className="grid-col-9">
        <div>
          {
            <J40Map setDetailViewData={setDetailViewData}/>
          }
        </div>
      </div>
      <div className="grid-col-3">
        {detailViewData &&
          <AreaDetail properties={detailViewData.properties} />
        }
      </div>
    </div>
  );
};


export default MapWrapper;
