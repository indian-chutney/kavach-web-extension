async function isMalicious(input_url) {
  const API_KEY = "AIzaSyB4CQsI30LM3PRn4wMzYaPX6xnEdrQHJog";
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

async function test() {
  const input_url = "http://malware.testing.google.test/testing/malware/";
  const res = await isMalicious(input_url);
  console.log(res);
}

test();
