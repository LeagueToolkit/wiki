<script lang="ts">
  import { Tooltip } from 'bits-ui';

  // Full passthrough, including the `child` snippet for render delegation:
  // callers can replace the default <button> with their own element and
  // spread the provided props onto it.
  let { ...restProps }: Tooltip.TriggerProps = $props();
</script>

<Tooltip.Trigger {...restProps} />
