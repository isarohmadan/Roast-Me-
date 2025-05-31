"use client";
import { useState, useEffect } from "react";
import { analyzeInstagramProfile } from "../../services/geminiService";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface Analysis {
  title: string;
  profilePicture: string;
  response: string;
}

export default function MainRoast() {
  const [url, setUrl] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [isLayoutShifted, setIsLayoutShifted] = useState(false);

  const searchParams = useSearchParams();

  const getLanguageParam = () => {
    const lang = searchParams.get("language")?.toLowerCase();
    return lang === "bahasa" ? "bahasa" : "english";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowOverlay(true);
    setError("");

    try {
      // Start layout transition
      setIsLayoutShifted(true);
      const mockData: any[] = [
        [
          {
            inputUrl: "https://www.instagram.com/isaramadan24",
            id: "3614125705246171138",
            type: "Image",
            shortCode: "DIn9C4yzmAC",
            caption: "never enough!\nlifting me since 2022",
            hashtags: [],
            mentions: [],
            url: "https://www.instagram.com/p/DIn9C4yzmAC/",
            commentsCount: 4,
            firstComment: "🫶🏻",
            latestComments: [
              {
                id: "17964356609876856",
                text: "🫶🏻",
                ownerUsername: "_dwikiwahyu_",
                ownerProfilePicUrl:
                  "https://instagram.fknu1-5.fna.fbcdn.net/v/t51.2885-19/400456918_304604092380978_4105537237661672266_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fknu1-5.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QGPw0cBRb8A7rkmcvc6ZE3uzFnCY43eXolurFZpSpQ8YIEy5lyE3fhfpSV69Lt0oOY&_nc_ohc=WFtnMulc47IQ7kNvwHr6OQu&_nc_gid=d1GUX6EE_i75SVRuHR0ahw&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfKyLnabU8V-9zNmdjiC2IYE0JTlpWe3e9BgMs8JYRB4Sg&oe=683E32A9&_nc_sid=10d13b",
                timestamp: "2025-04-19T11:35:34.000Z",
                repliesCount: 0,
                replies: [],
                likesCount: 0,
                owner: {
                  id: "27716276758",
                  is_verified: false,
                  profile_pic_url:
                    "https://instagram.fknu1-5.fna.fbcdn.net/v/t51.2885-19/400456918_304604092380978_4105537237661672266_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fknu1-5.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QGPw0cBRb8A7rkmcvc6ZE3uzFnCY43eXolurFZpSpQ8YIEy5lyE3fhfpSV69Lt0oOY&_nc_ohc=WFtnMulc47IQ7kNvwHr6OQu&_nc_gid=d1GUX6EE_i75SVRuHR0ahw&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfKyLnabU8V-9zNmdjiC2IYE0JTlpWe3e9BgMs8JYRB4Sg&oe=683E32A9&_nc_sid=10d13b",
                  username: "_dwikiwahyu_",
                },
              },
              {
                id: "17966673206890051",
                text: "Neh kan",
                ownerUsername: "wedapradnyanaa",
                ownerProfilePicUrl:
                  "https://instagram.fknu1-5.fna.fbcdn.net/v/t51.2885-19/466804464_3531728530460813_1933581901392704902_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fknu1-5.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QGPw0cBRb8A7rkmcvc6ZE3uzFnCY43eXolurFZpSpQ8YIEy5lyE3fhfpSV69Lt0oOY&_nc_ohc=xI0W5TGf4zcQ7kNvwGTSstk&_nc_gid=d1GUX6EE_i75SVRuHR0ahw&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfJjsw0oxwRLEllxN8nNZgUcOcET33AH-AAE68t_nWDxXQ&oe=683E33F0&_nc_sid=10d13b",
                timestamp: "2025-04-19T11:00:34.000Z",
                repliesCount: 0,
                replies: [],
                likesCount: 0,
                owner: {
                  id: "3186476084",
                  is_verified: false,
                  profile_pic_url:
                    "https://instagram.fknu1-5.fna.fbcdn.net/v/t51.2885-19/466804464_3531728530460813_1933581901392704902_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fknu1-5.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QGPw0cBRb8A7rkmcvc6ZE3uzFnCY43eXolurFZpSpQ8YIEy5lyE3fhfpSV69Lt0oOY&_nc_ohc=xI0W5TGf4zcQ7kNvwGTSstk&_nc_gid=d1GUX6EE_i75SVRuHR0ahw&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfJjsw0oxwRLEllxN8nNZgUcOcET33AH-AAE68t_nWDxXQ&oe=683E33F0&_nc_sid=10d13b",
                  username: "wedapradnyanaa",
                },
              },
              {
                id: "18008326124744594",
                text: "Love you guys",
                ownerUsername: "komanggggggggggggg",
                ownerProfilePicUrl:
                  "https://instagram.fknu1-1.fna.fbcdn.net/v/t51.2885-19/500458239_18009913553726316_4106832419979879193_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fknu1-1.fna.fbcdn.net&_nc_cat=100&_nc_oc=Q6cZ2QGPw0cBRb8A7rkmcvc6ZE3uzFnCY43eXolurFZpSpQ8YIEy5lyE3fhfpSV69Lt0oOY&_nc_ohc=nHFLxDIB1B8Q7kNvwGEksg2&_nc_gid=d1GUX6EE_i75SVRuHR0ahw&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfJ_3s55TZjBd8Fc9kPlvnIA7mPRz0ar5OeCF-d28WmAiQ&oe=683E2EEB&_nc_sid=10d13b",
                timestamp: "2025-04-19T10:16:38.000Z",
                repliesCount: 0,
                replies: [],
                likesCount: 0,
                owner: {
                  id: "51762646315",
                  is_verified: false,
                  profile_pic_url:
                    "https://instagram.fknu1-1.fna.fbcdn.net/v/t51.2885-19/500458239_18009913553726316_4106832419979879193_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fknu1-1.fna.fbcdn.net&_nc_cat=100&_nc_oc=Q6cZ2QGPw0cBRb8A7rkmcvc6ZE3uzFnCY43eXolurFZpSpQ8YIEy5lyE3fhfpSV69Lt0oOY&_nc_ohc=nHFLxDIB1B8Q7kNvwGEksg2&_nc_gid=d1GUX6EE_i75SVRuHR0ahw&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfJ_3s55TZjBd8Fc9kPlvnIA7mPRz0ar5OeCF-d28WmAiQ&oe=683E2EEB&_nc_sid=10d13b",
                  username: "komanggggggggggggg",
                },
              },
              {
                id: "18043614143582745",
                text: "never enough!\nlifting me since 2022",
                ownerUsername: "isaramadan24",
                ownerProfilePicUrl:
                  "https://instagram.fknu1-1.fna.fbcdn.net/v/t51.2885-19/357124582_978824550100008_5325490589187639444_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fknu1-1.fna.fbcdn.net&_nc_cat=100&_nc_oc=Q6cZ2QGPw0cBRb8A7rkmcvc6ZE3uzFnCY43eXolurFZpSpQ8YIEy5lyE3fhfpSV69Lt0oOY&_nc_ohc=VK8he61gTakQ7kNvwFJCtl6&_nc_gid=d1GUX6EE_i75SVRuHR0ahw&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfInHs4L0iLSnZHFbidEBs_9eVVNekaOwGrQUDgQfJvygw&oe=683E3C24&_nc_sid=10d13b",
                timestamp: "2025-04-19T10:09:44.000Z",
                repliesCount: 0,
                replies: [],
                likesCount: 0,
                owner: {
                  id: "3607122688",
                  is_verified: false,
                  profile_pic_url:
                    "https://instagram.fknu1-1.fna.fbcdn.net/v/t51.2885-19/357124582_978824550100008_5325490589187639444_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fknu1-1.fna.fbcdn.net&_nc_cat=100&_nc_oc=Q6cZ2QGPw0cBRb8A7rkmcvc6ZE3uzFnCY43eXolurFZpSpQ8YIEy5lyE3fhfpSV69Lt0oOY&_nc_ohc=VK8he61gTakQ7kNvwFJCtl6&_nc_gid=d1GUX6EE_i75SVRuHR0ahw&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfInHs4L0iLSnZHFbidEBs_9eVVNekaOwGrQUDgQfJvygw&oe=683E3C24&_nc_sid=10d13b",
                  username: "isaramadan24",
                },
              },
            ],
            dimensionsHeight: 1080,
            dimensionsWidth: 1080,
            displayUrl:
              "https://instagram.fknu1-5.fna.fbcdn.net/v/t51.2885-15/491457316_18367458646122689_6122635228668741061_n.jpg?stp=dst-jpg_e35_s1080x1080_sh0.08_tt6&_nc_ht=instagram.fknu1-5.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QGPw0cBRb8A7rkmcvc6ZE3uzFnCY43eXolurFZpSpQ8YIEy5lyE3fhfpSV69Lt0oOY&_nc_ohc=7LAXxNR4B2oQ7kNvwFrEZ5G&_nc_gid=d1GUX6EE_i75SVRuHR0ahw&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfKs0S8x0O_StuPokfY65cbQhxcaQNoxHMRAfvhE1FYHGw&oe=683E4548&_nc_sid=10d13b",
            images: [],
            alt: "Photo shared by Isa on April 19, 2025 tagging @tommyanantaa, @_dwikiwahyu_, @komanggggggggggggg, and @orang_ganteng_bangget. May be an image of 3 people, people playing soccer, people playing football and text that says 'ETIHOM AI 0 13'.",
            likesCount: 113,
            timestamp: "2025-04-19T10:09:39.000Z",
            childPosts: [],
            ownerFullName: "Isa",
            ownerUsername: "isaramadan24",
            ownerId: "3607122688",
            isSponsored: false,
            taggedUsers: [
              {
                full_name: "",
                id: "1325978683",
                is_verified: false,
                profile_pic_url:
                  "https://instagram.fknu1-6.fna.fbcdn.net/v/t51.2885-19/476984015_9233503430040879_929100517375648979_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fknu1-6.fna.fbcdn.net&_nc_cat=103&_nc_oc=Q6cZ2QGPw0cBRb8A7rkmcvc6ZE3uzFnCY43eXolurFZpSpQ8YIEy5lyE3fhfpSV69Lt0oOY&_nc_ohc=hxYvG0qdfpcQ7kNvwHUHTI0&_nc_gid=d1GUX6EE_i75SVRuHR0ahw&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfI4uOZyEVxbdPQRtA9knOf1ntSGwoZ8U08wBQ0INTw72Q&oe=683E4BB5&_nc_sid=10d13b",
                username: "tommyanantaa",
              },
              {
                full_name: "Dwiki",
                id: "27716276758",
                is_verified: false,
                profile_pic_url:
                  "https://instagram.fknu1-5.fna.fbcdn.net/v/t51.2885-19/400456918_304604092380978_4105537237661672266_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fknu1-5.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QGPw0cBRb8A7rkmcvc6ZE3uzFnCY43eXolurFZpSpQ8YIEy5lyE3fhfpSV69Lt0oOY&_nc_ohc=WFtnMulc47IQ7kNvwHr6OQu&_nc_gid=d1GUX6EE_i75SVRuHR0ahw&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfKyLnabU8V-9zNmdjiC2IYE0JTlpWe3e9BgMs8JYRB4Sg&oe=683E32A9&_nc_sid=10d13b",
                username: "_dwikiwahyu_",
              },
              {
                full_name: "",
                id: "51762646315",
                is_verified: false,
                profile_pic_url:
                  "https://instagram.fknu1-1.fna.fbcdn.net/v/t51.2885-19/500458239_18009913553726316_4106832419979879193_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fknu1-1.fna.fbcdn.net&_nc_cat=100&_nc_oc=Q6cZ2QGPw0cBRb8A7rkmcvc6ZE3uzFnCY43eXolurFZpSpQ8YIEy5lyE3fhfpSV69Lt0oOY&_nc_ohc=nHFLxDIB1B8Q7kNvwGEksg2&_nc_gid=d1GUX6EE_i75SVRuHR0ahw&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfJ_3s55TZjBd8Fc9kPlvnIA7mPRz0ar5OeCF-d28WmAiQ&oe=683E2EEB&_nc_sid=10d13b",
                username: "komanggggggggggggg",
              },
              {
                full_name: "m. septian jr",
                id: "53600145600",
                is_verified: false,
                profile_pic_url:
                  "https://instagram.fknu1-4.fna.fbcdn.net/v/t51.2885-19/286803775_362127799346000_5475296992311583283_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fknu1-4.fna.fbcdn.net&_nc_cat=108&_nc_oc=Q6cZ2QGPw0cBRb8A7rkmcvc6ZE3uzFnCY43eXolurFZpSpQ8YIEy5lyE3fhfpSV69Lt0oOY&_nc_ohc=U4sonzW6ZuoQ7kNvwGCamtS&_nc_gid=d1GUX6EE_i75SVRuHR0ahw&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfIn4TNE_6VpFLcIbTxq9ZtSKymKxeT2kX68xABd232tvQ&oe=683E225C&_nc_sid=10d13b",
                username: "orang_ganteng_bangget",
              },
            ],
            isPinned: true,
            isCommentsDisabled: false,
          },
        ],
      ];

      const apiResult = await analyzeInstagramProfile(mockData, {
        language: getLanguageParam(),
        url,
      });

      const result = apiResult;
      // Add a slight delay before showing analysis
      await new Promise((resolve) => setTimeout(resolve, 600));
      setAnalysis(result);
    } catch (err) {
      setError("Failed to analyze profile. Please try again.");
      setIsLayoutShifted(false);
      console.error(err);
    } finally {
      setLoading(false);
      setShowOverlay(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-500 z-10
          ${showOverlay ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div className="h-full flex items-center justify-center">
          <div className="animate-bounce text-white text-xl">
            Analyzing your profile...
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6xl overflow-y-auto max-w-full h-full flex items-center">
        <div
          id="main-content-roasting"
          className={`flex flex-row h-fit w-full items-center justify-center p-3
            transition-all duration-500 ease-in-out gap-6
            ${loading ? "overflow-hidden" : ""}`}
        >
          {/* Form Section */}
          <div
            className={`flex-shrink-0 px-4 mx-auto flex flex-col gap-6 justify-between content-between
              transition-all duration-500 ease-in-out
              ${isLayoutShifted ? "w-2/6" : "w-3/6"}
              ${
                loading
                  ? "opacity-0 scale-90 pointer-events-none"
                  : "opacity-100"
              }
              ${analysis ? "w-2/6" : "w-3/6"}`}
          >
            {analysis && (
              <div className="box w-44 h-44 self-center opacity-0 animate-fadeIn relative overflow-hidden">
                <Image
                  src={analysis.profilePicture}
                  alt={`Profile picture`}
                  fill
                  className="object-cover rounded-full hover:box-shadow transition-all duration-300"
                  unoptimized
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/150";
                  }}
                />
              </div>
            )}
            <div
              className={`form-wrapper transition-all duration-500 ease-in-out
                ${isLayoutShifted ? "opacity-100" : "opacity-100"}`}
            >
              <h1 className="text-[64px] mb-6 leading-none font-normal text-[#d70654] text-center text-shadow-xl text-shadow transition-transform duration-300 hover:-translate-y-1">
                Roast Me!
              </h1>
              <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-6">
                <label
                  htmlFor="url"
                  className="col-span-3 py-1 px-6 bg-[#B8D576] box-shadow transition-all duration-300 hover:-translate-y-1"
                >
                  Instagram Url
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className={`button-submit col-span-2 py-1 px-6 text-[#d70654] underline underline-offset-2 
                      bg-[#B8D576] box-shadow disabled:opacity-50 transition-all duration-300 
                      hover:-translate-y-1 active:translate-y-0 ${
                        loading ? "animate-pulse" : ""
                      }`}
                >
                  {loading ? "Analyzing..." : "ROAST!"}
                </button>
                <textarea
                  id="url"
                  name="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="col-span-5 py-3 px-6 bg-[#d9d9d9] box-shadow transition-all duration-300 
                      focus:ring-2 focus:ring-[#d70654] focus:bg-[#e5e5e5]"
                  placeholder="Enter Instagram URL"
                  required
                />
              </form>
            </div>
          </div>

          {(error || analysis) && !loading && (
            <div
              className={`flex-1 w-full max-w-6xl mx-auto transition-all duration-500 ease-out
                ${
                  isLayoutShifted
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-full pointer-events-none"
                }
                ${loading ? "opacity-0 scale-90" : "opacity-100"}`}
            >
              <div className="grid grid-cols-1 gap-8">
                {error && (
                  <div className="p-4 bg-red-100 text-red-700 rounded animate-shake">
                    {error}
                  </div>
                )}

                {analysis && (
                  <div className="bg-white rounded-lg shadow-lg p-6 opacity-0 animate-fadeIn">
                    <h2 className="text-2xl font-bold mb-4 text-[#d70654] transition-transform duration-300 hover:-translate-y-1">
                      {analysis.title}
                    </h2>
                    <div className="whitespace-pre-wrap overflow-y-auto max-h-[60vh] pb-24 pt-3">
                      {analysis.response}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
