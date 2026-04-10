<script lang="ts">
  interface Term {
    name: string;
    category: string;
    description: string;
    link?: string;
  }

  interface Props {
    terms: Term[];
  }

  let { terms }: Props = $props();

  let query = $state('');
  let selectedCategory = $state<string | null>(null);

  let categories = $derived([...new Set(terms.map((t) => t.category))].sort());

  let filtered = $derived(
    terms.filter((t) => {
      const matchesQuery =
        query === '' ||
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = selectedCategory === null || t.category === selectedCategory;
      return matchesQuery && matchesCategory;
    }),
  );
</script>

<div class="glossary-search not-content">
  <div class="controls">
    <div class="search-box">
      <svg class="search-icon" width="14" height="14" viewBox="0 0 16 16" fill="none">
        <circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5" />
        <path d="M11 11L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
      <input
        type="text"
        bind:value={query}
        placeholder="Search terms..."
        spellcheck="false"
      />
    </div>
    <div class="category-chips">
      <button
        class="chip"
        class:active={selectedCategory === null}
        onclick={() => (selectedCategory = null)}
      >
        All
      </button>
      {#each categories as cat}
        <button
          class="chip"
          class:active={selectedCategory === cat}
          onclick={() => (selectedCategory = selectedCategory === cat ? null : cat)}
        >
          {cat}
        </button>
      {/each}
    </div>
  </div>

  <div class="results-count">{filtered.length} term{filtered.length !== 1 ? 's' : ''}</div>

  <div class="term-list">
    {#each filtered as term}
      <div class="term">
        <div class="term-header">
          <span class="term-name">{term.name}</span>
          <span class="term-category">{term.category}</span>
        </div>
        <p class="term-desc">
          {term.description}
          {#if term.link}
            <a href={term.link} class="term-link">Reference &rarr;</a>
          {/if}
        </p>
      </div>
    {:else}
      <div class="no-results">No terms match your search</div>
    {/each}
  </div>
</div>

<style>
  .glossary-search {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.25rem;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.75rem;
    background: var(--sl-color-gray-6);
    font-family: var(--sl-font);
    overflow: hidden;
  }

  .controls {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .search-box {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--sl-color-gray-4);
    border-radius: 0.5rem;
    background: var(--sl-color-black);
    transition: border-color 0.15s ease;
  }

  .search-box:focus-within {
    border-color: var(--sl-color-accent);
  }

  .search-icon {
    color: var(--sl-color-gray-3);
    flex-shrink: 0;
  }

  .search-box input {
    flex: 1;
    border: none;
    background: none;
    color: var(--sl-color-white);
    font-family: var(--sl-font);
    font-size: 0.875rem;
    outline: none;
  }

  .search-box input::placeholder {
    color: var(--sl-color-gray-3);
  }

  .category-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }

  .chip {
    padding: 0.1875rem 0.5rem;
    border: 1px solid var(--sl-color-gray-4);
    border-radius: 1rem;
    background: none;
    color: var(--sl-color-gray-2);
    font-family: var(--sl-font);
    font-size: 0.6875rem;
    cursor: pointer;
    transition:
      background 0.15s ease,
      border-color 0.15s ease,
      color 0.15s ease;
  }

  .chip:hover {
    border-color: var(--sl-color-accent);
    color: var(--sl-color-white);
  }

  .chip.active {
    background: var(--sl-color-accent);
    border-color: var(--sl-color-accent);
    color: white;
  }

  .results-count {
    font-size: 0.75rem;
    color: var(--sl-color-gray-3);
  }

  .term-list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .term {
    padding: 0.625rem 0.75rem;
    border-radius: 0.5rem;
    transition: background 0.1s ease;
  }

  .term:hover {
    background: var(--sl-color-gray-5);
  }

  .term-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
  }

  .term-name {
    font-weight: 600;
    font-size: 0.9375rem;
    color: var(--sl-color-accent-high);
  }

  .term-category {
    font-size: 0.625rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.125rem 0.375rem;
    border-radius: 1rem;
    background: var(--sl-color-gray-5);
    color: var(--sl-color-gray-2);
    white-space: nowrap;
  }

  .term-desc {
    margin: 0 !important;
    font-size: 0.8125rem;
    color: var(--sl-color-gray-1);
    line-height: 1.5 !important;
  }

  .term-link {
    color: var(--sl-color-accent);
    text-decoration: none;
    font-size: 0.75rem;
    margin-left: 0.25rem;
  }

  .term-link:hover {
    text-decoration: underline;
  }

  .no-results {
    text-align: center;
    padding: 1.5rem;
    color: var(--sl-color-gray-3);
    font-size: 0.875rem;
  }
</style>
