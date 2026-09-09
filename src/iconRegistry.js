import {
  Accessibility, AirVent, AlarmSmoke, Archive, Armchair, BadgeInfo,
  BriefcaseBusiness, Building2, Camera, CircleParking, ClipboardPlus, Contact, Cog,
  Copy, DoorOpen, Drill, Droplets, FireExtinguisher, FlaskConical, HardDrive, HeartPulse, KeyRound, LampDesk,
  Laptop, LockKeyhole, LogOut, Monitor, MonitorUp, Network, PackageOpen, PanelTop,
  Microscope, Phone, Printer, Projector, Recycle, Refrigerator, ScanLine, Server, ShelvingUnit, ShieldCheck,
  Siren, Smartphone, Snowflake, SquareActivity, Stairs, Table2, TestTubeDiagonal, TriangleAlert,
  Tv, UserRound, UsersRound, UtilityPole, Wifi, Wrench, Zap
} from 'lucide';

const icon = (id, name, category, svgDefinition, keywords) => ({
  id, name, category, svgSymbolId: `icon-${id}`, svgDefinition, keywords
});

// The registry is the single source of truth. Every entry explicitly chooses a semantic SVG.
export const ICON_REGISTRY = [
  icon('person', 'Person', 'People', UserRound, ['user', 'individual']),
  icon('group', 'Group / People', 'People', UsersRound, ['team', 'users', 'staff']),
  icon('employee', 'Employee', 'People', Contact, ['staff', 'badge', 'person']),
  icon('visitor', 'Visitor', 'People', Accessibility, ['guest', 'person']),
  icon('manager', 'Manager / Supervisor', 'People', BriefcaseBusiness, ['boss', 'lead', 'employee']),
  icon('desk', 'Desk', 'Workplace', LampDesk, ['table', 'office', 'work']),
  icon('chair', 'Chair', 'Workplace', Armchair, ['seat', 'office']),
  icon('workstation', 'Workstation', 'Workplace', MonitorUp, ['computer', 'desk', 'office']),
  icon('conference-table', 'Conference Table', 'Workplace', Table2, ['meeting', 'desk', 'boardroom']),
  icon('meeting-room', 'Meeting Room', 'Workplace', Building2, ['conference', 'room', 'space']),
  icon('desktop-computer', 'Desktop Computer', 'Technology', Monitor, ['computer', 'pc', 'screen']),
  icon('laptop', 'Laptop', 'Technology', Laptop, ['computer', 'notebook']),
  icon('monitor', 'Monitor', 'Technology', PanelTop, ['computer', 'display', 'screen']),
  icon('printer', 'Printer', 'Technology', Printer, ['print', 'copier', 'paper']),
  icon('copier', 'Copier', 'Technology', Copy, ['printer', 'copy', 'paper']),
  icon('scanner', 'Scanner', 'Technology', ScanLine, ['scan', 'document']),
  icon('phone', 'Phone', 'Technology', Phone, ['telephone', 'handset', 'call']),
  icon('mobile-phone', 'Mobile Phone', 'Technology', Smartphone, ['cell', 'telephone', 'call']),
  icon('server', 'Server', 'Technology', Server, ['computer', 'data', 'rack']),
  icon('network', 'Network', 'Technology', Network, ['computer', 'lan', 'connected']),
  icon('wifi', 'Wi-Fi', 'Technology', Wifi, ['wireless', 'internet', 'network']),
  icon('television', 'Television / Display', 'Technology', Tv, ['tv', 'screen', 'display']),
  icon('projector', 'Projector', 'Technology', Projector, ['presentation', 'display']),
  icon('camera', 'Camera', 'Technology', Camera, ['photo', 'video', 'security']),
  icon('door', 'Door', 'Facilities', DoorOpen, ['doorway', 'room']),
  icon('key', 'Key', 'Facilities', KeyRound, ['access', 'unlock']),
  icon('lock', 'Lock', 'Facilities', LockKeyhole, ['secure', 'access']),
  icon('storage', 'Storage', 'Facilities', Archive, ['box', 'store', 'archive']),
  icon('cabinet', 'Cabinet', 'Facilities', PackageOpen, ['storage', 'cupboard']),
  icon('shelving', 'Shelving', 'Facilities', ShelvingUnit, ['shelf', 'storage']),
  icon('tools', 'Tools', 'Facilities', Drill, ['repair', 'maintenance']),
  icon('maintenance', 'Maintenance', 'Facilities', Wrench, ['tools', 'repair']),
  icon('electrical', 'Electrical', 'Facilities', Zap, ['power', 'voltage', 'electric']),
  icon('mechanical', 'Mechanical', 'Facilities', Cog, ['machine', 'equipment']),
  icon('hvac', 'HVAC', 'Facilities', AirVent, ['air', 'ventilation', 'heating', 'cooling']),
  icon('utility', 'Utility', 'Facilities', UtilityPole, ['service', 'power']),
  icon('first-aid', 'First Aid', 'Safety', ClipboardPlus, ['medical', 'health', 'emergency']),
  icon('aed', 'AED', 'Safety', HeartPulse, ['defibrillator', 'medical', 'emergency']),
  icon('fire-extinguisher', 'Fire Extinguisher', 'Safety', FireExtinguisher, ['fire', 'extinguisher', 'safety']),
  icon('fire-alarm', 'Fire Alarm', 'Safety', AlarmSmoke, ['fire', 'alarm', 'smoke']),
  icon('warning', 'Warning', 'Safety', TriangleAlert, ['alert', 'hazard', 'caution']),
  icon('emergency', 'Emergency', 'Safety', Siren, ['alert', 'alarm', 'urgent']),
  icon('security', 'Security', 'Safety', ShieldCheck, ['guard', 'safe', 'protection']),
  icon('restroom', 'Restroom', 'Building', Accessibility, ['toilet', 'bathroom', 'accessible']),
  icon('elevator', 'Elevator', 'Building', SquareActivity, ['lift', 'floors', 'access']),
  icon('stairs', 'Stairs', 'Building', Stairs, ['steps', 'floors']),
  icon('entrance-exit', 'Entrance / Exit', 'Building', LogOut, ['entry', 'door', 'egress']),
  icon('information', 'Information', 'Building', BadgeInfo, ['help', 'info']),
  icon('parking', 'Parking', 'Building', CircleParking, ['car', 'vehicle', 'garage']),
  icon('laboratory', 'Laboratory / Instrument', 'Laboratory', FlaskConical, ['lab', 'science', 'instrument']),
  icon('microscope', 'Microscope', 'Laboratory', Microscope, ['lab', 'science', 'magnify']),
  icon('chemical', 'Chemical', 'Laboratory', TestTubeDiagonal, ['lab', 'science', 'reagent']),
  icon('freezer', 'Freezer', 'Laboratory', Snowflake, ['cold', 'lab', 'storage']),
  icon('refrigerator', 'Refrigerator', 'Laboratory', Refrigerator, ['fridge', 'cold', 'lab']),
  icon('instrument', 'Lab Instrument', 'Laboratory', HardDrive, ['lab', 'equipment', 'analyzer']),
  icon('wash-station', 'Wash Station', 'Laboratory', Droplets, ['lab', 'sink', 'water']),
  icon('recycling', 'Recycling', 'Facilities', Recycle, ['waste', 'sustainability', 'bin'])
];

export const ICON_CATEGORIES = ['All', 'People', 'Workplace', 'Technology', 'Facilities', 'Safety', 'Building', 'Laboratory'];
export const getIcon = (id) => ICON_REGISTRY.find((entry) => entry.id === id);
export const searchIcons = (query = '', category = 'All') => {
  const needle = query.trim().toLowerCase();
  return ICON_REGISTRY.filter((entry) => {
    const inCategory = category === 'All' || entry.category === category;
    const searchable = [entry.name, entry.category, ...entry.keywords].join(' ').toLowerCase();
    return inCategory && searchable.includes(needle);
  });
};
