<script lang="ts">
  import { currentUser, pb } from "./pokectbase";

  let username: string;
  let password: string;

  async function login() {
    await pb.collection("users").authWithPassword(username, password);
  }

  async function signUp() {
    try {
      const data = {
        username,
        password,
        passwordConfirm: password,
        name: "hi mom!",
      };
      const createdUser = await pb.collection("users").create(data);
      await login();
    } catch (err) {
      console.error(err);
    }
  }

  function signOut() {
    pb.authStore.clear();
  }
</script>

<div class="flex items-center justify-center h-full w-full mt-0">
  {#if $currentUser}
    <div class="flex flex-col">
      <p class="text-green-500">Signed in as {$currentUser.username}</p>
      <button class="login-button flex" on:click={signOut}>Logout</button>
    </div>
  {:else}
    <form on:submit|preventDefault>
      <input
        placeholder="Username"
        type="text"
        bind:value={username}
        class="login-text flex justify-center"
      />

      <input
        placeholder="Password"
        type="password"
        bind:value={password}
        class="login-text flex justify-center"
      />
      <div class="flex">
        <button class="login-button" on:click={signUp}>Sign Up</button>
        <button class="login-button" on:click={login}>Login</button>
      </div>
    </form>
  {/if}
</div>
