/*
 *
 * Functions that take current search query, performs a sort
 * and then return that sorted query to the .js file calling it.
 * 
 */

// Sorts IDs from least -> greatest.
export function sortIDup(query) {
    return query.sort((a, b) => (parseInt(a.id) > parseInt(b.id)) ? 1 : -1);
}

// Sorts IDs from greatest -> least.
export function sortIDdown(query) {
    return query.sort((a, b) => (parseInt(a.id) < parseInt(b.id)) ? 1 : -1);
}

// Sorts object names from least -> greatest.
export function sortNameup(query) {
    return query.sort((a, b) => (a.objectName > b.objectName) ? 1 : -1);
}

// Sorts object names from greatest -> least.
export function sortNamedown(query) {
    return query.sort((a, b) => (a.objectName < b.objectName) ? 1 : -1);
}