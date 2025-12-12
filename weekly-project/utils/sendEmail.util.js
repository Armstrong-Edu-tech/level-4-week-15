const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendCartAlert = async (userEmail, productsList) => {
    const productsHTML = productsList.map(p =>
        `<li style="margin-bottom: 5px;">
            <strong>${p.name}</strong> - (Stock: ${p.stock})
        </li>`
    ).join('');

    const htmlContent = `
        <div style="border: 2px solid #dc3545; padding: 20px; font-family: Arial; direction: ltr;">
            <h2 style="color: #dc3545;">⚠️ Hurry Up!</h2>
            <p>The following items in your cart are running low on stock:</p>
            <ul>
                ${productsHTML}
            </ul>
            <p>Please complete your purchase before they run out!</p>
            <a href="http://localhost:5000/" style="background-color: #dc3545; color: white; padding: 10px 20px; text-decoration: none;">Go to Cart</a>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: `⚠️ Alert: ${productsList.length} items in your cart are running low!`,
            html: htmlContent
        });
        console.log(`Alert Email sent to: ${userEmail}`);
    } catch (error) {
        console.error('Email Error:', error);
    }
};

module.exports = { sendCartAlert };