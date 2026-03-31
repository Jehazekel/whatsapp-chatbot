import { GoogleGenerativeAI } from '@google/generative-ai';
import { options } from './options';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function findBestOption(message: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
A user sent the following message: "${message}"

Here are the available options:
${JSON.stringify(options, null, 2)}

Which option is the best response? Respond with the JSON object of the best option.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const bestOption = JSON.parse(text);
    return bestOption;
  } catch (error) {
    console.error('Error finding best option:', error);
    return null;
  }
}
