import notifier from 'node-notifier';
import runAppleScript from 'run-applescript';
import { sleep } from './sleep';

let script = '';

export const sendKeyToRdpSession = async () => {
  const waitTimeTillRdpSwitch = 3000;

  notifier.notify({
    title: 'RDP Switch',
    message: `switching in ${waitTimeTillRdpSwitch}ms to RDP session`,
    time: waitTimeTillRdpSwitch,
  });

  await sleep(waitTimeTillRdpSwitch);

  // get current app
  script = `
    tell application "System Events"
      set previousApp to name of first application process whose frontmost is true

      return previousApp
    end tell`;

  const prevApp = await runAppleScript(script);

  // switch to RDP
  script = `tell application "Microsoft Remote Desktop" to activate`;

  await runAppleScript(script);

  // send ESC to RDP session
  script = `
    tell application "System Events"
      key code 53
    end tell`;

  await runAppleScript(script);

  // switch back to previous app
  script = `tell application "${prevApp}" to activate`;

  await runAppleScript(script);
};
