<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<div class="main">
	<div>
		<h1>Total runs:</h1>
		<h1>{data.runList.length}</h1>
	</div>
</div>
