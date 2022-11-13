/* eslint-disable */

const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibWVpZXJyZW5lIiwiYSI6ImNsYTMzM3ZvYzBpYjgzbnJwZWxhanVnZzYifQ.o9h8s8-Jr1NwqzZDmaav7Q';

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    // style: 'mapbox://styles/meierrene/cla3ytc4x000a14o08ledsdzv', // Black and white map
    style: 'mapbox://styles/meierrene/cla32iano001114rtq8xm6xsr', // Colorful map
    scrollZoom: false,
  });
  map.on('style.load', () => {
    map.setFog({});
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({ element: el, anchor: 'bottom' })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({ offset: 40 })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bound to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};

const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

// type is success or error
const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

const login = async (email, password) => {
  try {
    const res = await fetch('/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.status === 'success') {
      document.querySelector('.btn--green').textContent = 'Logging up...';
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    } else showAlert('error', data.message);
  } catch (err) {
    showAlert('error', data.message);
  }
};

const logout = async () => {
  try {
    const res = await fetch('/api/v1/users/logout', {
      method: 'GET',
      credentials: 'include',
    });

    const data = await res.json();

    if (data.status === 'success') location.reload(true);
  } catch (err) {
    showAlert('error', 'Error logging out! Please try again.');
  }
};

const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await fetch('/api/v1/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name, email, password, passwordConfirm }),
    });

    const data = await res.json();

    if (data.status === 'success') {
      document.querySelector('.btn--green').textContent = 'Logging up...';
      showAlert('success', 'Your new has created with success!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    } else showAlert('error', data.message);
  } catch (err) {
    showAlert('error', 'Error to create your account! Please try again.');
  }
};

const updateSettings = async (body, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';
    const options =
      type === 'password'
        ? {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        : { method: 'PATCH', body };

    const res = await fetch(url, options);
    const data = await res.json();

    if (data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    } else showAlert('error', data.message);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51M3YalLXlN7RtnXzZUpbfocSXWf5K15A700OVM2o0eWD0nX6iu1qlNpt5izuW9EjmV6eq4Kc45Fa2K4yAznqPgyZ00jcr4cDjX'
  );

  try {
    // 1) Get checkout from API
    const session = await fetch(`/api/v1/bookings/checkout-session/${tourId}`);

    const data = await session.json();

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({ sessionId: data.session.id });
  } catch (err) {
    console.error(err);
    showAlert('error', err);
  }
};

// =============================================================================
// Calling functions
// =============================================================================

// DOM elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');
// form-user-settings

// Delegation
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logoutBtn) logoutBtn.addEventListener('click', logout);

if (signupForm)
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    signup(name, email, password, passwordConfirm);
  });

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
