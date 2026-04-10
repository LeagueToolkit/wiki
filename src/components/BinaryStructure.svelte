<script lang="ts">
  interface Field {
    name: string;
    type: string;
    size: number;
    description: string;
  }

  interface Props {
    fields: Field[];
    title?: string;
  }

  let { fields, title }: Props = $props();

  let hoveredIndex = $state<number | null>(null);

  const colors = [
    '#4B7DFA',
    '#7D4BFA',
    '#22c55e',
    '#f59e0b',
    '#ef4444',
    '#06b6d4',
    '#ec4899',
    '#8b5cf6',
    '#14b8a6',
    '#f97316',
    '#6366f1',
    '#84cc16',
  ];

  let totalSize = $derived(fields.reduce((sum, f) => sum + f.size, 0));

  let fieldOffsets = $derived(
    fields.reduce<number[]>((acc, _f, i) => {
      acc.push(i === 0 ? 0 : acc[i - 1] + fields[i - 1].size);
      return acc;
    }, []),
  );
</script>

<div class="binary-structure not-content">
  {#if title}
    <div class="structure-title">{title}</div>
  {/if}

  <div class="byte-bar">
    {#each fields as field, i}
      <button
        class="byte-segment"
        class:hovered={hoveredIndex === i}
        style="
          --segment-color: {colors[i % colors.length]};
          flex: {field.size};
        "
        onmouseenter={() => (hoveredIndex = i)}
        onmouseleave={() => (hoveredIndex = null)}
        onfocus={() => (hoveredIndex = i)}
        onblur={() => (hoveredIndex = null)}
      >
        {#if field.size >= 3}
          <span class="segment-label">{field.name}</span>
        {/if}
      </button>
    {/each}
  </div>

  <div class="offset-ruler">
    <span>0x00</span>
    <span>0x{totalSize.toString(16).padStart(2, '0')}</span>
  </div>

  <div class="field-list">
    {#each fields as field, i}
      <button
        class="field-row"
        class:highlighted={hoveredIndex === i}
        onmouseenter={() => (hoveredIndex = i)}
        onmouseleave={() => (hoveredIndex = null)}
        onfocus={() => (hoveredIndex = i)}
        onblur={() => (hoveredIndex = null)}
      >
        <span class="field-color" style="background: {colors[i % colors.length]}"></span>
        <code class="field-offset">0x{fieldOffsets[i].toString(16).padStart(2, '0')}</code>
        <span class="field-name">{field.name}</span>
        <code class="field-type">{field.type}</code>
        <span class="field-size">{field.size}B</span>
        <span class="field-desc">{field.description}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .binary-structure {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.25rem;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.75rem;
    background: var(--sl-color-gray-6);
    font-family: var(--sl-font);
  }

  .structure-title {
    font-weight: 600;
    font-size: 0.875rem;
    color: var(--sl-color-gray-2);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.25rem;
  }

  .byte-bar {
    display: flex;
    height: 2.5rem;
    border-radius: 0.5rem;
    overflow: hidden;
    border: 1px solid var(--sl-color-gray-5);
  }

  .byte-segment {
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in srgb, var(--segment-color) 25%, transparent);
    border: none;
    border-right: 1px solid var(--sl-color-gray-5);
    cursor: pointer;
    transition:
      background 0.15s ease,
      filter 0.15s ease;
    padding: 0;
    color: var(--sl-color-white);
    font-family: var(--sl-font);
    min-width: 0;
  }

  .byte-segment:last-child {
    border-right: none;
  }

  .byte-segment:hover,
  .byte-segment.hovered {
    background: color-mix(in srgb, var(--segment-color) 50%, transparent);
  }

  .segment-label {
    font-size: 0.6875rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 0.25rem;
  }

  .offset-ruler {
    display: flex;
    justify-content: space-between;
    font-family: var(--sl-font-mono);
    font-size: 0.6875rem;
    color: var(--sl-color-gray-3);
    padding: 0 0.125rem;
  }

  .field-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 0.25rem;
  }

  .field-row {
    display: grid;
    grid-template-columns: 0.375rem 3rem 1fr auto auto;
    gap: 0.625rem;
    align-items: center;
    padding: 0.375rem 0.5rem;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background 0.1s ease;
    border: none;
    background: none;
    color: var(--sl-color-white);
    font-family: var(--sl-font);
    text-align: left;
    width: 100%;
  }

  .field-row:hover,
  .field-row.highlighted {
    background: var(--sl-color-gray-5);
  }

  .field-color {
    width: 0.375rem;
    height: 1rem;
    border-radius: 0.125rem;
    flex-shrink: 0;
  }

  .field-offset {
    font-family: var(--sl-font-mono);
    font-size: 0.75rem;
    color: var(--sl-color-gray-2);
    background: none;
    padding: 0;
  }

  .field-name {
    font-weight: 600;
    font-size: 0.8125rem;
  }

  .field-type {
    font-family: var(--sl-font-mono);
    font-size: 0.6875rem;
    color: var(--sl-color-accent);
    background: none;
    padding: 0;
  }

  .field-size {
    font-size: 0.6875rem;
    color: var(--sl-color-gray-3);
    text-align: right;
  }

  .field-desc {
    display: none;
  }

  /* Show description as a tooltip-like row when highlighted */
  .field-row.highlighted .field-desc,
  .field-row:hover .field-desc {
    display: block;
    grid-column: 2 / -1;
    font-size: 0.75rem;
    color: var(--sl-color-gray-2);
    line-height: 1.4;
    padding-top: 0.125rem;
  }
</style>
