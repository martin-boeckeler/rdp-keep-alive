import { intervalTime } from './utils/constants';
import { sendKeyToRdpSession } from './utils/send-key-to-rdp-session';
import { sleep } from './utils/sleep';

const main = async () => {
  const promise = new Promise(async () => {
    while (true) {
      await sendKeyToRdpSession();

      await sleep(intervalTime);
    }
  });

  await promise;
};

main();
