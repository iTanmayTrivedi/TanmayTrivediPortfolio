import { motion } from "framer-motion";

// Shared tiny chart component
const MiniChart = ({ color = "#3b82f6", data = [30, 60, 45, 80, 55, 70, 90] }: { color?: string; data?: number[] }) => {
  const max = Math.max(...data);
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 80}`).join(" ");
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={`0,100 ${points} 100,100`} fill={`url(#grad-${color.replace("#", "")})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

const MiniBar = ({ values = [60, 80, 45, 90, 70], color = "#3b82f6" }: { values?: number[]; color?: string }) => (
  <div className="flex items-end gap-[2px] h-full w-full">
    {values.map((v, i) => (
      <motion.div
        key={i}
        className="flex-1 rounded-t-sm"
        style={{ backgroundColor: color, height: `${v}%` }}
        initial={{ height: 0 }}
        animate={{ height: `${v}%` }}
        transition={{ delay: i * 0.1, duration: 0.5 }}
      />
    ))}
  </div>
);

const StatusDot = ({ status }: { status: "green" | "yellow" | "red" }) => {
  const colors = { green: "#22c55e", yellow: "#eab308", red: "#ef4444" };
  return <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors[status] }} />;
};

// =============================================
// Project 1: Internal Company Management System
// =============================================
const DashboardDesktop = () => (
  <div className="w-full h-full bg-[#f8f9fb] flex text-[6px] font-sans">
    {/* Sidebar */}
    <div className="w-[18%] bg-[#1e293b] text-white flex flex-col p-2 gap-1.5">
      <div className="text-[7px] font-bold mb-2 text-blue-400">DataFlow</div>
      {["Dashboard", "Users", "Reports", "Analytics", "Settings"].map((item, i) => (
        <div key={i} className={`px-1.5 py-1 rounded text-[5px] ${i === 0 ? "bg-blue-600" : "hover:bg-white/10"}`}>{item}</div>
      ))}
    </div>
    {/* Main */}
    <div className="flex-1 p-3 overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-[7px] text-gray-800">Dashboard Overview</span>
        <div className="flex gap-1">
          <div className="px-1.5 py-0.5 bg-blue-500 text-white rounded text-[4px]">Export</div>
          <div className="px-1.5 py-0.5 bg-gray-200 rounded text-[4px] text-gray-600">Filter</div>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-1.5 mb-2">
        {[
          { label: "Total Users", value: "2,847", change: "+12%", color: "#3b82f6" },
          { label: "Revenue", value: "¥4.2M", change: "+8%", color: "#22c55e" },
          { label: "Active Sessions", value: "342", change: "+5%", color: "#8b5cf6" },
          { label: "Reports", value: "89", change: "+23%", color: "#f59e0b" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-1.5 rounded shadow-sm border border-gray-100">
            <div className="text-[4px] text-gray-500">{stat.label}</div>
            <div className="text-[8px] font-bold text-gray-800">{stat.value}</div>
            <div className="text-[4px]" style={{ color: stat.color }}>{stat.change}</div>
          </div>
        ))}
      </div>
      {/* Chart Area */}
      <div className="grid grid-cols-3 gap-1.5">
        <div className="col-span-2 bg-white p-2 rounded shadow-sm border border-gray-100">
          <div className="text-[5px] font-semibold text-gray-700 mb-1">Revenue Trend</div>
          <div className="h-16"><MiniChart color="#3b82f6" data={[20, 45, 35, 60, 50, 75, 65, 85, 70, 90]} /></div>
        </div>
        <div className="bg-white p-2 rounded shadow-sm border border-gray-100">
          <div className="text-[5px] font-semibold text-gray-700 mb-1">By Category</div>
          <div className="h-16"><MiniBar values={[70, 55, 85, 40, 65]} color="#8b5cf6" /></div>
        </div>
      </div>
      {/* Table */}
      <div className="bg-white mt-1.5 p-1.5 rounded shadow-sm border border-gray-100">
        <div className="text-[5px] font-semibold text-gray-700 mb-1">Recent Activity</div>
        <div className="space-y-0.5">
          {["Tanaka Yuki - Login", "Sato Kenji - Report Gen", "Yamamoto Ai - Export"].map((r, i) => (
            <div key={i} className="flex justify-between text-[4px] py-0.5 border-b border-gray-50">
              <span className="text-gray-600">{r}</span>
              <span className="text-gray-400">2min ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const DashboardTablet = () => (
  <div className="w-full h-full bg-[#f8f9fb] flex flex-col text-[5px] font-sans p-2">
    <div className="flex justify-between items-center mb-2">
      <span className="font-bold text-[7px] text-gray-800">DataFlow</span>
      <div className="flex gap-1">
        {["Dashboard", "Users", "Reports"].map((t, i) => (
          <div key={i} className={`px-1 py-0.5 rounded text-[4px] ${i === 0 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}>{t}</div>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-2 gap-1 mb-2">
      {[
        { label: "Users", value: "2,847", color: "#3b82f6" },
        { label: "Revenue", value: "¥4.2M", color: "#22c55e" },
      ].map((s, i) => (
        <div key={i} className="bg-white p-1.5 rounded shadow-sm">
          <div className="text-[4px] text-gray-500">{s.label}</div>
          <div className="text-[7px] font-bold text-gray-800">{s.value}</div>
        </div>
      ))}
    </div>
    <div className="bg-white p-2 rounded shadow-sm flex-1 mb-1">
      <div className="text-[5px] font-semibold text-gray-700 mb-1">Analytics</div>
      <div className="h-20"><MiniChart color="#3b82f6" data={[30, 55, 40, 70, 60, 80, 75, 90]} /></div>
    </div>
    <div className="bg-white p-1.5 rounded shadow-sm">
      <div className="text-[5px] font-semibold text-gray-700 mb-1">Activity</div>
      {["Tanaka - Login", "Sato - Export", "Yamamoto - Report"].map((r, i) => (
        <div key={i} className="flex justify-between text-[4px] py-0.5 border-b border-gray-50">
          <span className="text-gray-600">{r}</span>
          <StatusDot status="green" />
        </div>
      ))}
    </div>
  </div>
);

const DashboardMobile = () => (
  <div className="w-full h-full bg-[#f8f9fb] flex flex-col text-[4px] font-sans p-1.5 pt-4">
    <div className="font-bold text-[6px] text-gray-800 mb-1.5">DataFlow</div>
    <div className="bg-white p-1.5 rounded shadow-sm mb-1">
      <div className="text-[3.5px] text-gray-500">Total Users</div>
      <div className="text-[7px] font-bold text-gray-800">2,847</div>
      <div className="h-8 mt-0.5"><MiniChart color="#3b82f6" /></div>
    </div>
    <div className="bg-white p-1.5 rounded shadow-sm mb-1">
      <div className="text-[3.5px] text-gray-500">Revenue</div>
      <div className="text-[7px] font-bold text-gray-800">¥4.2M</div>
      <div className="h-8 mt-0.5"><MiniBar values={[50, 70, 45, 85, 60]} color="#22c55e" /></div>
    </div>
    <div className="bg-white p-1.5 rounded shadow-sm">
      <div className="text-[3.5px] font-semibold text-gray-700 mb-0.5">Recent</div>
      {["Tanaka - Login", "Sato - Report"].map((r, i) => (
        <div key={i} className="text-[3px] py-0.5 border-b border-gray-50 text-gray-600">{r}</div>
      ))}
    </div>
  </div>
);

// =============================================
// Project 2: Appointment & Reservation System
// =============================================
const BookingDesktop = () => (
  <div className="w-full h-full bg-white flex text-[6px] font-sans">
    <div className="w-[18%] bg-[#0f172a] text-white p-2 flex flex-col gap-1.5">
      <div className="text-[7px] font-bold text-emerald-400 mb-2">BookFlow</div>
      {["Calendar", "Appointments", "Clients", "Services", "Settings"].map((item, i) => (
        <div key={i} className={`px-1.5 py-1 rounded text-[5px] ${i === 0 ? "bg-emerald-600" : "hover:bg-white/10"}`}>{item}</div>
      ))}
    </div>
    <div className="flex-1 p-3 overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-[7px] text-gray-800">April 2026</span>
        <div className="flex gap-1">
          <div className="px-1.5 py-0.5 bg-emerald-500 text-white rounded text-[4px]">+ New Booking</div>
        </div>
      </div>
      {/* Calendar Grid */}
      <div className="bg-gray-50 rounded p-1.5 mb-2">
        <div className="grid grid-cols-7 gap-0.5 mb-1">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="text-center text-[4px] text-gray-400 font-medium">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {Array.from({ length: 28 }, (_, i) => (
            <div key={i} className={`text-center py-1 rounded text-[4px] ${[3, 7, 12, 18, 22].includes(i) ? "bg-emerald-100 text-emerald-700 font-bold" : i === 1 ? "bg-emerald-500 text-white" : "text-gray-600"}`}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      {/* Upcoming */}
      <div className="space-y-1">
        <div className="text-[5px] font-semibold text-gray-700">Upcoming Appointments</div>
        {[
          { time: "09:00", name: "Tanaka Yuki", service: "Consultation", color: "#10b981" },
          { time: "11:30", name: "Suzuki Hana", service: "Follow-up", color: "#3b82f6" },
          { time: "14:00", name: "Watanabe Ken", service: "Review", color: "#f59e0b" },
        ].map((apt, i) => (
          <div key={i} className="flex items-center gap-1.5 bg-white p-1 rounded border border-gray-100 shadow-sm">
            <div className="w-0.5 h-4 rounded-full" style={{ backgroundColor: apt.color }} />
            <div className="flex-1">
              <div className="font-medium text-[5px] text-gray-800">{apt.name}</div>
              <div className="text-[3.5px] text-gray-400">{apt.service}</div>
            </div>
            <div className="text-[4px] text-gray-500">{apt.time}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const BookingTablet = () => (
  <div className="w-full h-full bg-white flex flex-col text-[5px] font-sans p-2">
    <div className="flex justify-between items-center mb-2">
      <span className="font-bold text-[7px] text-emerald-600">BookFlow</span>
      <div className="px-1.5 py-0.5 bg-emerald-500 text-white rounded text-[4px]">+ New</div>
    </div>
    <div className="bg-gray-50 rounded p-1.5 mb-2">
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div key={i} className="text-center text-[4px] text-gray-400">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: 28 }, (_, i) => (
          <div key={i} className={`text-center py-0.5 rounded text-[4px] ${[3, 12, 18].includes(i) ? "bg-emerald-100 text-emerald-700" : i === 1 ? "bg-emerald-500 text-white" : "text-gray-600"}`}>
            {i + 1}
          </div>
        ))}
      </div>
    </div>
    <div className="space-y-1 flex-1">
      <div className="text-[5px] font-semibold text-gray-700">Today</div>
      {[
        { time: "09:00", name: "Tanaka Yuki", color: "#10b981" },
        { time: "11:30", name: "Suzuki Hana", color: "#3b82f6" },
        { time: "14:00", name: "Watanabe Ken", color: "#f59e0b" },
      ].map((apt, i) => (
        <div key={i} className="flex items-center gap-1 bg-gray-50 p-1 rounded">
          <div className="w-0.5 h-3 rounded-full" style={{ backgroundColor: apt.color }} />
          <span className="text-gray-700 font-medium">{apt.name}</span>
          <span className="ml-auto text-gray-400 text-[4px]">{apt.time}</span>
        </div>
      ))}
    </div>
  </div>
);

const BookingMobile = () => (
  <div className="w-full h-full bg-white flex flex-col text-[4px] font-sans p-1.5 pt-4">
    <div className="font-bold text-[6px] text-emerald-600 mb-1">BookFlow</div>
    <div className="text-[5px] font-semibold text-gray-800 mb-1">April 2</div>
    <div className="space-y-1 flex-1">
      {[
        { time: "09:00", name: "Tanaka", svc: "Consultation", color: "#10b981" },
        { time: "11:30", name: "Suzuki", svc: "Follow-up", color: "#3b82f6" },
        { time: "14:00", name: "Watanabe", svc: "Review", color: "#f59e0b" },
      ].map((apt, i) => (
        <div key={i} className="bg-gray-50 p-1 rounded flex items-center gap-1">
          <div className="w-0.5 h-3 rounded-full" style={{ backgroundColor: apt.color }} />
          <div>
            <div className="font-medium text-[4px] text-gray-800">{apt.name}</div>
            <div className="text-[3px] text-gray-400">{apt.svc}</div>
          </div>
          <span className="ml-auto text-[3.5px] text-gray-400">{apt.time}</span>
        </div>
      ))}
    </div>
  </div>
);

// =============================================
// Project 3: E-commerce Admin Dashboard
// =============================================
const EcommerceDesktop = () => (
  <div className="w-full h-full bg-[#fafafa] flex text-[6px] font-sans">
    <div className="w-[18%] bg-[#18181b] text-white p-2 flex flex-col gap-1.5">
      <div className="text-[7px] font-bold text-orange-400 mb-2">ShopAdmin</div>
      {["Products", "Orders", "Inventory", "Customers", "Analytics"].map((item, i) => (
        <div key={i} className={`px-1.5 py-1 rounded text-[5px] ${i === 0 ? "bg-orange-600" : ""}`}>{item}</div>
      ))}
    </div>
    <div className="flex-1 p-3 overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-[7px] text-gray-800">Products</span>
        <div className="px-1.5 py-0.5 bg-orange-500 text-white rounded text-[4px]">+ Add Product</div>
      </div>
      <div className="grid grid-cols-4 gap-1.5 mb-2">
        {[
          { label: "Products", value: "1,247", color: "#f97316" },
          { label: "Orders Today", value: "89", color: "#22c55e" },
          { label: "Low Stock", value: "12", color: "#ef4444" },
          { label: "Revenue", value: "¥890K", color: "#8b5cf6" },
        ].map((s, i) => (
          <div key={i} className="bg-white p-1.5 rounded shadow-sm border border-gray-100">
            <div className="text-[4px] text-gray-500">{s.label}</div>
            <div className="text-[8px] font-bold" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
      {/* Product table */}
      <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-5 gap-1 p-1 bg-gray-50 text-[4px] font-semibold text-gray-500">
          <span>Product</span><span>SKU</span><span>Stock</span><span>Price</span><span>Status</span>
        </div>
        {[
          { name: "Matcha Set", sku: "MT-001", stock: 45, price: "¥3,200", status: "Active" },
          { name: "Ceramic Bowl", sku: "CB-012", stock: 3, price: "¥1,800", status: "Low" },
          { name: "Tea Kettle", sku: "TK-034", stock: 67, price: "¥5,400", status: "Active" },
          { name: "Sake Cup Set", sku: "SC-008", stock: 0, price: "¥2,100", status: "Out" },
        ].map((p, i) => (
          <div key={i} className="grid grid-cols-5 gap-1 p-1 text-[4px] border-t border-gray-50">
            <span className="font-medium text-gray-800">{p.name}</span>
            <span className="text-gray-400 font-mono">{p.sku}</span>
            <span className={p.stock < 5 ? "text-red-500 font-bold" : "text-gray-600"}>{p.stock}</span>
            <span className="text-gray-700">{p.price}</span>
            <span className={`text-[3.5px] px-1 py-0.5 rounded-full text-center ${p.status === "Active" ? "bg-green-100 text-green-700" : p.status === "Low" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const EcommerceTablet = () => (
  <div className="w-full h-full bg-[#fafafa] flex flex-col text-[5px] font-sans p-2">
    <div className="flex justify-between items-center mb-2">
      <span className="font-bold text-[7px] text-orange-500">ShopAdmin</span>
      <div className="px-1.5 py-0.5 bg-orange-500 text-white rounded text-[4px]">+ Add</div>
    </div>
    <div className="grid grid-cols-2 gap-1 mb-2">
      {[
        { label: "Products", value: "1,247" },
        { label: "Orders", value: "89" },
      ].map((s, i) => (
        <div key={i} className="bg-white p-1.5 rounded shadow-sm">
          <div className="text-[4px] text-gray-500">{s.label}</div>
          <div className="text-[7px] font-bold text-gray-800">{s.value}</div>
        </div>
      ))}
    </div>
    <div className="bg-white rounded shadow-sm flex-1 overflow-hidden">
      {[
        { name: "Matcha Set", price: "¥3,200", stock: 45 },
        { name: "Ceramic Bowl", price: "¥1,800", stock: 3 },
        { name: "Tea Kettle", price: "¥5,400", stock: 67 },
      ].map((p, i) => (
        <div key={i} className="flex justify-between items-center p-1.5 border-b border-gray-50">
          <span className="font-medium text-gray-800">{p.name}</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">{p.price}</span>
            <span className={`text-[3.5px] px-1 py-0.5 rounded ${p.stock < 5 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>{p.stock}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EcommerceMobile = () => (
  <div className="w-full h-full bg-[#fafafa] flex flex-col text-[4px] font-sans p-1.5 pt-4">
    <div className="font-bold text-[6px] text-orange-500 mb-1">ShopAdmin</div>
    <div className="bg-white p-1.5 rounded shadow-sm mb-1">
      <div className="text-[3.5px] text-gray-500">Today's Orders</div>
      <div className="text-[7px] font-bold text-gray-800">89</div>
    </div>
    {[
      { name: "Matcha Set", price: "¥3,200" },
      { name: "Ceramic Bowl", price: "¥1,800" },
    ].map((p, i) => (
      <div key={i} className="bg-white p-1 rounded shadow-sm mb-0.5 flex justify-between">
        <span className="text-gray-800 font-medium">{p.name}</span>
        <span className="text-gray-500">{p.price}</span>
      </div>
    ))}
  </div>
);

// =============================================
// Project 4: Multilingual SaaS Platform
// =============================================
const SaaSDesktop = () => (
  <div className="w-full h-full bg-[#f0f4ff] flex text-[6px] font-sans">
    <div className="w-[18%] bg-[#1a1a2e] text-white p-2 flex flex-col gap-1.5">
      <div className="text-[7px] font-bold text-indigo-400 mb-2">LinguaHub</div>
      {["Dashboard", "Projects", "Translations", "Team", "Billing"].map((item, i) => (
        <div key={i} className={`px-1.5 py-1 rounded text-[5px] ${i === 0 ? "bg-indigo-600" : ""}`}>{item}</div>
      ))}
    </div>
    <div className="flex-1 p-3 overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="font-semibold text-[7px] text-gray-800">Dashboard</span>
          <div className="flex gap-1 mt-0.5">
            {["EN", "JP", "KR", "ZH"].map((lang, i) => (
              <span key={i} className={`px-1 py-0.5 rounded text-[3.5px] ${i === 0 ? "bg-indigo-500 text-white" : "bg-white text-gray-500 border border-gray-200"}`}>{lang}</span>
            ))}
          </div>
        </div>
        <div className="px-1.5 py-0.5 bg-indigo-500 text-white rounded text-[4px]">New Project</div>
      </div>
      <div className="grid grid-cols-3 gap-1.5 mb-2">
        {[
          { label: "Languages", value: "12", icon: "🌐" },
          { label: "Projects", value: "8", icon: "📁" },
          { label: "Completion", value: "87%", icon: "✅" },
        ].map((s, i) => (
          <div key={i} className="bg-white p-2 rounded shadow-sm border border-gray-100 flex items-center gap-2">
            <span className="text-[10px]">{s.icon}</span>
            <div>
              <div className="text-[4px] text-gray-500">{s.label}</div>
              <div className="text-[8px] font-bold text-gray-800">{s.value}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Translation progress */}
      <div className="bg-white p-2 rounded shadow-sm border border-gray-100 mb-1.5">
        <div className="text-[5px] font-semibold text-gray-700 mb-1.5">Translation Progress</div>
        {[
          { lang: "Japanese (日本語)", pct: 92, color: "#6366f1" },
          { lang: "Korean (한국어)", pct: 78, color: "#8b5cf6" },
          { lang: "Chinese (中文)", pct: 65, color: "#a855f7" },
          { lang: "French (Français)", pct: 45, color: "#c084fc" },
        ].map((l, i) => (
          <div key={i} className="flex items-center gap-2 mb-1">
            <span className="text-[4px] text-gray-600 w-[30%]">{l.lang}</span>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: l.color }}
                initial={{ width: 0 }}
                animate={{ width: `${l.pct}%` }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
              />
            </div>
            <span className="text-[4px] text-gray-500 w-[8%]">{l.pct}%</span>
          </div>
        ))}
      </div>
      <div className="bg-white p-2 rounded shadow-sm border border-gray-100">
        <div className="text-[5px] font-semibold text-gray-700 mb-1">Recent Activity</div>
        <div className="h-10"><MiniChart color="#6366f1" data={[40, 65, 50, 80, 70, 90, 85]} /></div>
      </div>
    </div>
  </div>
);

const SaaSTablet = () => (
  <div className="w-full h-full bg-[#f0f4ff] flex flex-col text-[5px] font-sans p-2">
    <div className="flex justify-between items-center mb-2">
      <span className="font-bold text-[7px] text-indigo-600">LinguaHub</span>
      <div className="flex gap-0.5">
        {["EN", "JP", "KR"].map((l, i) => (
          <span key={i} className={`px-1 py-0.5 rounded text-[3.5px] ${i === 0 ? "bg-indigo-500 text-white" : "bg-white text-gray-500"}`}>{l}</span>
        ))}
      </div>
    </div>
    <div className="bg-white p-2 rounded shadow-sm mb-2">
      <div className="text-[5px] font-semibold text-gray-700 mb-1">Progress</div>
      {[
        { lang: "日本語", pct: 92, color: "#6366f1" },
        { lang: "한국어", pct: 78, color: "#8b5cf6" },
        { lang: "中文", pct: 65, color: "#a855f7" },
      ].map((l, i) => (
        <div key={i} className="flex items-center gap-1 mb-1">
          <span className="text-[4px] text-gray-600 w-[20%]">{l.lang}</span>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ backgroundColor: l.color, width: `${l.pct}%` }} />
          </div>
          <span className="text-[4px] text-gray-500">{l.pct}%</span>
        </div>
      ))}
    </div>
    <div className="bg-white p-2 rounded shadow-sm flex-1">
      <div className="text-[5px] font-semibold text-gray-700 mb-1">Activity</div>
      <div className="h-16"><MiniChart color="#6366f1" data={[40, 65, 50, 80, 70, 90]} /></div>
    </div>
  </div>
);

const SaaSMobile = () => (
  <div className="w-full h-full bg-[#f0f4ff] flex flex-col text-[4px] font-sans p-1.5 pt-4">
    <div className="font-bold text-[6px] text-indigo-600 mb-1.5">LinguaHub</div>
    <div className="bg-white p-1.5 rounded shadow-sm mb-1">
      <div className="text-[3.5px] text-gray-500">Completion</div>
      <div className="text-[7px] font-bold text-indigo-600">87%</div>
    </div>
    {[
      { lang: "JP", pct: 92, color: "#6366f1" },
      { lang: "KR", pct: 78, color: "#8b5cf6" },
    ].map((l, i) => (
      <div key={i} className="bg-white p-1 rounded shadow-sm mb-0.5 flex items-center gap-1">
        <span className="text-gray-600 font-medium">{l.lang}</span>
        <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ backgroundColor: l.color, width: `${l.pct}%` }} />
        </div>
      </div>
    ))}
  </div>
);

// =============================================
// Project 5: System Monitoring & Log Dashboard
// =============================================
const MonitoringDesktop = () => (
  <div className="w-full h-full bg-[#0a0a0a] flex text-[6px] font-sans">
    <div className="w-[16%] bg-[#111] border-r border-gray-800 p-2 flex flex-col gap-1.5">
      <div className="text-[7px] font-bold text-cyan-400 mb-2">SysWatch</div>
      {["Overview", "Servers", "Logs", "Alerts", "Config"].map((item, i) => (
        <div key={i} className={`px-1.5 py-1 rounded text-[5px] text-gray-400 ${i === 0 ? "bg-cyan-900/40 text-cyan-300" : ""}`}>{item}</div>
      ))}
    </div>
    <div className="flex-1 p-3 overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-[7px] text-white">System Overview</span>
        <div className="flex items-center gap-1">
          <StatusDot status="green" />
          <span className="text-[4px] text-green-400">All Systems Operational</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1.5 mb-2">
        {[
          { label: "CPU", value: "42%", color: "#22d3ee" },
          { label: "Memory", value: "67%", color: "#a78bfa" },
          { label: "Disk", value: "38%", color: "#34d399" },
          { label: "Network", value: "2.4Gbps", color: "#fbbf24" },
        ].map((s, i) => (
          <div key={i} className="bg-[#111] p-1.5 rounded border border-gray-800">
            <div className="text-[4px] text-gray-500">{s.label}</div>
            <div className="text-[8px] font-bold font-mono" style={{ color: s.color }}>{s.value}</div>
            <div className="h-6 mt-0.5"><MiniChart color={s.color} data={[30 + Math.random() * 40, 40 + Math.random() * 30, 35 + Math.random() * 35, 50 + Math.random() * 30, 45 + Math.random() * 25, 55 + Math.random() * 20, 40 + Math.random() * 40]} /></div>
          </div>
        ))}
      </div>
      {/* Logs */}
      <div className="bg-[#111] rounded border border-gray-800 p-1.5">
        <div className="text-[5px] font-semibold text-gray-400 mb-1">Live Logs</div>
        <div className="font-mono space-y-0.5">
          {[
            { time: "18:42:01", level: "INFO", msg: "Request processed in 45ms", color: "#22d3ee" },
            { time: "18:42:03", level: "WARN", msg: "High memory usage on node-3", color: "#fbbf24" },
            { time: "18:42:05", level: "INFO", msg: "Cache hit ratio: 94.2%", color: "#22d3ee" },
            { time: "18:42:08", level: "ERROR", msg: "Connection timeout to db-replica-2", color: "#ef4444" },
          ].map((log, i) => (
            <div key={i} className="flex gap-1 text-[4px]">
              <span className="text-gray-600">{log.time}</span>
              <span style={{ color: log.color }} className="font-bold">[{log.level}]</span>
              <span className="text-gray-400">{log.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MonitoringTablet = () => (
  <div className="w-full h-full bg-[#0a0a0a] flex flex-col text-[5px] font-sans p-2">
    <div className="flex justify-between items-center mb-2">
      <span className="font-bold text-[7px] text-cyan-400">SysWatch</span>
      <div className="flex items-center gap-0.5">
        <StatusDot status="green" />
        <span className="text-[3.5px] text-green-400">Online</span>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-1 mb-2">
      {[
        { label: "CPU", value: "42%", color: "#22d3ee" },
        { label: "Memory", value: "67%", color: "#a78bfa" },
      ].map((s, i) => (
        <div key={i} className="bg-[#111] p-1.5 rounded border border-gray-800">
          <div className="text-[4px] text-gray-500">{s.label}</div>
          <div className="text-[7px] font-bold font-mono" style={{ color: s.color }}>{s.value}</div>
          <div className="h-8 mt-0.5"><MiniChart color={s.color} /></div>
        </div>
      ))}
    </div>
    <div className="bg-[#111] rounded border border-gray-800 p-1.5 flex-1">
      <div className="text-[4px] font-semibold text-gray-400 mb-1">Logs</div>
      <div className="font-mono space-y-0.5">
        {[
          { level: "INFO", msg: "Processed 45ms", color: "#22d3ee" },
          { level: "WARN", msg: "High memory", color: "#fbbf24" },
          { level: "ERROR", msg: "Timeout db-2", color: "#ef4444" },
        ].map((l, i) => (
          <div key={i} className="flex gap-0.5 text-[3.5px]">
            <span style={{ color: l.color }} className="font-bold">[{l.level}]</span>
            <span className="text-gray-400">{l.msg}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MonitoringMobile = () => (
  <div className="w-full h-full bg-[#0a0a0a] flex flex-col text-[4px] font-sans p-1.5 pt-4">
    <div className="flex items-center gap-1 mb-1.5">
      <span className="font-bold text-[6px] text-cyan-400">SysWatch</span>
      <StatusDot status="green" />
    </div>
    <div className="bg-[#111] p-1.5 rounded border border-gray-800 mb-1">
      <div className="text-[3.5px] text-gray-500">CPU Usage</div>
      <div className="text-[7px] font-bold font-mono text-cyan-400">42%</div>
      <div className="h-8"><MiniChart color="#22d3ee" /></div>
    </div>
    <div className="bg-[#111] p-1 rounded border border-gray-800 font-mono">
      {[
        { level: "INFO", msg: "OK", color: "#22d3ee" },
        { level: "WARN", msg: "Mem high", color: "#fbbf24" },
      ].map((l, i) => (
        <div key={i} className="flex gap-0.5 text-[3px] py-0.5">
          <span style={{ color: l.color }}>[{l.level}]</span>
          <span className="text-gray-500">{l.msg}</span>
        </div>
      ))}
    </div>
  </div>
);

// =============================================
// Project 6: Rirekisho Builder
// =============================================
const ResumeDesktop = () => (
  <div className="w-full h-full bg-[#f5f0eb] flex text-[6px] font-sans">
    <div className="w-[18%] bg-[#2d1b0e] text-white p-2 flex flex-col gap-1.5">
      <div className="text-[7px] font-bold text-amber-400 mb-2">履歴書</div>
      {["Editor", "Templates", "Preview", "Export", "Settings"].map((item, i) => (
        <div key={i} className={`px-1.5 py-1 rounded text-[5px] ${i === 0 ? "bg-amber-700" : ""}`}>{item}</div>
      ))}
    </div>
    <div className="flex-1 p-3 overflow-hidden flex gap-2">
      {/* Form */}
      <div className="flex-1 space-y-1.5">
        <div className="text-[7px] font-semibold text-gray-800">Basic Information</div>
        {[
          { label: "氏名 (Name)", value: "田中 太郎" },
          { label: "フリガナ", value: "タナカ タロウ" },
          { label: "生年月日", value: "1995年03月15日" },
          { label: "住所", value: "東京都渋谷区..." },
          { label: "電話番号", value: "090-1234-5678" },
          { label: "メール", value: "tanaka@email.com" },
        ].map((f, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            <span className="text-[4px] text-gray-500">{f.label}</span>
            <div className="bg-white px-1.5 py-1 rounded border border-gray-200 text-[5px] text-gray-800">{f.value}</div>
          </div>
        ))}
      </div>
      {/* Preview */}
      <div className="w-[45%] bg-white p-2 rounded shadow-sm border border-gray-200">
        <div className="text-center mb-2">
          <div className="text-[8px] font-bold text-gray-800 tracking-widest">履 歴 書</div>
          <div className="w-8 h-0.5 bg-gray-300 mx-auto mt-0.5" />
        </div>
        <div className="border border-gray-200 p-1">
          <div className="grid grid-cols-2 gap-0.5 text-[3.5px]">
            <div className="border-b border-gray-100 py-0.5">
              <span className="text-gray-400">氏名</span>
              <div className="font-bold text-gray-800">田中 太郎</div>
            </div>
            <div className="border-b border-gray-100 py-0.5">
              <span className="text-gray-400">生年月日</span>
              <div className="text-gray-800">1995/03/15</div>
            </div>
          </div>
        </div>
        <div className="mt-1 flex justify-end gap-0.5">
          <div className="px-1 py-0.5 bg-amber-500 text-white rounded text-[3.5px]">PDF</div>
          <div className="px-1 py-0.5 bg-gray-200 text-gray-600 rounded text-[3.5px]">Print</div>
        </div>
      </div>
    </div>
  </div>
);

const ResumeTablet = () => (
  <div className="w-full h-full bg-[#f5f0eb] flex flex-col text-[5px] font-sans p-2">
    <div className="flex justify-between items-center mb-2">
      <span className="font-bold text-[7px] text-amber-700">履歴書 Builder</span>
      <div className="px-1.5 py-0.5 bg-amber-500 text-white rounded text-[4px]">Preview</div>
    </div>
    <div className="space-y-1 flex-1">
      {[
        { label: "氏名", value: "田中 太郎" },
        { label: "フリガナ", value: "タナカ タロウ" },
        { label: "生年月日", value: "1995年03月15日" },
        { label: "住所", value: "東京都渋谷区..." },
      ].map((f, i) => (
        <div key={i}>
          <span className="text-[4px] text-gray-500">{f.label}</span>
          <div className="bg-white px-1.5 py-1 rounded border border-gray-200 text-[5px] text-gray-800">{f.value}</div>
        </div>
      ))}
    </div>
    <div className="flex gap-1 mt-1">
      <div className="flex-1 py-1 bg-amber-500 text-white rounded text-center text-[4px]">Export PDF</div>
      <div className="flex-1 py-1 bg-gray-200 text-gray-600 rounded text-center text-[4px]">Print</div>
    </div>
  </div>
);

const ResumeMobile = () => (
  <div className="w-full h-full bg-[#f5f0eb] flex flex-col text-[4px] font-sans p-1.5 pt-4">
    <div className="font-bold text-[6px] text-amber-700 mb-1.5">履歴書</div>
    {[
      { label: "氏名", value: "田中 太郎" },
      { label: "フリガナ", value: "タナカ タロウ" },
      { label: "生年月日", value: "1995/03/15" },
    ].map((f, i) => (
      <div key={i} className="mb-1">
        <span className="text-[3px] text-gray-500">{f.label}</span>
        <div className="bg-white px-1 py-0.5 rounded border border-gray-200 text-[4px] text-gray-800">{f.value}</div>
      </div>
    ))}
    <div className="mt-auto py-1 bg-amber-500 text-white rounded text-center text-[4px]">Export</div>
  </div>
);

// =============================================
// Main export: get screens by project slug
// =============================================
type DeviceType = "macbook" | "ipad" | "iphone";

const screenMap: Record<string, Record<DeviceType, React.FC>> = {
  "teamhub": { macbook: DashboardDesktop, ipad: DashboardTablet, iphone: DashboardMobile },
  "bookflow": { macbook: BookingDesktop, ipad: BookingTablet, iphone: BookingMobile },
  "rakuten": { macbook: EcommerceDesktop, ipad: EcommerceTablet, iphone: EcommerceMobile },
  "kaizen": { macbook: SaaSDesktop, ipad: SaaSTablet, iphone: SaaSMobile },
  "sysmonitor": { macbook: MonitoringDesktop, ipad: MonitoringTablet, iphone: MonitoringMobile },
  "lynt": { macbook: ResumeDesktop, ipad: ResumeTablet, iphone: ResumeMobile },
};

export const getSimulatedScreen = (projectSlug: string, device: DeviceType): React.FC | null => {
  return screenMap[projectSlug]?.[device] || null;
};

export default screenMap;
