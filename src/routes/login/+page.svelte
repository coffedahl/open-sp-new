<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<div class="main flex column total-center">
	{#if form?.wrongStore}
		<div class="error flex total-center">
			<p>The storenumber is wrong!</p>
		</div>
	{/if}
	{#if form?.wrongPass}
		<div class="error flex total-center">
			<p>Wrong password!</p>
		</div>
	{/if}
	<form method="post" class="flex column">
		<input
			type="text"
			name="storenumber"
			placeholder="Store number"
			value={form?.storenumber || ''}
		/>
		<input type="password" name="password" placeholder="Password" />
		<button formaction="?/login" class="button btn-blue">Log in</button>
	</form>
</div>

<style lang="scss">
	.error {
		background-color: #ffdce0;
		color: #ba6b6f;
		width: 29vw;
		padding: 0.5em;
		border-radius: 8px;
		margin-bottom: 3vh;
		border: 2px solid #ba6b6f;
	}
	form {
		width: 30vw;
		input,
		button {
			font-size: large;
			padding: 0.3em;
			margin-top: 1vh;
		}
	}
</style>
