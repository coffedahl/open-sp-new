<script lang="ts">
	// Import components
	import type { PageServerData } from './$types';
	import StringItem from './components/string_item.svelte';
	import { callFocus, getURL } from '../../global';

	export let data: PageServerData;
	//Subscribe to stores
	let store = data.storenumber;

	// Create variables
	let attack_clones = false;
	var string_list: string[] = [];
	var input: string;

	// Function for handling the process button
	function handleButton() {
		string_list = []; // Reset stringlist
		let input_list = input.split(/[\s|]+/); //split string
		let article_list: string[] = []; //create list for articles
		if (attack_clones) {
			//check if duplicates is going to be removed
			input_list.forEach((element) => {
				// for each item
				if (!article_list.includes(element)) {
					// Check if already exists
					article_list.push(element); //add to list for articels
				}
			});
		} else {
			// if duplicates is not going to be removed
			article_list = input_list; //set article list
		}

		// Create variables for string creation
		let new_string = '';
		let counter = 0;
		/* For each item in article list append to a string and when
		 the string is 34 items long start on an new one*/
		article_list.forEach((item) => {
			//for all items after processing
			if (counter == 32) {
				// if string is correct length
				counter = 1; //reset counter
				string_list.push(new_string.slice(0, -1)); //add to list for new strings
				new_string = item + '|'; // set new string to next item
			} else {
				// if not correct length
				new_string = new_string + item + '|'; //add new item
				counter++; //increase counter
			}
		});
		string_list.push(new_string.slice(0, -1)); // Append the last amount to a string
		string_list = string_list; //Update interface
		// Add run to db and write to browser log
		fetch(getURL() + '/api/runs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ store: store, type: 'price' })
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			});
	}
	/**
	 * Function for handling click of enter in input
	 */
	function handleKeydown(e: any) {
		if (e.key == 'Enter') {
			handleButton();
		}
	}
</script>

<div class="main">
	<div class="input">
		<div class="text-field">
			<input
				use:callFocus
				on:keydown={handleKeydown}
				class="text"
				placeholder="Price adjustment string"
				bind:value={input}
				type="text"
			/>
			<button on:click={handleButton} class="button btn-blue"
				><i class="center fas fa-arrow-right fa-lg" /></button
			>
		</div>
		<p>Attack Clones?</p>
		<input class="check" bind:checked={attack_clones} type="checkbox" />
	</div>
	{#each string_list as string}
		<StringItem {string} />
	{/each}
</div>

<style>
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow-y: auto;
	}
	.input {
		margin-top: 5vh;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 60vw;
	}
	.input .text {
		height: 5vh;
		font-size: 1em;
		border-radius: 0.5em;
		padding-left: 0.8em;
		padding-right: 0.3em;
		border: 1.5px solid #d2d8dd;
		width: 80%;
	}
	.text-field {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		width: 80%;
	}
	.input input {
		height: 4.5vh;
		width: 4.5vh;
		font-size: large;
	}
	.input button {
		aspect-ratio: 1/1;
		height: 5vh;
		width: 5vh;
	}
</style>
