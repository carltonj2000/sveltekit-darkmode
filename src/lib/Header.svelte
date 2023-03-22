<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import type { ActionData } from '../routes/$types';
	import AnimatedHamburger from './AnimatedHamburger.svelte';
	import ThemeToggleIcon from './ThemeToggleIcon.svelte';
	import { browser } from '$app/environment';
	import type { Theme } from '../hooks.server';

	export const prerender = true;

	export let open = false;
	export let onClick = () => (open = !open);
	let nextTheme: Theme;
	$: nextTheme =
		$page.data.theme === 'auto'
			? browser &&
			  window.matchMedia &&
			  window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'light'
				: 'dark'
			: $page.data.theme === 'dark'
			? 'light'
			: 'dark';
	const changeTheme = (nt: Theme) => {
		console.log('enhance cb', nt);
		if (browser) {
			document.querySelector('html')?.setAttribute('data-theme', nt);
		}
	};
</script>

<svelte:head>
	<title>Svelte Dark Mode</title>
</svelte:head>

<header>
	<AnimatedHamburger {open} {onClick} />

	{#if open}
		<div>
			<p>Some Hamburger Items</p>
		</div>
	{/if}

	<nav>
		<a href="/">Home</a>
		<a href="/about">About</a>
		<form method="POST" use:enhance={() => changeTheme(nextTheme)}>
			<input type="text" name="theme" value={nextTheme} hidden />
			<button formaction="/?/theme">
				<ThemeToggleIcon />
			</button>
		</form>
	</nav>
</header>

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-right: 2rem;
		position: relative;
	}
	nav {
		display: flex;
		gap: 2rem;
	}
	form {
		display: flex;
		align-items: center;
	}
	div {
		position: absolute;
		top: 5rem;
		background-color: hsl(var(--copy-base-color) / 0.9);
		color: white;
		padding: 3rem;
		border: 1px solid blue;
	}
</style>
