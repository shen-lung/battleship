import _ from 'lodash';

const fetchCrypto = url => fetch(url, {
    headers: {
        'accept': 'application/json'
    }
})
.then(res => res.json())
.then((info) => {
    return info;
})
.catch(error => {
    return error;
});

export const getOrderBook = (cryptoName) => {
    const url = ``;

    return Promise.all([
        fetchCrypto(url)
    ]);
}
