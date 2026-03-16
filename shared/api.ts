/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

export interface LocationData {
  country: string;
  state: string;
  district: string;
}

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}
