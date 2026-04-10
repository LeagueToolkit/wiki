<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    chart: string;
  }

  let { chart }: Props = $props();
  let container: HTMLDivElement | undefined = $state();
  let rendered = $state(false);

  onMount(async () => {
    const mermaid = (await import('mermaid')).default;
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#1e2035',
        primaryBorderColor: '#4B7DFA',
        primaryTextColor: '#e8eaf0',
        lineColor: '#4B7DFA',
        secondaryColor: '#14152a',
        tertiaryColor: '#1a1640',
        fontFamily: 'var(--sl-font)',
        fontSize: '14px',
      },
      flowchart: {
        curve: 'basis',
        padding: 16,
      },
    });

    if (container) {
      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
      const { svg } = await mermaid.render(id, chart.trim());
      container.innerHTML = svg;
      rendered = true;
    }
  });
</script>

<div class="mermaid-wrapper not-content" class:rendered bind:this={container}>
  {#if !rendered}
    <div class="mermaid-loading">Loading diagram...</div>
  {/if}
</div>

<style>
  .mermaid-wrapper {
    padding: 1.25rem;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.75rem;
    background: var(--sl-color-gray-6);
    overflow-x: auto;
    min-height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mermaid-wrapper :global(svg) {
    max-width: 100%;
    height: auto;
  }

  .mermaid-loading {
    color: var(--sl-color-gray-3);
    font-family: var(--sl-font);
    font-size: 0.8125rem;
  }
</style>
