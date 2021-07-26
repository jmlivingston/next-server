import sha256 from 'crypto-js/sha256';
import { format as dateFnsFormat } from 'date-fns';
import { v4 as uuidV4 } from 'uuid';
import { NEUVEI_KEY, NEUVEI_MERCHANT_ID, NEUVEI_MERCHANT_SITE_ID } from '../../../../config/CONSTANTS';

const getIdsTimeStamp = ({ clientRequestId } = {}) => {
  clientRequestId = clientRequestId || uuidV4();
  const timeStamp = dateFnsFormat(new Date(), 'yyyyMMddHHmmss');
  const checksum = sha256(
    `${NEUVEI_MERCHANT_ID}${NEUVEI_MERCHANT_SITE_ID}${clientRequestId}${timeStamp}${NEUVEI_KEY}`
  ).toString();
  return { checksum, clientRequestId, timeStamp };
};

const getSessionTokenParams = ({ clientRequestId } = {}) => {
  const { checksum, clientRequestId: NewClientRequestId, timeStamp } = getIdsTimeStamp({ clientRequestId });
  return {
    checksum,
    clientRequestId: NewClientRequestId,
    merchantId: NEUVEI_MERCHANT_ID,
    merchantSiteId: NEUVEI_MERCHANT_SITE_ID,
    timeStamp,
  };
};

export { getIdsTimeStamp, getSessionTokenParams };
