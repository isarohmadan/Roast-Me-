import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI with the correct configuration
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
console.log(process.env.GEMINI_API_KEY);
interface InstagramComment {
  text: string;
  ownerUsername: string;
  timestamp: string;
}

interface InstagramPost {
  inputUrl: string;
  caption: string;
  commentsCount: number;
  likesCount: number;
  comments: InstagramComment[];
  ownerUsername: string;
  timestamp: string;
  alt?: string;
}

interface Analysis {
  title: string;
  profilePicture: string;
  response: string;
}

interface AnalyzeParams {
  language?: "english" | "bahasa";
  url?: string;
}

export async function analyzeInstagramProfile(
  data: any[],
  params: AnalyzeParams = { language: "english" }
): Promise<Analysis> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const username = data[0][0]?.ownerUsername || "";
    let promptLanguage: string;
    if (params.language === "bahasa") {
      promptLanguage = `Analisis akun Instagram ini dan buat output seperti berikut:

1. Mulai dengan kalimat pembuka: "we, jangan baperr ya -isa"
2. Lanjutkan dengan analisis kepribadian berdasarkan konten yang diposting.
3. Jelaskan pola engagement mereka (likes, komentar, cara mereka berinteraksi, isi bio, foto profil, dan gaya gambar postingannya).
4. Tambahkan roasting yang pedas dan lucu, seperti teman Gen Z yang blak-blakan, tapi tetap terasa akrab dan dari hati. Roasting harus menyentil gaya gambar postingannya juga.
5. Berikan kritik yang agak pedas tapi membangun. Jangan terlalu halus, tapi tetap kasih solusi atau saran yang bisa mereka ambil.
6. Gunakan bahasa Indonesia dengan gaya Denpasar Bali yang skena — campurkan kata-kata seperti "ke", "Cang", "Nok", "kle", tapi jangan terlalu dipaksakan atau kaku. Harus terdengar alami dan gaul seperti ngobrol sama teman tongkrongan.
7. Jangan buat seperti poin-poin atau daftar. Semua harus dalam bentuk paragraf, mengalir dan seperti cerita.
8. Batasi total panjang respons tidak lebih dari 500 kata.
9. Format output harus dalam JSON seperti ini:

{
  "title": "<judul yang pendek dan pedas, dengan nada Gen Z>",
  "profilePicture": <return the url of the profile picture of the owner with the key profile_pic_url>,
  "response": "<semua respons dalam format HTML <p>...<p>>"
}

Jangan tambahkan elemen atau struktur lain di luar JSON tersebut. Output harus langsung berupa JSON sesuai format di atas dan tidak mengandung penjelasan tambahan.


      }`;
    } else {
      promptLanguage = `You are a social media analyst. Please analyze this Instagram post data and provide the following in a fun, Gen Z tone:

1. Start your response with: "don't take it seriously thooo -isa"
2. Give a personality assessment based on their content and post style.
3. Describe notable engagement patterns: likes, comments, interaction style, their bio, profile picture, and aesthetic choices.
4. Include a spicy roast of their overall social media vibe. Make it sound like a brutally honest Gen Z friend from New York, London, Sydney, Toronto, or somewhere in the US or UK. Be funny, but not evil. Focus especially on roasting the images they post.
5. Add some harsh, but constructive suggestions for improvement — no sugarcoating. Think “tough love”.
6. Limit the total response to no more than 500 words.
7. Format your output as JSON in the exact format below:

{
  "title": "<this is the title. but make it short, spicy>",
  "profilePicture": <return the url of the profile picture of the owner with the key profile_pic_url>,
  "response": "<all of your response written as HTML <p>...</p> tags. No numbered lists or section titles, just natural flowing paragraphs. No need to label the roast, just roast them directly as part of the flow. Make it feel like a conversation with a cheeky but real friend.>"
}

Do not add any explanation or extra structure outside the JSON above. The tone must feel like a casual friend from the US, UK, or Australia — fluent, fun, sarcastic if needed, but still grounded. Do not use any list format or headers. Just write in paragraphs inside <p> tags.
`;
    }

    const prompt = `${promptLanguage}

    Here's the data to analyze:
    ${JSON.stringify(data, null, 2)}
    

    Please format your response in a clear, engaging way with emojis and sections.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Extract the JSON from the response text
    const text = response.text();
    console.log(response);

    // Try to find JSON in the response
    let jsonStr = text;

    // If the response is wrapped in code blocks, extract it
    const jsonMatch = text.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
    }

    // Clean up any potential issues
    jsonStr = jsonStr.trim();

    try {
      const analysis: Analysis = JSON.parse(jsonStr);

      // Ensure all required fields are present
      if (!analysis.title || !analysis.profilePicture || !analysis.response) {
        throw new Error("Missing required fields in the response");
      }

      // If profile picture URL is invalid or missing, use unavatar.io
      if (
        !analysis.profilePicture ||
        analysis.profilePicture.includes("<") ||
        analysis.profilePicture.includes(">")
      ) {
        analysis.profilePicture = `https://unavatar.io/instagram/${username}`;
      }

      return analysis;
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);

      // Fallback response if parsing fails
      const errorMessage =
        params.language === "bahasa"
          ? "<p>Maaf, saya tidak bisa menganalisis profil ini dengan benar. Silakan coba lagi!</p>"
          : "<p>Sorry, I couldn't analyze this profile properly. Please try again!</p>";

      return {
        title:
          params.language === "bahasa"
            ? "Analisis Gagal 😅"
            : "Analysis Failed 😅",
        profilePicture: `https://unavatar.io/instagram/${username}`,
        response: errorMessage,
      };
    }
  } catch (error) {
    console.error("Error analyzing Instagram profile:", error);
    throw error;
  }
}
