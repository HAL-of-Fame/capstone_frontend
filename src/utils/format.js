import moment from "moment";

export const formatDate = (date) => {
  const d = new Date(date);
  return moment(d).format("MMM Do YYYY");
};

export const formatTime = (date) => {
  const d = new Date(date);
  return moment(d).format('LT')
}

const formatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatPrice = (amount) => {
  const dollars = amount;
  return `$${formatter.format(dollars)}`
}

export const formatRating = (rating) => {
  return formatter.format(rating)
}
