<script lang="ts">
  let name = $state('my-skin-mod');
  let displayName = $state('My Skin Mod');
  let description = $state('A custom skin for Ahri');
  let authorName = $state('ModderName');
  let authorRole = $state('Creator');
  let champions = $state('Ahri');
  let tags = $state('skin');

  interface Layer {
    name: string;
    priority: number;
    description: string;
  }

  let layers = $state<Layer[]>([{ name: 'base', priority: 0, description: 'Base skin files' }]);

  function addLayer() {
    const priority = layers.length;
    layers.push({ name: '', priority, description: '' });
  }

  function removeLayer(index: number) {
    if (layers.length > 1) {
      layers.splice(index, 1);
    }
  }

  let configJson = $derived(
    JSON.stringify(
      {
        name: name || 'my-mod',
        displayName: displayName || 'My Mod',
        version: '1.0.0',
        description: description || '',
        authors: [
          {
            name: authorName || 'Author',
            role: authorRole || 'Creator',
          },
        ],
        tags: tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        champions: champions
          .split(',')
          .map((c) => c.trim())
          .filter(Boolean),
        maps: [],
        layers: layers
          .filter((l) => l.name)
          .map((l) => ({
            name: l.name,
            priority: l.priority,
            description: l.description,
          })),
      },
      null,
      2,
    ),
  );

  let activeTab = $state<'config' | 'tree'>('config');
</script>

<div class="scaffold not-content">
  <div class="form-section">
    <div class="form-grid">
      <div class="field">
        <label for="scaffold-name">Name (slug)</label>
        <input id="scaffold-name" type="text" bind:value={name} placeholder="my-skin-mod" spellcheck="false" />
      </div>
      <div class="field">
        <label for="scaffold-display">Display name</label>
        <input id="scaffold-display" type="text" bind:value={displayName} placeholder="My Skin Mod" />
      </div>
      <div class="field full">
        <label for="scaffold-desc">Description</label>
        <input id="scaffold-desc" type="text" bind:value={description} placeholder="What does the mod do?" />
      </div>
      <div class="field">
        <label for="scaffold-author">Author</label>
        <input id="scaffold-author" type="text" bind:value={authorName} placeholder="Your name" />
      </div>
      <div class="field">
        <label for="scaffold-role">Role</label>
        <input id="scaffold-role" type="text" bind:value={authorRole} placeholder="Creator" />
      </div>
      <div class="field">
        <label for="scaffold-champs">Champions</label>
        <input id="scaffold-champs" type="text" bind:value={champions} placeholder="Ahri, Jinx" />
      </div>
      <div class="field">
        <label for="scaffold-tags">Tags</label>
        <input id="scaffold-tags" type="text" bind:value={tags} placeholder="skin, particles" />
      </div>
    </div>

    <div class="layers-section">
      <div class="layers-header">
        <span class="section-label">Layers</span>
        <button class="add-btn" onclick={addLayer}>+ Add layer</button>
      </div>
      {#each layers as layer, i}
        <div class="layer-row">
          <input
            type="text"
            bind:value={layer.name}
            placeholder="Layer name"
            class="layer-name"
            spellcheck="false"
          />
          <input
            type="text"
            bind:value={layer.description}
            placeholder="Description"
            class="layer-desc"
          />
          <span class="layer-priority">P{layer.priority}</span>
          {#if layers.length > 1}
            <button class="remove-btn" onclick={() => removeLayer(i)} title="Remove layer">x</button>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <div class="output-section">
    <div class="tab-bar">
      <button
        class="tab"
        class:active={activeTab === 'config'}
        onclick={() => (activeTab = 'config')}
      >
        mod.config.json
      </button>
      <button
        class="tab"
        class:active={activeTab === 'tree'}
        onclick={() => (activeTab = 'tree')}
      >
        File tree
      </button>
    </div>

    <div class="output-content">
      {#if activeTab === 'config'}
        <pre><code>{configJson}</code></pre>
      {:else}
        <div class="tree">
          <div class="tree-item root">{name || 'my-mod'}/</div>
          <div class="tree-item" style="--depth: 1">mod.config.json</div>
          <div class="tree-item" style="--depth: 1">thumbnail.webp</div>
          <div class="tree-item" style="--depth: 1">content/</div>
          {#each layers.filter((l) => l.name) as layer}
            <div class="tree-item" style="--depth: 2">{layer.name}/</div>
            {#each champions.split(',').map((c) => c.trim()).filter(Boolean) as champ}
              <div class="tree-item" style="--depth: 3">{champ}.wad.client/</div>
              <div class="tree-item dim" style="--depth: 4">DATA/</div>
              <div class="tree-item dim" style="--depth: 5">Characters/</div>
              <div class="tree-item dim" style="--depth: 6">{champ}/</div>
              <div class="tree-item dim" style="--depth: 7">Skins/</div>
              <div class="tree-item dim" style="--depth: 8">...</div>
            {/each}
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .scaffold {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding: 1.25rem;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.75rem;
    background: var(--sl-color-gray-6);
    font-family: var(--sl-font);
  }

  @media (max-width: 768px) {
    .scaffold {
      grid-template-columns: 1fr;
    }
  }

  .form-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .field.full {
    grid-column: 1 / -1;
  }

  .field label {
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--sl-color-gray-2);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .field input,
  .layer-name,
  .layer-desc {
    padding: 0.375rem 0.625rem;
    border: 1px solid var(--sl-color-gray-4);
    border-radius: 0.375rem;
    background: var(--sl-color-black);
    color: var(--sl-color-white);
    font-family: var(--sl-font);
    font-size: 0.8125rem;
    outline: none;
    transition: border-color 0.15s ease;
  }

  .field input:focus,
  .layer-name:focus,
  .layer-desc:focus {
    border-color: var(--sl-color-accent);
  }

  .field input::placeholder,
  .layer-name::placeholder,
  .layer-desc::placeholder {
    color: var(--sl-color-gray-3);
  }

  .layers-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .layers-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .section-label {
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--sl-color-gray-2);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .add-btn {
    padding: 0.25rem 0.625rem;
    border: 1px solid var(--sl-color-gray-4);
    border-radius: 0.375rem;
    background: var(--sl-color-black);
    color: var(--sl-color-accent);
    font-size: 0.75rem;
    cursor: pointer;
    font-family: var(--sl-font);
    transition: border-color 0.15s ease;
  }

  .add-btn:hover {
    border-color: var(--sl-color-accent);
  }

  .layer-row {
    display: flex;
    gap: 0.375rem;
    align-items: center;
  }

  .layer-name {
    flex: 1;
    min-width: 0;
  }

  .layer-desc {
    flex: 2;
    min-width: 0;
  }

  .layer-priority {
    font-family: var(--sl-font-mono);
    font-size: 0.6875rem;
    color: var(--sl-color-gray-3);
    flex-shrink: 0;
  }

  .remove-btn {
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid var(--sl-color-gray-4);
    border-radius: 0.25rem;
    background: none;
    color: var(--sl-color-gray-3);
    cursor: pointer;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-family: var(--sl-font);
    transition: color 0.15s ease, border-color 0.15s ease;
  }

  .remove-btn:hover {
    color: #ef4444;
    border-color: #ef4444;
  }

  .output-section {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.5rem;
    overflow: hidden;
    background: var(--sl-color-black);
  }

  .tab-bar {
    display: flex;
    border-bottom: 1px solid var(--sl-color-gray-5);
  }

  .tab {
    flex: 1;
    padding: 0.5rem;
    border: none;
    background: none;
    color: var(--sl-color-gray-3);
    font-family: var(--sl-font-mono);
    font-size: 0.75rem;
    cursor: pointer;
    transition: color 0.15s ease, background 0.15s ease;
  }

  .tab:hover {
    color: var(--sl-color-white);
  }

  .tab.active {
    color: var(--sl-color-accent-high);
    background: var(--sl-color-gray-6);
  }

  .output-content {
    overflow: auto;
    max-height: 24rem;
  }

  .output-content pre {
    margin: 0;
    padding: 0.75rem;
    border: none;
    border-radius: 0;
  }

  .output-content code {
    font-family: var(--sl-font-mono);
    font-size: 0.75rem;
    color: var(--sl-color-white);
    background: none;
    padding: 0;
  }

  .tree {
    padding: 0.75rem;
    font-family: var(--sl-font-mono);
    font-size: 0.75rem;
  }

  .tree-item {
    padding: 0.125rem 0;
    padding-left: calc(var(--depth, 0) * 1rem);
    color: var(--sl-color-white);
  }

  .tree-item.root {
    font-weight: 600;
    color: var(--sl-color-accent-high);
  }

  .tree-item.dim {
    color: var(--sl-color-gray-3);
  }
</style>
