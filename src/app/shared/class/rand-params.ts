export class RandonParams {
  private texts: string[] = [
    'line?98d54s7d58',
    'estimaciones?2d1s32e5',
    'estimate?3g6r4v52',
    'vueltas?5d235r1g5',
    'laps?5rv57f565d',
    'giras?6ws3r5f22',
    'tours?23f6e5r5',
    'caribeans?8e9d65d',
    'fijos?36gf5r8',
    'cursions?65d3c25',
    'ganciados?253d65c',
  ];

  constructor() {
    const stateObj = '';
    const numbere = this.getRandomArbitrary(10, 15);
    const token = this.generateToken(numbere, '1234567abcdefghijklmnopq');
    const randValue = this.texts[Math.floor(Math.random() * this.texts.length)];
    history.pushState(stateObj, 'Counter', `${randValue}${token}`);
  }

  private getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private generateToken(len: number, arr: string) {
    let ans = '';
    for (let i = len; i > 0; i--) {
      ans += arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
  }
}
