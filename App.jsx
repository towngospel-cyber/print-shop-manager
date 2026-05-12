import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Clock, Settings, Download, DollarSign, TrendingDown, LogOut, BarChart3, User, Upload, Printer, CheckCircle, AlertCircle, Bell, X } from 'lucide-react';

const PrintingPressSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [accounts] = useState([
    { id: 1, email: 'admin@printshop.com', password: 'admin123', name: 'Admin User' },
    { id: 2, email: 'user@printshop.com', password: 'user123', name: 'Standard User' },
  ]);

  // Historical Data
  const historicalSales = [
    { date: '2026-05-11', amount: 1350 },
    { date: '2026-05-09', amount: 2000 },
    { date: '2026-05-08', amount: 1950 },
    { date: '2026-05-07', amount: 2460 },
    { date: '2026-05-06', amount: 700 },
    { date: '2026-05-05', amount: 1450 },
    { date: '2026-05-04', amount: 1930 },
    { date: '2026-05-02', amount: 1000 },
    { date: '2026-05-01', amount: 2360 },
    { date: '2026-04-30', amount: 2462 },
    { date: '2026-04-29', amount: 820 },
    { date: '2026-04-28', amount: 1000 },
    { date: '2026-04-27', amount: 1000 },
    { date: '2026-04-26', amount: 800 },
    { date: '2026-04-25', amount: 600 },
    { date: '2026-04-24', amount: 1600 },
    { date: '2026-04-23', amount: 2690 },
    { date: '2026-04-22', amount: 1400 },
    { date: '2026-04-21', amount: 900 },
    { date: '2026-04-20', amount: 1150 },
    { date: '2026-04-18', amount: 1300 },
    { date: '2026-04-17', amount: 800 },
    { date: '2026-04-16', amount: 400 },
    { date: '2026-04-14', amount: 400 },
    { date: '2026-04-13', amount: 700 },
    { date: '2026-04-11', amount: 800 },
    { date: '2026-04-10', amount: 300 },
    { date: '2026-04-09', amount: 900 },
    { date: '2026-04-08', amount: 450 },
    { date: '2026-04-07', amount: 900 },
    { date: '2026-04-06', amount: 200 },
    { date: '2026-04-04', amount: 650 },
    { date: '2026-04-03', amount: 450 },
    { date: '2026-04-02', amount: 650 },
    { date: '2026-04-01', amount: 4550 },
  ];

  const historicalExpenses = [
    { date: '2026-05-11', category: 'Other', description: 'tshirt', amount: 600 },
    { date: '2026-05-09', category: 'Other', description: 'Other', amount: 950 },
    { date: '2026-05-08', category: 'Paper', description: 'bought tshirt', amount: 1300 },
    { date: '2026-05-02', category: 'Other', description: 'T-shirt for funeral', amount: 850 },
    { date: '2026-05-02', category: 'Other', description: 'Flexy', amount: 650 },
    { date: '2026-05-02', category: 'Other', description: 'Stickers 4ft', amount: 620 },
    { date: '2026-05-01', category: 'Salaries', description: 'Salary payment', amount: 700 },
    { date: '2026-04-26', category: 'Other', description: 'bought chairs', amount: 1500 },
    { date: '2026-04-25', category: 'Ink & Toner', description: '80a catridge', amount: 260 },
    { date: '2026-04-25', category: 'Other', description: 'picture frame and ring', amount: 795 },
    { date: '2026-04-25', category: 'Paper', description: 'passport paper and ink', amount: 280 },
  ];

  const [sales, setSales] = useState(historicalSales.map((s, i) => ({ id: i, ...s })));
  const [expenses, setExpenses] = useState(historicalExpenses.map((e, i) => ({ id: i, ...e })));
  const [todos, setTodos] = useState([
    { id: 1, text: 'Refill ink cartridges', completed: false, priority: 'high' },
    { id: 2, text: 'Check Press A efficiency', completed: true, priority: 'medium' },
    { id: 3, text: 'Order paper stock', completed: false, priority: 'high' },
    { id: 4, text: 'Call customer about order', completed: false, priority: 'medium' },
  ]);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning', message: 'Low ink level detected', read: false },
    { id: 2, type: 'success', message: 'Payment received from TechStart Inc', read: true },
    { id: 3, type: 'info', message: 'Maintenance due for Press B', read: false },
  ]);
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [todoInput, setTodoInput] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [jobs] = useState([
    { id: 1, name: 'Business Cards', client: 'TechStart Inc', quantity: 5000, status: 'In Progress', progress: 65, deadline: '2025-05-20', press: 'Press A', price: 250 },
  ]);

  const [showSalesForm, setShowSalesForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [salesFormData, setSalesFormData] = useState({ date: '', amount: '' });
  const [expenseFormData, setExpenseFormData] = useState({ date: '', category: 'Materials', description: '', amount: '' });

  const handleLogin = () => {
    const user = accounts.find(a => a.email === loginData.email && a.password === loginData.password);
    if (user) {
      setCurrentUser(user);
      setLoginData({ email: '', password: '' });
      setShowLoginForm(false);
      // Add welcome notification
      setNotifications([{ id: Date.now(), type: 'success', message: `Welcome back, ${user.name}!`, read: false }, ...notifications]);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowLoginForm(true);
  };

  const getCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  };

  const getMonthlyStats = () => {
    const currentMonth = getCurrentMonth();
    const monthSales = sales.filter(s => s.date.startsWith(currentMonth));
    const monthExpenses = expenses.filter(e => e.date.startsWith(currentMonth));
    
    return {
      monthlySales: monthSales.reduce((sum, s) => sum + s.amount, 0),
      monthlyExpenses: monthExpenses.reduce((sum, e) => sum + e.amount, 0),
      totalSales: sales.reduce((sum, s) => sum + s.amount, 0),
      totalExpenses: expenses.reduce((sum, e) => sum + e.amount, 0),
    };
  };

  const addTodo = () => {
    if (todoInput.trim()) {
      setTodos([...todos, { id: Date.now(), text: todoInput, completed: false, priority: 'medium' }]);
      setTodoInput('');
      setShowTodoForm(false);
      setNotifications([{ id: Date.now(), type: 'success', message: 'Task added successfully', read: false }, ...notifications]);
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const addSale = () => {
    if (salesFormData.date && salesFormData.amount) {
      setSales([...sales, { id: Date.now(), date: salesFormData.date, amount: parseFloat(salesFormData.amount) }]);
      setSalesFormData({ date: '', amount: '' });
      setShowSalesForm(false);
      setNotifications([{ id: Date.now(), type: 'success', message: `Sale of GH₵${salesFormData.amount} recorded`, read: false }, ...notifications]);
    }
  };

  const addExpense = () => {
    if (expenseFormData.date && expenseFormData.amount && expenseFormData.description) {
      setExpenses([...expenses, { id: Date.now(), date: expenseFormData.date, category: expenseFormData.category, description: expenseFormData.description, amount: parseFloat(expenseFormData.amount) }]);
      setExpenseFormData({ date: '', category: 'Materials', description: '', amount: '' });
      setShowExpenseForm(false);
      setNotifications([{ id: Date.now(), type: 'info', message: `Expense of GH₵${expenseFormData.amount} recorded`, read: false }, ...notifications]);
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handlePrint = () => {
    const stats = getMonthlyStats();
    const printContent = `
      PRINT SHOP MANAGER - FINANCIAL REPORT
      ${new Date().toLocaleDateString()}
      =====================================
      
      MONTHLY STATISTICS (${getCurrentMonth()})
      ------------------------------------
      Monthly Income (Sales):        GH₵${stats.monthlySales.toLocaleString()}
      Monthly Expenses:              GH₵${stats.monthlyExpenses.toLocaleString()}
      Monthly Profit:                GH₵${(stats.monthlySales - stats.monthlyExpenses).toLocaleString()}
      
      ALL TIME STATISTICS
      -------------------
      Total Income:                  GH₵${stats.totalSales.toLocaleString()}
      Total Expenses:                GH₵${stats.totalExpenses.toLocaleString()}
      Total Profit:                  GH₵${(stats.totalSales - stats.totalExpenses).toLocaleString()}
      
      TASKS SUMMARY
      ---------------
      Total Tasks:                   ${todos.length}
      Completed Tasks:               ${todos.filter(t => t.completed).length}
      Pending Tasks:                 ${todos.filter(t => !t.completed).length}
      
      Generated by Print Shop Manager
    `;
    
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<pre>' + printContent + '</pre>');
    printWindow.document.close();
    printWindow.print();
  };

  const exportData = () => {
    const stats = getMonthlyStats();
    const dataToExport = {
      exportDate: new Date().toISOString(),
      user: currentUser.name,
      monthlyStats: {
        monthlySales: stats.monthlySales,
        monthlyExpenses: stats.monthlyExpenses,
        monthlyProfit: stats.monthlySales - stats.monthlyExpenses,
      },
      allTimeStats: {
        totalSales: stats.totalSales,
        totalExpenses: stats.totalExpenses,
        netProfit: stats.totalSales - stats.totalExpenses,
      },
      sales,
      expenses,
      todos,
    };

    const jsonString = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `print_shop_data_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const stats = getMonthlyStats();

  const getDashboard = () => (
    <div className="space-y-6">
      <div className="import-banner">
        <BarChart3 size={20} />
        <div>
          <h3>Monthly Performance Summary</h3>
          <p>Current month: {getCurrentMonth()}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Monthly Income', value: `GH₵${stats.monthlySales.toLocaleString()}`, color: 'green', icon: '📈' },
          { label: 'Monthly Expenses', value: `GH₵${stats.monthlyExpenses.toLocaleString()}`, color: 'red', icon: '📉' },
          { label: 'Monthly Profit', value: `GH₵${(stats.monthlySales - stats.monthlyExpenses).toLocaleString()}`, color: 'blue', icon: '💰' },
          { label: 'Pending Tasks', value: todos.filter(t => !t.completed).length, color: 'purple', icon: '✓' },
        ].map((stat, i) => (
          <div key={i} className={`stat-card color-${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="quick-actions">
            <button onClick={handlePrint} className="action-btn">
              <Printer size={18} /> Print Report
            </button>
            <button onClick={exportData} className="action-btn">
              <Download size={18} /> Export Data
            </button>
            <button onClick={() => setShowTodoForm(true)} className="action-btn">
              <Plus size={18} /> Add Task
            </button>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Pending Tasks</h2>
          <div className="todo-preview">
            {todos.filter(t => !t.completed).slice(0, 3).map(todo => (
              <div key={todo.id} className={`todo-item priority-${todo.priority}`}>
                <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                <span>{todo.text}</span>
              </div>
            ))}
            {todos.filter(t => !t.completed).length === 0 && <p className="empty">All tasks completed! 🎉</p>}
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Recent Alerts</h2>
          <div className="alerts-preview">
            {notifications.filter(n => !n.read).slice(0, 3).map(notif => (
              <div key={notif.id} className={`alert-item type-${notif.type}`}>
                {notif.type === 'warning' && <AlertCircle size={16} />}
                {notif.type === 'success' && <CheckCircle size={16} />}
                {notif.type === 'info' && <Bell size={16} />}
                <span>{notif.message}</span>
              </div>
            ))}
            {notifications.filter(n => !n.read).length === 0 && <p className="empty">No new alerts</p>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="section">
          <h2 className="section-title">Monthly Trend</h2>
          <div className="chart-placeholder">
            <div className="trend-bars">
              <div className="trend-bar income" style={{ height: `${Math.min((stats.monthlySales / 50000) * 100, 100)}%` }}>
                <label>Income</label>
              </div>
              <div className="trend-bar expense" style={{ height: `${Math.min((stats.monthlyExpenses / 50000) * 100, 100)}%` }}>
                <label>Expenses</label>
              </div>
            </div>
            <div className="chart-legend">
              <span>GH₵ {stats.monthlySales.toLocaleString()} vs GH₵ {stats.monthlyExpenses.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Expense Categories</h2>
          <div className="category-list">
            {expenses.reduce((acc, e) => {
              const existing = acc.find(x => x.category === e.category);
              if (existing) existing.total += e.amount;
              else acc.push({ category: e.category, total: e.amount });
              return acc;
            }, []).slice(0, 4).map(cat => (
              <div key={cat.category} className="category-item">
                <span>{cat.category}</span>
                <span className="amount">GH₵{cat.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const getSalesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="section-title">Sales Records ({sales.length})</h2>
        <button onClick={() => setShowSalesForm(!showSalesForm)} className="btn btn-primary">
          <Plus size={18} /> Record Sale
        </button>
      </div>

      {showSalesForm && (
        <div className="form-container">
          <h3>Record New Sale</h3>
          <div className="form-grid">
            <input type="date" value={salesFormData.date} onChange={e => setSalesFormData({ ...salesFormData, date: e.target.value })} className="form-input" />
            <input type="number" placeholder="Amount (GH₵)" value={salesFormData.amount} onChange={e => setSalesFormData({ ...salesFormData, amount: e.target.value })} className="form-input" />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={addSale} className="btn btn-primary">Record Sale</button>
            <button onClick={() => setShowSalesForm(false)} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <div className="records-table">
        <div className="table-header">
          <div>Date</div>
          <div>Amount</div>
          <div>Action</div>
        </div>
        {[...sales].sort((a, b) => new Date(b.date) - new Date(a.date)).map(sale => (
          <div key={sale.id} className="table-row">
            <div>{new Date(sale.date).toLocaleDateString()}</div>
            <div className="amount-positive">GH₵{sale.amount.toLocaleString()}</div>
            <div>
              <button onClick={() => setSales(sales.filter(s => s.id !== sale.id))} className="btn btn-small btn-danger">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const getExpensesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="section-title">Expenses ({expenses.length})</h2>
        <button onClick={() => setShowExpenseForm(!showExpenseForm)} className="btn btn-primary">
          <Plus size={18} /> Add Expense
        </button>
      </div>

      {showExpenseForm && (
        <div className="form-container">
          <h3>Record New Expense</h3>
          <div className="form-grid">
            <input type="date" value={expenseFormData.date} onChange={e => setExpenseFormData({ ...expenseFormData, date: e.target.value })} className="form-input" />
            <select value={expenseFormData.category} onChange={e => setExpenseFormData({ ...expenseFormData, category: e.target.value })} className="form-input">
              <option value="Paper">Paper</option>
              <option value="Ink & Toner">Ink & Toner</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Salaries">Salaries</option>
              <option value="Utilities">Utilities</option>
              <option value="Other">Other</option>
            </select>
            <input type="text" placeholder="Description" value={expenseFormData.description} onChange={e => setExpenseFormData({ ...expenseFormData, description: e.target.value })} className="form-input" />
            <input type="number" placeholder="Amount (GH₵)" value={expenseFormData.amount} onChange={e => setExpenseFormData({ ...expenseFormData, amount: e.target.value })} className="form-input" />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={addExpense} className="btn btn-primary">Record Expense</button>
            <button onClick={() => setShowExpenseForm(false)} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <div className="records-table">
        <div className="table-header">
          <div>Date</div>
          <div>Category</div>
          <div>Description</div>
          <div>Amount</div>
          <div>Action</div>
        </div>
        {[...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).map(expense => (
          <div key={expense.id} className="table-row">
            <div>{new Date(expense.date).toLocaleDateString()}</div>
            <div><span className="badge">{expense.category}</span></div>
            <div>{expense.description}</div>
            <div className="amount-negative">GH₵{expense.amount.toLocaleString()}</div>
            <div>
              <button onClick={() => setExpenses(expenses.filter(e => e.id !== expense.id))} className="btn btn-small btn-danger">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const getTodosTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="section-title">Tasks & Todos</h2>
        <button onClick={() => setShowTodoForm(!showTodoForm)} className="btn btn-primary">
          <Plus size={18} /> Add Task
        </button>
      </div>

      {showTodoForm && (
        <div className="form-container">
          <h3>Create New Task</h3>
          <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
            <input 
              type="text" 
              placeholder="Task description..." 
              value={todoInput} 
              onChange={e => setTodoInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && addTodo()}
              className="form-input" 
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={addTodo} className="btn btn-primary">Add Task</button>
            <button onClick={() => setShowTodoForm(false)} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <div className="todos-container">
        <div className="todos-section">
          <h3 className="section-subtitle">Pending Tasks ({todos.filter(t => !t.completed).length})</h3>
          {todos.filter(t => !t.completed).map(todo => (
            <div key={todo.id} className={`todo-card priority-${todo.priority}`}>
              <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
              <span className="todo-text">{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)} className="btn btn-small btn-danger">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="todos-section">
          <h3 className="section-subtitle">Completed Tasks ({todos.filter(t => t.completed).length})</h3>
          {todos.filter(t => t.completed).map(todo => (
            <div key={todo.id} className="todo-card completed">
              <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
              <span className="todo-text">{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)} className="btn btn-small btn-danger">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (showLoginForm) {
    return (
      <div className="login-container">
        <style>{cssStyles}</style>
        <div className="login-card">
          <h1>🖨️ Print Shop Manager</h1>
          <p className="login-subtitle">Financial Management System</p>
          
          <div className="login-form">
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={e => setLoginData({ ...loginData, email: e.target.value })}
              className="form-input"
              onKeyPress={e => e.key === 'Enter' && handleLogin()}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={e => setLoginData({ ...loginData, password: e.target.value })}
              className="form-input"
              onKeyPress={e => e.key === 'Enter' && handleLogin()}
            />
            <button onClick={handleLogin} className="btn btn-primary" style={{ width: '100%' }}>
              Sign In
            </button>
          </div>

          <div className="login-demo">
            <p className="demo-title">Demo Accounts:</p>
            <button onClick={() => { setLoginData({ email: 'admin@printshop.com', password: 'admin123' }); }} className="demo-btn">Admin</button>
            <button onClick={() => { setLoginData({ email: 'user@printshop.com', password: 'user123' }); }} className="demo-btn">User</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <style>{cssStyles}</style>

      <header className="header">
        <div className="header-left">
          <h1>🖨️ PRINT SHOP MANAGER</h1>
          <p className="subtitle">Financial Management & Task Tracking</p>
        </div>
        <div className="header-right">
          <div className="notification-bell">
            <button onClick={() => setShowNotifications(!showNotifications)} className="bell-btn">
              <Bell size={20} />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="notification-badge">{notifications.filter(n => !n.read).length}</span>
              )}
            </button>

            {showNotifications && (
              <div className="notification-panel">
                <h3>Notifications</h3>
                {notifications.length === 0 ? (
                  <p className="empty">No notifications</p>
                ) : (
                  <>
                    {notifications.map(notif => (
                      <div key={notif.id} className={`notification-item type-${notif.type} ${notif.read ? 'read' : ''}`}>
                        <div className="notif-content">
                          <p>{notif.message}</p>
                        </div>
                        <button onClick={() => deleteNotification(notif.id)} className="close-btn">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {notifications.length > 0 && (
                      <button onClick={() => setNotifications([])} className="btn btn-small btn-secondary" style={{ width: '100%', marginTop: '10px' }}>
                        Clear All
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="user-info">
            <User size={18} />
            <span>{currentUser?.name}</span>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      <div className="nav-tabs">
        {['dashboard', 'sales', 'expenses', 'todos'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="content">
        {activeTab === 'dashboard' && getDashboard()}
        {activeTab === 'sales' && getSalesTab()}
        {activeTab === 'expenses' && getExpensesTab()}
        {activeTab === 'todos' && getTodosTab()}
      </div>
    </div>
  );
};

const cssStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body { 
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background: #f5f5f5; 
    color: #333; 
  }
  
  .app-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
    padding: 0;
  }

  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .login-card {
    background: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    width: 100%;
    max-width: 400px;
  }

  .login-card h1 {
    font-size: 32px;
    margin-bottom: 8px;
    color: #333;
  }

  .login-subtitle {
    color: #999;
    font-size: 14px;
    margin-bottom: 30px;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 30px;
  }

  .login-demo {
    text-align: center;
    border-top: 1px solid #eee;
    padding-top: 20px;
  }

  .demo-title {
    font-size: 12px;
    color: #999;
    text-transform: uppercase;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .demo-btn {
    background: #f0f0f0;
    border: 1px solid #ddd;
    padding: 8px 16px;
    margin: 0 4px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
    transition: all 0.2s;
  }

  .demo-btn:hover {
    background: #667eea;
    color: white;
    border-color: #667eea;
  }

  .header {
    background: white;
    border-bottom: 2px solid #667eea;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-left h1 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 4px;
  }

  .header .subtitle {
    font-size: 12px;
    color: #999;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .notification-bell {
    position: relative;
  }

  .bell-btn {
    background: #f0f0f0;
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    position: relative;
  }

  .bell-btn:hover {
    background: #667eea;
    color: white;
    border-color: #667eea;
  }

  .notification-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ef4444;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: bold;
  }

  .notification-panel {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    width: 320px;
    max-height: 400px;
    overflow-y: auto;
    padding: 15px;
    margin-top: 10px;
    z-index: 1000;
  }

  .notification-panel h3 {
    margin-bottom: 12px;
    font-size: 14px;
  }

  .notification-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 12px;
    background: #f9f9f9;
    border-left: 4px solid #667eea;
    border-radius: 4px;
    margin-bottom: 8px;
    font-size: 13px;
  }

  .notification-item.type-warning {
    border-left-color: #f59e0b;
  }

  .notification-item.type-success {
    border-left-color: #10b981;
  }

  .notification-item.type-info {
    border-left-color: #3b82f6;
  }

  .notification-item.read {
    opacity: 0.6;
  }

  .notif-content {
    flex: 1;
  }

  .notif-content p {
    margin: 0;
  }

  .close-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    color: #999;
    padding: 4px;
  }

  .close-btn:hover {
    color: #333;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: #f5f5f5;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
  }

  .nav-tabs {
    display: flex;
    gap: 0;
    padding: 0 30px;
    border-bottom: 1px solid #ddd;
    background: white;
    position: sticky;
    top: 80px;
    z-index: 50;
  }

  .nav-tab {
    padding: 14px 20px;
    background: transparent;
    color: #666;
    border: none;
    cursor: pointer;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    border-bottom: 3px solid transparent;
  }

  .nav-tab:hover { 
    color: #667eea;
  }

  .nav-tab.active {
    color: #667eea;
    border-bottom-color: #667eea;
  }

  .content {
    padding: 30px;
    max-width: 1400px;
    margin: 0 auto;
  }

  .import-banner {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 15px;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  }

  .import-banner h3 {
    margin-bottom: 4px;
    font-size: 16px;
  }

  .import-banner p {
    font-size: 13px;
    opacity: 0.95;
  }

  .section {
    background: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 25px;
    margin-bottom: 25px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .section-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 2px solid #667eea;
    padding-bottom: 10px;
    display: inline-block;
  }

  .section-subtitle {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 15px;
    color: #333;
    text-transform: uppercase;
  }

  .stat-card {
    background: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  .stat-card:hover {
    border-color: #667eea;
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.15);
  }

  .stat-card.color-green { border-top: 4px solid #10b981; }
  .stat-card.color-red { border-top: 4px solid #ef4444; }
  .stat-card.color-blue { border-top: 4px solid #3b82f6; }
  .stat-card.color-purple { border-top: 4px solid #8b5cf6; }

  .stat-icon { 
    font-size: 32px; 
    margin-bottom: 10px;
  }

  .stat-value {
    font-size: 28px;
    font-weight: bold;
    color: #333;
    margin: 10px 0;
  }

  .stat-label {
    font-size: 12px;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
  }

  .quick-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .action-btn {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 12px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s;
  }

  .action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  .todo-preview, .alerts-preview {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .todo-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background: #f9f9f9;
    border-radius: 4px;
    border-left: 4px solid #667eea;
  }

  .todo-item input {
    cursor: pointer;
  }

  .todo-item.priority-high {
    border-left-color: #ef4444;
  }

  .todo-item.priority-medium {
    border-left-color: #f59e0b;
  }

  .alert-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background: #f9f9f9;
    border-radius: 4px;
    border-left: 4px solid #667eea;
    font-size: 13px;
  }

  .alert-item.type-warning {
    border-left-color: #f59e0b;
  }

  .alert-item.type-success {
    border-left-color: #10b981;
  }

  .alert-item.type-info {
    border-left-color: #3b82f6;
  }

  .empty {
    text-align: center;
    color: #999;
    padding: 20px 10px;
    font-style: italic;
  }

  .chart-placeholder {
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    background: linear-gradient(180deg, rgba(102,126,234,0.05) 0%, transparent 100%);
    border-radius: 4px;
    padding: 20px;
  }

  .trend-bars {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 30px;
    height: 150px;
    width: 100%;
  }

  .trend-bar {
    width: 60px;
    border-radius: 4px 4px 0 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 12px;
    padding-bottom: 5px;
  }

  .trend-bar.income {
    background: linear-gradient(180deg, #10b981, #059669);
  }

  .trend-bar.expense {
    background: linear-gradient(180deg, #ef4444, #dc2626);
  }

  .chart-legend {
    margin-top: 15px;
    font-size: 12px;
    color: #667eea;
    font-weight: bold;
  }

  .category-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .category-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: #f9f9f9;
    border-radius: 4px;
    border-left: 4px solid #667eea;
  }

  .category-item .amount {
    font-weight: bold;
    color: #667eea;
  }

  .todos-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .todos-section {
    background: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 20px;
  }

  .todo-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: #f9f9f9;
    border-radius: 4px;
    border-left: 4px solid #f59e0b;
    margin-bottom: 10px;
    transition: all 0.2s;
  }

  .todo-card:hover {
    background: #efefef;
  }

  .todo-card.priority-high {
    border-left-color: #ef4444;
  }

  .todo-card.priority-medium {
    border-left-color: #f59e0b;
  }

  .todo-card.priority-low {
    border-left-color: #10b981;
  }

  .todo-card.completed {
    opacity: 0.6;
  }

  .todo-card.completed .todo-text {
    text-decoration: line-through;
  }

  .todo-card input {
    cursor: pointer;
  }

  .todo-text {
    flex: 1;
  }

  .form-container {
    background: #f9f9f9;
    border: 2px solid #667eea;
    padding: 20px;
    margin-bottom: 25px;
    border-radius: 6px;
  }

  .form-container h3 { 
    margin-bottom: 15px; 
    font-size: 16px; 
    color: #333;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 15px;
  }

  .form-input {
    background: white;
    border: 1px solid #ddd;
    color: #333;
    padding: 10px 12px;
    border-radius: 4px;
    font-family: inherit;
    font-size: 13px;
    transition: border 0.3s ease;
  }

  .form-input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .records-table {
    border: 1px solid #ddd;
    border-radius: 6px;
    overflow: hidden;
  }

  .table-header {
    display: grid;
    grid-template-columns: 120px 1fr 80px;
    gap: 12px;
    padding: 12px 15px;
    background: #f9f9f9;
    border-bottom: 2px solid #ddd;
    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
    color: #666;
  }

  .table-row {
    display: grid;
    grid-template-columns: 120px 1fr 80px;
    gap: 12px;
    padding: 15px;
    border-bottom: 1px solid #eee;
    align-items: center;
    font-size: 13px;
  }

  .table-row:hover {
    background: #f9f9f9;
  }

  .amount-positive { 
    color: #10b981; 
    font-weight: bold;
  }

  .amount-negative { 
    color: #ef4444; 
    font-weight: bold;
  }

  .badge {
    display: inline-block;
    padding: 3px 10px;
    background: #f0f0f0;
    border-radius: 12px;
    font-size: 11px;
    font-weight: bold;
  }

  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .btn-primary {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  .btn-secondary {
    background: #f0f0f0;
    color: #333;
    border: 1px solid #ddd;
  }

  .btn-secondary:hover {
    background: #e5e5e5;
  }

  .btn-small {
    padding: 6px 12px;
    font-size: 11px;
  }

  .btn-danger {
    background: #ef4444;
    color: white;
  }

  .btn-danger:hover {
    background: #dc2626;
  }

  .grid { display: grid; }
  .grid.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
  .grid.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  .grid.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
  .gap-3 { gap: 12px; }
  .gap-4 { gap: 16px; }
  .gap-6 { gap: 24px; }
  .mt-4 { margin-top: 16px; }
  .flex { display: flex; }
  .justify-between { justify-content: space-between; }
  .items-center { align-items: center; }
  .space-y-6 > * + * { margin-top: 24px; }
`;

export default PrintingPressSystem;
