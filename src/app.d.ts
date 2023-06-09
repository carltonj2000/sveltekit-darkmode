import { Theme } from './hooks.server';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      theme: Theme;
    }
    interface PageData {
      theme: Theme;
    }
    // interface Platform {}
  }
}
