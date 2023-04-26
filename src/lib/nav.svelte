<script>
	import Icon from '@iconify/svelte';
    export let width;
    export let height;
    export let icon;
    export let tooltip;
</script>

<div class="nav-icon group">
    <Icon icon={icon} width={width} height={height} />
    <span class="nav-tooltip group-hover:scale-100">{tooltip}</span>
</div>