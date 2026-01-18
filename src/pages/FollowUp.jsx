import React from "react";
import Button from "../components/ui/Button";
import { subjectTemplates, emailTemplates } from "../data/emailTemplates";

const FollowUp = () => {
  const [status, setStatus] = React.useState("Accepted");
  const [copiedEmail, setCopiedEmail] = React.useState(false);
  const [copiedSubject, setCopiedSubject] = React.useState(false);
  const [loadingEmail, setLoadingEmail] = React.useState(false);
  const [loadingSubject, setLoadingSubject] = React.useState(false);

  // Temporary placeholders (later: from selected application)
  const context = {
    company: "[Company Name]",
    role: "[Role Name]",
    name: "[Your Name]",
    days: 7,
  };

  const emailText =
    emailTemplates[status]?.(context) ||
    "Select a status to generate an email";

  const subjectText =
    subjectTemplates[status]?.(context) ||
    "Select a status to generate a subject";

  const copyToClipboard = async (text, setCopied, setLoading) => {
    try {
      setLoading(true);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
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
        Generate a professional follow-up email and subject line.
      </p>

      <div className="bg-gray-900 shadow-lg rounded-lg p-6 mb-8 w-full max-w-2xl mx-auto flex flex-col gap-5">
        {/* Status */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <label className="font-semibold text-gray-300">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border-b border-gray-300 py-2 w-full md:w-60 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md pl-1 bg-black text-white"
          >
            {Object.keys(emailTemplates).map((option) => (
              <option key={option} value={option} className="bg-black">
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Line */}
        <div>
          <label className="font-semibold text-gray-300">Email Subject</label>
          <input
            readOnly
            value={subjectText}
            className="border-b border-gray-300 mt-1 mb-4 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md bg-gray-50 text-gray-800 font-mono text-sm"
          />
          {copiedSubject && (
            <p className="text-green-400 text-xs md:text-sm my-3 text-center">
              Yoo! Subject copied! You got this!
            </p>
          )}
          <Button
            texts={["Copying...", "Copy Subject"]}
            loading={loadingSubject}
            onClick={() =>
              copyToClipboard(
                subjectText,
                setCopiedSubject,
                setLoadingSubject
              )
            }
            type="button"
          />
        </div>

        {/* Email Body */}
        <div>
          <label className="font-semibold text-gray-300">Email Body</label>
          <textarea
            readOnly
            value={emailText}
            className="border-b border-gray-300 mt-1 mb-4 p-2 w-full min-h-46 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md bg-gray-50 text-gray-800 font-mono text-sm resize-none"
          />
          {copiedEmail && (
            <p className="text-green-400 text-xs md:text-sm my-3 text-center">
              Yay! Email copied! You're one step closer to that offer!
            </p>
          )}
          <Button
            texts={["Copying...", "Copy Email"]}
            loading={loadingEmail}
            onClick={() =>
              copyToClipboard(emailText, setCopiedEmail, setLoadingEmail)
            }
            type="button"
          />
        </div>
      </div>
    </section>
  );
};

export default FollowUp;
