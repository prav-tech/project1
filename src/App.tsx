import React, { useState } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Users, 
  Truck, 
  Settings, 
  Search, 
  Bell, 
  MessageSquare, 
  MapPin, 
  Check, 
  X, 
  Navigation, 
  CheckCircle,
  Clock,
  Compass
} from 'lucide-react';

interface Customer {
  sNo: number;
  code: string;
  name: string;
  address: string;
  contact: string;
  status: string;
  checkedIn: boolean;
  checkinTime: string | null;
  notes: string;
}

interface Stats {
  salesmanName: string;
  salesmanCode: string;
  routeName: string;
  routeCode: string;
  date: string;
  scheduleCall: number;
  visitedCall: string;
  vehicle: string;
  unscheduleCall: number;
  pendingCall: number;
  actualCall: number;
  status: string;
}

interface Toast {
  id: number;
  message: string;
}

function App() {
  // Sidebar active tab state
  const [activeTab, setActiveTab] = useState<string>('Logistics');

  // Core customer data state
  const [customers, setCustomers] = useState<Customer[]>([
    {
      sNo: 1,
      code: 'CUST005',
      name: 'Raju Distributors',
      address: 'Raju Distributors, , - 500012',
      contact: '3456789011',
      status: 'Active',
      checkedIn: false,
      checkinTime: null,
      notes: ''
    },
    {
      sNo: 2,
      code: 'CUST002',
      name: 'Lakshmi Electronics',
      address: 'Lakshmi Electronics, , - 500072',
      contact: '',
      status: 'Active',
      checkedIn: false,
      checkinTime: null,
      notes: ''
    },
    {
      sNo: 3,
      code: 'CUST006',
      name: 'Krishna Super Stockist',
      address: 'Krishna Super Stockist, , - 500074',
      contact: '',
      status: 'Active',
      checkedIn: false,
      checkinTime: null,
      notes: ''
    }
  ]);

  // Dashboard Call Plan Stats state (initialized to match screenshot exactly)
  const [stats, setStats] = useState<Stats>({
    salesmanName: 'Harshith S Reddy',
    salesmanCode: 'EMP022',
    routeName: 'madhapur',
    routeCode: 'RC104',
    date: 'Apr 24, 2026',
    scheduleCall: 3,
    visitedCall: '-',
    vehicle: '-',
    unscheduleCall: 0,
    pendingCall: 0,
    actualCall: 0,
    status: 'Active'
  });

  // Search filter
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [activeModal, setActiveModal] = useState<'checkin' | 'direction' | 'profile' | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [checkinNote, setCheckinNote] = useState<string>('');

  // Toast notifications state
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Add toast helper
  const addToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Open checkin modal
  const handleOpenCheckin = (customer: Customer) => {
    if (customer.checkedIn) return;
    setSelectedCustomer(customer);
    setCheckinNote('');
    setActiveModal('checkin');
  };

  // Submit checkin
  const handleSubmitCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) return;

    // Update customer status
    setCustomers((prevCustomers) =>
      prevCustomers.map((cust) =>
        cust.code === selectedCustomer.code
          ? {
              ...cust,
              checkedIn: true,
              checkinTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              notes: checkinNote || 'No notes provided'
            }
          : cust
      )
    );

    // Update stats
    setStats((prevStats) => {
      const currentVisited = prevStats.visitedCall === '-' ? 0 : parseInt(prevStats.visitedCall);
      const newVisited = currentVisited + 1;
      const newActual = prevStats.actualCall + 1;
      return {
        ...prevStats,
        visitedCall: newVisited.toString(),
        actualCall: newActual
      };
    });

    addToast(`Successfully checked in at ${selectedCustomer.name}`);
    setActiveModal(null);
    setSelectedCustomer(null);
  };

  // Open Direction modal
  const handleOpenDirection = (customer: Customer) => {
    setSelectedCustomer(customer);
    setActiveModal('direction');
  };

  // Open Profile details modal
  const handleOpenProfile = (customer: Customer) => {
    setSelectedCustomer(customer);
    setActiveModal('profile');
  };

  // Filtered customer list
  const filteredCustomers = customers.filter(
    (cust) =>
      cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cust.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cust.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="logo-container">
            <div className="logo-icon">SE</div>
            <div className="logo-text">SalesEDGE</div>
            <div className="logo-subtext">Enterprise</div>
          </div>

          <nav className="sidebar-menu">
            <a 
              className={`sidebar-item ${activeTab === 'Reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('Reports')}
              href="#reports"
            >
              <BarChart2 />
              <span>Reports</span>
            </a>
            <a 
              className={`sidebar-item ${activeTab === 'Sales' ? 'active' : ''}`}
              onClick={() => setActiveTab('Sales')}
              href="#sales"
            >
              <TrendingUp />
              <span>Sales</span>
            </a>
            <a 
              className={`sidebar-item ${activeTab === 'Accounts' ? 'active' : ''}`}
              onClick={() => setActiveTab('Accounts')}
              href="#accounts"
            >
              <Users />
              <span>Accounts</span>
            </a>
            <a 
              className={`sidebar-item ${activeTab === 'Logistics' ? 'active' : ''}`}
              onClick={() => setActiveTab('Logistics')}
              href="#logistics"
            >
              <Truck />
              <span>Logistics</span>
            </a>
            <a 
              className={`sidebar-item ${activeTab === 'System' ? 'active' : ''}`}
              onClick={() => setActiveTab('System')}
              href="#system"
            >
              <Settings />
              <span>System</span>
            </a>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="avatar">
            KK
            <div className="avatar-badge"></div>
          </div>
          <button className="sidebar-action-btn" title="Search Menu">
            <Search size={20} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-title-section">
            <h1 className="header-title">Call Plan Details</h1>
            <div className="breadcrumbs">
              <span className="breadcrumb-link">View Call Plan</span>
              <span className="breadcrumb-separator">&gt;</span>
              <span className="breadcrumb-active">Call Plan Customer Info</span>
            </div>
          </div>

          <div className="header-actions">
            <div className="search-bar">
              <Search size={16} className="text-secondary" />
              <input 
                type="text" 
                placeholder="Search customers..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="icon-btn" title="Notifications">
              <Bell size={20} />
              <span className="icon-btn-badge"></span>
            </button>
            <button className="icon-btn" title="Chat Messages">
              <MessageSquare size={20} />
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="dashboard-body">
          
          {/* Card 1: Call Plan Summary Card */}
          <section className="dashboard-card info-grid">
            {/* Column 1 */}
            <div className="info-column">
              <div className="info-item">
                <span className="info-label">Salesman Name /Code</span>
                <span className="info-value">{stats.salesmanName}/{stats.salesmanCode}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Visited Call</span>
                <span className="info-value">{stats.visitedCall}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Actual Call</span>
                <span className="info-value">{stats.actualCall}</span>
              </div>
            </div>

            {/* Column 2 */}
            <div className="info-column">
              <div className="info-item">
                <span className="info-label">Route Name /Code</span>
                <span className="info-value">{stats.routeName}/{stats.routeCode}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Vehicle</span>
                <span className="info-value">{stats.vehicle}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Status</span>
                <span className="info-value status-active">{stats.status}</span>
              </div>
            </div>

            {/* Column 3 */}
            <div className="info-column">
              <div className="info-item">
                <span className="info-label">Date</span>
                <span className="info-value">{stats.date}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Unschedule Call</span>
                <span className="info-value">{stats.unscheduleCall}</span>
              </div>
            </div>

            {/* Column 4 */}
            <div className="info-column">
              <div className="info-item">
                <span className="info-label">Schedule Call</span>
                <span className="info-value">{stats.scheduleCall}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Pending Call</span>
                <span className="info-value">{stats.pendingCall}</span>
              </div>
            </div>
          </section>

          {/* Card 2: Customer List Table Card */}
          <section className="dashboard-card table-card">
            <div className="table-header-container">
              <h2 className="table-title">Customer Details</h2>
              <span className="text-secondary" style={{ fontSize: '12px' }}>
                Showing {filteredCustomers.length} of {customers.length} customers
              </span>
            </div>

            <div className="table-container">
              <table className="customer-table" id="customer-list-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Customer Code</th>
                    <th>Customer Name</th>
                    <th>Address</th>
                    <th>Customer Contact</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'center' }}>Direction</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((cust, idx) => (
                      <tr key={cust.code}>
                        <td>{idx + 1}</td>
                        <td>
                          <button 
                            className="link-btn" 
                            onClick={() => handleOpenProfile(cust)}
                          >
                            {cust.code}
                          </button>
                        </td>
                        <td>
                          <button 
                            className="link-btn" 
                            onClick={() => handleOpenProfile(cust)}
                            style={{ fontWeight: '500' }}
                          >
                            {cust.name}
                          </button>
                        </td>
                        <td style={{ color: '#475569', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={cust.address}>
                          {cust.address}
                        </td>
                        <td style={{ color: '#475569' }}>
                          {cust.contact || '-'}
                        </td>
                        <td>
                          <span className={`status-badge ${cust.checkedIn ? 'checked-in' : 'active'}`}>
                            {cust.checkedIn ? 'Visited' : cust.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button 
                            className="direction-btn" 
                            onClick={() => handleOpenDirection(cust)}
                            title="View Directions"
                          >
                            <Compass size={18} />
                          </button>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {cust.checkedIn ? (
                            <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '13px', fontWeight: '500' }}>
                              <CheckCircle size={15} /> Checked in
                            </span>
                          ) : (
                            <button 
                              className="link-btn action-checkin"
                              onClick={() => handleOpenCheckin(cust)}
                            >
                              Check in
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                        No customers found matching the search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      {/* MODAL 1: Check-in Modal */}
      {activeModal === 'checkin' && selectedCustomer && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Customer Check-in</h3>
              <button className="icon-btn" onClick={() => setActiveModal(null)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmitCheckin}>
              <div className="modal-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>
                    Confirming check-in for:
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>
                    {selectedCustomer.name} ({selectedCustomer.code})
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    📍 {selectedCustomer.address}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="checkin-notes">Check-in Notes / Remarks</label>
                  <textarea 
                    id="checkin-notes"
                    className="form-control" 
                    rows={4} 
                    placeholder="Enter any customer feedback, orders, or comments..."
                    value={checkinNote}
                    onChange={(e) => setCheckinNote(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setActiveModal(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm Check-in
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Direction Modal */}
      {activeModal === 'direction' && selectedCustomer && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content" style={{ width: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Route Directions to {selectedCustomer.name}</h3>
              <button className="icon-btn" onClick={() => setActiveModal(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Mock Map Visual */}
              <div style={{ 
                height: '180px', 
                backgroundColor: '#e0f2fe', 
                borderRadius: '8px', 
                border: '1px dashed #0284c7', 
                position: 'relative', 
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* CSS grid to look like a map */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(#0ea5e9 1px, transparent 1px), radial-gradient(#0ea5e9 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 10px 10px',
                  opacity: 0.15
                }}></div>
                
                {/* Mock path */}
                <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
                  <path d="M 50,150 Q 150,50 300,120 T 550,60" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="6 4" />
                </svg>

                {/* Pin Start */}
                <div style={{ position: 'absolute', left: '45px', bottom: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: 'bold' }}>Start (Route Office)</div>
                  <MapPin size={24} color="#2563eb" fill="#bfdbfe" />
                </div>

                {/* Pin End */}
                <div style={{ position: 'absolute', right: '45px', top: '35px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ backgroundColor: '#dc2626', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: 'bold' }}>{selectedCustomer.code}</div>
                  <MapPin size={24} color="#dc2626" fill="#fecaca" />
                </div>

                <span style={{ zIndex: 1, backgroundColor: 'rgba(255,255,255,0.85)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500', color: '#0369a1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Navigation size={14} /> Navigating from Madhapur RC104 Route
                </span>
              </div>

              {/* Navigation Steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="form-label">Step-by-step Navigation</span>
                <div style={{ maxHeight: '150px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '8px' }}>
                  <div style={{ display: 'flex', gap: '10px', fontSize: '13px' }}>
                    <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>1.</span>
                    <span>Start from Madhapur Route Center, head East on Main Road toward Metro Pillar.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', fontSize: '13px' }}>
                    <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>2.</span>
                    <span>Turn right after 400 meters onto Cyber Hills Street.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', fontSize: '13px' }}>
                    <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>3.</span>
                    <span>Continue straight for 1.2 km, then locate <strong>{selectedCustomer.name}</strong> on the left side.</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setActiveModal(null)}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Customer Profile Details */}
      {activeModal === 'profile' && selectedCustomer && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Customer Profile</h3>
              <button className="icon-btn" onClick={() => setActiveModal(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', fontWeight: '700', fontSize: '18px' }}>
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>{selectedCustomer.name}</h4>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Code: {selectedCustomer.code}</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <div className="info-item">
                  <span className="info-label">Contact Number</span>
                  <span className="info-value">{selectedCustomer.contact || 'Not available'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Status</span>
                  <span className={`status-badge ${selectedCustomer.checkedIn ? 'checked-in' : 'active'}`} style={{ alignSelf: 'flex-start' }}>
                    {selectedCustomer.checkedIn ? 'Visited' : selectedCustomer.status}
                  </span>
                </div>
                <div className="info-item" style={{ gridColumn: 'span 2' }}>
                  <span className="info-label">Address</span>
                  <span className="info-value" style={{ fontWeight: 'normal', color: '#475569' }}>{selectedCustomer.address}</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="info-label">Visit Activity Log</span>
                {selectedCustomer.checkedIn ? (
                  <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontWeight: '500' }}>
                        <CheckCircle size={14} /> Checked in
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> {selectedCustomer.checkinTime}
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#334155', fontStyle: 'italic', borderLeft: '3px solid #cbd5e1', paddingLeft: '8px', marginTop: '4px' }}>
                      "{selectedCustomer.notes}"
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic', padding: '8px 0' }}>
                    No check-in activity recorded for today.
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              {!selectedCustomer.checkedIn && (
                <button 
                  className="btn btn-primary" 
                  onClick={() => {
                    setActiveModal(null);
                    handleOpenCheckin(selectedCustomer);
                  }}
                >
                  Check In Now
                </button>
              )}
              <button className="btn btn-secondary" onClick={() => setActiveModal(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification Container */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            <Check className="toast-success-icon" size={16} />
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
