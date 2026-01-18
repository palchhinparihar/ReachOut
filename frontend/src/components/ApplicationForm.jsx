import React from 'react';
import Input from './ui/Input';
import Button from './ui/Button';

const fields = [
  {
    name: 'Company / Organization',
    type: 'text',
    placeholder: 'Company / Organization',
    key: 'company',
    required: true,
  },
  {
    name: 'Role / Program',
    type: 'text',
    placeholder: 'Role / Program',
    key: 'role',
    required: true,
  },
  {
    name: 'Deadline',
    type: 'date',
    placeholder: 'Deadline',
    key: 'deadline',
    required: true,
  },
];

const statusOptions = [
  'Applied',
  'Interview',
  'Rejected',
  'Accepted',
];

const ApplicationForm = ({ onSubmit, formData, onChange, loading }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white text-black shadow-lg rounded-lg p-6 mb-8 w-full max-w-xl mx-auto flex flex-col gap-4">
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
          <label className="font-semibold text-gray-900">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={onChange}
            required
            className="border-b border-gray-300 mt-1 mb-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white rounded-md pl-1"
          >
            <option value="">Select Status</option>
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="font-semibold text-gray-900">Notes (optional)</label>
        <textarea
          name="notes"
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={onChange}
          className="border-b border-gray-300 mt-1 mb-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white rounded-md pl-1"
        />
      </div>
      <Button loading={loading} texts={["Saving...", "Save Application"]} />
    </form>
  );
};

export default ApplicationForm;
