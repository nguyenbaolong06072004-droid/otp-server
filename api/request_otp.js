import axios from "axios";

global.currentOtp = null;
global.otpExpire = null;

export default async function handler(req, res) {
    const { chat_id } = req.query;

    const BOT_TOKEN = process.env.BOT_TOKEN;

    // Tạo OTP 6 số
    const otp = Math.floor(100000 + Math.random() * 900000);
    global.currentOtp = otp;
    global.otpExpire = Date.now() + 2 * 60 * 1000; // Hết hạn sau 2 phút

    // Gửi OTP vào Telegram
    await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        params: {
            chat_id: chat_id,
            text: `🔐 OTP của bạn là: *${otp}*`,
            parse_mode: "Markdown"
        }
    });

    res.status(200).json({ success: true, otp });
}
