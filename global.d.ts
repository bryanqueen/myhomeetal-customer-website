// global.d.ts
export {};

declare global {
  interface Window {
    payWithSpay: () => void;
    SpayCheckout: {
      init: (handler: any) => void;
    };
    Intercom: any;
    intercomSettings: any;
    attachEvent: any;
  }
}
