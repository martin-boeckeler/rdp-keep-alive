import { sendKeyToRdpSession } from './send-key-to-rdp-session';

describe('sendKeyToRdpSession', () => {
  it('should not error out', async () => {
    await sendKeyToRdpSession();
  });
});
