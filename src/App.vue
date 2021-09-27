<template>
  <div id="app">
    <h1>My Prime</h1>
    <input
      id="numberInput"
      v-model="n"
      type="number"
    />
    <button
      id="calBtn"
      @click="findMaxPrime"
    >
      Calculate !
    </button>
    <h2>There is <span id="answer">{{ ans.length > 0 ? ans.length : 'loading...' }}</span> prime(s)</h2>
    <!-- <p v-if="ans.length > 0" >
      {{ ans.join(', ') }}
    </p> -->
  </div>
</template>

<script>
import PrimeWorker from '@/workers/prime.worker';

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

// function asyncFindPrimes(n) {
//   return new Promise((resolve) => {
//     resolve(findPrimes(n))
//   })
// }

export default {
  name: 'App',
  data() {
    return {
      n: '',
      ans: [],
      worker: null,
    }
  },
  created() {
    if (window.Worker) {
      console.log('support worker');

      this.worker = new PrimeWorker();
    }
  },
  methods: {
    // asyncFindPrimes(n) {
    //   if (!this.worker) return findPrimes(n);


    //   return new Promise((resolve) => {
    //     this.worker.onmessage = (event) => {
    //       resolve(event.data);
    //     }

    //     this.worker.postMessage(n);
    //   });
    // },
    asyncFindPrimes(n) {
      if (!this.worker) return findPrimes(n);


      return this.worker.findPrimes(n);
    },
    findMaxPrime() {
      const num = Number.parseInt(this.n, 10) || 0;
      this.ans = [];

      this.$nextTick(async () => {
        this.ans = await this.asyncFindPrimes(num);

        const isOnePrime = await this.worker.isPrime(1);
        console.log('1 is prime ? ', isOnePrime);
      });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#numberInput {
  margin-right: 4px;
  padding: 12px 8px;
  font-size: 36px;
}

#calBtn {
  padding: 12px 8px;
  font-size: 36px;
}

#answer {
  color: green;
}
</style>
