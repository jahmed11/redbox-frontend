// src/setupTests.ts
import '@testing-library/jest-dom'; // For additional DOM assertions
globalThis.matchMedia = globalThis.matchMedia || (() => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }));