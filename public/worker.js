function isPrime(n) {
  if (n === 1) return true;

  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }

  return true;
}

function findPrimes(n) {
  const primes = [];

  for (let i = 1; i <= n; i++) {
    if (isPrime(i)) primes.push(i);
  }

  return primes;
}

onmessage = (event) => {
  const num = event.data;

  console.log('worker: receive: ', num)

  const primes = findPrimes(num);

  console.log('success');

  postMessage(primes);
}
