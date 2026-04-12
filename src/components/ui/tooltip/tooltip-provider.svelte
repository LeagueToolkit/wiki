<script lang="ts">
  import { Tooltip, type WithoutChildrenOrChild } from 'bits-ui';
  import type { Snippet } from 'svelte';

  let {
    delayDuration = 200,
    children,
    ...restProps
  }: WithoutChildrenOrChild<Tooltip.ProviderProps> & { children?: Snippet; delayDuration?: number } =
    $props();
</script>

<Tooltip.Provider {delayDuration} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</Tooltip.Provider>
