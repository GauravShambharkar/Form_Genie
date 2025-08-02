chrome.storage.local.get(null, (data) => {
  const mappings = {
    name: ['name', 'first name'],
    lastName: ['last', 'surname'],
    email: ['email'],
    address: ['address', 'current address'],
    phone: ['phone', 'mobile', 'number'],
    cgpa: ['cgpa', 'grade']
  };

  const inputs = document.querySelectorAll("input, textarea");

  inputs.forEach(input => {
    const identifier = (
      input.name?.toLowerCase() ||
      input.id?.toLowerCase() ||
      input.placeholder?.toLowerCase() ||
      ""
    );

    for (let key in mappings) {
      if (
        mappings[key].some(term => identifier.includes(term))
      ) {
        input.value = data[key] || '';
      }
    }
  });
});
