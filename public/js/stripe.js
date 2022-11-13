import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51M3YalLXlN7RtnXzZUpbfocSXWf5K15A700OVM2o0eWD0nX6iu1qlNpt5izuW9EjmV6eq4Kc45Fa2K4yAznqPgyZ00jcr4cDjX'
  );

  try {
    // 1) Get checkout from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (err) {
    console.error(err);
    showAlert('error', err);
  }
};
