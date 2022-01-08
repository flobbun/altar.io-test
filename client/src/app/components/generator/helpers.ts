class Helpers{
  
  getRandomChar(alphabet: Array<string>, exception?: string): string{
    if (exception)
    {
      const alphabetCopy = alphabet.filter(letter => letter !== exception);
      return alphabetCopy[Math.floor(Math.random() * alphabetCopy.length)];
    }
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  getRandomNumber = (min: number, max: number) => 
    Math.floor(Math.random() * (max - min + 1)) + min;

  concatNumbers = (n1: number, n2: number) => 
      Number(String(n1) + String(n2));

  getOcurr = (value: string, arr: Array<any>) => 
    arr.reduce((a: any, v: any) => (v === value ? a + 1 : a), 0);

  mathOp(number: number): number{
    let divisor = 2;
    let result = number;
  
    while (result > 9){
      result = number / divisor;
      divisor++;
    }
    if (result % 1 != 0)
      return Math.ceil(result);
    return result;
  }


}

export default new Helpers();