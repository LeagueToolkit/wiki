<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title: string;
    defaultOpen?: boolean;
    badge?: string;
    children: Snippet;
  }

  let { title, defaultOpen = false, badge, children }: Props = $props();
  let open = $state(defaultOpen);
</script>

<div class="collapsible not-content" class:open>
  <button class="collapsible-header" onclick={() => (open = !open)}>
    <svg class="chevron" width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <span class="collapsible-title">{title}</span>
    {#if badge}
      <span class="collapsible-badge">{badge}</span>
    {/if}
  </button>
  {#if open}
    <div class="collapsible-content">
      {@render children()}
    </div>
  {/if}
</div>

<style>
  .collapsible {
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.5rem;
    overflow: hidden;
    font-family: var(--sl-font);
  }

  .collapsible + :global(.collapsible) {
    margin-top: -1px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .collapsible:has(+ :global(.collapsible)) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .collapsible-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.625rem 0.875rem;
    border: none;
    background: var(--sl-color-gray-6);
    color: var(--sl-color-white);
    font-family: var(--sl-font);
    font-size: 0.875rem;
    cursor: pointer;
    text-align: left;
    transition: background 0.1s ease;
  }

  .collapsible-header:hover {
    background: var(--sl-color-gray-5);
  }

  .chevron {
    flex-shrink: 0;
    color: var(--sl-color-gray-3);
    transition: transform 0.15s ease;
  }

  .open .chevron {
    transform: rotate(90deg);
  }

  .collapsible-title {
    font-weight: 600;
  }

  .collapsible-badge {
    margin-left: auto;
    font-size: 0.6875rem;
    font-weight: 500;
    padding: 0.125rem 0.5rem;
    border-radius: 1rem;
    background: var(--sl-color-gray-5);
    color: var(--sl-color-gray-2);
  }

  .collapsible-content {
    padding: 0.875rem;
    border-top: 1px solid var(--sl-color-gray-5);
    background: var(--sl-color-black);
  }

  /* Style slotted content */
  .collapsible-content :global(p) {
    margin: 0 0 0.5rem;
    font-size: 0.8125rem;
    color: var(--sl-color-gray-1);
    line-height: 1.6;
  }

  .collapsible-content :global(p:last-child) {
    margin-bottom: 0;
  }

  .collapsible-content :global(code) {
    font-family: var(--sl-font-mono);
    font-size: 0.75rem;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    background: var(--sl-color-gray-5);
  }

  .collapsible-content :global(table) {
    width: 100%;
    font-size: 0.8125rem;
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.375rem;
    overflow: hidden;
    margin: 0.5rem 0;
  }

  .collapsible-content :global(th),
  .collapsible-content :global(td) {
    padding: 0.375rem 0.75rem;
    text-align: left;
  }

  .collapsible-content :global(th) {
    background: var(--sl-color-gray-6);
    font-weight: 600;
    border-bottom: 1px solid var(--sl-color-gray-5);
  }

  .collapsible-content :global(td) {
    border-bottom: 1px solid var(--sl-color-gray-5);
  }

  .collapsible-content :global(tr:last-child td) {
    border-bottom: none;
  }
</style>
