document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".nav-btn");
  const pages = document.querySelectorAll(".tab-content");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-tab");

      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      pages.forEach(page => page.classList.remove("active"));
      document.getElementById(target).classList.add("active");
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  createCharts();
});

function createCharts() {

  new Chart(document.getElementById("caloriesPieChart"), {
    type: "pie",
    data: {
      labels: ["Running", "Cycling", "Gym", "Yoga"],
      datasets: [{
        data: [300, 200, 350, 150]
      }]
    }
  });

  new Chart(document.getElementById("weeklyBarChart"), {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{
        label: "Minutes",
        data: [30, 45, 25, 60, 50, 80, 20]
      }]
    }
  });

  new Chart(document.getElementById("exerciseLineChart"), {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{
        label: "Exercises",
        data: [1, 2, 1, 3, 2, 4, 1],
        fill: false,
        tension: 0.3
      }]
    }
  });

  new Chart(document.getElementById("caloriesPercentChart"), {
    type: "doughnut",
    data: {
      labels: ["Cardio", "Strength", "Sports", "Other"],
      datasets: [{
        data: [40, 35, 15, 10]
      }]
    }
  });

}


document.addEventListener("DOMContentLoaded", () => {
  loadExerciseStats();
});

function loadExerciseStats() {
  const statsBox = document.getElementById("exerciseStats");

  const stats = [
    { label: "Total Workouts", value: "12" },
    { label: "Total Calories Burned", value: "2450 kcal" },
    { label: "Total Duration", value: "420 min" },
    { label: "Average Workout Time", value: "35 min" }
  ];

  statsBox.innerHTML = "";

  stats.forEach(stat => {
    const row = document.createElement("div");
    row.className = "stat-row";

    row.innerHTML = `
      <strong>${stat.label}</strong>
      <span>${stat.value}</span>
    `;

    statsBox.appendChild(row);
  });
}





document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
});
