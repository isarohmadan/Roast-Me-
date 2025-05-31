export default async function scrapDataApify(url: string) {
  const token = process.env.APIFY_TOKEN;

  if (!token) {
    return {
      error: {
        type: "configuration-error",
        message:
          "API token is not configured. Please check your environment variables.",
      },
    };
  }

  try {
    // First, start the scraper run
    const startUrl = `https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync-get-dataset-items?token=${token}`;

    console.log("Starting scraper with URL:", url);

    const response = await fetch(startUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addParentData: false,
        directUrls: [url],
        enhanceUserSearchWithFacebookPage: false,
        isUserReelFeedURL: false,
        isUserTaggedFeedURL: false,
        resultsLimit: Number(process.env.APIFY_MAX_RESPONSE) || 3,
        resultsType: "posts",
        searchLimit: 1,
        searchType: "user",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Response Error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`
      );
    }

    const data = await response.json();
    console.log("Scraper Response:", data);

    // Check if we got an empty result
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return {
        error: {
          type: "user-or-token-not-found",
          message:
            "No data found for the provided Instagram URL. The account might be private or not exist.",
        },
      };
    }

    // Handle Apify specific error responses
    if (Array.isArray(data) && data[0]?.error === "no_items") {
      return {
        error: {
          type: "user-or-token-not-found",
          message: "Empty or private data for provided input",
        },
      };
    }

    return data;
  } catch (error) {
    console.error("Apify API Error:", error);
    return {
      error: {
        type: "api-error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch data from API",
      },
    };
  }
}

// refference for the error response
// [
//     {
//       "url": "https://www.instagram.com/brandon_isato",
//       "requestErrorMessages": [],
//       "error": "no_items",
//       "errorDescription": "Empty or private data for provided input"
//     }
//   ]
