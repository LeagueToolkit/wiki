<script lang="ts">
  interface Platform {
    name: string;
    platform: 'windows' | 'macos' | 'linux';
    status: 'supported' | 'coming-soon' | 'unsupported';
    note?: string;
  }

  interface Props {
    platforms: Platform[];
  }

  let { platforms }: Props = $props();

  const statusConfig: Record<string, { label: string; color: string }> = {
    supported: { label: 'Supported', color: '#22c55e' },
    'coming-soon': { label: 'Coming Soon', color: '#f59e0b' },
    unsupported: { label: 'Not Supported', color: '#ef4444' },
  };
</script>

<div class="platform-badges not-content">
  {#each platforms as p}
    {@const cfg = statusConfig[p.status]}
    <div class="badge" style:--status-color={cfg.color}>
      <div class="badge-dot"></div>
      <div class="badge-body">
        <span class="badge-name">{p.name}</span>
        <span class="badge-meta">
          <span class="badge-status">{cfg.label}</span>
          {#if p.note}
            <span class="badge-sep">&middot;</span>
            <span class="badge-note">{p.note}</span>
          {/if}
        </span>
      </div>
    </div>
  {/each}
</div>

<style>
  .platform-badges {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
    gap: 0.5rem;
    font-family: var(--sl-font);
  }

  .badge {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.5rem;
    background: var(--sl-color-gray-6);
  }

  .badge-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: var(--status-color);
    flex-shrink: 0;
    box-shadow: 0 0 6px color-mix(in srgb, var(--status-color) 40%, transparent);
  }

  .badge-body {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    min-width: 0;
  }

  .badge-name {
    font-weight: 600;
    font-size: 0.8125rem;
    line-height: 1.2;
    color: var(--sl-color-white);
  }

  .badge-meta {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.6875rem;
    line-height: 1.2;
  }

  .badge-status {
    font-weight: 500;
    color: var(--status-color);
  }

  .badge-sep {
    color: var(--sl-color-gray-4);
  }

  .badge-note {
    color: var(--sl-color-gray-3);
  }
</style>
