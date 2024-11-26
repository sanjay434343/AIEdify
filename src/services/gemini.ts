const GEMINI_API_KEY = 'AIzaSyBcZ_QIdnwHz9jPXyo2NFKOhmsCoRgi5uo';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

export async function generateCode(prompt: string): Promise<string> {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate a complete web component with HTML, CSS, and JavaScript code. 
                   Format the response with code blocks using markdown syntax:
                   \`\`\`html
                   HTML code here
                   \`\`\`
                   \`\`\`css
                   CSS code here
                   \`\`\`
                   \`\`\`javascript
                   JavaScript code here
                   \`\`\`
                   For the following prompt: ${prompt} and always make the html with linking the script.js and the always style.css not styles`
          }]
        }]
      })
    });

    if (response.status === 401) {
      throw new Error('Authentication failed. Please check your API key.');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate code: ${error.message}`);
    }
    throw new Error('Failed to generate code');
  }
}