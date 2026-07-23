<script lang="ts">
  import type { Snippet } from 'svelte';
  import * as Tooltip from './ui/tooltip/index.js';

  interface Props {
    /** Plain-text tooltip body shown on hover and keyboard focus. */
    tip: string;
    /** Which side of the trigger the tooltip appears on. */
    side?: 'top' | 'right' | 'bottom' | 'left';
    /**
     * Trigger element. The default button is right for inert content (badges,
     * terms). Use 'span' when wrapping something already interactive (a link),
     * since nesting it in a button would be invalid HTML.
     */
    as?: 'button' | 'span';
    /**
     * Inline style forwarded to the trigger element. Alignment belongs here:
     * the default baseline is right for words in prose, while a chip next to
     * heading text wants `vertical-align: middle` - which must sit on the
     * trigger, since flex items inside it ignore their own vertical-align.
     */
    style?: string;
    /** The element the tooltip explains - rendered as-is inside the trigger. */
    children: Snippet;
  }

  let { tip, side = 'top', as = 'button', style, children }: Props = $props();
</script>

<Tooltip.Provider>
  <Tooltip.Root>
    {#if as === 'span'}
      <Tooltip.Trigger class="hint-trigger">
        {#snippet child({ props })}
          <span {...props} {style}>
            {@render children()}
          </span>
        {/snippet}
      </Tooltip.Trigger>
    {:else}
      <Tooltip.Trigger class="hint-trigger" {style}>
        {@render children()}
      </Tooltip.Trigger>
    {/if}
    <Tooltip.Content {side} class="hint-content">{tip}</Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>

<style>
  /* The trigger is a real <button>, which makes the tip keyboard-reachable.
     Strip the button chrome so the slotted content renders as-is, but keep a
     visible focus ring - `all: unset` would otherwise remove it. */
  :global(.hint-trigger) {
    all: unset;
    display: inline-flex;
    cursor: help;
  }

  :global(.hint-trigger:focus-visible) {
    outline: 2px solid var(--sl-color-accent);
    outline-offset: 2px;
    border-radius: var(--ltk-radius-sm);
  }

  :global(.hint-content) {
    max-width: 18rem;
  }
</style>
