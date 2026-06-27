import React, { useState } from 'react'
import initialCardsData from './data/cardsMock.json'

function App() {
  // 1. STATE MANAGEMENT
  const [cards, setCards] = useState(initialCardsData.cards)
  const [activeTab, setActiveTab] = useState('dashboard') // dashboard | history | actions
  const [selectedCardId, setSelectedCardId] = useState(initialCardsData.cards[0]?.id || '')
  const [newLimitInput, setNewLimitInput] = useState('')
  const [validationError, setValidationError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Hyper-realistic mock transaction ledger matching premium financial dashboards
  const staticTransactions = [
    { id: 'tx1', cardId: '1', merchant: 'AWS Cloud Services', category: 'Infrastructure', amount: 1450.00, date: 'June 27, 2026', status: 'Settled', icon: '☁️' },
    { id: 'tx2', cardId: '1', merchant: 'GitHub Enterprise Suite', category: 'Dev Tools', amount: 320.00, date: 'June 24, 2026', status: 'Settled', icon: '🐙' },
    { id: 'tx3', cardId: '2', merchant: 'Vercel Pro Platform', category: 'Hosting', amount: 40.00, date: 'June 21, 2026', status: 'Declined (Frozen)', icon: '▲' },
    { id: 'tx4', cardId: '1', merchant: 'OpenAI API Platform', category: 'AI Compute', amount: 890.50, date: 'June 20, 2026', status: 'Settled', icon: '🤖' }
  ]

  // Calculated Portfolio Metrics for Header Row
  const totalLimit = cards.reduce((sum, c) => sum + c.limit, 0)
  const totalBalance = cards.reduce((sum, c) => sum + c.balance, 0)
  const totalAvailable = totalLimit - totalBalance

  // 2. LIFECYCLE CONTROLLERS
  const handleToggleFreeze = (id) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id 
          ? { ...card, status: card.status === 'active' ? 'blocked' : 'active' }
          : card
      )
    )
    setSuccessMessage('Card infrastructure state synchronized across networks.')
    setTimeout(() => setSuccessMessage(''), 4000)
  }

  const handleUpdateLimit = (e) => {
    e.preventDefault()
    setValidationError('')
    setSuccessMessage('')

    const targetLimit = parseFloat(newLimitInput)
    if (isNaN(targetLimit) || targetLimit <= 0) {
      setValidationError('Validation Error: Please input a valid numerical value.')
      return
    }

    // STRICT PRD ENFORCEMENT: Card spending limits cannot exceed a maximum ceiling of $75,000.
    if (targetLimit > 75000) {
      setValidationError('Security Exception: The requested limit allocation breaches the absolute $75,000 systemic constraint rule defined in docs/PRD.md.')
      return
    }

    setCards(prevCards =>
      prevCards.map(card =>
        card.id === selectedCardId ? { ...card, limit: targetLimit } : card
      )
    )

    setSuccessMessage(`System parameter updated. Account spending ceiling set to $${targetLimit.toLocaleString()}.`)
    setNewLimitInput('')
    setTimeout(() => setSuccessMessage(''), 4000)
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-slate-100 font-sans antialiased selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* 1. SIDEBAR PANEL */}
      <aside className="w-68 bg-[#0c1222] border-r border-slate-800/60 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
              ⚡
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-wider text-white uppercase font-mono">
                Nexus Credit
              </h2>
              <span className="text-[10px] text-slate-500 font-medium block -mt-0.5 tracking-tight">Enterprise Console</span>
            </div>
          </div>
          
          {/* Navigation Items */}
          <nav className="space-y-1.5">
            <button 
              onClick={() => { setActiveTab('dashboard'); setValidationError(''); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${activeTab === 'dashboard' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/15 border-t border-blue-500/20' : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'}`}
            >
              <span className="text-base">💳</span> Account Matrix
            </button>
            <button 
              onClick={() => { setActiveTab('history'); setValidationError(''); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${activeTab === 'history' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/15 border-t border-blue-500/20' : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'}`}
            >
              <span className="text-base">📊</span> Audit Ledger
            </button>
            <button 
              onClick={() => { setActiveTab('actions'); setValidationError(''); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${activeTab === 'actions' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/15 border-t border-blue-500/20' : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'}`}
            >
              <span className="text-base">⚙️</span> Control Unit
            </button>
          </nav>
        </div>

        {/* System Diagnostics Badge */}
        <div className="pt-4 border-t border-slate-800/80 px-2 flex flex-col gap-1 text-[11px] font-mono text-slate-500">
          <div>Network: <span className="text-emerald-400 font-bold">ONLINE</span></div>
          <div>Node Protocol: <span className="text-blue-400">CI-CD v1.0.4</span></div>
        </div>
      </aside>

      {/* 2. CORE WORKSPACE */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* RUNTIME EVENT NOTIFICATION LAYERS */}
        {validationError && (
          <div className="mb-6 p-4 bg-rose-950/20 border border-rose-800/40 rounded-2xl text-rose-300 text-xs font-semibold tracking-wide flex items-start gap-3 shadow-xl backdrop-blur-md animate-fade-in">
            <span className="text-base mt-0.5">⚠️</span> <div>{validationError}</div>
          </div>
        )}
        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-2xl text-emerald-300 text-xs font-semibold tracking-wide flex items-center gap-3 shadow-xl backdrop-blur-md">
            <span className="text-base">✨</span> {successMessage}
          </div>
        )}

        {/* REALISTIC HIGH-NET-WORTH METRICS BAR */}
        <header className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#0f172a] border border-slate-800/60 p-5 rounded-2xl shadow-md">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Total Credit Pool</span>
            <span className="text-xl font-bold text-white tracking-tight mt-1 block">${totalLimit.toLocaleString()}</span>
          </div>
          <div className="bg-[#0f172a] border border-slate-800/60 p-5 rounded-2xl shadow-md">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Aggregate Outstandings</span>
            <span className="text-xl font-bold text-slate-300 tracking-tight mt-1 block">${totalBalance.toLocaleString()}</span>
          </div>
          <div className="bg-[#0f172a] border border-slate-800/60 p-5 rounded-2xl shadow-md bg-gradient-to-b from-[#0f172a] to-blue-950/10 border-blue-900/20">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block">Available Validation Capacity</span>
            <span className="text-xl font-bold text-blue-400 tracking-tight mt-1 block">${totalAvailable.toLocaleString()}</span>
          </div>
          </header>

        {/* 3. TABS SWITCHBOARD VIEW */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">Active Corporate Matrices</h1>
                <p className="text-xs text-slate-400 mt-0.5">Real-time telemetry and validation status from local datastores.</p>
              </div>
            </div>

            {/* HIGHLY REALISTIC CREDIT CARD GRID RENDERING */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cards.map((card) => {
                const isBlocked = card.status === 'blocked';
                const isVisa = card.type.toLowerCase().includes('visa');
                
                return (
                  <div 
                    key={card.id}
                    className={`relative p-6 rounded-2xl border transition-all duration-300 shadow-2xl flex flex-col justify-between h-56 group overflow-hidden ${isBlocked ? 'bg-[#0b0f19]/80 border-slate-900 grayscale opacity-50 select-none' : 'bg-gradient-to-br from-[#161f38] via-[#11192e] to-[#0d1424] border-slate-800/80 hover:border-slate-700/80 hover:shadow-blue-950/10'}`}
                  >
                    {/* Embedded Decorative Glassmorphism Light Reflection */}
                    <div className="absolute -right-20 -top-20 w-52 h-52 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-300 pointer-events-none" />
                    
                    {/* Card Top Row */}
                    <div className="flex justify-between items-start relative z-10">
                      <div>
                        {/* EMV Microchip Blueprint Asset */}
                        <div className="w-10 h-8 bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-300 rounded-md border border-amber-500/20 relative overflow-hidden mb-3 shadow-inner">
                          <div className="absolute inset-x-2 top-0 bottom-0 border-x border-slate-900/10" />
                          <div className="absolute inset-y-2 left-0 right-0 border-y border-slate-900/10" />
                        </div>
                        <span className="text-[10px] font-bold tracking-widest uppercase font-mono bg-slate-800/80 text-slate-400 px-2.5 py-1 rounded-md border border-slate-700/40">
                          {card.type}
                        </span>
                      </div>

                      {/* SYSTEM STATUS LABELS - STRICT PRD ENFORCEMENT */}
                      <div className="flex items-center gap-2 bg-[#090d16]/80 px-2.5 py-1.5 rounded-xl border border-slate-800/60 shadow-md">
                        {/* PRD Rule 1: Glowing dot layout conditions for active accounts */}
                        <span className={`w-2 h-2 rounded-full ${isBlocked ? 'bg-slate-600' : 'bg-emerald-400 animate-pulse ring-4 ring-emerald-400/20'}`} />
                        <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-slate-300">{card.status}</span>
                      </div>
                    </div>

                    {/* Card Middle Row: Tokenized Account String */}
                    <div className="relative z-10 my-4">
                      <h3 className="text-xl font-bold tracking-widest text-white font-mono flex gap-3">
                        <span className="text-slate-500 opacity-60">••••</span>
                        <span className="text-slate-500 opacity-60">••••</span>
                        <span className="text-slate-500 opacity-60">••••</span>
                        <span className="text-slate-100">{card.last4}</span>
                      </h3>
                    </div>

                    {/* Card Bottom Row: Metadata Assets & Network Badges */}
                    <div className="flex justify-between items-end border-t border-slate-800/40 pt-4 relative z-10">
                      <div>
                        <span className="text-[9px] uppercase font-bold tracking-wider font-mono text-slate-500 block">System Principal</span>
                        <p className="text-xs font-semibold text-slate-200 mt-0.5">{card.holder}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        {/* Visa/Mastercard Synthetic Symbol Matrix */}
                        <div className="flex items-center gap-1.5 h-6 mb-1">
                          {isVisa ? (
                            <span className="text-blue-400 font-black italic tracking-tighter text-sm font-mono">VISA</span>
                          ) : (
                            <div className="flex -space-x-2">
                              <div className="w-4 h-4 rounded-full bg-rose-500 opacity-80" />
                              <div className="w-4 h-4 rounded-full bg-amber-500 opacity-80" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs font-black tracking-tight text-white font-mono">${card.limit.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <div className="mb-6">
              <h1 className="text-xl font-bold tracking-tight text-white">System Audit Ledger</h1>
              <p className="text-xs text-slate-400 mt-0.5">Historical verification records mapping transactions across account nodes.</p>
            </div>

            {/* REALISTIC TABLE INTERFACE */}
            <div className="bg-[#0c1222] border border-slate-800/60 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-800 bg-[#0e1628]/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                      <th className="p-4">Timestamp</th>
                      <th className="p-4">Merchant Entity</th>
                      <th className="p-4">Classification</th>
                      <th className="p-4">Allocation Mapping</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4 text-right">Settlement Index</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 text-xs text-slate-300">
                    {staticTransactions.map((tx) => {
                      const linkedCard = cards.find(c => c.id === tx.cardId);
                      const isDeclined = tx.status.toLowerCase().includes('decline');
                      
                      return (
                        <tr key={tx.id} className="hover:bg-slate-800/20 transition-colors group">
                          <td className="p-4 font-mono text-slate-500 group-hover:text-slate-400">{tx.date}</td>
                          <td className="p-4 font-semibold text-white">
                            <div className="flex items-center gap-2.5">
                              <span className="w-6 h-6 rounded-md bg-slate-800/60 flex items-center justify-center text-xs border border-slate-700/30">{tx.icon}</span>
                              {tx.merchant}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="bg-slate-900 px-2 py-1 rounded-md text-[10px] font-medium font-mono text-slate-400 border border-slate-800/40">{tx.category}</span>
                          </td>
                          <td className="p-4 font-mono text-slate-400">
                            •••• {linkedCard ? linkedCard.last4 : 'Unknown'}
                          </td>
                          <td className="p-4 font-bold text-slate-200">${tx.amount.toFixed(2)}</td>
                          <td className="p-4 text-right">
                            <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider font-mono ${isDeclined ? 'bg-rose-950/30 text-rose-400 border border-rose-900/30' : 'bg-emerald-950/30 text-emerald-400 border border-emerald-900/30'}`}>
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'actions' && (
          <div>
            <div className="mb-6">
              <h1 className="text-xl font-bold tracking-tight text-white">System Parameter Control Unit</h1>
              <p className="text-xs text-slate-400 mt-0.5">Modify threshold state constraints and execute node freeze overrides.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* OPERATIONAL TERMINAL 1: OVERRIDE SYSTEM STATE SHUTDOWN */}
              <div className="lg:col-span-1 bg-[#0c1222] border border-slate-800/60 p-5 rounded-2xl flex flex-col justify-between shadow-xl">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">State Freeze Interceptor</h3>
                  <p className="text-[11px] text-slate-500 mb-6 leading-relaxed">Kill or re-stage network verification tokens for target corporate credentials instantly.</p>
                </div>

                <div className="space-y-2.5">
                  {cards.map((card) => (
                    <div key={card.id} className="flex justify-between items-center p-3 bg-[#090d16]/60 border border-slate-800/40 rounded-xl">
                      <div>
                        <p className="text-xs font-bold text-white font-mono">{card.type} (•{card.last4})</p>
                        <p className="text-[9px] font-semibold text-slate-500 mt-0.5 font-mono">Limit: ${card.limit.toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => handleToggleFreeze(card.id)}
                        className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider font-mono rounded-lg transition-all border ${card.status === 'active' ? 'bg-rose-950/20 text-rose-400 border-rose-900/30 hover:bg-rose-900 hover:text-white' : 'bg-emerald-950/20 text-emerald-400 border-emerald-900/30 hover:bg-emerald-900 hover:text-white'}`}
                      >
                        {card.status === 'active' ? 'Freeze' : 'Restore'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* OPERATIONAL TERMINAL 2: AUTOMATED PARAMETER INPUT WRITER */}
              <div className="lg:col-span-2 bg-[#0c1222] border border-slate-800/60 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Threshold Parameter Allocation Form</h3>
                  <p className="text-[11px] text-slate-500 mb-6 leading-relaxed">Adjust maximum systemic spending risk values. Form submission calls a parser loop that evaluates criteria strictly against the $75,000 regulatory PRD rule.</p>
                </div>

                <form onSubmit={handleUpdateLimit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono mb-2">Target Account Descriptor</label>
                    <select 
                      value={selectedCardId}
                      onChange={(e) => setSelectedCardId(e.target.value)}
                      className="w-full bg-[#090d16] border border-slate-800/80 rounded-xl p-3 text-xs font-semibold text-slate-300 focus:outline-none focus:border-blue-600 transition-colors"
                    >
                      {cards.map(c => (
                        <option key={c.id} value={c.id}>{c.type} (•••• {c.last4}) - Active Limit: ${c.limit.toLocaleString()}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono mb-2">New Spending Allocation Threshold ($)</label>
                    <input 
                      type="number" 
                      placeholder="Input integer parameter (e.g. 25000)"
                      value={newLimitInput}
                      onChange={(e) => setNewLimitInput(e.target.value)}
                      className="w-full bg-[#090d16] border border-slate-800/80 rounded-xl p-3 text-xs font-mono text-white placeholder-slate-700 focus:outline-none focus:border-blue-600 transition-colors"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border-t border-blue-400/20 text-white text-xs font-bold uppercase tracking-widest p-3.5 rounded-xl shadow-lg shadow-blue-600/10 transition-all duration-150 active:translate-y-0.5"
                  >
                    Commit Parameter Modification
                  </button>
                </form>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  )
}

export default App