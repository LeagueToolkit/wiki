<script lang="ts">
  interface Props {
    beforeSrc: string;
    afterSrc: string;
    beforeLabel?: string;
    afterLabel?: string;
    height?: string;
  }

  let {
    beforeSrc,
    afterSrc,
    beforeLabel = 'Before',
    afterLabel = 'After',
    height = '20rem',
  }: Props = $props();

  let position = $state(50);
  let dragging = $state(false);
  let container: HTMLDivElement | undefined = $state();

  function updatePosition(clientX: number) {
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    position = Math.max(0, Math.min(100, (x / rect.width) * 100));
  }

  function onPointerDown(e: PointerEvent) {
    dragging = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }

  function onPointerMove(e: PointerEvent) {
    if (dragging) {
      updatePosition(e.clientX);
    }
  }

  function onPointerUp() {
    dragging = false;
  }
</script>

<div
  class="before-after not-content"
  style="--height: {height}"
  bind:this={container}
  role="slider"
  tabindex="0"
  aria-label="Image comparison slider"
  aria-valuenow={Math.round(position)}
  aria-valuemin={0}
  aria-valuemax={100}
  onpointerdown={onPointerDown}
  onpointermove={onPointerMove}
  onpointerup={onPointerUp}
  onkeydown={(e) => {
    if (e.key === 'ArrowLeft') position = Math.max(0, position - 2);
    if (e.key === 'ArrowRight') position = Math.min(100, position + 2);
  }}
>
  <div class="image-layer after">
    <img src={afterSrc} alt={afterLabel} draggable="false" />
  </div>
  <div class="image-layer before" style="clip-path: inset(0 {100 - position}% 0 0)">
    <img src={beforeSrc} alt={beforeLabel} draggable="false" />
  </div>

  <div class="slider-line" style="left: {position}%">
    <div class="slider-handle">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M5 3L2 8L5 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11 3L14 8L11 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>

  <span class="label label-before">{beforeLabel}</span>
  <span class="label label-after">{afterLabel}</span>
</div>

<style>
  .before-after {
    position: relative;
    width: 100%;
    height: var(--height);
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.75rem;
    overflow: hidden;
    cursor: ew-resize;
    user-select: none;
    touch-action: none;
  }

  .before-after:focus-visible {
    outline: 2px solid var(--sl-color-accent);
    outline-offset: 2px;
  }

  .image-layer {
    position: absolute;
    inset: 0;
  }

  .image-layer img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
  }

  .slider-line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: white;
    transform: translateX(-50%);
    z-index: 2;
    pointer-events: none;
  }

  .slider-handle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    background: white;
    color: var(--sl-color-black);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .label {
    position: absolute;
    top: 0.75rem;
    padding: 0.1875rem 0.625rem;
    border-radius: 1rem;
    font-family: var(--sl-font);
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    z-index: 1;
    pointer-events: none;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    backdrop-filter: blur(4px);
  }

  .label-before {
    left: 0.75rem;
  }

  .label-after {
    right: 0.75rem;
  }
</style>
