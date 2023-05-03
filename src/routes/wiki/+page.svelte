<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div class="main flex column secondary-center">
	<h1>Wiki</h1>
	<div class="flex row">
		<nav>
			{#each data.article as article}
				<button>{article.id}</button>
			{/each}
		</nav>
		<section>
			<article>
				{@html data.article[0].articleText}
			</article>
		</section>
	</div>
</div>

<style>
	nav,
	section {
		width: 50%;
	}
</style>
