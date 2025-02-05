document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const textFile = urlParams.get("text");
    const textTitle = document.getElementById("text-title");
    const textContent = document.getElementById("text-content");
    const textEntry = document.getElementById("typing-input");
    const typingLabel = document.getElementById("typing-label");
    const modeSwitch = document.getElementById("mode-switch");
    const snippetSize = 50; // Limit snippet to 50 words
    let textArray = [];
    let currentSnippetIndex = 0;

    if (textFile) {
        textTitle.textContent = textFile.replace(".txt", "").replace(/_/g, " ");
        fetch(`texts/${textFile}`)
            .then(response => response.text())
            .then(text => {
                textArray = text.split(/\s+/); // Split text into words
                displaySnippet();
            })
            .catch(error => {
                textContent.textContent = "Error loading text.";
            });
    }

    function displaySnippet() {
        const snippet = textArray.slice(currentSnippetIndex, currentSnippetIndex + snippetSize).join(" ");
        textContent.textContent = snippet;
    }

    modeSwitch.addEventListener("change", function () {
        toggleMode(modeSwitch.checked ? "Typing Mode" : "Handwriting Mode");
    });

    document.getElementById("next-snippet").addEventListener("click", nextSnippet);
    document.getElementById("prev-snippet").addEventListener("click", previousSnippet);

    function nextSnippet() {
        if (currentSnippetIndex + snippetSize < textArray.length) {
            currentSnippetIndex += snippetSize;
            displaySnippet();
        }
    }

    function previousSnippet() {
        if (currentSnippetIndex - snippetSize >= 0) {
            currentSnippetIndex -= snippetSize;
            displaySnippet();
        }
    }
});

function toggleMode(mode) {
    const textEntry = document.getElementById("typing-input");
    const typingLabel = document.getElementById("typing-label");

    if (mode === "Typing Mode") {
        textEntry.style.display = "block";
        typingLabel.style.display = "block";
    } else if (mode === "Handwriting Mode") {
        textEntry.style.display = "none";
        typingLabel.style.display = "none";
    }
}

function goBack() {
    window.history.back();
}