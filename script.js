
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');


  if (document.body.classList.contains('dark')) {
    themeIcon.innerHTML = `
      <!-- Moon Icon -->
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    `;
  } else {
    themeIcon.innerHTML = `
      <!-- Sun Icon -->
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8.66-9H21m-16 0H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.02-12.02l-.707.707M6.343 6.343l-.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
    `;
  }
});

const birthdateInput = document.getElementById('birthdate');
const dateError = document.getElementById('dateError');

birthdateInput.addEventListener('input', () => {
  const birthdateValue = birthdateInput.value;
  const today = new Date();

  if (!birthdateValue) {
    dateError.textContent = 'Please select your date of birth.';
    dateError.classList.remove('hidden');
    return;
  }

  const birthDate = new Date(birthdateValue);

  if (birthDate > today) {
    dateError.textContent = 'Date of birth cannot be in the future.';
    dateError.classList.remove('hidden');
  } else {
    dateError.classList.add('hidden');
  }
});

document.getElementById('ageForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const birthdateValue = document.getElementById('birthdate').value;
  const dateError = document.getElementById('dateError');

  if (!birthdateValue) {
    dateError.textContent = 'Please select your date of birth.';
    dateError.classList.remove('hidden');
    return;
  }

  const birthDate = new Date(birthdateValue);
  const today = new Date();

  if (birthDate > today) {
    dateError.textContent = 'Date of birth cannot be in the future.';
    dateError.classList.remove('hidden');
    return;
  } else {
    dateError.classList.add('hidden');
  }

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    ageDays += prevMonth.getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  const ageDisplay = document.getElementById('ageDisplay');
  ageDisplay.innerHTML = `
    <span class="font-bold">${ageYears}</span> years,
    <span class="font-bold">${ageMonths}</span> months,
    <span class="font-bold">${ageDays}</span> days
  `;

  const resultDiv = document.getElementById('result');
  resultDiv.classList.remove('hidden', 'opacity-0');
  void resultDiv.offsetWidth; // Trigger reflow
  resultDiv.classList.add('opacity-100');

  const birthdayDisplay = document.getElementById('birthdayDisplay');
  const nextBirthdayDiv = document.getElementById('nextBirthday');

  let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  const diffTime = nextBirthday - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  birthdayDisplay.innerHTML = `
    <span class="font-bold">${diffDays}</span> days
  `;

  nextBirthdayDiv.classList.remove('hidden', 'opacity-0');
  void nextBirthdayDiv.offsetWidth; // Trigger reflow
  nextBirthdayDiv.classList.add('opacity-100');

  const daysDisplay = document.getElementById('daysDisplay');
  const totalDaysDiv = document.getElementById('totalDays');

  const diffTotalTime = today - birthDate;
  const diffTotalDays = Math.floor(diffTotalTime / (1000 * 60 * 60 * 24));

  daysDisplay.innerHTML = `
    <span class="font-bold">${diffTotalDays}</span> days
  `;

  totalDaysDiv.classList.remove('hidden', 'opacity-0');
  void totalDaysDiv.offsetWidth; // Trigger reflow
  totalDaysDiv.classList.add('opacity-100');
});

const resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', () => {
  document.getElementById('ageForm').reset();
  document.getElementById('result').classList.add('hidden', 'opacity-0');
  document.getElementById('nextBirthday').classList.add('hidden', 'opacity-0');
  document.getElementById('totalDays').classList.add('hidden', 'opacity-0');

  document.getElementById('dateError').classList.add('hidden');
});

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');

      themeIcon.innerHTML = `
        <!-- Moon Icon -->
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      `;
    }
  });
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  
    if (document.body.classList.contains('dark')) {
      themeIcon.innerHTML = `
        <!-- Moon Icon -->
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      `;
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.innerHTML = `
        <!-- Sun Icon -->
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8.66-9H21m-16 0H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.02-12.02l-.707.707M6.343 6.343l-.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      `;
      localStorage.setItem('theme', 'light');
    }
  });
  
