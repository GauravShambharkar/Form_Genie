chrome.storage.local.get(null, (data) => {
  const mappings = {
    name: ['name', 'fullname'],
    email: ['email'],
    address: ['address'],
    phone: ['phone', 'mobile', 'number'],
    cgpa: ['cgpa', 'grade']
  };

  const inputs = document.querySelectorAll("input, textarea");

  inputs.forEach(input => {
    const nameAttr = input.name?.toLowerCase() || "";
    const idAttr = input.id?.toLowerCase() || "";
    const placeholder = input.placeholder?.toLowerCase() || "";

    for (let key in mappings) {
      if (
        mappings[key].some(term =>
          nameAttr.includes(term) ||
          idAttr.includes(term) ||
          placeholder.includes(term)
        )
      ) {
        input.value = data[key] || '';
      }
    }
  });
});
