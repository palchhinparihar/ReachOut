import React from 'react';

const motivationalQuotes = [
  "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
  "Your limitation - it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn't just find you. You have to go out and get it.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Don't stop when you're tired. Stop when you're done."
];

function getRandomQuote() {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
}

const Dashboard = () => {
  const quote = getRandomQuote();
  return (
    <div className="flex flex-col items-center text-center justify-center min-h-[70vh] rounded-2xl shadow-lg p-8 mt-8">
      <h1 className="text-3xl md:text-8xl font-bold text-blue-500 mb-4">Welcome to ReachOut!</h1>
      <p className="text-lg italic text-indigo-500 mb-6 text-center">{quote}</p>
      <p className="text-base text-gray-400">We hope you have a wonderful and productive day!</p>
    </div>
  );
};

export default Dashboard;
