import React from "react";
import { interviewTips } from "@/data/interviewTips";

const InterviewPrep = () => (
  <section className="min-h-[70vh] flex justify-center items-start px-4 py-10">
    <div className="max-w-4xl w-full rounded-xl shadow-lg p-6 md:p-8">
      {/* Header */}
      <h1 className="text-3xl md:text-5xl text-center font-bold text-blue-500 mb-4">
        Interview Preparation Tips
      </h1>
      <p className="text-center text-gray-400 mb-10">
        A little preparation goes a long way. Use these tips to feel confident
        and perform your best during interviews.
      </p>

      {/* Tips */}
      <div className="grid gap-4">
        {interviewTips.map((tip, index) => (
          <div
            key={index}
            data-aos="fade-up"
            className="bg-black/40 border border-gray-600 rounded-lg p-4"
          >
            <h3 className="font-semibold text-blue-400 mb-1">
              {index + 1}. {tip.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {tip.desc}
            </p>
          </div>
        ))}
      </div>

      {/* External Resource */}
      <div className="mt-8 text-sm text-gray-400">
        Want more in-depth guidance? Check out{" "}
        <a
          href="https://www.indeed.com/career-advice/interviewing"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 underline hover:text-blue-300 transition"
        >
          Indeed’s Interview Advice
        </a>
        .
      </div>
    </div>
  </section>
);

export default InterviewPrep;
