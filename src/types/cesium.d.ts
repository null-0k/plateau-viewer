// src/types/cesium.d.ts
export {}

declare global {
  interface Window {
    /** public/cesium 以下を指すベース URL */
    CESIUM_BASE_URL: string
  }
}