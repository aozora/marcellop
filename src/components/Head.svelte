<script lang="ts">
	interface Props {
		headTags?: { tag: string; content: string | null; attributes: object | null }[];
	}

	let { headTags = [] }: Props = $props();

	let titleTag = $derived(headTags && headTags.find((t) => t.tag === 'title'));
	let metaTags = $derived(headTags ? headTags.filter((t) => t.tag === 'meta') : []);
	let linkTags = $derived(headTags ? headTags.filter((t) => t.tag === 'link') : []);
</script>

<svelte:head>
	{#if titleTag}
		<title>{titleTag.content}</title>
	{/if}

	{#each metaTags as metaTag}
		<meta {...metaTag.attributes} />
	{/each}

	{#each linkTags as linkTag}
		<link {...linkTag.attributes} />
	{/each}
</svelte:head>
