interface MoneyTransferClient {
  transfer: () => any;
}

class PayPalClient implements MoneyTransferClient {
  transfer() {
    console.log("Работаем с PayPal");
  }
}

class BitcoinClient implements MoneyTransferClient {
  transfer() {
    console.log("Работаем с Bitcoin");
  }
}

class Marketplace {
  constructor(private readonly moneyTransferClient: MoneyTransferClient) {}

  buyApp() {
    this.moneyTransferClient.transfer();
  }
}

const market = new Marketplace(new PayPalClient());

market.buyApp();