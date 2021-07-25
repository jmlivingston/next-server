import { NEUVEI_MERCHANT_ID, NEUVEI_MERCHANT_SITE_ID } from '../../../utility/CONSTANTS';
import { getIdsTimeStamp } from '../../api/helpers/neuveiHelper';

const getSessionToken = ({ clientRequestId }) => {
  const { checksum, timeStamp } = getIdsTimeStamp({ clientRequestId });
  return {
    checksum,
    clientRequestId,
    merchantId: NEUVEI_MERCHANT_ID,
    merchantSiteId: NEUVEI_MERCHANT_SITE_ID,
    timeStamp,
  };
};

export default getSessionToken;
