document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const message = document.getElementById("message");
    // ...

// Middleware for serving static files (e.g., HTML, CSS, and JavaScript)
app.use(express.static(__dirname + '/public'));

// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Define a route to handle form submissions
app.post('/submit-form', (req, res) => {
  // ... (rest of your form submission code)
});

// ...

  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const formData = new FormData(form);
      const response = await fetch("/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        form.reset();
        message.textContent = "Form data saved successfully!";
        message.style.color = "green";
      } else {
        message.textContent = "Error saving form data.";
        message.style.color = "red";
      }
    });
  });
  