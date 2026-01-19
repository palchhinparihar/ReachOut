import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Input from '../components/ui/Input';
import { fields, statusOptions } from '../data/applicationInputData';
import { FiEdit, FiTrash2, FiSave, FiX, FiEye } from 'react-icons/fi';
import Modal from '../components/ui/Modal';
import { getDaysSince, getFollowUpStatus } from '../lib/followUpUtils';
import FollowUpBadge from '../components/ui/FollowUpBadge';
import Button from '@/components/ui/Button';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingApp, setEditingApp] = useState(null);
  const [editForm, setEditForm] = useState({
    company: '',
    role: '',
    deadline: '',
    status: '',
    notes: ''
  });
  const [actionLoading, setActionLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

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
    setEditingApp(app);
    // Dynamically initialize editForm with all fields from fields array
    const newEditForm = {};
    fields.forEach(field => {
      newEditForm[field.key] = app[field.key] || '';
    });
    // Also ensure status and notes are included (if not in fields)
    if (!newEditForm.hasOwnProperty('status')) newEditForm.status = app.status || '';
    if (!newEditForm.hasOwnProperty('notes')) newEditForm.notes = app.notes || '';
    setEditForm(newEditForm);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    if (!editingApp) return;
    setActionLoading(true);
    try {
      await supabase.from('applications').update(editForm).eq('id', editingApp.id);
      setApplications(applications.map(app =>
        app.id === editingApp.id ? { ...app, ...editForm } : app
      ));
      setEditingApp(null);
    } catch {
      setError('Failed to update application.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditingApp(null);
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
    <section className="min-h-[70vh] overflow-x-auto w-full max-w-6xl mx-auto mt-14">
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
                <td className="px-6 py-2 min-w-22.5">{app.company}</td>
                <td className="px-6 py-2 min-w-22.5">{app.role}</td>
                <td className="px-6 py-2 min-w-22.5">{app.deadline}</td>
                <td className="px-6 py-2 min-w-22.5 font-semibold">{app.status}</td>

                {/* ⭐ Follow-up intelligence */}
                <td className="px-6 py-2 min-w-22.5">
                  <FollowUpBadge status={followUpStatus} />
                </td>

                <td className="px-6 py-2 min-w-22.5 truncate max-w-xs">{app.notes}</td>

                <td className="px-6 py-2 min-w-22.5 flex gap-2">
                  <button onClick={() => setSelectedApp(app)} className="text-purple-500 hover:scale-105 transition duration-300 cursor-pointer" title="View Details">
                    <FiEye size={22} />
                  </button>
                  <button onClick={() => handleEditClick(app)} className="text-blue-500 hover:scale-105 transition duration-300 cursor-pointer">
                    <FiEdit size={22} />
                  </button>
                  <button onClick={() => handleDelete(app.id)} className="text-red-500 hover:scale-105 transition duration-300 cursor-pointer">
                    <FiTrash2 size={22} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Application Details Modal */}
      <Modal isOpen={!!selectedApp} onClose={() => setSelectedApp(null)}>
        {selectedApp && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-500">
              Application Details
            </h2>

            <div className="grid grid-cols-1 gap-3 text-sm">
              {[
                { label: 'Company', value: selectedApp.company, className: 'font-medium', rowClass: 'flex justify-between border-b border-gray-700 pb-2' },
                { label: 'Role', value: selectedApp.role, className: 'font-medium', rowClass: 'flex justify-between border-b border-gray-700 pb-2' },
                { label: 'Deadline', value: selectedApp.deadline || '—', className: 'font-medium', rowClass: 'flex justify-between border-b border-gray-700 pb-2' },
                { label: 'Status', value: selectedApp.status, className: 'font-semibold', rowClass: 'flex justify-between border-b border-gray-700 pb-2' },
              ].map(({ label, value, className, rowClass }) => (
                <div key={label} className={rowClass}>
                  <span className="text-gray-400">{label}</span>
                  <span className={className}>{value}</span>
                </div>
              ))}

              <div className="border-b border-gray-700 pb-2">
                <span className="text-gray-400 block mb-1">Notes</span>
                <p className="text-gray-200">
                  {selectedApp.notes || "No notes added."}
                </p>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Applied On</span>
                <span className="font-medium">
                  {new Date(selectedApp.created_at).toDateString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Application Edit Modal */}
      <Modal isOpen={!!editingApp} onClose={handleEditCancel}>
        {editingApp && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">Edit Application</h2>
            <form onSubmit={e => { e.preventDefault(); handleEditSave(); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map(field => (
                  <Input
                    key={field.key}
                    isShowLabel={true}
                    field={field}
                    value={editForm[field.key] || ''}
                    handleOnChange={handleEditChange}
                  />
                ))}
                <div>
                  <label className="block text-gray-400 mb-1">Status</label>
                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange}
                    className="w-full border rounded p-2"
                  >
                    {statusOptions.map(opt => (
                      <option key={opt} value={opt} className="bg-gray-950">{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-400 mb-1">Notes</label>
                  <textarea
                    name="notes"
                    value={editForm.notes}
                    onChange={handleEditChange}
                    className="w-full border rounded p-2 min-h-15"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={handleEditCancel} className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white disabled:border-gray-400 disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed font-semibold w-full md:w-1/3 mx-auto text-base md:text-lg flex justify-center items-center text-center transition duration-300 cursor-pointer py-2 rounded-lg">
                  Cancel
                </button>
                <button type="submit" disabled={actionLoading} className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white disabled:border-gray-400 disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed font-semibold w-full md:w-1/3 mx-auto text-base md:text-lg flex justify-center items-center text-center transition duration-300 cursor-pointer py-2 rounded-lg">
                  {actionLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default ApplicationList;
