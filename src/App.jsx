import React, { useState } from 'react';
import { 
  Wallet, ShieldCheck, ArrowUpRight, Search, 
  Check, Clock, Plus, X, CheckCircle2, ChevronRight
} from 'lucide-react';

export default function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [pledgeAmount, setPledgeAmount] = useState('0.10');
  const [txState, setTxState] = useState('idle');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [newCategory, setNewCategory] = useState('Infrastructure');
  const [newDesc, setNewDesc] = useState('');

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: "SolarGrid DAO: Autonomous Community Microgrids",
      category: "Infrastructure",
      creator: "0x742d...44e",
      status: "Open",
      raised: 14.8,
      goal: 20.0,
      backers: 84,
      daysLeft: 6,
      desc: "Decentralized energy microgrid governance protocol governed entirely by verified smart contracts on Ethereum."
    },
    {
      id: 2,
      title: "OpenZK: Zero-Knowledge Browser SDK",
      category: "Open Source",
      creator: "0x12a8...b39",
      status: "Funded",
      raised: 32.5,
      goal: 30.0,
      backers: 215,
      daysLeft: 2,
      desc: "Modular client-side ZK-SNARK primitives designed for consumer Web3 privacy applications."
    },
    {
      id: 3,
      title: "Veritas: Immutable Fact Verification Ledger",
      category: "Research",
      creator: "0x98f2...71c",
      status: "Closed",
      raised: 6.2,
      goal: 15.0,
      backers: 42,
      daysLeft: 0,
      desc: "Trustless decentralized whistleblowing and source-protection registry with on-chain cryptographic proofs."
    }
  ]);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setWalletConnected(true);
    }, 600);
  };

  const handleContribute = () => {
    setTxState('pending');
    setTimeout(() => {
      setTxState('confirmed');
      setTimeout(() => {
        if (selectedCampaign) {
          setCampaigns(prev => prev.map(c => {
            if (c.id === selectedCampaign.id) {
              const updated = Number(c.raised) + Number(pledgeAmount);
              return { 
                ...c, 
                raised: Number(updated.toFixed(2)),
                backers: c.backers + 1,
                status: updated >= c.goal ? 'Funded' : c.status
              };
            }
            return c;
          }));
        }
        setTxState('idle');
        setSelectedCampaign(null);
      }, 1500);
    }, 1200);
  };

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!newTitle || !newGoal) return;
    const newEntry = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      creator: walletConnected ? "0x71C...3a9F" : "0xAnonymous",
      status: "Open",
      raised: 0.0,
      goal: parseFloat(newGoal),
      backers: 0,
      daysLeft: 30,
      desc: newDesc || "No description provided."
    };
    setCampaigns([newEntry, ...campaigns]);
    setShowCreateModal(false);
    setNewTitle('');
    setNewGoal('');
    setNewDesc('');
  };

  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'open') return matchesSearch && c.status === 'Open';
    if (activeTab === 'funded') return matchesSearch && c.status === 'Funded';
    if (activeTab === 'closed') return matchesSearch && c.status === 'Closed';
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-stone-900 flex flex-col justify-between">
      <div>
        {/* Navigation Bar */}
        <header className="border-b border-stone-200/70 bg-[#FBFBFA]/90 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a href="#" className="flex items-center gap-2 group">
                <div className="w-5 h-5 bg-stone-900 rounded flex items-center justify-center text-white text-[11px] font-mono">
                  Ξ
                </div>
                <span className="font-semibold text-sm tracking-tight text-stone-900">ChainFund</span>
              </a>
              <span className="text-stone-300">/</span>
              <span className="inline-flex items-center gap-1.5 text-xs text-stone-500 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Sepolia
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Launch Campaign
              </button>

              {!walletConnected ? (
                <button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="px-3.5 py-1.5 rounded-md bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium text-xs tracking-tight transition"
                >
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                </button>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-stone-200 bg-white text-xs font-mono">
                  <span className="text-stone-900 font-medium">1.84 ETH</span>
                  <span className="text-stone-300">·</span>
                  <span className="text-stone-500">0x71C...3a9F</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="pt-20 pb-16 px-6 max-w-4xl mx-auto text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-stone-100 border border-stone-200 text-stone-600 mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
            Immutable Escrow Protocol
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-stone-900 mb-5 leading-tight">
            Trustless crowdfunding, <br />
            governed by verified code.
          </h1>
          <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
            Back decentralized initiatives with non-custodial smart contracts. 
            Contributions are committed to on-chain escrow and released only upon verified milestone success.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#explore"
              className="px-4 py-2 rounded-md bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium tracking-tight transition"
            >
              Explore Active Pledges
            </a>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 rounded-md border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium tracking-tight transition"
            >
              Start a Project
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-stone-200/70">
            <div>
              <div className="text-xs text-stone-400 uppercase tracking-wider mb-1 font-mono">Total Value Locked</div>
              <div className="text-2xl font-medium font-mono text-stone-900">1,420.5 ETH</div>
            </div>
            <div>
              <div className="text-xs text-stone-400 uppercase tracking-wider mb-1 font-mono">Completion Rate</div>
              <div className="text-2xl font-medium font-mono text-stone-900">94.8%</div>
            </div>
            <div>
              <div className="text-xs text-stone-400 uppercase tracking-wider mb-1 font-mono">Verified Backers</div>
              <div className="text-2xl font-medium font-mono text-stone-900">12,850</div>
            </div>
            <div>
              <div className="text-xs text-stone-400 uppercase tracking-wider mb-1 font-mono">Protocol Losses</div>
              <div className="text-2xl font-medium font-mono text-stone-900">0.00 ETH</div>
            </div>
          </div>
        </section>

        {/* Campaign Grid */}
        <section id="explore" className="max-w-6xl mx-auto px-6 pb-24">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 mb-8 border-b border-stone-200/70">
            <div className="flex gap-1 p-0.5 rounded-lg bg-stone-100 border border-stone-200/80">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'open', label: 'Active' },
                { id: 'funded', label: 'Funded' },
                { id: 'closed', label: 'Concluded' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 text-xs rounded-md font-medium transition ${
                    activeTab === tab.id 
                      ? 'bg-white text-stone-900 shadow-sm' 
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
              <input
                type="text"
                placeholder="Search by topic, tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-md bg-white border border-stone-200 focus:border-stone-400 focus:outline-none text-xs text-stone-900 placeholder:text-stone-400 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCampaigns.map((c) => {
              const pct = Math.min(100, Math.round((c.raised / c.goal) * 100));
              return (
                <div 
                  key={c.id} 
                  className="bg-white border border-stone-200/90 rounded-lg p-6 flex flex-col justify-between hover:border-stone-400 transition group"
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider">
                        {c.category}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        c.status === 'Open' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                        c.status === 'Funded' ? 'bg-stone-100 text-stone-700 border border-stone-200' : 
                        'bg-stone-100 text-stone-500'
                      }`}>
                        {c.status}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-stone-900 leading-snug mb-2 group-hover:text-stone-700 transition">
                      {c.title}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed mb-8">
                      {c.desc}
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline text-xs mb-2">
                      <span className="font-mono font-medium text-stone-900">{c.raised} ETH</span>
                      <span className="text-stone-400 font-mono text-[11px]">{pct}% of {c.goal} ETH</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-stone-100 overflow-hidden mb-5">
                      <div 
                        className="h-full bg-stone-900 rounded-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                      <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {c.daysLeft > 0 ? `${c.daysLeft}d left` : 'Finished'}
                      </div>
                      <button
                        onClick={() => setSelectedCampaign(c)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-stone-900 hover:text-stone-600 transition"
                      >
                        {c.status === 'Closed' ? 'Details' : 'Contribute'}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-stone-200/70 bg-[#FBFBFA] py-8 px-6 text-xs text-stone-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-stone-900">ChainFund</span>
            <span className="text-stone-300">·</span>
            <span>Non-custodial open protocol</span>
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>Contract: 0x937f...91bc</span>
            <a href="#" className="hover:text-stone-900 transition">Docs</a>
            <a href="#" className="hover:text-stone-900 transition">Etherscan</a>
          </div>
        </div>
      </footer>

      {/* Contribution Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/30 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border border-stone-200 rounded-xl p-6 shadow-xl relative">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block mb-1">
                  Target: {selectedCampaign.goal} ETH
                </span>
                <h3 className="text-base font-semibold text-stone-900">{selectedCampaign.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedCampaign(null)} 
                className="text-stone-400 hover:text-stone-700 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed mb-6">
              {selectedCampaign.desc}
            </p>

            {selectedCampaign.status === 'Closed' ? (
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 text-stone-600 text-xs mb-4">
                This campaign concluded below its funding threshold. Escrow funds can be refunded automatically.
                <button className="mt-3 w-full py-2 rounded-md bg-stone-900 text-white font-medium text-xs">
                  Claim Automated Refund
                </button>
              </div>
            ) : (
              <div className="space-y-4 mb-5">
                <div>
                  <div className="flex justify-between text-xs text-stone-600 mb-1.5">
                    <span>Pledge Amount</span>
                    <span className="font-mono text-stone-400">≈ ${(parseFloat(pledgeAmount || 0) * 3200).toLocaleString()} USD</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.05"
                      value={pledgeAmount}
                      onChange={(e) => setPledgeAmount(e.target.value)}
                      className="w-full px-3 py-2 rounded-md bg-stone-50 border border-stone-200 font-mono text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-stone-500 transition"
                    />
                    <span className="absolute right-3 top-2.5 text-xs font-mono text-stone-400">ETH</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {['0.05', '0.10', '0.50', '1.00'].map(amt => (
                    <button
                      key={amt}
                      onClick={() => setPledgeAmount(amt)}
                      className="flex-1 py-1 rounded bg-stone-100 hover:bg-stone-200/80 text-stone-700 font-mono text-xs transition"
                    >
                      +{amt}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleContribute}
                  disabled={txState !== 'idle'}
                  className="w-full py-2.5 rounded-md bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs tracking-tight transition"
                >
                  {txState === 'idle' && 'Sign & Transact'}
                  {txState === 'pending' && 'Broadcasting Transaction...'}
                  {txState === 'confirmed' && '✓ Contribution Confirmed'}
                </button>
              </div>
            )}

            <button
              onClick={() => setSelectedCampaign(null)}
              className="w-full text-center text-xs text-stone-400 hover:text-stone-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Launch Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/30 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border border-stone-200 rounded-xl p-6 shadow-xl relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold text-stone-900">Deploy New Campaign</h3>
              <button 
                onClick={() => setShowCreateModal(false)} 
                className="text-stone-400 hover:text-stone-700 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Campaign Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Decentralized Wireless Relay"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-md bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-stone-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Goal (ETH)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    placeholder="25.0"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-md bg-stone-50 border border-stone-200 text-xs font-mono text-stone-900 focus:bg-white focus:outline-none focus:border-stone-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-md bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-stone-500"
                  >
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Open Source">Open Source</option>
                    <option value="Research">Research</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Summary</label>
                <textarea
                  rows={3}
                  placeholder="Describe verifiable milestones..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-md bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-stone-500 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-md bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs tracking-tight transition"
                >
                  Deploy to Smart Contract
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
