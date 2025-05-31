import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI with the correct configuration
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

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
    console.log(params.language);
    let promptLanguage: string;
    if (params.language === "bahasa") {
      promptLanguage = `Kamu adalah seorang analis media sosial. Tolong analisis data postingan Instagram ini dan berikan:
      1. Penilaian kepribadian berdasarkan konten
      2. Pola engagement yang terlihat (likes, komentar, gaya interaksi, bio ,foto profil dan gambar postingannya)
      3. Roasting yang pedas tentang mereka di media sosial, buatlah terdengar seperti teman yang "gen Z" 
      4. Kritik agak pedas tapi membangun
      5. Jangan lebih dari 500 kata
      6. Berikan output dalam format JSON seperti ini:
      {
      "title":"<judul yang pendek dan pedas>",
      "profilePicture":"https://unavatar.io/instagram/${username}",
      "response":"<semua responmu dalam format tag paragraf html>"

      buat agar fluent saja nanti responsenya. gaperlu pake 1. atau 2. atau 3. atau 4. atau 5. atau 6.
      masukan juga roasting tentang gambar postingannya.
      langsung kasih responsenya saja. tapi dalam bentuk html paragraph tags
      dan pakai bahasa yang mirip dengan orang denpasar bali. kalo bisa skena.
      tekankan penggunaan bahasa gaul denpasar kayak : "ke" yang dimana mirip dengan "kamu" , "Cang" dimana mirip dengan "aku", "Nok", "Kle" tapi jangan terlalu kaku
      kalo bisa skena.
      judul response tiap poin tidak perlu kaku seperti contoh nomor 5, Jangan pakai judul yang mirip atau bahkan tidak usah juga tidak apa apa. Langsung saja.

      pas memulai responsenya seperti ini:  " WE! Cang Isa Uling Denpasar, yaaa walau aku asli jawe. eniwei, Cang suka rosting orang (Aku Isa dari denpasar, yaa walau aku bukan berasal dari denpasar tapi ngomong ngomong aku suka roasting orang) 

      }`;
    } else {
      promptLanguage = `You are a social media analyst. Please analyze this Instagram post data and provide:
      1. A personality assessment based on the content
      2. Notable engagement patterns (likes, comments, interaction style, bio and profile picture)
      3. A spicy roast about their social media presence make it sound like a friend which are "gen Z" 
      4. Suggestions for improvement but make it harshly
      5. can you make it not exceed 500 words
      6. Can you make it json output like this:
      {
      "title":"<this is the title. but make it short, spicy>",
      "profilePicture":"https://unavatar.io/instagram/${username}",
      "response":"<all of your response but written in html paragraph tags>"

      make it fluent, don't use 1. or 2. or 3. or 4. or 5. or 6. make it like a friend
      but still in html paragraph tags
      make it sounds like a friend from somewhere in New York, or England, or Australia, or Canada, or somewhere in the United States and Britain

      every response doesn't need to be like the example number 5, don't use title like the example number 5, just make it short and spicy

      untuk roasting ala gen z pada nomor 3, kalau bisa tidak usah pakai judul. Langsung aja roasting orangnya atau ejek aja.
      }`;
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
