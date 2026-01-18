import React from "react";
import Button from "../components/ui/Button";
import { emailTemplates } from "../data/emailTemplates";

const FollowUp = () => {
  const [status, setStatus] = React.useState("Accepted");
  const [copied, setCopied] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Temporary placeholders (can later come from selected application)
  const emailText =
    emailTemplates[status]?.({
      company: "[Company Name]",
      role: "[Role Name]",
      name: "[Your Name]",
      days: 7,
    }) || "Select a status to generate an email";

  const handleCopy = async () => {
    try {
      setLoading(true);
      await navigator.clipboard.writeText(emailText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy email", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[70vh] flex flex-col justify-center items-center rounded-lg p-6 mt-10">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-500 mb-4">
        Follow Up Email Helper
      </h1>
      <p className="text-base text-gray-400 mb-10">
        Get a professional email prompt based on your application status!
      </p>

      <div className="bg-gray-900 shadow-lg rounded-lg p-6 mb-8 w-full max-w-2xl mx-auto flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <label
            htmlFor="status-select"
            className="font-semibold text-gray-300"
          >
            Status
          </label>
          <select
            id="status-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border-b border-gray-300 mt-1 mb-4 py-2 w-full md:w-60 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md pl-1 bg-black text-white"
          >
            {Object.keys(emailTemplates).map((option) => (
              <option key={option} value={option} className="bg-black">
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold text-gray-300">Email Prompt</label>
          <textarea
            readOnly
            value={emailText}
            className="border-b border-gray-300 mt-1 mb-4 p-2 w-full min-h-46 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md bg-gray-50 text-gray-800 font-mono text-sm resize-none"
          />
        </div>

        {copied && (
          <p className="text-green-400 text-sm text-center">
            Email copied to clipboard!
          </p>
        )}

        <Button
          texts={["Copying...", "Copy Email"]}
          loading={loading}
          onClick={handleCopy}
          type="button"
        />
      </div>
    </section>
  );
};

export default FollowUp;
