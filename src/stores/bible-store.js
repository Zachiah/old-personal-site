import {writable} from "svelte/store";

export let selectedBook = writable("genesis");
export let selectedChapter = writable(1);