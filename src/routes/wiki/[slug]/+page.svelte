<script lang="ts">
	import type { PageServerData } from "./$types";
    export let data: PageServerData
</script>

<article>
    {@html data.article.articleText}
</article>

<style>
    article {
		width: 90%;
	}
</style>