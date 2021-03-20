export function getStrapiURL(path = "") {
    return `https://healthy-io-nadav.herokuapp.com/${path}`;
}

export async function fetchAPI(path) {
    const requestUrl = getStrapiURL(path);
    const response = await fetch(requestUrl);
    return await response.json();
}