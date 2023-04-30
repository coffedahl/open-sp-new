<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	import { goto } from '$app/navigation';
	import Normal from './normal.svelte';

	export let data: PageServerData;
	onMount(() => {
		if (data.print) {
			window.print();
			goto('/sign/edit');
		}
	});
</script>

<div class="flex row">
	<Normal product={data.product} />
	<Normal product={data.product} />
</div>
