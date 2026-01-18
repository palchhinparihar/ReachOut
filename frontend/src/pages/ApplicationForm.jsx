import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { fields, statusOptions } from '../data/applicationInputData';

const initialState = fields.reduce((acc, field) => {
  acc[field.key] = '';
  return acc;
}, { status: '', notes: '' });

const ApplicationForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      // Insert application into Supabase
      const { error: supabaseError } = await supabase
        .from('applications')
        .insert([{ ...formData }]);
      if (supabaseError) throw supabaseError;
      setSuccess(true);
      setFormData(initialState);
    } catch (err) {
      setError('Failed to save application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[70vh] flex flex-col justify-center items-center rounded-lg p-6 mt-10">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-500 mb-4">Add New Application</h1>
      <p className="text-base text-gray-400 mb-10">Drop all your stress here and focus on your next big opportunity!</p>

      <form onSubmit={onSubmit} className="bg-gray-900 shadow-lg rounded-lg p-6 mb-8 w-full max-w-2xl mx-auto flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map(field => (
            <Input
              key={field.key}
              field={{
                ...field,
                value: formData[field.key],
                handleOnChange: (e) => onChange({
                  target: { name: field.key, value: e.target.value }
                })
              }}
              value={formData[field.key]}
              handleOnChange={(e) => onChange({ target: { name: field.key, value: e.target.value } })}
            />
          ))}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-300">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={onChange}
              required
              className="border-b border-gray-300 mt-1 mb-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md pl-1"
            >
              <option value="" className="bg-black">Select Status</option>
              {statusOptions.map(opt => (
                <option key={opt} value={opt} className="bg-black">{opt}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="font-semibold text-gray-300">Notes (optional)</label>
          <textarea
            name="notes"
            placeholder="Anything you want to remember..."
            value={formData.notes}
            onChange={onChange}
            className="border-b border-gray-300 mt-1 mb-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md pl-1"
          />
        </div>
        {error && <div className="text-red-600 font-semibold mb-2">{error}</div>}
        {success && <div className="text-green-600 font-semibold mb-2">Application saved!</div>}
        <Button loading={loading} texts={["Saving...", "Save Application"]} />
      </form>
    </section>
  );
};

export default ApplicationForm;
