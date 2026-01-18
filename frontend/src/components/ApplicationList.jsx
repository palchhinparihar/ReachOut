import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Input from './ui/Input';
import { fields, statusOptions } from '../data/applicationInputData';
import { FiEdit, FiTrash2, FiSave, FiX } from 'react-icons/fi';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ company: '', role: '', deadline: '', status: '', notes: '' });
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error: supabaseError } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });
      if (supabaseError) throw supabaseError;
      setApplications(data || []);
    } catch (err) {
      setError('Failed to fetch applications.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    setActionLoading(true);
    setError('');
    try {
      const { error: supabaseError } = await supabase
        .from('applications')
        .delete()
        .eq('id', id);
      if (supabaseError) throw supabaseError;
      setApplications(applications.filter(app => app.id !== id));
    } catch (err) {
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
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (id) => {
    setActionLoading(true);
    setError('');
    try {
      const { error: supabaseError } = await supabase
        .from('applications')
        .update(editForm)
        .eq('id', id);
      if (supabaseError) throw supabaseError;
      setApplications(applications.map(app => app.id === id ? { ...app, ...editForm } : app));
      setEditingId(null);
    } catch (err) {
      setError('Failed to update application.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditForm({ company: '', role: '', deadline: '', status: '', notes: '' });
  };

  if (loading) return <p className="min-h-[70vh] flex justify-center items-center text-center text-3xl md:text-4xl text-gray-500 py-8 animate-pulse">Loading applications...</p>;
  if (error) return <p className="min-h-[70vh] flex justify-center items-center text-center text-3xl md:text-4xl text-red-500 py-8">{error}</p>;
  if (!applications.length) return <p className="min-h-[70vh] flex justify-center items-center text-3xl md:text-4xl text-center text-gray-500 py-8">No applications found.</p>;

  return (
    <section className="application-list overflow-x-auto w-full max-w-6xl mx-auto mt-14">
      <h1 className="text-3xl md:text-5xl text-center font-bold text-blue-500 mb-4">Your Applications</h1>
      <p className="text-base text-center text-gray-400 mb-10">Your application journey at a glance.</p>

      <table className="min-w-full shadow-lg rounded-lg overflow-hidden">
        <thead className="text-white border-b border-gray-700">
          <tr>
            {['Company', 'Role', 'Deadline', 'Status', 'Notes', 'Actions'].map(header => (
              <th key={header} className="py-3 px-4 text-left">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {applications.map((app, idx) => (
            <tr key={app.id} className={idx % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}>
              {editingId === app.id ? (
                <>
                  {fields.map(field => (
                    <td className="py-2 px-4" key={field.key}>
                      <Input
                        key={field.key}
                        isShowLabel={false}
                        field={{
                          ...field,
                          value: editForm[field.key],
                          handleOnChange: (e) => handleEditChange({ target: { name: field.key, value: e.target.value } })
                        }}
                        value={editForm[field.key]}
                        handleOnChange={(e) => handleEditChange({ target: { name: field.key, value: e.target.value } })}
                      />
                    </td>
                  ))}
                  <td className="py-2 px-4">
                    <select
                      name="status"
                      value={editForm.status}
                      onChange={handleEditChange}
                      className="border-b border-gray-300 mt-1 mb-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md pl-1"
                    >
                      <option value="" className="bg-black">Select Status</option>
                      {statusOptions.map(opt => (
                        <option key={opt} value={opt} className="bg-black">{opt}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 px-4">
                    <textarea
                      name="notes"
                      placeholder="Anything you want to remember..."
                      value={editForm.notes}
                      onChange={handleEditChange}
                      className="border-b border-gray-300 mt-1 mb-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md pl-1"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className="text-green-500 cursor-pointer mr-2 hover:scale-105 transition duration-300"
                      onClick={() => handleEditSave(app.id)}
                      disabled={actionLoading}
                      title="Save"
                    >
                      <FiSave size={24} />
                    </button>
                    <button
                      className="text-red-500 disabled:opacity-50 cursor-pointer hover:scale-105 transition duration-300"
                      onClick={handleEditCancel}
                      disabled={actionLoading}
                      title="Cancel"
                    >
                      <FiX size={24} />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4">{app.company}</td>
                  <td className="py-2 px-4">{app.role}</td>
                  <td className="py-2 px-4">{app.deadline}</td>
                  <td className={
                    `py-2 px-4 font-semibold ` +
                    (app.status === 'Accepted' ? 'text-green-600' : app.status === 'Rejected' ? 'text-red-600' : app.status === 'Interview' ? 'text-yellow-600' : 'text-blue-600')
                  }>{app.status}</td>
                  <td className="py-2 px-4 max-w-xs truncate">{app.notes}</td>
                  <td className="py-2 px-4">
                    <button
                      className="text-blue-500 disabled:opacity-50 cursor-pointer mr-2 hover:scale-105 transition duration-300"
                      onClick={() => handleEditClick(app)}
                      disabled={actionLoading}
                      title="Edit"
                    >
                      <FiEdit size={24} />
                    </button>
                    <button
                      className="text-red-500 disabled:opacity-50 cursor-pointer hover:scale-105 transition duration-300"
                      onClick={() => handleDelete(app.id)}
                      disabled={actionLoading}
                      title="Delete"
                    >
                      <FiTrash2 size={24} />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ApplicationList;
