<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { currentUser, pb } from "./pokectbase";
  import Icon from '@iconify/svelte';

  let selectedId: string;
  let newMessage: string;
  let messages = [];
  let unsubscribe: () => void;
  //let msg: string;
  onMount(async () => {
    const resultList = await pb.collection("messages").getList(1, 50, {
      sort: "created",
      expand: "user",
    });
    messages = resultList.items;

    unsubscribe = await pb
      .collection("messages")
      .subscribe("*", async ({ action, record }) => {
        if (action === "create") {
          const user = await pb.collection("users").getOne(record.user);
          record.expand = { user };
          messages = [...messages, record];
        }
        if (action === "delete") {
          messages = messages.filter((m) => m.id !== record.id);
        }
      });
  });

  onDestroy(() => {
    unsubscribe();
  });
  async function sendMessage(){
    const data = {
      text: newMessage,
      user: $currentUser.id,
    };
    const createdMessage = await pb.collection("messages").create(data);
    newMessage = "";
  } 
  async function deleteMessage(msg: string)  {
    const deletedMessage = await pb.collection("messages").delete(msg,$currentUser);
    
  }
</script>

<div class="flex flex-col items-center justify-center h-screen">
  <div class="messages h-fit">
    {#each messages as message (message.id)}
      <div class=" login-text msg flex flex-row">
        <img
          class="avatar"
          src="https://api.dicebear.com/6.x/personas/svg?seed={message.expand
            ?.user?.username}"
          alt="avatar"
          width="40px"
        />
        <div>
          <small>
            Sent by @{message.expand?.user?.username}
          </small>
          <p class="msg-text login-text">{message.text}</p>
        </div>
        {#if $currentUser.username == message.expand?.user?.username}
        <div on:click={() => deleteMessage(message.id)} on:keypress={() => deleteMessage(message.id)} class="h-fit w-fit justify-items-end ml-auto" >
        <Icon  class="delete-msg justify-self-end" icon="fa6-solid:x" width="12" height="12" />  
        </div> 
        {/if}
      </div>
    {/each}
  </div>
  <form class="flex" on:submit|preventDefault={sendMessage}>
    <input
      class="login-text flex items-center bg-gray-900"
      placeholder="Message"
      type="text"
      bind:value={newMessage}
    />
    <button class="login-button" type="submit">Send</button>
  </form>
</div>
