/**
 * Workbench plugin, browser half: the **工作台** sidebar entry and the
 * tile-grid main panel it opens. The page is a global panel: it belongs to
 * the profile, not to a Session, and the sidebar's entry selects it. Tiles
 * are declared here; wiring a tile to real behavior is adding one entry to
 * the list below.
 */
import type { Context as ClientContext } from '@deepseek-ai/cordis'
// Type-only: pulls the locale plugin's Context merge (ctx.locale).
import type {} from '@deepseek-ai/dsh-client-locale/client'
// Type-only: pulls the SlotRegistry service merge (ctx.slots).
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
// Type-only: the sidebar `sidebar.panellist` list the entry registers into,
// and the root `main` keyed slot the page registers into (declared by
// ui-layout with the panel id brand).
import type { MainPanelId } from '@deepseek-ai/dsh-client-ui-layout/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import { WorkbenchIcon } from './WorkbenchIcon.tsx'
import { WorkbenchPage } from './WorkbenchPage.tsx'
import { en, zh, type WorkbenchKey } from './locales.ts'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** Workbench panel copy. */
    workbench: WorkbenchKey
  }
}

/** Dictionary namespace owned by this plugin. */
export const NS = 'workbench'

/** The id shared by the sidebar entry and the main panel it opens. */
export const PANEL_ID = 'workbench' as MainPanelId

/** Services required by the sidebar registration (cordis fiber inject). */
export const inject = ['slots', 'locale']

/**
 * Contribute the Workbench entry to the sidebar with the tile-grid page it
 * opens.
 * @param ctx - Client root context.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'ui-workbench: dictionaries')
  const t = ctx.locale.bind(NS)

  // The page is a global panel: `main` is keyed by the panel id, and the
  // sidebar's row selects it through ctx.layout.selectPanel(PANEL_ID).
  ctx.slots.inject('main', () => ctx.slots.register({
    name: 'main',
    key: PANEL_ID,
    locale: NS,
  }, WorkbenchPage))

  // The sidebar entry: order 20 places it beneath Plugins (0) and the
  // schedule/task manager (10).
  ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
    name: 'sidebar.panellist',
    id: PANEL_ID,
    order: 20,
    label: () => t('panel'),
    locale: NS,
  }, WorkbenchIcon))
}
