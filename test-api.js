const fs = require('fs');
const path = require('path');

const baseUrl = 'http://localhost:5001';
const imagePath = path.join(__dirname, 'sample-image.jpg');
if (!fs.existsSync(imagePath)) {
  fs.writeFileSync(imagePath, 'dummy image content');
}

(async () => {
  try {
    const registerRes = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test1@example.com', password: '123456' }),
    });
    const registerData = await registerRes.json();
    console.log('REGISTER STATUS', registerRes.status);
    console.log('REGISTER BODY', registerData);

    const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test1@example.com', password: '123456' }),
    });
    const loginData = await loginRes.json();
    console.log('LOGIN STATUS', loginRes.status);
    console.log('LOGIN BODY', loginData);

    const token = loginData.token;
    if (!token) {
      console.error('Login failed; cannot continue tests.');
      process.exit(1);
    }

    const form = new FormData();
    form.append('name', 'Test product');
    form.append('price', '15');
    form.append('image', fs.createReadStream(imagePath));

    const productRes = await fetch(`${baseUrl}/api/products`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });
    const productData = await productRes.json();
    console.log('PRODUCT CREATE STATUS', productRes.status);
    console.log('PRODUCT CREATE BODY', productData);

    const productsRes = await fetch(`${baseUrl}/api/products`);
    const productsData = await productsRes.json();
    console.log('GET PRODUCTS STATUS', productsRes.status);
    console.log('GET PRODUCTS BODY', productsData);

    const paymentRes = await fetch(`${baseUrl}/api/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount: 100 }),
    });
    const paymentData = await paymentRes.json();
    console.log('PAYMENT STATUS', paymentRes.status);
    console.log('PAYMENT BODY', paymentData);
  } catch (error) {
    console.error('ERROR', error);
    process.exit(1);
  }
})();
