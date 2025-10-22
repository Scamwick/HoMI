'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { BarChart3, Users, TrendingUp, Mail } from 'lucide-react';

export default function AdminDashboard() {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [waitlist, setWaitlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const { data: a } = await supabase
        .from('assessments')
        .select('*')
        .order('created_at', { ascending: false });
      const { data: w } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });
      setAssessments(a || []);
      setWaitlist(w || []);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-slate-300">
        Loading dashboard...
      </div>
    );

  const avgScore =
    Math.round(
      (assessments.reduce((sum, a) => sum + (a.total_score || 0), 0) /
        (assessments.length || 1)) *
        10
    ) / 10;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-8">🧭 HōMI Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Assessments"
          value={assessments.length}
          icon={<BarChart3 className="text-cyan-400 w-6 h-6" />}
        />
        <StatCard
          title="Waitlist Signups"
          value={waitlist.length}
          icon={<Users className="text-emerald-400 w-6 h-6" />}
        />
        <StatCard
          title="Average Score"
          value={avgScore}
          icon={<TrendingUp className="text-yellow-400 w-6 h-6" />}
        />
        <StatCard
          title="Latest Email"
          value={waitlist[0]?.email || '—'}
          icon={<Mail className="text-pink-400 w-6 h-6" />}
        />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Recent Assessments</h2>
        <div className="overflow-x-auto border border-slate-800 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Income</th>
                <th className="p-3 text-left">Target Price</th>
                <th className="p-3 text-left">Score</th>
                <th className="p-3 text-left">Financial</th>
                <th className="p-3 text-left">Emotional</th>
                <th className="p-3 text-left">Decision</th>
              </tr>
            </thead>
            <tbody>
              {assessments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-slate-400">
                    No assessments yet
                  </td>
                </tr>
              ) : (
                assessments.map((a, i) => (
                  <tr key={i} className="border-t border-slate-800 hover:bg-slate-900/50">
                    <td className="p-3">
                      {new Date(a.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3">${a.income?.toLocaleString() || '—'}</td>
                    <td className="p-3">${a.target_price?.toLocaleString() || '—'}</td>
                    <td className="p-3">
                      <span
                        className={`font-semibold ${
                          (a.total_score || 0) >= 80
                            ? 'text-green-400'
                            : (a.total_score || 0) >= 60
                            ? 'text-yellow-400'
                            : 'text-red-400'
                        }`}
                      >
                        {a.total_score || '—'}
                      </span>
                    </td>
                    <td className="p-3">{a.financial_score || '—'}</td>
                    <td className="p-3">{a.emotional_score || '—'}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          a.decision === 'YES'
                            ? 'bg-green-500/20 text-green-400'
                            : a.decision === 'NOT YET'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {a.decision || '—'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Waitlist Signups</h2>
        <div className="overflow-x-auto border border-slate-800 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Score</th>
                <th className="p-3 text-left">Source</th>
              </tr>
            </thead>
            <tbody>
              {waitlist.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-slate-400">
                    No waitlist signups yet
                  </td>
                </tr>
              ) : (
                waitlist.slice(0, 20).map((w, i) => (
                  <tr key={i} className="border-t border-slate-800 hover:bg-slate-900/50">
                    <td className="p-3">
                      {new Date(w.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3 font-mono text-cyan-400">{w.email}</td>
                    <td className="p-3">{w.score || '—'}</td>
                    <td className="p-3 text-slate-400">{w.source || 'web'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: any;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-slate-400 text-sm uppercase tracking-wide">
          {title}
        </h3>
        {icon}
      </div>
      <p className="text-3xl font-bold text-white mt-2">
        {value !== undefined && value !== null ? value : '—'}
      </p>
    </div>
  );
}
