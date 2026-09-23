<script lang="ts" module>
  /** One side of the comparison: an optimized image URL and the label shown on it. */
  export interface Side {
    src: string;
    label: string;
  }
</script>

<script lang="ts">
  interface Props {
    before: Side;
    after: Side;
    width: number;
    height: number;
    alt: string;
  }

  let { before, after, width, height, alt }: Props = $props();

  let position = $state(50);
</script>

<div class="compare not-content" style="--position: {position}%">
  <img class="after" src={after.src} {width} {height} {alt} draggable="false" />
  <img class="before" src={before.src} {width} {height} alt="" draggable="false" />

  <span class="divider" aria-hidden="true">
    <span class="handle">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M5 3L2 8L5 13M11 3L14 8L11 13"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  </span>

  <span class="label label-before" aria-hidden="true">{before.label}</span>
  <span class="label label-after" aria-hidden="true">{after.label}</span>

  <input
    type="range"
    min="0"
    max="100"
    step="0.5"
    bind:value={position}
    aria-label="Compare {before.label} and {after.label}"
    aria-valuetext="{Math.round(position)}% {before.label}"
  />
</div>

<style>
  /* Theme-invariant: every part sits on top of a screenshot. */
  .compare {
    position: relative;
    overflow: hidden;
    margin-block: 1rem;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: var(--ltk-radius-lg);
    user-select: none;
  }

  .compare:has(input:focus-visible) {
    outline: 2px solid var(--sl-color-accent-high);
    outline-offset: 2px;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    pointer-events: none;
  }

  .before {
    position: absolute;
    inset: 0;
    height: 100%;
    clip-path: inset(0 calc(100% - var(--position)) 0 0);
  }

  .divider {
    position: absolute;
    top: 0;
    bottom: 0;
    left: var(--position);
    width: 2px;
    background: var(--ltk-on-brand);
    transform: translateX(-50%);
    pointer-events: none;
  }

  .handle {
    position: absolute;
    top: 50%;
    left: 50%;
    display: grid;
    place-items: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    background: var(--ltk-blue);
    box-shadow: 0 0 0 2px var(--ltk-on-brand);
    color: var(--ltk-on-brand);
    transform: translate(-50%, -50%);
  }

  .label {
    position: absolute;
    top: 0.75rem;
    padding: 0.1875rem 0.625rem;
    border-radius: 1rem;
    background: var(--ltk-glass-scrim-fill);
    -webkit-backdrop-filter: var(--ltk-glass-scrim-blur);
    backdrop-filter: var(--ltk-glass-scrim-blur);
    color: var(--ltk-on-brand);
    font-size: 0.6875rem;
    font-weight: var(--ltk-weight-semibold);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    pointer-events: none;
  }

  .label-before {
    left: 0.75rem;
  }

  .label-after {
    right: 0.75rem;
  }

  /* The native range input takes pointer, touch and keyboard input over the whole image. */
  input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: ew-resize;
  }
</style>
