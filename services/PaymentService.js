const axios = require("axios");

class PaymentService {
  constructor() {
    this.tokensMercadoPago = {
      prod: {},
      test: {
        access_token:
          "TEST-8085057187059875-100819-132b4a0a3556a9206ef3fd72c2c8a0bf-73186634"
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
        description: "Dispositivo movil de Tienda e-commerce",
        picture_url: "https://courseit.com.ar/static/logo.png",
        category_id: "1234",
        quantity: parseInt(unit),
        currency_id: "ARS",
        unit_price: parseFloat(price)
      }
    ];

    const preferences = {
      items,
      external_reference: "estebanquito_181@hotmail.com",
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
        success: "https://mercadopago-checkout.herokuapp.com/success",
        pending: "https://mercadopago-checkout.herokuapp.com/pending",
        failure: "https://mercadopago-checkout.herokuapp.com/error"
      },
      notification_url: "https://mercadopago-checkout.herokuapp.com/webhook",
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
