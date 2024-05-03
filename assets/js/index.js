const users = [
  {
    id: 0,
    name: 'Vo Tuan Huy',
    email: 'huy@example.com',
    country: 'Vietnam',
  },
  {
    id: 1,
    name: 'Tony Nguyen',
    email: 'tony@example.com',
    country: 'Vietnam',
  },
  {
    id: 2,
    name: 'Phat Nguyen',
    email: 'phat@example.com',
    country: 'United States',
  },
];

const form = document.querySelector('form');
const tbodyElement = document.getElementById('tbody');
const submitButton = document.getElementById('submit');
const searchButton = document.getElementById('seach');

// First Method: using template literals
// const renderUsers = (users) => {
//   tbodyElement.innerHTML = users
//     .map((user) => {
//       return `
//         <tr>
//             <td scope="row" class="... border border-slate-300 p-3 text-left">${user.name}</td>
//             <td class="... border border-slate-300 p-3 text-left text-slate-500">${user.email}</td>
//             <td class="... border border-slate-300 p-3 text-left text-slate-500">${user.country}</td>
//             <td class="... border border-slate-300 p-3 text-left text-slate-500">
//                 <button id="delete" class="rounded-lg border-2 bg-red-600 px-4 py-2 text-white">Delete</button>
//                 <button id="edit" class="rounded-lg border-2 bg-amber-600 px-4 py-2 text-white">Edit</button>
//             </td>
//         </tr>
//         `;
//     })
//     .join('');
// };
// renderUsers(users);

// Second Method: using DOM manipulation
const addUser = () => {
  // Get user input values
  const { name, email, country, password, passwordConfirmation } = getUserInputValues();

  // Perform form validation
  let isValid = isCheckValidateInput({
    name,
    email,
    country,
    password,
    passwordConfirmation,
  });

  if (isValid) {
    const newUser = {
      id: users.length,
      name,
      email,
      country,
    };

    // Add new user to the list
    users.push(newUser);
    console.log('New user added successfully:', newUser);

    // Update UI
    tbodyElement.innerHTML = '';
    users.forEach((user) => {
      renderUsers(user);
    });

    // reset form
    resetForm();
  }
};

function resetForm() {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('country').value = 'default';
  document.getElementById('password').value = '';
  document.getElementById('passwordConfirmation').value = '';
}

const deleteUser = (id) => {
  // Remove user from the list
  users.splice(id, 1);
  console.log('User deleted successfully:', id);

  // Update UI
  tbodyElement.innerHTML = '';
  users.forEach((user) => {
    renderUsers(user);
  });
};

const editUser = (user) => {
  console.log('Edit user with id: ', user.id);
};

const getUserInputValues = () => {
  return {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    country: document.getElementById('country').value,
    password: document.getElementById('password').value,
    passwordConfirmation: document.getElementById('passwordConfirmation').value,
  };
};

const isCheckValidateInput = (inputs) => {
  let isCanSubmit = false;

  // UI validation
  for (const key in inputs) {
    const value = inputs[key];
    const fieldElement = document.getElementById(key);
    const errorMessage = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;

    // Remove previous error messages
    const errorElement = fieldElement.parentNode.querySelector('p');
    if (errorElement) {
      errorElement.remove();
    }

    if (!value || value === 'default') {
      const parentFieldElement = fieldElement.parentNode;
      const errorElement = document.createElement('p');

      errorElement.innerText = errorMessage;
      errorElement.setAttribute('class', 'text-red-500 text-sm');

      fieldElement.classList.add('border-red-500');
      parentFieldElement.appendChild(errorElement);
    } else {
      fieldElement.classList.remove('border-red-500');
    }
  }

  // Check password confirmation
  if (inputs.password !== inputs.passwordConfirmation) {
    const passwordElement = document.getElementById('passwordConfirmation');
    const errorElement = document.createElement('p');

    const pTag = passwordElement.parentNode.querySelector('p');

    if (pTag) {
      pTag.remove();
    }

    errorElement.innerText = '';
    errorElement.innerText = 'Password confirmation is not match';
    errorElement.setAttribute('class', 'text-red-500 text-sm');

    passwordElement.classList.add('border-red-500');
    passwordElement.parentNode.appendChild(errorElement);
  }

  // Inputs validation
  for (const key in inputs) {
    const value = inputs[key];

    if (!value || value.trim() === '' || value === 'default' || inputs.password !== inputs.passwordConfirmation) {
      return (isCanSubmit = false); // Return immediately if empty value found
    }
  }

  return (isCanSubmit = true);
};

const createButton = ({ content, user, clickHandler }) => {
  const buttonElement = document.createElement('button');
  buttonElement.innerText = content;

  const buttonClass = {
    Delete: 'rounded-lg border-2 bg-red-600 px-4 py-2 text-white',
    Edit: 'rounded-lg border-2 bg-amber-600 px-4 py-2 text-white',
  }[content]; // Object Accessor

  buttonElement.setAttribute('class', buttonClass);
  buttonElement.setAttribute('id', content.toLowerCase());

  // Using callback function
  buttonElement.addEventListener('click', () => clickHandler(user.id));
  return buttonElement;
};

const renderUsers = (user) => {
  const trElement = document.createElement('tr');

  // Render name
  const thElement = document.createElement('th');
  thElement.setAttribute('scope', 'row');
  thElement.setAttribute('class', '... border border-slate-300 p-3 text-left');
  thElement.innerText = user.name;

  // Render email, country
  trElement.appendChild(thElement);
  [user.email, user.country].forEach((user) => {
    const td = document.createElement('td');
    td.setAttribute('class', '... border border-slate-300 p-3 text-left text-slate-500');
    td.innerText += user;
    trElement.appendChild(td);
  });

  // Render action buttons
  const tdBtnElement = document.createElement('td');
  const deleteBtnElement = createButton({
    content: 'Delete',
    user,
    clickHandler: deleteUser,
  });
  const editBtnElement = createButton({
    content: 'Edit',
    user,
    clickHandler: editUser,
  });

  tdBtnElement.appendChild(deleteBtnElement);
  tdBtnElement.appendChild(editBtnElement);

  trElement.appendChild(tdBtnElement);

  tbodyElement.appendChild(trElement);
};

// Initialize app
form.addEventListener('submit', (event) => {
  event.preventDefault();
  addUser();
});

users.forEach((user) => {
  renderUsers(user);
});

// submitButton.addEventListener('click', () => addUser());

// call function
// syntax arrow function () => {}
// traditional function function() {}
searchButton.addEventListener('click', () => {
  const textSearch = document.getElementById('textSearch').value;
  const usersFiltered = users.filter((user) => user.name.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase()));

  // Reset UI
  tbodyElement.innerHTML = '';
  usersFiltered.forEach((user) => {
    renderUsers(user);
  });
});
