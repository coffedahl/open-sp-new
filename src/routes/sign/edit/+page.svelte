<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<div class="main">
	<div class="container">
		<form method="post">
			<input type="text" name="title" value={data.title} />
			{#each data.bullet as bullet, i}
				<input type="text" name={'bullet' + String(i + 1)} value={bullet} />
			{/each}
			<input type="text" name="current" value={data.current} />
			<input type="text" name="previous" value={data.previous} />
			<input type="text" name="artnr" value={data.artnr} />
			<button formaction="?/update">Update</button>
			<button formaction="?/delete">Delete</button>
			<button formaction="?/generate">Generate</button>
		</form>
	</div>
	<div class="container">
		<iframe src="/sign/print" frameborder="1" title="pdf-preview" />
	</div>
</div>

<style>
	.main {
		display: flex;
		width: 100vw;
	}
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
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 50%;
	}
	iframe {
		height: 85vh;
		width: 75%;
	}
</style>
