import PocketBase from 'pocketbase';

import  { writable } from 'svelte/store';

export const pb = new PocketBase('https://pocket.zacandkevin.com:443');

export const currentUser = writable(pb.authStore.model);
export const loginStatus =writable<boolean>(false);
pb.authStore.onChange((auth) => {
    console.log('authStore changed', auth);
    currentUser.set(pb.authStore.model);
});