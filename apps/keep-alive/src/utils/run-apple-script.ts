import { exec } from 'child_process';

interface RunAppleScriptProps {
  script: string;
}

export const runAppleScript = (props: RunAppleScriptProps) => {
  const { script } = props;

  const prom = new Promise<string>((resolve, reject) => {
    exec(`osascript -e '${script}'`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }

      resolve(stdout);
    });
  });

  return prom;
};
