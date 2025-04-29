document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);

  document.getElementById("info").innerText = `
    threatType : ${urlParams.get("threatType")}
    platformType : ${urlParams.get("platformType")}
    threatEntryType : ${urlParams.get("threatEntryType")}`;

  document.getElementById("go-back").addEventListener("click", () => {
    window.history.back();
  });
});
