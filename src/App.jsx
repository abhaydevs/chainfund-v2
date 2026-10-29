import React, { useState, useEffect } from 'react';
import { 
  Wallet, ShieldCheck, TrendingUp, Users, RefreshCw, 
  ExternalLink, Plus, Search, Filter, CheckCircle2, 
  AlertCircle, Clock, ChevronDown, Copy, Check
} from 'lucide-react';

export default function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [pledgeAmount, setPledgeAmount] = useState('0.1');
  const [txState, setTxState] = useState('idle'); // idle | pending | confirmed

  const campaigns = [
    {
      id: 1,
      title: "SolarGrid DAO: Autonomous Community Microgrids",
      category: "Tech",
      creator: "0x742d...44e",
      status: "Open",
      raised: 14.8,
      goal: 20.0,
      backers: 84,
      daysLeft: 6,
      desc: "Decentralized microgrid coordination governed entirely by open-source smart contracts on Ethereum."
    },
    {
      id: 2,
      title: "OpenZK: Zero-Knowledge Privacy SDK",
      category: "Open Source",
      creator: "0x12a8...b39",
      status: "Goal Reached",
      raised: 32.5,
      goal: 30.0,
      backers: 215,
      daysLeft: 2,
      desc: "Modular ZK-SNARK primitives designed for browser-based Web3 applications."
    },
    {
      id: 3,
      title: "Veritas: Trustless Decentralized Journalism",
      category: "Community",
      creator: "0x98f2...71c",
      status: "Closed",
      raised: 6.2,
      goal: 15.0,
      backers: 42,
      daysLeft: 0,
      desc: "Immutable fact-checking and whistleblower reporting with cryptographic verification."
    }
  ];

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setWalletConnected(true);
    }, 900);
  };

  const handleContribute = () => {
    setTxState('pending');
    setTimeout(() => {
      setTxState('confirmed');
      setTimeout(() => {
        setTxState('idle');
        setSelectedCampaign(null);
      }, 2000);
    }, 1800);
  };

  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.desc.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'open') return matchesSearch && c.status === 'Open';
    if (activeTab === 'funded') return matchesSearch && c.status === 'Goal Reached';
    if (activeTab === 'closed') return matchesSearch && c.status === 'Closed';
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0B0F17]/80 border-b border-white/10 px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-black text-black text-lg">
            Ξ
          </div>
          <span className="font-bold tracking-tight text-lg text-white">ChainFund</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Sepolia
          </span>
        </div>

        <div className="flex items-center gap-3">
          {!walletConnected ? (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition"
            >
              <Wallet className="w-4 h-4" />
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 font-mono text-xs">
              <span className="text-emerald-400">1.842 ETH</span>
              <span className="text-white/40">|</span>
              <span>0x71C...3a9F</span>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white/[0.05] border border-white/10 text-emerald-400 mb-6">
          <ShieldCheck className="w-3.5 h-3.5" /> 100% Trustless • Enforced by Smart Contracts
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
          Fund the Future <br />
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Without Intermediaries
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg mb-10 leading-relaxed">
          Decentralized crowdfunding governed entirely by verified smart contracts. 
          Pledges are held in non-custodial escrow until goals are achieved.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          {[
            { label: "Total ETH Pooled", val: "1,420.5 ETH", icon: TrendingUp },
            { label: "Successful Rate", val: "94.8%", icon: CheckCircle2 },
            { label: "Active Backers", val: "12,850+", icon: Users },
            { label: "Automated Refunds", val: "0% Lost", icon: RefreshCw },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <stat.icon className="w-4 h-4 text-emerald-400 mb-2" />
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">{stat.val}</div>
              <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Campaigns Explorer */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/[0.04] border border-white/10 focus:border-emerald-500 text-sm focus:outline-none"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            {['all', 'open', 'funded', 'closed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition ${
                  activeTab === tab 
                    ? 'bg-emerald-500 text-black' 
                    : 'bg-white/[0.04] text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'all' ? 'All Campaigns' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCampaigns.map((c) => {
            const pct = Math.min(100, Math.round((c.raised / c.goal) * 100));
            return (
              <div 
                key={c.id} 
                className="flex flex-col justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition group"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-slate-400 border border-white/5">
                      {c.category}
                    </span>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                      c.status === 'Open' ? 'bg-emerald-500/10 text-emerald-400' :
                      c.status === 'Goal Reached' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {c.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition mb-2">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {c.desc}
                  </p>
                </div>

                <div>
                  {/* Progress Bar */}
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-white font-bold">{c.raised} ETH</span>
                    <span className="text-slate-400">{pct}% of {c.goal} ETH</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden mb-4">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" 
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      {c.daysLeft > 0 ? `${c.daysLeft} days left` : 'Finished'}
                    </div>
                    <button
                      onClick={() => setSelectedCampaign(c)}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition"
                    >
                      {c.status === 'Closed' ? 'View Details' : 'Back Project'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Modal for Contribution / Details */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg p-6 rounded-2xl bg-[#111827] border border-white/10 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">{selectedCampaign.title}</h3>
            <p className="text-xs text-slate-400 mb-6">{selectedCampaign.desc}</p>

            {selectedCampaign.status === 'Closed' ? (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs mb-6">
                Campaign finalized below target. If you contributed, claim your automated refund.
                <button className="mt-3 w-full py-2 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-bold transition">
                  Claim Refund
                </button>
              </div>
            ) : (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs text-slate-400 block mb-1.5">Contribution Amount (ETH)</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.05"
                      value={pledgeAmount}
                      onChange={(e) => setPledgeAmount(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 focus:border-emerald-500 text-white font-mono text-sm focus:outline-none"
                    />
                    <span className="absolute right-3 top-2.5 text-xs font-mono text-slate-500">ETH</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {['0.05', '0.1', '0.5', '1.0'].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setPledgeAmount(amt)}
                      className="flex-1 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-slate-300 border border-white/5"
                    >
                      +{amt}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleContribute}
                  disabled={txState !== 'idle'}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition"
                >
                  {txState === 'idle' && 'Confirm Smart Contract Pledge'}
                  {txState === 'pending' && 'Mining on Sepolia Testnet...'}
                  {txState === 'confirmed' && '✓ Contribution Confirmed!'}
                </button>
              </div>
            )}

            <button
              onClick={() => setSelectedCampaign(null)}
              className="w-full py-2 text-xs text-slate-400 hover:text-white transition"
            >
              Cancel & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
      }
          
