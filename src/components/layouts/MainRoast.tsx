"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import ImageDefault from "@assets/images/isa.png";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    if (error) {
      // Wait for 3 seconds before redirecting
      const timer = setTimeout(() => {
        router.push("/");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, router]);

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

      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          language: getLanguageParam(),
        }),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error.message || "An error occurred");
      }

      // Add delay for smooth transition
      await new Promise((resolve) => setTimeout(resolve, 600));
      setAnalysis(result);
    } catch (err) {
      setIsLayoutShifted(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
      console.error("Error:", err);
    } finally {
      setLoading(false);
      setShowOverlay(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-500 z-10
          ${
            showOverlay || error
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="h-full flex items-center justify-center">
          {loading ? (
            <div className="animate-bounce text-white text-xl">
              Analyzing your profile...
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 rounded-lg shadow-lg p-6 max-w-md w-full mx-4 animate-shake">
              <p className="text-lg font-semibold mb-2">{error}</p>
              <p className="text-sm text-red-600">
                Redirecting to home page in 3 seconds...
              </p>
            </div>
          ) : null}
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
                  src={`/api/image?url=${encodeURIComponent(
                    analysis.profilePicture
                  )}`}
                  alt={`Profile picture`}
                  fill
                  className="object-cover rounded-full hover:box-shadow transition-all duration-300"
                  unoptimized
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = ImageDefault.src;
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
              <form
                onSubmit={handleSubmit}
                method="POST"
                className="grid grid-cols-5 gap-6"
              >
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
                {analysis && (
                  <div className="bg-white rounded-lg shadow-lg p-6 opacity-0 animate-fadeIn">
                    <h2 className="text-2xl font-bold mb-4 text-[#d70654] transition-transform duration-300 hover:-translate-y-1">
                      {analysis.title}
                    </h2>
                    <div
                      className="whitespace-pre-wrap flex flex-col gap-4 overflow-y-auto max-h-[60vh] pb-20 pt-3"
                      dangerouslySetInnerHTML={{ __html: analysis.response }}
                    />
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
