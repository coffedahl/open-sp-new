<script lang="ts">
	import type { LayoutServerData } from './$types';
	export let data: LayoutServerData;
</script>

<header>
	<div class="title total-center">
		<div class="nav-container">
			<div class="spacer" />
			<a href="/"><h1>Open-SP</h1></a>
			<nav class="space-even">
				<a href="/">Start</a>
				<div class="dropdown">
					<button class="dropdown-button">
						<p>Tools</p>
						<i class="fas fa-chevron-down" />
					</button>
					<div class="dropdown-content column">
						<a href="/price-adjustment">Price Adjustment</a>
						<a href="/sign">Sign maker</a>
					</div>
				</div>
				<a href="/wiki">Wiki</a>
			</nav>
		</div>
	</div>
	<div class="deco">
		<a href="/logout" class="deco-item">
			<i class="fas fa-store" />
			<p>{data.storenumber}</p>
		</a>
		<a href="https://www.github.com/coffedahl/kjell-delim" class="deco-item">
			<i class="fab fa-github" />
			<p>Github</p>
		</a>
	</div>
</header>

<slot />
<footer class="total-center">
	<p>Created by Coffe Dahl(3611), 2023</p>
</footer>

<style>
	.title {
		height: 9vh;
		background-color: var(--kjell-blue);
	}
	.nav-container {
		width: 80%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	nav,
	.spacer {
		width: 15vw;
		align-items: center;
	}
	nav button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 4vw;
	}
	nav button i {
		margin-top: 0.5vh;
	}
	a {
		color: white;
		text-decoration: none;
	}
	.dropdown-button {
		background-color: inherit;
		color: white;
		border: none;
		font-size: medium;
	}
	.dropdown:hover .dropdown-content {
		display: flex;
	}
	.dropdown-content {
		display: none;
		background-color: #767676;
		border: 2px solid #898989;
		border-radius: 0.5em;
		position: absolute;
	}
	.dropdown-content a {
		padding: 1em;
	}
	.dropdown-content a:hover {
		background-color: #707070;
	}

	.deco {
		display: flex;
		justify-content: end;
		height: 3vh;
		background-color: var(--kjell-secondary);
		padding-right: 10vw;
	}
	.deco-item {
		display: flex;
		align-items: center;
		padding-left: 1vw;
		color: #767676;
	}
	.deco a {
		text-decoration: none;
	}
	.deco p {
		margin-left: 5px;
	}
	footer {
		height: 8vh;
		background-color: var(--kjell-secondary);
	}
</style>
