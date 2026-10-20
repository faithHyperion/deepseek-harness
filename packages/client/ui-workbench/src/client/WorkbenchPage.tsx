/**
 * The Workbench tile-grid page: the main-column panel the sidebar's
 * Workbench entry selects. Pure presentation — every tile is declared in one
 * list, and wiring a tile to real behavior is adding an entry with its own
 * onSelect.
 */
import type { ReactNode } from 'react'
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'
import type { WorkbenchKey } from './locales.ts'
import css from './WorkbenchPage.module.css'

/** One tile of the grid. */
export interface WorkbenchTile {
  /** Stable React key. */
  key: string
  /** Locale key of the tile title. */
  titleKey: WorkbenchKey
  /** Decorative glyph. */
  icon: ReactNode
  /** Invoked when the tile is activated. */
  onSelect: () => void
}

type WorkbenchPageProps = PropsLocale<'workbench'>

/**
 * Render the workbench page: a heading and the tile grid.
 * @param props - composed slot props (the locale standard seat).
 * @returns the page element tree.
 */
export function WorkbenchPage({ t }: WorkbenchPageProps) {
  const tiles: readonly WorkbenchTile[] = [
    // Tiles are added here as the workbench grows; each entry carries its
    // own icon and onSelect action (navigate, open a dialog, call a service).
  ]
  return (
    <div className={css.page}>
      <header className={css.header}>
        <h1 className={css.title}>{t('panel')}</h1>
        <p className={css.intro}>{t('intro')}</p>
      </header>
      {tiles.length === 0
        ? <p className={css.empty}>{t('intro')}</p>
        : (
          <div className={css.grid}>
            {tiles.map(tile => (
              <button
                key={tile.key}
                type="button"
                className={css.tile}
                aria-label={t(tile.titleKey)}
                onClick={tile.onSelect}
              >
                <span className={css.tileIcon} aria-hidden="true">{tile.icon}</span>
                <span className={css.tileTitle}>{t(tile.titleKey)}</span>
              </button>
            ))}
          </div>
        )}
    </div>
  )
}
