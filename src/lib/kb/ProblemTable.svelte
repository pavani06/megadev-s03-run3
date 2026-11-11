<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import type { Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';
  import { problemCounts } from '#lib/kb/problems';

  let { ticket }: { ticket: number } = $props();

  const rows = $derived(problemCounts(reports as Report[], ticket, tenantOf, notes.oneDayMove));
</script>

<table>
  <thead>
    <tr><th>problem</th><th>reports</th></tr>
  </thead>
  <tbody>
    {#each rows as r (r.problem)}
      <tr><td><code>{r.problem}</code></td><td>{r.reports}</td></tr>
    {/each}
  </tbody>
</table>
