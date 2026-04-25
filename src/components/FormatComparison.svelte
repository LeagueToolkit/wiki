<script lang="ts">
  type Support = boolean | 'partial';

  interface Format {
    name: string;
    extension: string;
    accent: string;
    badge: string;
    badgeColor: string;
    tagline: string;
    bestFor: string;
    features: { label: string; supported: Support; note?: string }[];
  }

  const formats: Format[] = [
    {
      name: 'modpkg',
      extension: '.modpkg',
      accent: '#4B7DFA',
      badge: 'Recommended',
      badgeColor: '#4B7DFA',
      tagline: 'Modern binary container, built for the launcher.',
      bestFor: 'Authoring new mods that take full advantage of the project format.',
      features: [
        { label: 'Full project metadata', supported: true },
        { label: 'Multi-layer composition', supported: true },
        { label: 'Per-layer string overrides', supported: true },
        { label: 'Embedded thumbnail', supported: true },
        { label: 'Author roles & rich tagging', supported: true },
        {
          label: 'Direct WAD chunk copy',
          supported: true,
          note: 'No re-encoding when building overlays',
        },
      ],
    },
    {
      name: 'fantome',
      extension: '.fantome',
      accent: '#7D4BFA',
      badge: 'Compatibility',
      badgeColor: '#7D4BFA',
      tagline: 'First-class support for the community standard.',
      bestFor: 'Sharing mods across the wider ecosystem, including cslol-manager users.',
      features: [
        { label: 'First-class import & export', supported: true },
        {
          label: 'Extended metadata',
          supported: true,
          note: 'Beyond the original cslol-manager spec',
        },
        { label: 'Cross-tool compatibility', supported: true },
        { label: 'Multi-layer composition', supported: false },
        { label: 'Per-layer string overrides', supported: false },
        {
          label: 'Direct WAD chunk copy',
          supported: false,
          note: 'ZIP repack required on overlay build',
        },
      ],
    },
  ];
</script>

<div class="comparison not-content">
  {#each formats as format}
    <div class="format-card" style="--accent: {format.accent}; --badge-color: {format.badgeColor}">
      <div class="accent-strip"></div>
      <div class="card-body">
        <div class="card-header">
          <div class="title-row">
            <span class="format-name">{format.name}</span>
            <code class="extension">{format.extension}</code>
          </div>
          <span class="badge">{format.badge}</span>
        </div>

        <p class="tagline">{format.tagline}</p>

        <div class="best-for">
          <span class="best-for-label">Best for</span>
          <span class="best-for-text">{format.bestFor}</span>
        </div>

        <ul class="features">
          {#each format.features as feature}
            <li
              class="feature"
              class:supported={feature.supported === true}
              class:partial={feature.supported === 'partial'}
              class:unsupported={feature.supported === false}
            >
              <span class="icon" aria-hidden="true">
                {#if feature.supported === true}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                {:else if feature.supported === 'partial'}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
                  </svg>
                {:else}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
                  </svg>
                {/if}
              </span>
              <span class="feature-text">
                <span class="feature-label">{feature.label}</span>
                {#if feature.note}
                  <span class="feature-note">{feature.note}</span>
                {/if}
              </span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/each}
</div>

<style>
  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    font-family: var(--sl-font);
  }

  @media (max-width: 640px) {
    .comparison {
      grid-template-columns: 1fr;
    }
  }

  .format-card {
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.875rem;
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--accent) 6%, var(--sl-color-gray-6)) 0%,
      var(--sl-color-gray-6) 60%
    );
    overflow: hidden;
    transition:
      border-color 0.2s ease,
      transform 0.2s ease;
  }

  .format-card:hover {
    border-color: color-mix(in srgb, var(--accent) 35%, var(--sl-color-gray-5));
    transform: translateY(-1px);
  }

  .accent-strip {
    height: 3px;
    background: linear-gradient(
      90deg,
      var(--accent) 0%,
      color-mix(in srgb, var(--accent) 30%, transparent) 100%
    );
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    padding: 1.125rem 1.125rem 1.25rem;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem 0.625rem;
    flex-wrap: wrap;
  }

  .title-row {
    display: flex;
    align-items: baseline;
    gap: 0.4375rem;
    min-width: 0;
  }

  .format-name {
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--sl-color-white);
  }

  .extension {
    font-family: var(--sl-font-mono);
    font-size: 0.75rem;
    padding: 0.1875rem 0.4375rem;
    border-radius: 0.3125rem;
    background: color-mix(in srgb, var(--accent) 12%, var(--sl-color-gray-5));
    color: color-mix(in srgb, var(--accent) 60%, var(--sl-color-gray-1));
    border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent);
  }

  .badge {
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0.1875rem 0.5rem;
    border-radius: 1rem;
    background: color-mix(in srgb, var(--badge-color) 14%, transparent);
    color: var(--badge-color);
    border: 1px solid color-mix(in srgb, var(--badge-color) 30%, transparent);
    white-space: nowrap;
    word-break: keep-all;
    flex-shrink: 0;
  }

  .tagline {
    font-size: 0.9375rem;
    color: var(--sl-color-white);
    line-height: 1.45;
    margin: 0;
    font-weight: 500;
  }

  .best-for {
    display: flex;
    flex-direction: column;
    gap: 0.1875rem;
    padding: 0.625rem 0.75rem;
    border-radius: 0.5rem;
    background: color-mix(in srgb, var(--sl-color-gray-5) 60%, transparent);
    border-left: 2px solid var(--accent);
  }

  .best-for-label {
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--sl-color-gray-3);
  }

  .best-for-text {
    font-size: 0.8125rem;
    color: var(--sl-color-gray-1);
    line-height: 1.5;
  }

  .features {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .feature {
    display: flex;
    align-items: flex-start;
    gap: 0.5625rem;
    font-size: 0.8125rem;
    line-height: 1.4;
  }

  .feature.supported .icon {
    color: #22c55e;
  }

  .feature.partial .icon {
    color: #f59e0b;
  }

  .feature.unsupported .icon {
    color: var(--sl-color-gray-3);
  }

  .feature.unsupported .feature-label {
    color: var(--sl-color-gray-3);
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 1.125rem;
    height: 1.125rem;
    border-radius: 999px;
    margin-top: 0.0625rem;
    background: color-mix(in srgb, currentColor 12%, transparent);
  }

  .feature-text {
    display: flex;
    flex-direction: column;
    gap: 0.0625rem;
    min-width: 0;
  }

  .feature-label {
    color: var(--sl-color-white);
    font-weight: 500;
  }

  .feature-note {
    font-size: 0.6875rem;
    color: var(--sl-color-gray-3);
    line-height: 1.4;
  }
</style>
