document.getElementById("saveBtn").addEventListener("click", () => {
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    phone: document.getElementById("phone").value,
    cgpa: document.getElementById("cgpa").value,
  };

  chrome.storage.local.set(data, () => {
    alert("Details saved!");
  });
});
