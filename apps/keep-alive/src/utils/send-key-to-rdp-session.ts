import { sleep } from './sleep';
import { sendMacNotification } from './send-notification';
import { runAppleScript } from './run-apple-script';

let script = '';

export const sendKeyToRdpSession = async () => {
  const waitTimeTillRdpSwitch = 3000;

  sendMacNotification({
    title: 'RDP Switch',
    subtitle: 'subtitle',
    message: `switching in ${waitTimeTillRdpSwitch}ms to RDP session`,
  });

  await sleep(waitTimeTillRdpSwitch);

  // get current app
  script = `
    tell application "System Events"
      set previousApp to name of first application process whose frontmost is true

      return previousApp
    end tell`;

  let prevApp = await runAppleScript({ script });
  prevApp = prevApp.replace(/\n/g, '');

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
  script = `tell application "${prevApp}" to activate`;

  await runAppleScript({ script });
};
