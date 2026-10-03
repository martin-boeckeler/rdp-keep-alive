import { sleep } from './sleep';
import { sendMacNotification } from './send-notification';
import { runAppleScript } from './run-apple-script';

let script = '';

export const sendKeyToRdpSession = async () => {
  const waitTimeTillRdpSwitch = 3000;

  sendMacNotification({
    title: 'rdp switch',
    message: `switching in ${waitTimeTillRdpSwitch}ms to RDP session`,
  });

  await sleep(waitTimeTillRdpSwitch);

  // get current app's bundle identifier
  script = `
    tell application "System Events"
      return bundle identifier of first application process whose frontmost is true
    end tell`;

  const prevAppId = (await runAppleScript({ script })).trim();

  // switch to RDP
  script = `tell application "Microsoft Remote Desktop" to activate`;

  await runAppleScript({ script });

  // send ESC to RDP session
  script = `
    tell application "System Events"
      key code 53
    end tell`;

  await runAppleScript({ script });

  // switch back to previous app
  script = `tell application id "${prevAppId}" to activate`;

  await runAppleScript({ script });
};
