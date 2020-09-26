import {writable} from "svelte/store";

export let storageItems = {
    bookmarks: 'bible-bookmarks',
    searchText: 'bible-search-text',
    searchCaseSensitive: 'bible-search_case_sensitive',
    searchExactMatch: 'bible-search_exact_match',
    searchWholeWords: 'bible-search_whole_words',
    searchRegex: 'bible-search_regex',
}

function createWritableStoreFromLocalStorage(key, defaultValue) {
    let localStorageKey = storageItems[key];
    let  data = process.browser && JSON.parse(localStorage.getItem(storageItems[localStorageKey]))

    return writable(process.browser ? (data || defaultValue) : defaultValue);
}

export let bookmarks = writable(process.browser && JSON.parse(localStorage.getItem(storageItems.bookmarks)) || []);
export let searchText = createWritableStoreFromLocalStorage('searchText', "");
export let searchCaseSensitive = createWritableStoreFromLocalStorage('searchCaseSensitive',false);
export let searchExactMatch = createWritableStoreFromLocalStorage('searchExactMatch',false);
export let searchWholeWords = createWritableStoreFromLocalStorage('searchWholeWords', false);
export let searchRegex = createWritableStoreFromLocalStorage('searchRegex', false);
