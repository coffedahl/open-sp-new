<script lang="ts">
	import type { Product } from '$lib/types';

	export let product: Product;
</script>

<div class="container">
	<div class="titlecontainer">
		<h1 id="title">{product.title}</h1>
	</div>
	<ul>
		{#each product.bullet as bullet}
			<li>• {bullet}</li>
		{/each}
	</ul>
	<div class="prices">
		<h1 id="price">{product.current.replace(' ', '')}</h1>
		<h2 id="regular">{product.previous.replace(' ', '')}</h2>
		<p class={product.previous ? "" : "space-above"}>Art. {product.artnr}</p>
	</div>
</div>

<style>
	@media print {
		@page {
			size: landscape;
		}
	}
	* {
		margin: 0;
		padding: 0;
	}
	.container {
		height: 18.5cm;
		width: 14.85cm;
		padding-left: 20px;
	}
	ul {
		margin-top: 35px;
		list-style: none;
	}
	li {
		font-size: 28px;
		font-weight: 400;
		font-family: 'Lato';
		margin-top: 3px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 435px;
	}
	.space-above {
		margin-top: 66px;
	}
	.titlecontainer {
		margin-top: 35px;
		height: 190px;
		position: relative;
		text-overflow: clip;
		overflow: hidden;
	}
	#title {
		position: absolute;
		width: 70%;
		padding-top: 100px;
		font-size: 50px;
		font-family: 'Lato';
		bottom: 0;
	}
	.prices {
		margin-top: 65px;
	}
	#price {
		font-size: 140px;
		font-weight: 900;
		font-family: 'Lato';
		margin-bottom: -0.2em;
		color: rgb(242, 102, 33);
	}
	#regular {
		font-size: 55px;
		text-decoration: line-through;
		font-weight: bold;
		font-family: 'Lato';
		margin-left: 10px;
	}
	p {
		font-size: 25px;
		font-family: 'Lato';
		margin-left: 15px;
	}
</style>
