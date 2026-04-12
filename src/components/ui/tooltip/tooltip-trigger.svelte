<script lang="ts">
  import { Tooltip, type WithoutChildrenOrChild } from 'bits-ui';
  import type { Snippet } from 'svelte';

  let {
    children,
    class: className,
    ...restProps
  }: WithoutChildrenOrChild<Tooltip.TriggerProps> & { children?: Snippet; class?: string } =
    $props();
</script>

<Tooltip.Trigger class={className} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</Tooltip.Trigger>
