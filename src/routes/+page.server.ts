import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { isValidTheme } from '../hooks.server';

export const actions: Actions = {
  theme: async ({ cookies, request }) => {
    const data = await request.formData();
    const theme = data.get('theme') || 'auto';
    if (!isValidTheme(theme)) return fail(400, { theme, missing: true });
    cookies.set('theme', theme);
    return { success: true };
  }
};
