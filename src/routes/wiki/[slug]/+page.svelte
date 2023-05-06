<script lang="ts">
	import type { PageServerData } from "./$types";
    export let data: PageServerData
</script>

<article class="wiki-article">
    {@html data.article.articleText}
</article>

<style>
    article {
		width: 90%;
        margin-bottom: 8vh;
	}
</style>