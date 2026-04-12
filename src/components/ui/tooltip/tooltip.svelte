<script lang="ts">
  import { Tooltip } from 'bits-ui';

  let { ...restProps }: Tooltip.RootProps = $props();
</script>

<Tooltip.Root {...restProps} />
