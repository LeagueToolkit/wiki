<script lang="ts">
  import { Tooltip, type WithoutChildrenOrChild } from 'bits-ui';
  import type { Snippet } from 'svelte';

  let {
    children,
    sideOffset = 8,
    side = 'top',
    class: className,
    ...restProps
  }: WithoutChildrenOrChild<Tooltip.ContentProps> & {
    children?: Snippet;
    class?: string;
  } = $props();
</script>

<Tooltip.Portal>
  <Tooltip.Content {sideOffset} {side} class="tooltip-content {className ?? ''}" {...restProps}>
    {#if children}
      {@render children()}
    {/if}
  </Tooltip.Content>
</Tooltip.Portal>

<style>
  :global(.tooltip-content) {
    z-index: 50;
    overflow: hidden;
    border-radius: var(--ltk-radius-md);
    border: 1px solid var(--sl-color-gray-4);
    background: var(--sl-color-gray-5);
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    color: var(--sl-color-white);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    animation: tooltip-in 0.15s ease;
  }

  /* Glass: only thin out the fill where the blur can compensate for it, so
     browsers without backdrop-filter keep the solid panel above. The gray-5
     token flips with the theme, so both modes frost correctly. */
  @supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
    :global(.tooltip-content) {
      background: color-mix(in srgb, var(--sl-color-gray-5) 70%, transparent);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
    }
  }

  @keyframes tooltip-in {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
