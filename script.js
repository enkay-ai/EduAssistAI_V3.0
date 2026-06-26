const API_URL = "https://script.google.com/macros/s/AKfycby6UEepf5lQ6rpCLNto8eD78_PuvD55r9djL-BLBb8AiuNVo1zRW40Xamf8KGOx7FhI/exec";

window.onload = function () {
  loadClasses();
};

async function apiRequest(payload) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  });

  return await response.json();
}

async function loadClasses() {
  const classSelect = document.getElementById("classSelect");

  try {
    const data = await apiRequest({ action: "getClasses" });

    if (!data.success) {
      throw new Error(data.error);
    }

    classSelect.innerHTML = `<option value="">Select Class</option>`;

    data.classes.forEach(className => {
      const option = document.createElement("option");
      option.value = className;
      option.textContent = className;
      classSelect.appendChild(option);
    });

  } catch (error) {
    classSelect.innerHTML = `<option>Unable to load classes</option>`;
    document.getElementById("status").textContent = error.message;
  }
}

document.getElementById("classSelect").addEventListener("change", async function () {
  const classSelected = this.value;
  const studentSelect = document.getElementById("studentSelect");

  studentSelect.innerHTML = `<option>Loading students...</option>`;

  const data = await apiRequest({
    action: "getStudents",
    classSelected: classSelected
  });

  if (!data.success) {
    studentSelect.innerHTML = `<option>Unable to load students</option>`;
    return;
  }

  studentSelect.innerHTML = `<option value="">Select Student</option>`;

  data.students.forEach(student => {
    const option = document.createElement("option");
    option.value = student.StudentName;
    option.textContent = `${student.StudentName} — ${student.SENDNeed}`;
    studentSelect.appendChild(option);
  });
});

async function generateResource() {
  const status = document.getElementById("status");
  const result = document.getElementById("result");

  result.style.display = "none";
  status.textContent = "Generating personalised resource...";

  const payload = {
    action: "generateResource",
    classSelected: document.getElementById("classSelect").value,
    studentName: document.getElementById("studentSelect").value,
    topic: document.getElementById("topic").value,
    lessonObjective: document.getElementById("lessonObjective").value,
    resourcesUsed: document.getElementById("resourcesUsed").value,
    additionalNotes: document.getElementById("additionalNotes").value
  };

  try {
    const data = await apiRequest(payload);

    if (!data.success) {
      throw new Error(data.error);
    }

    status.textContent = "Resource generated successfully.";

    result.style.display = "block";
    result.innerHTML = `
      <h3>Generated Resource</h3>
      <p><strong>${data.fileName}</strong></p>
      <a href="${data.fileUrl}" target="_blank">Open PDF</a>
    `;

  } catch (error) {
    status.textContent = "Error: " + error.message;
  }
}const API_URL = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";

window.onload = function () {
  loadClasses();
};

async function apiRequest(payload) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  });

  return await response.json();
}

async function loadClasses() {
  const classSelect = document.getElementById("classSelect");

  try {
    const data = await apiRequest({ action: "getClasses" });

    if (!data.success) {
      throw new Error(data.error);
    }

    classSelect.innerHTML = `<option value="">Select Class</option>`;

    data.classes.forEach(className => {
      const option = document.createElement("option");
      option.value = className;
      option.textContent = className;
      classSelect.appendChild(option);
    });

  } catch (error) {
    classSelect.innerHTML = `<option>Unable to load classes</option>`;
    document.getElementById("status").textContent = error.message;
  }
}

document.getElementById("classSelect").addEventListener("change", async function () {
  const classSelected = this.value;
  const studentSelect = document.getElementById("studentSelect");

  studentSelect.innerHTML = `<option>Loading students...</option>`;

  const data = await apiRequest({
    action: "getStudents",
    classSelected: classSelected
  });

  if (!data.success) {
    studentSelect.innerHTML = `<option>Unable to load students</option>`;
    return;
  }

  studentSelect.innerHTML = `<option value="">Select Student</option>`;

  data.students.forEach(student => {
    const option = document.createElement("option");
    option.value = student.StudentName;
    option.textContent = `${student.StudentName} — ${student.SENDNeed}`;
    studentSelect.appendChild(option);
  });
});

async function generateResource() {
  const status = document.getElementById("status");
  const result = document.getElementById("result");

  result.style.display = "none";
  status.textContent = "Generating personalised resource...";

  const payload = {
    action: "generateResource",
    classSelected: document.getElementById("classSelect").value,
    studentName: document.getElementById("studentSelect").value,
    topic: document.getElementById("topic").value,
    lessonObjective: document.getElementById("lessonObjective").value,
    resourcesUsed: document.getElementById("resourcesUsed").value,
    additionalNotes: document.getElementById("additionalNotes").value
  };

  try {
    const data = await apiRequest(payload);

    if (!data.success) {
      throw new Error(data.error);
    }

    status.textContent = "Resource generated successfully.";

    result.style.display = "block";
    result.innerHTML = `
      <h3>Generated Resource</h3>
      <p><strong>${data.fileName}</strong></p>
      <a href="${data.fileUrl}" target="_blank">Open PDF</a>
    `;

  } catch (error) {
    status.textContent = "Error: " + error.message;
  }
}
