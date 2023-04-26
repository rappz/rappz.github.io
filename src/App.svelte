<script lang="ts">
	import Nav from "./lib/nav.svelte";
  import Login from "./lib/Login.svelte";
</script>
<div class="fixed align-middle bg-gray-900 text-white shadow-lg">
<Login />
</div>

<div class="flex">
    <div class="fixed top-0 left-0 h-screen w-16 m-0
            flex flex-col
            bg-gray-900 text-white shadow-lg">
    <Nav width="20" height="20" icon="fa6-solid:fire" tooltip="tooltip"/>
    <Nav width="32" height="32" icon="bi:plus" tooltip="tooltip"/>
    <Nav width="20" height="20" icon="bi:lightning-fill" tooltip="tooltip"/>
    <Nav width="20" height="20" icon="fa6-solid:poo" tooltip="tooltip"/>
    </div>
</div>
<div class="fixed align-middle bg-gray-900 text-white shadow-lg">
<Login />
</div>
<style lang="postcss">
   
</style>