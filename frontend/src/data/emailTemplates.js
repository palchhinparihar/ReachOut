export const emailTemplates = {
  Accepted: ({ company, role, name }) => `
Hi Hiring Team,

Thank you so much for the opportunity! I’m delighted to accept the offer for the ${role} position at ${company}.
I truly appreciate the trust you’ve placed in me and look forward to contributing to the team.

Please let me know the next steps.

Best regards,  
${name}
`,

  Rejected: ({ company, role, name }) => `
Hi Hiring Team,

Thank you for informing me about your decision regarding the ${role} position at ${company}.
I appreciate the opportunity to interview and learn more about your team.

If possible, I would be grateful for any feedback you could share.

Best regards,  
${name}
`,

  Interview: ({ company, role, name }) => `
Hi Hiring Team,

Thank you for taking the time to speak with me about the ${role} position at ${company}.
I really enjoyed our discussion and learning more about the team and role.

Please feel free to reach out if you need any additional information from my side.

Best,  
${name}
`,

  Applied: ({ company, role, name, days }) => `
Hi Hiring Team,

I hope you’re doing well. I wanted to follow up on my application for the ${role} position at ${company}.
It has been ${days} days since I applied, and I remain very interested in the opportunity.

Thank you for your time.

Best regards,  
${name}
`,
};
