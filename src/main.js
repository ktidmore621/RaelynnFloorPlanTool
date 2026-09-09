import { Application, Graphics } from 'pixi.js';
import { ICON_CATEGORIES, ICON_REGISTRY, getIcon, searchIcons } from './iconRegistry.js';
import { exportState, importState, loadState, resolveMarkerIcon, saveState } from './store.js';
import './styles.css';

const appRoot = document.querySelector('#app');
let state = loadState();
let activeCategory = 'All';
let searchTerm = '';
let selectedIconId = 'printer';
let activeTab = 'icons';
let selectedMarkerId = null;

const svgIcon = (iconId, className = '') => {
  const definition = getIcon(iconId)?.svgDefinition;
  if (!definition) return '';
  const nodes = definition.map(([tag, attrs]) => {
    const attributes = Object.entries(attrs).map(([key, value]) => `${key}="${value}"`).join(' ');
    return `<${tag} ${attributes}></${tag}>`;
  }).join('');
  return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${nodes}</svg>`;
};

const renderShell = () => {
  appRoot.innerHTML = `
    <aside class="sidebar">
      <div class="brand"><span class="brand-mark">S</span><span>SpacePlan</span></div>
      <nav><button class="nav-item"><span>⌂</span> Floor plans</button><button class="nav-item"><span>◎</span> Directory</button></nav>
      <div class="nav-label">ADMINISTRATION</div>
      <button class="nav-item active"><span>⚙</span> Configuration</button>
      <div class="profile"><span class="avatar">AB</span><div><strong>Alex Brown</strong><small>Administrator</small></div></div>
    </aside>
    <main>
      <header><div><div class="eyebrow">ADMIN CONFIGURATION</div><h1>Visual standards</h1><p>Manage the icons and marker styles used throughout your workplace.</p></div>
        <div class="header-actions"><button id="export-button" class="button secondary">Export JSON</button><label class="button secondary">Import JSON<input id="import-input" type="file" accept="application/json" hidden></label><span class="saved">● Saved</span></div>
      </header>
      <div class="tabs"><button data-tab="icons" class="tab ${activeTab === 'icons' ? 'active' : ''}">Icon Library <span>${ICON_REGISTRY.length}</span></button><button data-tab="types" class="tab ${activeTab === 'types' ? 'active' : ''}">Marker Types <span>${state.markerTypes.length}</span></button></div>
      <section id="content"></section>
    </main>`;
  bindShell();
  renderContent();
};

const renderContent = () => activeTab === 'icons' ? renderLibrary() : renderMarkerTypes();

const renderLibrary = () => {
  const results = searchIcons(searchTerm, activeCategory);
  document.querySelector('#content').innerHTML = `
    <div class="toolbar"><label class="search"><span>⌕</span><input id="search" type="search" value="${searchTerm}" placeholder="Search by name, category, or keyword…" aria-label="Search icons"></label></div>
    <div class="filter-row" role="group" aria-label="Icon categories">${ICON_CATEGORIES.map((category) => `<button class="pill ${category === activeCategory ? 'active' : ''}" data-category="${category}">${category}</button>`).join('')}</div>
    <div class="section-heading"><div><h2>${activeCategory === 'All' ? 'All icons' : activeCategory}</h2><p>Choose an icon to preview it or assign it to a marker type.</p></div><span>${results.length} results</span></div>
    <div class="icon-grid">${results.map((entry) => `<button class="icon-tile ${entry.id === selectedIconId ? 'selected' : ''}" data-icon="${entry.id}" aria-pressed="${entry.id === selectedIconId}">${svgIcon(entry.id)}<span>${entry.name}</span><small>${entry.category}</small></button>`).join('')}</div>
    ${results.length ? '' : '<div class="empty"><h3>No icons found</h3><p>Try a different word or category.</p></div>'}`;
  document.querySelector('#search').addEventListener('input', (event) => { searchTerm = event.target.value; renderLibrary(); });
  document.querySelectorAll('[data-category]').forEach((button) => button.addEventListener('click', () => { activeCategory = button.dataset.category; renderLibrary(); }));
  document.querySelectorAll('[data-icon]').forEach((button) => button.addEventListener('click', () => { selectedIconId = button.dataset.icon; renderLibrary(); }));
};

const renderMarkerTypes = () => {
  const selected = state.markerTypes[0];
  document.querySelector('#content').innerHTML = `
    <div class="type-layout"><section class="panel"><div class="section-heading"><div><h2>Marker types</h2><p>Icons selected here automatically update linked map markers.</p></div></div>
    <div class="type-list">${state.markerTypes.map((type, index) => `<article class="type-card ${index === 0 ? 'selected' : ''}" data-type="${type.id}"><span class="type-icon ${type.style.includes('Red') ? 'red' : type.style.includes('Green') ? 'green' : ''}">${svgIcon(type.iconId)}</span><div><strong>${type.name}</strong><small>${type.style}</small></div><button class="change-icon" data-type-index="${index}">Change icon</button></article>`).join('')}</div></section>
    <section class="panel map-panel"><div class="section-heading"><div><h2>Floor plan preview</h2><p>Markers use the same vector icons as the library.</p></div><span>View mode</span></div><div id="floor-plan"><div id="pixi-floor"></div><div class="room room-a">WORK AREA</div><div class="room room-b">MEETING 201</div><div class="room room-c">SUPPORT</div><svg class="marker-layer" viewBox="0 0 100 100" preserveAspectRatio="none">${state.markers.map((marker) => { const type = state.markerTypes.find((item) => item.id === marker.markerTypeId); const id = resolveMarkerIcon(marker, state.markerTypes); return `<g class="map-marker ${selectedMarkerId === marker.id ? 'selected' : ''}" data-marker="${marker.id}" transform="translate(${marker.x} ${marker.y})" aria-label="${type?.name || 'Marker'}"><circle r="4.8"></circle><g transform="translate(-2.5 -2.5) scale(.21)">${svgIcon(id, 'map-svg')}</g></g>`; }).join('')}</svg></div></section></div>
    <dialog id="picker"><form method="dialog"><div class="dialog-title"><div><h2>Choose an icon</h2><p>Assign a library icon to ${selected.name}.</p></div><button value="cancel" aria-label="Close">×</button></div><div class="mini-grid">${ICON_REGISTRY.map((entry) => `<button type="button" data-pick="${entry.id}" title="${entry.name}">${svgIcon(entry.id)}<span>${entry.name}</span></button>`).join('')}</div></form></dialog>`;
  setupPixiFloor();
  document.querySelectorAll('.change-icon').forEach((button) => button.addEventListener('click', () => {
    const dialog = document.querySelector('#picker');
    dialog.dataset.typeIndex = button.dataset.typeIndex;
    dialog.showModal();
  }));
  document.querySelectorAll('[data-pick]').forEach((button) => button.addEventListener('click', () => {
    const dialog = document.querySelector('#picker');
    state.markerTypes[Number(dialog.dataset.typeIndex)].iconId = button.dataset.pick;
    saveState(state); dialog.close(); renderMarkerTypes();
  }));
  document.querySelectorAll('[data-marker]').forEach((marker) => marker.addEventListener('click', () => { selectedMarkerId = marker.dataset.marker; renderMarkerTypes(); }));
};

const setupPixiFloor = async () => {
  const host = document.querySelector('#pixi-floor');
  const pixi = new Application();
  await pixi.init({ resizeTo: host, backgroundAlpha: 0, antialias: true });
  if (!host.isConnected) { pixi.destroy(true); return; }
  host.appendChild(pixi.canvas);
  const grid = new Graphics();
  for (let x = 0; x < host.clientWidth; x += 22) grid.moveTo(x, 0).lineTo(x, host.clientHeight);
  for (let y = 0; y < host.clientHeight; y += 22) grid.moveTo(0, y).lineTo(host.clientWidth, y);
  grid.stroke({ color: 0xd9ddd9, width: 0.5, alpha: 0.45 });
  pixi.stage.addChild(grid);
};

const bindShell = () => {
  document.querySelectorAll('[data-tab]').forEach((tab) => tab.addEventListener('click', () => { activeTab = tab.dataset.tab; renderShell(); }));
  document.querySelector('#export-button').addEventListener('click', () => {
    const file = new Blob([exportState(state)], { type: 'application/json' });
    const link = Object.assign(document.createElement('a'), { href: URL.createObjectURL(file), download: 'spaceplan-configuration.json' });
    link.click(); URL.revokeObjectURL(link.href);
  });
  document.querySelector('#import-input').addEventListener('change', async (event) => {
    try { state = importState(await event.target.files[0].text()); saveState(state); renderShell(); }
    catch (error) { window.alert(error.message); }
  });
};

renderShell();
