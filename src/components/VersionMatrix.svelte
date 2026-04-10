<script lang="ts">
  interface Feature {
    name: string;
    versions: number[];
    description?: string;
  }

  interface Props {
    features: Feature[];
    allVersions: number[];
  }

  let { features, allVersions }: Props = $props();

  let selectedVersion = $state<number | null>(null);
  let hoveredFeature = $state<number | null>(null);

  let supportedFeatures = $derived(
    selectedVersion !== null
      ? features.filter((f) => f.versions.includes(selectedVersion!))
      : features,
  );

  let unsupportedFeatures = $derived(
    selectedVersion !== null
      ? features.filter((f) => !f.versions.includes(selectedVersion!))
      : [],
  );
</script>

<div class="version-matrix not-content">
  <div class="version-selector">
    <span class="selector-label">Select version</span>
    <div class="version-chips">
      {#each allVersions as v}
        <button
          class="version-chip"
          class:active={selectedVersion === v}
          onclick={() => (selectedVersion = selectedVersion === v ? null : v)}
        >
          v{v}
        </button>
      {/each}
    </div>
  </div>

  {#if selectedVersion !== null}
    <div class="summary">
      <span class="summary-version">Version {selectedVersion}</span>
      <span class="summary-count">
        {supportedFeatures.length}/{features.length} features
      </span>
    </div>
  {/if}

  <div class="feature-list">
    {#each features as feature, i}
      {@const supported =
        selectedVersion === null || feature.versions.includes(selectedVersion)}
      {@const firstVersion = Math.min(...feature.versions)}
      <div
        class="feature-row"
        class:supported
        class:unsupported={selectedVersion !== null && !supported}
        class:hovered={hoveredFeature === i}
        role="button"
        tabindex="0"
        onmouseenter={() => (hoveredFeature = i)}
        onmouseleave={() => (hoveredFeature = null)}
      >
        <span class="feature-icon">
          {#if selectedVersion === null || supported}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8.5L6.5 12L13 4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          {:else}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 4L12 12M12 4L4 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          {/if}
        </span>
        <span class="feature-name">{feature.name}</span>
        <span class="feature-since">v{firstVersion}+</span>
        {#if feature.description && hoveredFeature === i}
          <span class="feature-desc">{feature.description}</span>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .version-matrix {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.25rem;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.75rem;
    background: var(--sl-color-gray-6);
    font-family: var(--sl-font);
  }

  .version-selector {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .selector-label {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--sl-color-gray-2);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .version-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }

  .version-chip {
    padding: 0.25rem 0.625rem;
    border: 1px solid var(--sl-color-gray-4);
    border-radius: 1rem;
    background: var(--sl-color-black);
    color: var(--sl-color-gray-2);
    font-family: var(--sl-font-mono);
    font-size: 0.75rem;
    cursor: pointer;
    transition:
      background 0.15s ease,
      border-color 0.15s ease,
      color 0.15s ease;
  }

  .version-chip:hover {
    border-color: var(--sl-color-accent);
    color: var(--sl-color-white);
  }

  .version-chip.active {
    background: var(--sl-color-accent);
    border-color: var(--sl-color-accent);
    color: white;
  }

  .summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem;
    background: var(--sl-color-black);
    border-radius: 0.5rem;
    border: 1px solid var(--sl-color-gray-5);
  }

  .summary-version {
    font-weight: 600;
    font-size: 0.875rem;
    color: var(--sl-color-accent-high);
  }

  .summary-count {
    font-size: 0.8125rem;
    color: var(--sl-color-gray-2);
  }

  .feature-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .feature-row {
    display: grid;
    grid-template-columns: 1.25rem 1fr auto;
    gap: 0.5rem;
    align-items: center;
    padding: 0.4375rem 0.5rem;
    border-radius: 0.375rem;
    cursor: default;
    transition:
      background 0.1s ease,
      opacity 0.15s ease;
  }

  .feature-row:hover,
  .feature-row.hovered {
    background: var(--sl-color-gray-5);
  }

  .feature-row.supported .feature-icon {
    color: #22c55e;
  }

  .feature-row.unsupported {
    opacity: 0.4;
  }

  .feature-row.unsupported .feature-icon {
    color: var(--sl-color-gray-3);
  }

  .feature-icon {
    display: flex;
    align-items: center;
    color: #22c55e;
  }

  .feature-name {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--sl-color-white);
  }

  .feature-since {
    font-family: var(--sl-font-mono);
    font-size: 0.6875rem;
    color: var(--sl-color-gray-3);
  }

  .feature-desc {
    grid-column: 2 / -1;
    font-size: 0.75rem;
    color: var(--sl-color-gray-2);
    line-height: 1.4;
  }
</style>
