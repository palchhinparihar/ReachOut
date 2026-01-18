import React from "react";
import { tips } from "@/data/coverLetterData";

const CoverLetterHelp = () => (
  <section className="min-h-[70vh] flex justify-center items-start px-4 py-10">
    <div className="max-w-4xl w-full rounded-xl shadow-lg p-6 md:p-8">
      {/* Header */}
      <h1 className="text-3xl md:text-5xl text-center font-bold text-blue-500 mb-4">
        Cover Letter Writing Tips
        </h1>
        <p className="text-center text-gray-400 mb-10">
          Crafting a compelling cover letter can set you apart from other candidates. Here are some essential tips to help you write an effective cover letter.
        </p>

      {/* Tips */}
      <div className="grid gap-4">
        {tips.map((tip, index) => (
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
        Want a detailed guide with examples? Check out{" "}
        <a
          href="https://www.livecareer.com/resources/cover-letters/how-to/write"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 underline hover:text-blue-300 transition"
        >
          LiveCareer's Cover Letter Guide
        </a>
        .
      </div>
    </div>
  </section>
);

export default CoverLetterHelp;
