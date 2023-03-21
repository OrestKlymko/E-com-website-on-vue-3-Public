export default function totalPrice(array) {
  return array.reduce((acc, item) => acc + item.price * item.count, 0);
}
