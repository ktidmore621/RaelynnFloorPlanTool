import { describe, expect, it } from 'vitest';
import { ICON_REGISTRY, getIcon, searchIcons } from '../src/iconRegistry.js';
import { DEFAULT_STATE, exportState, importState, resolveMarkerIcon } from '../src/store.js';

describe('icon registry', () => {
  it('provides explicit, valid SVG definitions for every unique id', () => {
    expect(ICON_REGISTRY.length).toBeGreaterThanOrEqual(50);
    expect(new Set(ICON_REGISTRY.map((icon) => icon.id)).size).toBe(ICON_REGISTRY.length);
    ICON_REGISTRY.forEach((icon) => {
      expect(icon.svgSymbolId).toBe(`icon-${icon.id}`);
      expect(icon.svgDefinition.length).toBeGreaterThan(0);
      expect(icon.keywords.length).toBeGreaterThan(0);
    });
  });

  it('does not repeat the person graphic for unrelated concepts', () => {
    const person = getIcon('person').svgDefinition;
    ['conference-table', 'phone', 'door', 'electrical', 'warning', 'parking'].forEach((id) => {
      expect(getIcon(id).svgDefinition).not.toEqual(person);
    });
  });

  it('searches names, categories and keywords', () => {
    expect(searchIcons('computer').map(({ id }) => id)).toEqual(expect.arrayContaining(['desktop-computer', 'laptop', 'monitor']));
    expect(searchIcons('fire').map(({ id }) => id)).toEqual(expect.arrayContaining(['fire-extinguisher', 'fire-alarm']));
    expect(searchIcons('lab').map(({ id }) => id)).toEqual(expect.arrayContaining(['laboratory', 'microscope', 'chemical']));
    expect(searchIcons('', 'Safety').every(({ category }) => category === 'Safety')).toBe(true);
  });
});

describe('configuration model', () => {
  it('inherits marker type icons but respects explicit overrides', () => {
    expect(resolveMarkerIcon(DEFAULT_STATE.markers[0], DEFAULT_STATE.markerTypes)).toBe('printer');
    expect(resolveMarkerIcon({ ...DEFAULT_STATE.markers[0], iconId: 'camera' }, DEFAULT_STATE.markerTypes)).toBe('camera');
  });

  it('round-trips configuration through JSON import/export', () => {
    expect(importState(exportState(DEFAULT_STATE))).toEqual(DEFAULT_STATE);
    expect(() => importState('{"markerTypes":[],"markers":"bad"}')).toThrow();
  });
});
