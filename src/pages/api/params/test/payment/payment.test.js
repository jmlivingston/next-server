import fs from 'fs';
import path from 'path';
import { NEUVEU_3D_MODE } from '../../../../../utility/CONSTANTS';
import { getPaymentParams } from '../../payment';

describe('payment params', () => {
  Object.keys(NEUVEU_3D_MODE).map((mode) => {
    test(mode, () => {
      const params = getPaymentParams({ mode });
      const source = fs
        .readFileSync(path.join(path.resolve(), `src/pages/api/params/test/payment/source/${mode}.mock.json`))
        .toString()
        .trim();
      const target = JSON.stringify(params, null, 2).trim();
      fs.writeFileSync(path.join(path.resolve(), `src/pages/api/params/test/payment/target/${mode}.mock.json`), target);
      if (source !== target) {
        console.log(`${mode} ERROR`);
      }
      expect(source).toBe(target);
    });
  });
});
