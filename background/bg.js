console.log("BACKGROUND SCRIPT LOADED - " + new Date().toISOString());

async function isMalicious(input_url) {
  const API_KEY = "secret_key";
  const url = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client: {
          clientId: "kavach-ext",
          clientVersion: "1.5.2",
        },
        threatInfo: {
          threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
          platformTypes: ["WINDOWS"],
          threatEntryTypes: ["URL"],
          threatEntries: [{ url: input_url }],
        },
      }),
    });

    const result = await res.json();

    console.log("API request completed");

    if (Object.keys(result).length == 0) {
      return { message: "safe website(verified by google api)" };
    } else {
      const threat = result.matches[0];
      return {
        message: "unsafe",
        threatType: threat.threatType,
        platformType: threat.platformType,
        threatEntryType: threat.threatEntryType,
      };
    }
  } catch (err) {
    console.log("error in response");
    return { message: err };
  }
}

async function load_warning(threatType, platformType, threatEntryType) {
  try {
    await browser.tabs.update({
      url:
        browser.runtime.getURL("warning/warning.html") +
        "?threatType=" +
        encodeURIComponent(threatType) +
        "&platformType=" +
        encodeURIComponent(platformType) +
        "&threatEntryType=" +
        encodeURIComponent(threatEntryType),
    });
  } catch (err) {
    return { message: err };
  }
}

async function listener(details) {
  console.log("Intercepted request to : " + details.url);
  const input_url = details.url;
  try {
    const res = await isMalicious(input_url);
    if (res.message == "unsafe") {
      console.log("bad urll");
      load_warning(res.threatType, res.platformType, res.threatEntryType);

      return { cancel: true };
    } else {
      console.log("good url");
      return { cancel: false };
    }
  } catch (err) {
    console.log("err : " + err);
    return { cancel: false };
  }
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  { urls: ["<all_urls>"], types: ["main_frame"] },
  ["blocking"],
);
