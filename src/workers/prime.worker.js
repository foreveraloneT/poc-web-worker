import isPrime from 'is-prime-number';

// function findPrimes(n) {
//   const primes = [];

//   for (let i = 1; i <= n; i++) {
//     if (isPrime(i)) primes.push(i);
//   }

//   return primes;
// }

// self.onmessage = (event) => {
//   const num = event.data;

//   console.log('worker: receive: ', num)

//   const primes = findPrimes(num);

//   console.log('success');

//   self.postMessage(primes);
// }

export const findPrimes = (n) => {
  console.log('worker: receive: ', n)

  const primes = [];
  for (let i = 1; i <= n; i++) {
    if (isPrime(i)) primes.push(i);
  }

  return primes;
}

export {
  isPrime,
}