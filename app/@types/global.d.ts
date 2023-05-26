declare global {
  interface ElectronApis {
    node: () => string;
    chrome: () => string;
    electron: () => string;
    ping: () => Promise<string>;
  }
  interface Window {
    ENV: typeof process.env;
    electronApis: ElectronApis;
  }
}
export {};
