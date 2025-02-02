import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "nextjs-career",name:"Nextjs Career" ,
    credentials: {
        gemini: {
          apiKey: process.env.GEMINI_API_KEY,
        },
      },
});
