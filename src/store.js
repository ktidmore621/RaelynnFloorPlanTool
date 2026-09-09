import { getIcon } from './iconRegistry.js';

const STORAGE_KEY = 'spaceplan-configuration-v1';
export const DEFAULT_STATE = {
  markerTypes: [
    { id: 'printer', name: 'Printer', iconId: 'printer', style: 'Technology Blue' },
    { id: 'first-aid', name: 'First Aid', iconId: 'first-aid', style: 'Safety Red' },
    { id: 'meeting-room', name: 'Meeting Room', iconId: 'meeting-room', style: 'Workplace Green' }
  ],
  markers: [
    { id: 'marker-1', markerTypeId: 'printer', x: 31, y: 38 },
    { id: 'marker-2', markerTypeId: 'first-aid', x: 72, y: 64 },
    { id: 'marker-3', markerTypeId: 'meeting-room', x: 58, y: 28 }
  ]
};

const clone = (value) => JSON.parse(JSON.stringify(value));
const validState = (value) => value && Array.isArray(value.markerTypes) && Array.isArray(value.markers)
  && value.markerTypes.every((type) => type.id && type.name && getIcon(type.iconId));

export const loadState = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return validState(stored) ? stored : clone(DEFAULT_STATE);
  } catch {
    return clone(DEFAULT_STATE);
  }
};
export const saveState = (state) => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
export const exportState = (state) => JSON.stringify(state, null, 2);
export const importState = (json) => {
  const parsed = JSON.parse(json);
  if (!validState(parsed)) throw new Error('This file is not a valid SpacePlan configuration.');
  return parsed;
};

export const resolveMarkerIcon = (marker, markerTypes) => {
  if (marker.iconId && getIcon(marker.iconId)) return marker.iconId;
  return markerTypes.find((type) => type.id === marker.markerTypeId)?.iconId || 'information';
};
