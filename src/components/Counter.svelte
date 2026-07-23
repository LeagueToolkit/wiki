<script lang="ts">
  interface Props {
    initialCount?: number;
    label?: string;
  }

  let { initialCount = 0, label = 'Counter' }: Props = $props();
  let count = $state(initialCount);
</script>

<div class="counter">
  <span class="counter-label">{label}:</span>
  <button onclick={() => count--}>-</button>
  <span class="counter-value">{count}</span>
  <button onclick={() => count++}>+</button>
</div>

<style>
  .counter {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: var(--ltk-radius-md);
    font-family: var(--sl-font);
  }

  .counter-label {
    font-weight: var(--ltk-weight-semibold);
  }

  .counter-value {
    min-width: 2rem;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }

  button {
    cursor: pointer;
    padding: 0.25rem 0.75rem;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: var(--ltk-radius-sm);
    background: var(--sl-color-bg-nav);
    color: var(--sl-color-white);
    font-size: 1rem;
    line-height: 1;
  }

  button:hover {
    background: var(--sl-color-gray-6);
  }
</style>
