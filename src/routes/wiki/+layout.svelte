<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<div class="main flex row primary-center">
	<nav><a href="/wiki"><button>Wiki home</button></a>
		{#each data.article as article}
			<a href={"/wiki/" + article.id.split(':')[1]}><button>{article.id.split(':')[1]}</button></a>
		{/each}
	</nav>
	<div class="container flex column">
		<h1>Wiki</h1>
		<section class="flex total-center">
			<slot />
		</section>
	</div>
</div>

<style>
	h1{
		align-self: center;
	}
	nav {
		width: 20%;
	}
	nav button {
		width: 100%;
		height: 5vh;
	}
	section {
		width: 80%;
	}
	.container{
		width: 100%;
	}
</style>
