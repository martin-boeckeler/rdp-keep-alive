import { runAppleScript } from './run-apple-script';

enum PingSound {
  Glass = 'Glass',
  Tink = 'Tink',
  Basso = 'Basso',
  Blow = 'Blow',
}

interface SendMacNotificationProps {
  title: string;
  message: string;
  subtitle?: string;
  pingSound?: PingSound;
}

export const sendMacNotification = (props: SendMacNotificationProps) => {
  const { title, message, subtitle, pingSound } = props;

  const safeTitle = title.replace(/"/g, '\\"');
  const safeMessage = message.replace(/"/g, '\\"');
  const safeSubtitle = subtitle.replace(/"/g, '\\"');

  const subtitleScript = subtitle ? `subtitle "${safeSubtitle}"` : '';
  const soundScript = pingSound ? `sound name "${pingSound}"` : '';

  const script = `display notification "${safeMessage}" with title "${safeTitle}" ${subtitleScript} ${soundScript}`;

  runAppleScript({
    script,
  });
};
