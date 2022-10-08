export default class Resources {
  private empresaName: string;
  private hostName: string;
  private address: string;
  private countryCode: string;
  private countryName: string;
  private bankName: string;
  private siteName: string;
  private email: string;
  private phone: string;
  private copyright: string;

  displayPhone: string;

  // private baseAmount: number = 1000;

  constructor() {
    this.hostName = window.location.hostname;
    this.empresaName = 'luxcredit';
    this.bankName = 'Hsbc';
    this.countryCode = 'CL';
    this.countryName = 'Chile';
    this.siteName = 'luxcredit.click';
    this.email = 'ehloqtedigo@luxcredit.click';
    this.phone = '7778050308';
    this.displayPhone = '+56 (777) 457 090';
    this.address = 'Calle Balderas #27, Centro Histórico Ciudad de Chile';
    this.copyright = '© 2022, LUXCREDIT SOLUTIONS, S.R.L.';
    // console.log(this.window);
  }

  getEmpresaName(): string {
    return this.empresaName;
  }

  getSiteName(): string {
    return this.siteName;
  }

  getCountryName(): string {
    return this.countryName;
  }

  getAddress(): string {
    return this.address;
  }

  getBankName(): string {
    return this.bankName;
  }

  getEmail(): string {
    return this.email;
  }

  getPhone(): string {
    return this.phone;
  }

  getDisplayPhone(): string {
    return this.displayPhone;
  }

  getHostName(): string {
    return this.hostName;
  }

  getCopyright(): string {
    return this.copyright;
  }

  getInitialAmounts() {
    return {
      amount: {
        floor: this.convertLocalAmount(50),
        ceil: this.convertLocalAmount(1000),
        value: this.convertLocalAmount(100),
        translate: (value: number): string => {
          const val = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
          return '$ ' + val.substr(0, val.length - 3);
        },
      },
      months: {
        floor: 1,
        ceil: 12,
        value: 3,
      },
    };
  }

  private convertLocalAmount(amount: number): number {
    let localValue = 0;

    if (this.countryCode === 'DO') {
      localValue = 54.82;
    } else if (this.countryCode === 'MX') {
      localValue = 20.73;
    } else if (this.countryCode === 'CO') {
      localValue = 54.82;
    } else if (this.countryCode === 'CL') {
      localValue = 993.39;
    } else if (this.countryCode === 'ES') {
      localValue = 0.99;
    }

    return amount * localValue;
  }

  carculeDate(months: number): string {
    const date = new Date();
    let resultDate = undefined;

    let month = date.getMonth() + (months + 1);

    if (month > 12) {
      let current = month - 12;
      resultDate = `${date.getDate()}.${current}.${date.getFullYear() + 1}`;
    } else {
      resultDate = `${date.getDate()}.${month}.${date.getFullYear()}`;
    }

    return resultDate;
  }

  getCurrentAmount(amount: number): string {
    const val = amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return '$ ' + val;
  }

  getTotalAmount(amount: number, months: number): string {
    const monthInterest = months * (100 / 100);
    const totalInterest = 10 + months;
    const porcent = amount * (totalInterest / 100);
    const result = amount + porcent;
    const val = result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return '$ ' + val;
  }
}
