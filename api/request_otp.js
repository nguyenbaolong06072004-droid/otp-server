import axios from "axios";

global.currentOtp = null;
global.otpExpire = null;

export default async function handler(req, res) {
    const { chat_id } = req.query;

    const BOT_TOKEN = process.env.BOT_TOKEN;

    if (!BOT_TOKEN) {
        return res.status(400).json({ error: "MISSING_TELEGRAM_CONFIG" });
    }

    // Tạo OTP 6 số
    const otp = Math.floor(100000 + Math.random() * 900000);
    global.currentOtp = otp;
    global.otpExpire = Date.now() + 2 * 60 * 1000; // 2 phút

    await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        params: {
            chat_id,
            text: `🔐 OTP của bạn là: *${otp}*`,
            parse_mode: "Markdown"
        }
    });

    res.status(200).json({ success: true, otp });
}
