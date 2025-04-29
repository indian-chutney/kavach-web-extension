async function getData() {
  try {
    const result = await browser.storage.local.get(["sites-blocked"]);
    console.log("value has been located", result["sites-blocked"]);
    return result["sites-blocked"];
  } catch (err) {
    console.log("value has not been located", err);
    return 0;
  }
}

async function displayBlocked() {
  let display_value = await getData();
  document.getElementById("block-sites").innerText = display_value;
}

document.addEventListener("DOMContentLoaded", async (event) => {
  await browser.storage.local.set({ "sites-blocked": 5 });
  await displayBlocked();
  console.log("popup.js loaded");
});
