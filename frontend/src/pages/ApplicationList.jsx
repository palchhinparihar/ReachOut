import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Input from '../components/ui/Input';
import { fields, statusOptions } from '../data/applicationInputData';
import { FiEdit, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import { getDaysSince, getFollowUpStatus } from '../lib/followUpUtils';
import FollowUpBadge from '../components/ui/FollowUpBadge';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    company: '',
    role: '',
    deadline: '',
    status: '',
    notes: ''
  });
  const [actionLoading, setActionLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch {
      setError('Failed to fetch applications.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    setActionLoading(true);
    try {
      await supabase.from('applications').delete().eq('id', id);
      setApplications(applications.filter(app => app.id !== id));
    } catch {
      setError('Failed to delete application.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditClick = (app) => {
    setEditingId(app.id);
    setEditForm({
      company: app.company || '',
      role: app.role || '',
      deadline: app.deadline || '',
      status: app.status || '',
      notes: app.notes || '',
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (id) => {
    setActionLoading(true);
    try {
      await supabase.from('applications').update(editForm).eq('id', id);
      setApplications(applications.map(app =>
        app.id === id ? { ...app, ...editForm } : app
      ));
      setEditingId(null);
    } catch {
      setError('Failed to update application.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditForm({ company: '', role: '', deadline: '', status: '', notes: '' });
  };

  // Filter + sort
  let filteredApps = applications;
  if (statusFilter) {
    filteredApps = filteredApps.filter(app => app.status === statusFilter);
  }
  filteredApps = filteredApps.slice().sort((a, b) => {
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;
    return new Date(a.deadline) - new Date(b.deadline);
  });

  if (loading) return <p className="min-h-[70vh] flex items-center justify-center text-3xl text-gray-500 animate-pulse">Loading applications...</p>;
  if (error) return <p className="min-h-[70vh] flex items-center justify-center text-3xl text-red-500">{error}</p>;
  if (!applications.length) return <p className="min-h-[70vh] flex items-center justify-center text-3xl text-gray-500">No applications yet.</p>;

  return (
    <section className="overflow-x-auto w-full max-w-6xl mx-auto mt-14">
      <h1 className="text-3xl md:text-5xl text-center font-bold text-blue-500 mb-4">
        Your Applications
      </h1>
      <p className="text-center text-gray-400 mb-10">
        Your application journey at a glance.
      </p>

      {/* Filter */}
      <div className="flex items-center justify-end mb-4 mr-2">
        <h3 className="mr-2 text-gray-300 font-semibold">Filter by Status:</h3>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-2 py-1 bg-gray-900 text-white"
        >
          <option value="">All</option>
          {statusOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <table className="min-w-full shadow-lg rounded-lg overflow-hidden">
        <thead className="border-b border-gray-700">
          <tr>
            {['Company', 'Role', 'Deadline', 'Status', 'Follow-up', 'Notes', 'Actions'].map(h => (
              <th key={h} className="py-3 px-4 text-left">{h}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredApps.map((app, idx) => {
            const days = getDaysSince(app.created_at);
            const followUpStatus = getFollowUpStatus(days, app.status);

            return (
              <tr key={app.id} className={idx % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}>
                {editingId === app.id ? (
                  <>
                    {fields.map(field => (
                      <td key={field.key} className="px-4 py-2">
                        <Input
                          isShowLabel={false}
                          field={{
                            ...field,
                            value: editForm[field.key],
                            handleOnChange: (e) =>
                              handleEditChange({ target: { name: field.key, value: e.target.value } })
                          }}
                        />
                      </td>
                    ))}

                    {/* Status */}
                    <td className="px-4 py-2">
                      <select
                        name="status"
                        value={editForm.status}
                        onChange={handleEditChange}
                        className="w-full bg-black border rounded p-2"
                      >
                        {statusOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </td>

                    {/* Follow-up placeholder */}
                    <td className="px-4 py-2 text-gray-400 italic">Auto</td>

                    {/* Notes */}
                    <td className="px-4 py-2">
                      <textarea
                        name="notes"
                        value={editForm.notes}
                        onChange={handleEditChange}
                        className="w-full bg-black border rounded p-2"
                      />
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-2">
                      <button onClick={() => handleEditSave(app.id)} className="text-green-500 mr-2">
                        <FiSave size={22} />
                      </button>
                      <button onClick={handleEditCancel} className="text-red-500">
                        <FiX size={22} />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2">{app.company}</td>
                    <td className="px-4 py-2">{app.role}</td>
                    <td className="px-4 py-2">{app.deadline}</td>
                    <td className="px-4 py-2 font-semibold">{app.status}</td>

                    {/* ⭐ Follow-up intelligence */}
                    <td className="px-4 py-2">
                      <FollowUpBadge status={followUpStatus} />
                    </td>

                    <td className="px-4 py-2 truncate max-w-xs">{app.notes}</td>

                    <td className="px-4 py-2">
                      <button onClick={() => handleEditClick(app)} className="text-blue-500 mr-2">
                        <FiEdit size={22} />
                      </button>
                      <button onClick={() => handleDelete(app.id)} className="text-red-500">
                        <FiTrash2 size={22} />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default ApplicationList;
