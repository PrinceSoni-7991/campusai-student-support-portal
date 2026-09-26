const toast = document.getElementById("toast");
const chatBody = document.getElementById("chatBody");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function addMessage(text, type) {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  chatBody.appendChild(message);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getDemoReply(question) {
  const text = question.toLowerCase();
  if (text.includes("resource") || text.includes("study")) {
    return "You can explore Web Development, Introduction to AI, and Resume & Interview Prep in the Study Resources section.";
  }
  if (text.includes("event")) {
    return "Upcoming demo events include an AI & Automation Workshop, Resume Building Session, and Student Community Meetup.";
  }
  if (text.includes("career") || text.includes("interview") || text.includes("resume")) {
    return "Start with a clear one-page resume, highlight projects, and practice explaining your work using the STAR method.";
  }
  return "Thanks for your question! This is currently a demo assistant. You can connect this interface to IBM watsonx Orchestrate later.";
}

function handleQuestion(question) {
  if (!question.trim()) return;
  addMessage(question, "user");
  window.setTimeout(() => addMessage(getDemoReply(question), "bot"), 450);
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = chatInput.value.trim();
  chatInput.value = "";
  handleQuestion(question);
});

document.querySelectorAll("[data-question]").forEach((button) => {
  button.addEventListener("click", () => handleQuestion(button.dataset.question));
});

document.querySelectorAll(".event-button").forEach((button) => {
  button.addEventListener("click", () => {
    button.textContent = "Added ✓";
    button.disabled = true;
    showToast("Demo registration saved locally for this session.");
  });
});

document.getElementById("profileButton").addEventListener("click", () => {
  showToast("Student profile preview — connect your backend later.");
});
