const axios = require("axios");

/**
 * @params args: JSON object with keys:
 *  action: String, optional, possible values: 'payment', 'credit'
 *  currencyCode: String, optional, possible values: 'EUR', 'USD' or 'JPY'
 *  user: String, required. Basic auth username.
 *  password: String, require. Basic auth password
 * @return Promise
 * resolve: Transaction[]
 * catch: error: {status: HttpErrorCode, data: error}
 */
exports.get = async function (args) {
    const { action, currencyCode, user, password } = args;

    if (action && !["payment", "credit"].some(act => act === action)) {
        throw {
            status: 400,
            data: "Action value only can be 'payment' or 'credit'"
        };
    }

    if (currencyCode && !["EUR", "USD", "JPY"].some(crc => crc === currencyCode)) {
        throw {
            status: 400,
            data: "CurrencyCode value only can be 'EUR', 'USD' or 'JPY'"
        };
    }

    if (!user) {
        throw {
            status: 400,
            data: "User not provided"
        };
    }

    if (!password) {
        throw {
            status: 400,
            data: "Password not provided"
        };
    }

    const response = await axios.get("https://jovs5zmau3.execute-api.eu-west-1.amazonaws.com/prod/transactions", {
        params: {action, currencyCode},
        headers: {
            "Authorization": `Basic ${Buffer.from(`${user}:${password}`).toString("base64")}`
        }
    });
    if (response.status === 200) {
        return response.data;
    } else {
        throw {
            status: response.status,
            data: response.data
        };
    }
}