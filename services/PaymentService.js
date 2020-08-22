const axios = require("axios");
const url="https://estebangue-mp-commerce-nodejs.herokuapp.com/"
class PaymentService {
  constructor() {
    this.tokensMercadoPago = {
      prod: {},
      test: {
        access_token:
          "APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398"
      }
    };
    this.mercadoPagoUrl = "https://api.mercadopago.com/checkout";
  }

  async createPaymentMercadoPago(name, price, unit, img) {
    const url = `${this.mercadoPagoUrl}/preferences?access_token=${this.tokensMercadoPago.test.access_token}`;

    const items = [
      {
        id: "1234",
        title: name,
        description: "Dispositivo móvil de Tienda e-commerce",
        picture_url: `${url + img}`,
        category_id: "1234",
        quantity: 1,
        currency_id: "ARS",
        unit_price: parseFloat(price)
      }
    ];

    const preferences = {
      items,
      external_reference: "esteban.gueicha@gmail.com",
      payer: {
        name: "Lalo",
        surname: "Landa",
        email: "test_user_63274575@testuser.com",
        phone: {
          area_code: "11",
          number: "22223333"
        },
        address: {
          zip_code: "1111",
          street_name: "False",
          street_number: "123"
        }
      },
      payment_methods: {
        excluded_payment_methods: [
          {
            id: "amex"
          }
        ],
        excluded_payment_types: [{ id: "atm" }],
        installments: 6,
        default_installments: 6
      },
      back_urls: {
        success: "https://estebangue-mp-commerce-nodejs.herokuapp.com/exitoso",
        pending: "https://estebangue-mp-commerce-nodejs.herokuapp.com/pendiente",
        failure: "https://estebangue-mp-commerce-nodejs.herokuapp.com/error"
      },
      notification_url: "https://estebangue-mp-commerce-nodejs.herokuapp.com/webhookMercadoPago",
      auto_return: "approved"
    };

    try {
      const request = await axios.post(url, preferences, {
        headers: {
          "Content-Type": "application/json",
          "x-integrator-id": "dev_24c65fb163bf11ea96500242ac130004"
        }
      });
      return request.data;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = PaymentService;
