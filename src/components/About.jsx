import React from "react";
import { FiCheckCircle, FiInfo } from "react-icons/fi";

const features = [
  "Track and manage all your applications in one place",
  "Set reminders and follow up with ease",
  "Access curated resources for resumes, interviews, and more",
  "Stay organized with a clean, user-friendly dashboard",
];

const About = () => {
  return (
    <section className="flex justify-center items-center min-h-[70vh] mt-10 bg-transparent">
      <div className="max-w-4xl w-full text-gray-200">
        <h1 className="text-3xl md:text-5xl text-center font-bold text-blue-500 mb-4">
          About ReachOut
        </h1>
        <p className="text-center text-gray-400 mb-10">
          Your trusted companion for managing job and program applications.
        </p>

        <p className="mb-8 text-lg leading-relaxed">
          <span className="font-semibold text-blue-400">ReachOut</span> is your all-in-one companion for managing job and program applications. Our mission is to help you stay organized, follow up professionally, and access the best resources for every step of your journey.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900/80 rounded-2xl shadow-xl p-8 hover:scale-110 transition duration-300">
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <FiCheckCircle size={20} className="text-green-500" />
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-900/80 rounded-2xl shadow-xl p-8 hover:scale-110 transition duration-300">
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <FiInfo size={20} className="text-yellow-400" />
              Why ReachOut?
            </h2>
            <p className="leading-relaxed">
              Applying for jobs and programs can be overwhelming. ReachOut simplifies the process, so you can focus on what matters most-putting your best foot forward. Whether you're a student, a job seeker, or a professional, ReachOut is designed to support you at every stage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
