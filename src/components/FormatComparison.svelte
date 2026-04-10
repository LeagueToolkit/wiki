<script lang="ts">
  interface Format {
    name: string;
    extension: string;
    badge: string;
    badgeColor: string;
    description: string;
    features: { label: string; supported: boolean | 'partial' }[];
  }

  const formats: Format[] = [
    {
      name: 'modpkg',
      extension: '.modpkg',
      badge: 'Recommended',
      badgeColor: '#22c55e',
      description:
        'Modern binary format with WAD-aligned chunk structure for efficient overlay building.',
      features: [
        { label: 'Full metadata', supported: true },
        { label: 'Multi-layer support', supported: true },
        { label: 'Thumbnail embedding', supported: true },
        { label: 'String overrides', supported: true },
        { label: 'Author roles', supported: true },
        { label: 'Efficient launcher processing', supported: true },
      ],
    },
    {
      name: 'fantome',
      extension: '.fantome',
      badge: 'Experimental',
      badgeColor: '#f59e0b',
      description:
        'Legacy ZIP-based format. Import support is best-effort with modpkg feature extension.',
      features: [
        { label: 'Full metadata', supported: false },
        { label: 'Multi-layer support', supported: false },
        { label: 'Thumbnail embedding', supported: false },
        { label: 'String overrides', supported: false },
        { label: 'Author roles', supported: false },
        { label: 'Efficient launcher processing', supported: false },
      ],
    },
  ];
</script>

<div class="comparison not-content">
  {#each formats as format}
    <div class="format-card">
      <div class="card-header">
        <div class="title-row">
          <span class="format-name">{format.name}</span>
          <code class="extension">{format.extension}</code>
        </div>
        <span class="badge" style="--badge-color: {format.badgeColor}">{format.badge}</span>
      </div>
      <p class="description">{format.description}</p>
      <ul class="features">
        {#each format.features as feature}
          <li class="feature" class:supported={feature.supported === true} class:unsupported={feature.supported === false}>
            <span class="icon">
              {#if feature.supported === true}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              {:else}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              {/if}
            </span>
            <span>{feature.label}</span>
          </li>
        {/each}
      </ul>
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

  @media (max-width: 600px) {
    .comparison {
      grid-template-columns: 1fr;
    }
  }

  .format-card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.25rem;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.75rem;
    background: var(--sl-color-gray-6);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .format-name {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--sl-color-white);
  }

  .extension {
    font-family: var(--sl-font-mono);
    font-size: 0.75rem;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    background: var(--sl-color-gray-5);
    color: var(--sl-color-gray-2);
  }

  .badge {
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.1875rem 0.5rem;
    border-radius: 1rem;
    background: color-mix(in srgb, var(--badge-color) 15%, transparent);
    color: var(--badge-color);
    white-space: nowrap;
  }

  .description {
    font-size: 0.8125rem;
    color: var(--sl-color-gray-2);
    line-height: 1.5;
    margin: 0;
  }

  .features {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .feature {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8125rem;
  }

  .feature.supported {
    color: #22c55e;
  }

  .feature.unsupported {
    color: var(--sl-color-gray-3);
  }

  .icon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
</style>
