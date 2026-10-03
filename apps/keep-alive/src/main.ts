import { intervalTimeInMs } from './utils/constants';
import { sendKeyToRdpSession } from './utils/send-key-to-rdp-session';
import { sleep } from './utils/sleep';

const main = async () => {
  while (true) {
    await sendKeyToRdpSession();

    await sleep(intervalTimeInMs);
  }
};

main();
