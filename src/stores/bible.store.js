import {writable} from "svelte/store";

export let storageItems = {
    bookmarks: 'bible-bookmarks',
    searchText: 'bible-search-text',
    searchCaseSensitive: 'bible-search_case_sensitive',
    searchExactMatch: 'bible-search_exact_match',
    searchWholeWords: 'bible-search_whole_words'
}


export let bookmarks = writable(process.browser && JSON.parse(localStorage.getItem(storageItems.bookmarks)) || []);
export let searchText = writable(process.browser ? (JSON.parse(localStorage.getItem(storageItems.searchText)) || "") : "");
export let searchCaseSensitive = writable(process.browser ? (JSON.parse(localStorage.getItem(storageItems.searchCaseSensitive)) || false) : false);
export let searchExactMatch = writable(process.browser ? (JSON.parse(localStorage.getItem(storageItems.searchExactMatch)) || false) : false);
export let searchWholeWords = writable(process.browser ? (JSON.parse(localStorage.getItem(storageItems.searchWholeWords)) || false) : false);
