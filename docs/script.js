document.addEventListener("DOMContentLoaded", function () {
    const textList = document.getElementById("text-list");

    const texts = [
        "Dagon.txt",
        "Call_Of_Cthulhu.txt",
        "The_Colour_Out_Of_Space.txt",
        "The_Rats_In_The_Walls.txt",
        "At_The_Mountains_Of_Madness.txt"
    ];

    texts.forEach(text => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");

        const fileUrl = `writing.html?text=${encodeURIComponent(text)}`;

        link.href = fileUrl;
        link.textContent = text.replace(".txt", "").replace(/_/g, " ");

        listItem.appendChild(link);
        textList.appendChild(listItem);

        // Make the entire card clickable
        listItem.addEventListener("click", () => {
            window.location.href = fileUrl;
        });
    });
});
