<script lang="ts">
	import Normal from '../print/normal.svelte';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	$: product = data.product;
</script>

<div class="main flex">
	<div class="container flex column total-center">
		<form method="post">
			<input type="text" name="title" value={product.title} />
			{#each product.bullet as bullet, i}
				<input type="text" name={'bullet' + String(i + 1)} value={bullet} />
			{/each}
			<input type="text" name="current" value={product.current} />
			<input type="text" name="previous" value={product.previous} />
			<input type="text" name="artnr" value={product.artnr} />
			<button formaction="?/update">Update</button>
			<button formaction="?/delete">Delete</button>
			<button formaction="?/generate">Generate</button>
		</form>
	</div>
	<div class="container">
		<div class="frame">
			<Normal {product} />
		</div>
	</div>
</div>

<style>
	form {
		display: flex;
		flex-direction: column;
		width: 70%;
	}
	form input,
	button {
		margin-top: 1vh;
		font-size: large;
	}
	.container {
		width: 50%;
	}
	.frame{
		border: 1px solid black;
	}
</style>
