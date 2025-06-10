
document.addEventListener("DOMContentLoaded", function () {
    const activityContainer = document.getElementById("activitiesContainer");

    // Încărcare activități la pornirea paginii
    function loadActivities() {
        activityContainer.innerHTML = ""; 
        let savedActivities = JSON.parse(localStorage.getItem("activities")) || [];
        savedActivities.forEach((activity, index) => addActivityToPage(activity, index, false));
    }

    // Adaugă activitate pe pagină
    function addActivityToPage(activity, index, save = true) {
        let newActivity = document.createElement("div");
        newActivity.classList.add("activity");
        newActivity.setAttribute("data-index", index);

        newActivity.innerHTML = `
            <div class="activity-img-container">
                <img src="${activity.imgSrc}" alt="${activity.title}" class="activity-img">
            </div>
            <div class="activity-content">
                <h2>${activity.title}</h2>
                <p class="activity-description">${activity.text}</p>
                <div class="activity-links">
                    <a href="${activity.link}" target="_blank">Citește mai multe</a>
                </div>
            </div>
            <button class="delete-btn" data-index="${index}">
                <img src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" alt="Șterge">
            </button>
        `;

        activityContainer.prepend(newActivity);

        if (save) {
            let savedActivities = JSON.parse(localStorage.getItem("activities")) || [];
            savedActivities.unshift(activity);
            localStorage.setItem("activities", JSON.stringify(savedActivities));
            loadActivities();
        }
    }

    // Ștergerea activităților
    function deleteActivity(index) {
        let savedActivities = JSON.parse(localStorage.getItem("activities")) || [];
        savedActivities.splice(index, 1);
        localStorage.setItem("activities", JSON.stringify(savedActivities));
        loadActivities();
    }

    // Delegare eveniment pentru ștergere
    activityContainer.addEventListener("click", function (event) {
        let deleteBtn = event.target.closest(".delete-btn");
        if (deleteBtn) {
            let index = deleteBtn.getAttribute("data-index");
            deleteActivity(index);
        }
    });

    // Afișare formular
    document.getElementById("addActivityBtn").addEventListener("click", function () {
        document.getElementById("activityForm").style.display = "block";
    });

    // Gestionarea formularului
    document.getElementById("activityForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let activity = {
            title: document.getElementById("activityTitle").value,
            imgSrc: document.getElementById("activityImage").value,
            text: document.getElementById("activityText").value,
            link: document.getElementById("activityLink").value
        };

        addActivityToPage(activity, 0, true);

        document.getElementById("activityForm").reset();
        document.getElementById("activityForm").style.display = "none";
    });

    // Încărcare activități la pornire
    loadActivities();
});














