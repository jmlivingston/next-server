import { NEUVEI_MERCHANT_ID, NEUVEI_MERCHANT_SITE_ID } from '../../../utility/CONSTANTS';
import { getIdsTimeStamp } from '../../api/helpers/neuveiHelper';

const getSessionToken = () => {
  clientRequestId = clientRequestId || '20210723182824';
  const { checksum, timeStamp } = getIdsTimeStamp();
  return {
    checksum,
    clientRequestId,
    merchantId: NEUVEI_MERCHANT_ID,
    merchantSiteId: NEUVEI_MERCHANT_SITE_ID,
    timeStamp,
  };
};

export default getSessionToken;
