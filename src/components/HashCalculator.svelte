<script lang="ts">
  let input = $state('');

  function normalize(str: string): string {
    return str.toLowerCase().replace(/\\/g, '/');
  }

  function fnv1a(str: string): number {
    const normalized = normalize(str);
    let hash = 0x811c9dc5;
    for (let i = 0; i < normalized.length; i++) {
      hash ^= normalized.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
      hash >>>= 0;
    }
    return hash;
  }

  function elfHash(str: string): number {
    const normalized = normalize(str);
    let hash = 0;
    for (let i = 0; i < normalized.length; i++) {
      hash = ((hash << 4) + normalized.charCodeAt(i)) >>> 0;
      const high = hash & 0xf0000000;
      if (high !== 0) {
        hash = (hash ^ (high >>> 24)) >>> 0;
      }
      hash = (hash & ~high) >>> 0;
    }
    return hash;
  }

  function sdbm(str: string): number {
    const normalized = normalize(str);
    let hash = 0;
    for (let i = 0; i < normalized.length; i++) {
      hash =
        (normalized.charCodeAt(i) +
          ((hash << 6) >>> 0) +
          ((hash << 16) >>> 0) -
          hash) >>>
        0;
    }
    return hash;
  }

  let results = $derived(
    input.length > 0
      ? [
          {
            name: 'FNV-1a',
            hex: '0x' + fnv1a(input).toString(16).padStart(8, '0'),
            dec: fnv1a(input).toString(),
            usage: 'BIN properties, classes, paths',
          },
          {
            name: 'ELF',
            hex: '0x' + elfHash(input).toString(16).padStart(8, '0'),
            dec: elfHash(input).toString(),
            usage: 'Skeleton joints, animations',
          },
          {
            name: 'SDBM',
            hex: '0x' + sdbm(input).toString(16).padStart(8, '0'),
            dec: sdbm(input).toString(),
            usage: 'Legacy file handling',
          },
        ]
      : [],
  );

  let copied = $state('');

  function copyHash(hex: string, name: string) {
    navigator.clipboard.writeText(hex);
    copied = name;
    setTimeout(() => (copied = ''), 1500);
  }
</script>

<div class="hash-calc not-content">
  <div class="input-row">
    <label for="hash-input">Input string</label>
    <input
      id="hash-input"
      type="text"
      bind:value={input}
      placeholder="e.g. DATA/Characters/Ahri/Ahri.bin"
      spellcheck="false"
      autocomplete="off"
    />
    <span class="hint">Automatically lowercased and path-normalized before hashing</span>
  </div>

  {#if results.length > 0}
    <div class="results">
      {#each results as r}
        <button
          class="result-card"
          class:copied={copied === r.name}
          onclick={() => copyHash(r.hex, r.name)}
          title="Click to copy"
        >
          <div class="result-header">
            <span class="algo-name">{r.name}</span>
            <span class="usage">{r.usage}</span>
          </div>
          <div class="result-value">
            <code>{r.hex}</code>
            <span class="copy-hint">{copied === r.name ? 'Copied!' : 'Click to copy'}</span>
          </div>
        </button>
      {/each}
    </div>
  {:else}
    <div class="empty">Enter a string above to compute hashes</div>
  {/if}
</div>

<style>
  .hash-calc {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.25rem;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.75rem;
    background: var(--sl-color-gray-6);
    font-family: var(--sl-font);
  }

  .input-row {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .input-row label {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--sl-color-gray-2);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .input-row input {
    padding: 0.625rem 0.875rem;
    border: 1px solid var(--sl-color-gray-4);
    border-radius: 0.5rem;
    background: var(--sl-color-black);
    color: var(--sl-color-white);
    font-family: var(--sl-font-mono);
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.15s ease;
  }

  .input-row input:focus {
    border-color: var(--sl-color-accent);
  }

  .input-row input::placeholder {
    color: var(--sl-color-gray-3);
  }

  .hint {
    font-size: 0.75rem;
    color: var(--sl-color-gray-3);
  }

  .results {
    display: grid;
    gap: 0.5rem;
  }

  .result-card {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    padding: 0.75rem 1rem;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.5rem;
    background: var(--sl-color-black);
    cursor: pointer;
    transition: border-color 0.15s ease;
    text-align: left;
    color: var(--sl-color-white);
    font-family: var(--sl-font);
    width: 100%;
  }

  .result-card:hover {
    border-color: var(--sl-color-accent);
  }

  .result-card.copied {
    border-color: #22c55e;
  }

  .result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .algo-name {
    font-weight: 600;
    font-size: 0.875rem;
    color: var(--sl-color-accent-high);
  }

  .usage {
    font-size: 0.75rem;
    color: var(--sl-color-gray-3);
  }

  .result-value {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .result-value code {
    font-family: var(--sl-font-mono);
    font-size: 0.9375rem;
    color: var(--sl-color-white);
    background: none;
    padding: 0;
  }

  .copy-hint {
    font-size: 0.6875rem;
    color: var(--sl-color-gray-3);
    transition: color 0.15s ease;
  }

  .result-card.copied .copy-hint {
    color: #22c55e;
  }

  .empty {
    text-align: center;
    padding: 1.5rem;
    color: var(--sl-color-gray-3);
    font-size: 0.875rem;
  }
</style>
