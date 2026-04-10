<script lang="ts">
  interface Step {
    id: string;
    phase: 1 | 2;
    label: string;
    description: string;
    icon: string;
  }

  const steps: Step[] = [
    {
      id: 'index',
      phase: 1,
      label: 'Index',
      description: 'Scans your League installation to find all WAD files in Game/DATA/FINAL/',
      icon: '1',
    },
    {
      id: 'collect',
      phase: 1,
      label: 'Collect',
      description:
        'Gathers changes from each enabled mod, reading from .modpkg or .fantome archives',
      icon: '2',
    },
    {
      id: 'patch',
      phase: 1,
      label: 'Patch WADs',
      description:
        'Creates modified copies of affected WAD files with your mod content merged into the overlay directory',
      icon: '3',
    },
    {
      id: 'strings',
      phase: 1,
      label: 'String Overrides',
      description:
        'Applies text replacements from mod layers to in-game text (champion names, item descriptions, etc.)',
      icon: '4',
    },
    {
      id: 'detect',
      phase: 2,
      label: 'Detect Game',
      description: 'Watches for the League of Legends game process to start',
      icon: '5',
    },
    {
      id: 'hook',
      phase: 2,
      label: 'Hook File Reads',
      description:
        "Hooks into the game's file reading mechanism to intercept file access",
      icon: '6',
    },
    {
      id: 'redirect',
      phase: 2,
      label: 'Redirect to Overlay',
      description:
        'Silently redirects game file reads to overlay copies when an overlay file exists',
      icon: '7',
    },
  ];

  let activeStep = $state<string | null>(null);
  let animating = $state(false);
  let animationStep = $state(0);

  function playAnimation() {
    if (animating) return;
    animating = true;
    animationStep = 0;
    activeStep = steps[0].id;

    const interval = setInterval(() => {
      animationStep++;
      if (animationStep >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          animating = false;
          activeStep = null;
        }, 1000);
      } else {
        activeStep = steps[animationStep].id;
      }
    }, 800);
  }
</script>

<div class="pipeline not-content">
  <div class="pipeline-header">
    <span class="pipeline-title">Patching Pipeline</span>
    <button class="play-btn" onclick={playAnimation} disabled={animating}>
      {animating ? 'Running...' : 'Animate'}
    </button>
  </div>

  <div class="phases">
    <div class="phase">
      <div class="phase-label">Phase 1: Build Overlay</div>
      <div class="phase-steps">
        {#each steps.filter((s) => s.phase === 1) as step, i}
          {#if i > 0}
            <div
              class="connector"
              class:active={activeStep !== null &&
                steps.findIndex((s) => s.id === activeStep) >=
                  steps.findIndex((s) => s.id === step.id)}
            ></div>
          {/if}
          <button
            class="step"
            class:active={activeStep === step.id}
            class:completed={activeStep !== null &&
              steps.findIndex((s) => s.id === activeStep) >
                steps.findIndex((s) => s.id === step.id)}
            onclick={() => {
              if (!animating) activeStep = activeStep === step.id ? null : step.id;
            }}
          >
            <div class="step-circle">{step.icon}</div>
            <span class="step-label">{step.label}</span>
          </button>
        {/each}
      </div>
    </div>

    <div class="phase-divider">
      <div
        class="divider-arrow"
        class:active={activeStep !== null &&
          steps.findIndex((s) => s.id === activeStep) >= 4}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 4L10 16M10 16L5 11M10 16L15 11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <div class="phase">
      <div class="phase-label">Phase 2: Run Patcher</div>
      <div class="phase-steps">
        {#each steps.filter((s) => s.phase === 2) as step, i}
          {#if i > 0}
            <div
              class="connector"
              class:active={activeStep !== null &&
                steps.findIndex((s) => s.id === activeStep) >=
                  steps.findIndex((s) => s.id === step.id)}
            ></div>
          {/if}
          <button
            class="step"
            class:active={activeStep === step.id}
            class:completed={activeStep !== null &&
              steps.findIndex((s) => s.id === activeStep) >
                steps.findIndex((s) => s.id === step.id)}
            onclick={() => {
              if (!animating) activeStep = activeStep === step.id ? null : step.id;
            }}
          >
            <div class="step-circle">{step.icon}</div>
            <span class="step-label">{step.label}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>

  {#if activeStep}
    {@const step = steps.find((s) => s.id === activeStep)}
    {#if step}
      <div class="detail-panel">
        <span class="detail-phase">Phase {step.phase}</span>
        <span class="detail-label">{step.label}</span>
        <p class="detail-desc">{step.description}</p>
      </div>
    {/if}
  {:else}
    <div class="detail-panel empty">Click a step or press Animate to walk through the pipeline</div>
  {/if}
</div>

<style>
  .pipeline {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.25rem;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.75rem;
    background: var(--sl-color-gray-6);
    font-family: var(--sl-font);
  }

  .pipeline-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pipeline-title {
    font-weight: 600;
    font-size: 0.875rem;
    color: var(--sl-color-gray-2);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .play-btn {
    padding: 0.3125rem 0.75rem;
    border: 1px solid var(--sl-color-gray-4);
    border-radius: 1rem;
    background: var(--sl-color-black);
    color: var(--sl-color-accent);
    font-family: var(--sl-font);
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition:
      border-color 0.15s ease,
      opacity 0.15s ease;
  }

  .play-btn:hover:not(:disabled) {
    border-color: var(--sl-color-accent);
  }

  .play-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .phases {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .phase {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .phase-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--sl-color-gray-3);
  }

  .phase-steps {
    display: flex;
    align-items: center;
    gap: 0;
  }

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem;
    border: none;
    background: none;
    cursor: pointer;
    flex: 1;
    min-width: 0;
    font-family: var(--sl-font);
    transition: transform 0.15s ease;
  }

  .step:hover {
    transform: translateY(-1px);
  }

  .step-circle {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    border: 2px solid var(--sl-color-gray-4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--sl-color-gray-3);
    background: var(--sl-color-black);
    transition:
      border-color 0.2s ease,
      background 0.2s ease,
      color 0.2s ease;
  }

  .step.active .step-circle {
    border-color: var(--sl-color-accent);
    background: var(--sl-color-accent);
    color: white;
  }

  .step.completed .step-circle {
    border-color: #22c55e;
    background: color-mix(in srgb, #22c55e 20%, transparent);
    color: #22c55e;
  }

  .step-label {
    font-size: 0.6875rem;
    color: var(--sl-color-gray-3);
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    transition: color 0.15s ease;
  }

  .step.active .step-label {
    color: var(--sl-color-accent-high);
  }

  .step.completed .step-label {
    color: #22c55e;
  }

  .connector {
    width: 1.5rem;
    height: 2px;
    background: var(--sl-color-gray-4);
    flex-shrink: 0;
    transition: background 0.2s ease;
  }

  .connector.active {
    background: #22c55e;
  }

  .phase-divider {
    display: flex;
    justify-content: center;
    padding: 0.25rem 0;
  }

  .divider-arrow {
    color: var(--sl-color-gray-4);
    transition: color 0.2s ease;
  }

  .divider-arrow.active {
    color: #22c55e;
  }

  .detail-panel {
    padding: 0.75rem 1rem;
    background: var(--sl-color-black);
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 0.5rem;
    min-height: 3.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .detail-panel.empty {
    justify-content: center;
    align-items: center;
    color: var(--sl-color-gray-3);
    font-size: 0.8125rem;
  }

  .detail-phase {
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--sl-color-accent);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .detail-label {
    font-weight: 600;
    font-size: 0.875rem;
    color: var(--sl-color-white);
  }

  .detail-desc {
    margin: 0;
    font-size: 0.8125rem;
    color: var(--sl-color-gray-2);
    line-height: 1.5;
  }
</style>
