// The problems inside one big ticket: one per cause its reports are filed under (causes.ts), and the desk's
// one-day reading (desk-notes.json). Counted the desk's way, as CauseTable does: a report stays filed under its
// cause by tenant, so a one-day report is in its cause's count too.
import { groupByCause, readAs, uniqueById, type CauseGroup, type Report, type Tenant } from '#lib/kb/causes';

export type Problem = CauseGroup['cause'] | 'one-day';

export function problemCounts(
  reports: Report[],
  ticket: number,
  tenantOf: (r: Report) => Tenant | undefined,
  oneDay: readonly string[],
): { problem: Problem; reports: number }[] {
  const groups = groupByCause(uniqueById(reports).filter((r) => r.mergedInto === ticket), tenantOf);
  const rows: { problem: Problem; reports: number }[] = groups.map((g) => ({ problem: g.cause, reports: g.reports.length }));
  const moved = groups.reduce((n, g) => n + readAs(g, oneDay), 0);
  return moved ? [...rows, { problem: 'one-day', reports: moved }] : rows;
}
