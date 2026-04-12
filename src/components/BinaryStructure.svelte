<script lang="ts">
  import * as Tooltip from './ui/tooltip/index.js';

  interface Field {
    name: string;
    type: string;
    size: number;
    description: string;
  }

  interface Row {
    fields: { field: Field; index: number }[];
    startOffset: number;
    rowSize: number;
  }

  interface Props {
    fields: Field[];
    title?: string;
    bytesPerRow?: number;
  }

  let { fields, title, bytesPerRow }: Props = $props();

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

  let targetBytesPerRow = $derived(bytesPerRow ?? (totalSize <= 32 ? totalSize : 32));

  // The widest row determines the scale so all rows are proportional
  let maxRowBytes = $derived(Math.max(targetBytesPerRow, ...fields.map((f) => f.size)));

  let rows = $derived.by(() => {
    const result: Row[] = [];
    let currentRow: Row = { fields: [], startOffset: 0, rowSize: 0 };

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];

      // Start a new row if adding this field would exceed the budget
      // (unless the current row is empty - a field always gets at least one row)
      if (currentRow.fields.length > 0 && currentRow.rowSize + field.size > targetBytesPerRow) {
        result.push(currentRow);
        currentRow = {
          fields: [],
          startOffset: fieldOffsets[i],
          rowSize: 0,
        };
      }

      currentRow.fields.push({ field, index: i });
      currentRow.rowSize += field.size;
    }

    if (currentRow.fields.length > 0) {
      result.push(currentRow);
    }

    return result;
  });
</script>

<div class="binary-structure not-content">
  {#if title}
    <div class="structure-title">{title}</div>
  {/if}

  <Tooltip.Provider delayDuration={0}>
    <div class="byte-rows">
      {#each rows as row}
        <div class="byte-row">
          <div class="byte-bar" style="width: {(row.rowSize / maxRowBytes) * 100}%;">
            {#each row.fields as { field, index: i }}
              <Tooltip.Root>
                <Tooltip.Trigger
                  class="byte-segment {hoveredIndex === i ? 'hovered' : ''}"
                  style="
                    --segment-color: {colors[i % colors.length]};
                    --tick-interval: {(4 / field.size) * 100}%;
                    flex: {field.size};
                  "
                  onmouseenter={() => (hoveredIndex = i)}
                  onmouseleave={() => (hoveredIndex = null)}
                >
                  {#if field.size >= 3}
                    <span class="segment-label">{field.name}</span>
                  {/if}
                </Tooltip.Trigger>
                <Tooltip.Content side="top" sideOffset={8}>
                  <div class="bar-tooltip-header">
                    <span class="bar-tooltip-name">{field.name}</span>
                    <code class="bar-tooltip-type">{field.type}</code>
                  </div>
                  <div class="bar-tooltip-meta">
                    <span>Offset: 0x{fieldOffsets[i].toString(16).padStart(2, '0')}</span>
                    <span>{field.size} byte{field.size !== 1 ? 's' : ''}</span>
                  </div>
                  {#if field.description}
                    <div class="bar-tooltip-desc">{field.description}</div>
                  {/if}
                </Tooltip.Content>
              </Tooltip.Root>
            {/each}
          </div>
          <div class="offset-ruler" style="width: {(row.rowSize / maxRowBytes) * 100}%;">
            <span>0x{row.startOffset.toString(16).padStart(2, '0')}</span>
            <span>0x{(row.startOffset + row.rowSize).toString(16).padStart(2, '0')}</span>
          </div>
        </div>
      {/each}
    </div>
  </Tooltip.Provider>

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

  .byte-rows {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .byte-row {
    display: flex;
    flex-direction: column;
  }

  .byte-bar {
    display: flex;
    height: 2.5rem;
    border-radius: 0.5rem;
    overflow: hidden;
    border: 1px solid var(--sl-color-gray-5);
  }

  :global(.byte-segment) {
    display: flex;
    align-items: center;
    justify-content: center;
    background:
      repeating-linear-gradient(
        to right,
        transparent 0%,
        transparent calc(var(--tick-interval) - 1px),
        rgba(255, 255, 255, 0.08) calc(var(--tick-interval) - 1px),
        rgba(255, 255, 255, 0.08) var(--tick-interval)
      ),
      color-mix(in srgb, var(--segment-color) 25%, transparent);
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

  :global(.byte-segment:last-child) {
    border-right: none;
  }

  :global(.byte-segment:hover),
  :global(.byte-segment.hovered) {
    background:
      repeating-linear-gradient(
        to right,
        transparent 0%,
        transparent calc(var(--tick-interval) - 1px),
        rgba(255, 255, 255, 0.12) calc(var(--tick-interval) - 1px),
        rgba(255, 255, 255, 0.12) var(--tick-interval)
      ),
      color-mix(in srgb, var(--segment-color) 50%, transparent);
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

  /* Tooltip content styling */
  .bar-tooltip-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
  }

  .bar-tooltip-name {
    font-weight: 600;
    font-size: 0.8125rem;
    color: var(--sl-color-white);
  }

  .bar-tooltip-type {
    font-family: var(--sl-font-mono);
    font-size: 0.6875rem;
    color: var(--sl-color-accent);
    background: none;
    padding: 0;
  }

  .bar-tooltip-meta {
    display: flex;
    gap: 0.75rem;
    font-family: var(--sl-font-mono);
    font-size: 0.6875rem;
    color: var(--sl-color-gray-3);
  }

  .bar-tooltip-desc {
    font-size: 0.6875rem;
    color: var(--sl-color-gray-2);
    margin-top: 0.25rem;
    max-width: 20rem;
  }
</style>
