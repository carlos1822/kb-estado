export class RandonParams {
  private texts: string[] = [
    'cpsess0108878898/cad?source=web&',
    'lveversion/url?source=uact&',
    'FMfcgzGqRZhSRqXp/esrc?source=true&',
    'WqTvcFQDmpdBcgzG/url?source=usg&',
    '2ahUKEwih1L_J6rH7A/ved?source=uact&',
    'AOvVaw3qJDMjzUCuRT/cad?source=rja&',
    'J6rH7AhUNRzABHdIfBAk/esrc?source=web&',
    'AOvVaw3qJDMjzUCuRTm/url?source=usg&',
    'WZem_Z-T2J6rH7A/ved?source=rja&',
    '2ahUKEwih1L_J6rH7AhU/cad?source=true&',
    'AOvVaw1FcNbz0LaDfbS/esrc?source=t&',
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
    const params = [
      'showVariations=',
      'pf_rd_r=',
      'node=',
      'pd_rd_w=',
      'ref_=',
      'nodeId=',
    ];

    const param = params[Math.floor(Math.random() * params.length)];
    return `${param}${ans}`;
  }
}
