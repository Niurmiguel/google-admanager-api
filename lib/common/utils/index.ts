export { DateTimeUtilities } from './dateTimeUtilities.util';
export { StatementBuilder } from './statementBuilder.util';
export { HttpUtilities } from './httpUtilities.util';

export function promiseFromCallback(fn: (callback: (err: Error, result: any) => void) => void): Promise<any> {
  return new Promise((resolve, reject) => {
    fn((err, result) => {
      if (err) {
        const error = err?.message.split(': ');

        if (err?.message.startsWith('soap:Client:')) {
          reject({
            code: err['response'].status,
            name: error[1],
            message: error[3],
          });
        }
        if (err?.message.startsWith('soap:Server:')) {
          reject({
            code: err['response'].status,
            name: error[2]?.match(/"xsi:type":"(.*)"},/)[1] || '',
            message: error[1],
            details: JSON.parse(error[2]),
          });
        }

        reject(err);
        return;
      }

      resolve(result);
    });
  });
}
