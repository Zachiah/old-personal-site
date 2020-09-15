import {writable} from "svelte/store";

export let bookmarks = writable(process.browser && JSON.parse(localStorage.getItem('bible-bookmarks')) || []);