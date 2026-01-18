import React from 'react';

const ApplicationList = ({ applications, onEdit, onDelete }) => {
  if (!applications.length) return <p className="text-center text-gray-500 py-8">No applications found.</p>;
  return (
    <div className="application-list overflow-x-auto w-full max-w-4xl mx-auto mt-6">
      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Company</th>
            <th className="py-3 px-4 text-left">Role</th>
            <th className="py-3 px-4 text-left">Deadline</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Notes</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, idx) => (
            <tr key={app.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="py-2 px-4">{app.company}</td>
              <td className="py-2 px-4">{app.role}</td>
              <td className="py-2 px-4">{app.deadline}</td>
              <td className={
                `py-2 px-4 font-semibold ` +
                (app.status === 'Accepted' ? 'text-green-600' : app.status === 'Rejected' ? 'text-red-600' : app.status === 'Interview' ? 'text-yellow-600' : 'text-blue-600')
              }>{app.status}</td>
              <td className="py-2 px-4 max-w-xs truncate">{app.notes}</td>
              <td className="py-2 px-4 flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(app)}
                  className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-semibold py-1 px-3 rounded transition"
                >Edit</button>
                <button
                  onClick={() => onDelete(app.id)}
                  className="bg-red-100 hover:bg-red-200 text-red-800 font-semibold py-1 px-3 rounded transition"
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationList;
