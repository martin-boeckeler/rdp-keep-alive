# RDP keep alive

- small app to keep Microsoft Remote Desktop sessions open on Mac by periodically switching to the RDP session and sending a key

## prerequisites
- a Mac
- nodejs (app was build / tested with v22.8.0)

## how to use

- on your Mac: open the Microsoft Remote Desktop app and connect to a remote machine

- on your Mac: open a terminal app (like iTerm, kitty, alacritty) and make sure that your termial app is allowed to control your computer (because the terminal app will send a key to the RDP session)
  - go to Settings;Privacy & Security;Accessibility;Allow the applications below to control your computer
  - check the terminal app from which you will invoke the node.js script

- optional: enable the following checkbox in the system settings;battery;Options...;"Prevent automatic sleeping on power adapter when the display is off"

- optional: adjust the interval how frequent the app should switch to the RDP session to keep it alive
  - check apps/keep-alive/src/utils/constants.ts

- go back to your terminal, cd into the root of the repo and input the following commands

```sh
npm install
npx nx run keep-alive:build
cd dist/apps/keep-alive
caffeinate -di node main.js
```
