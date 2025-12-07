export default function handler(req, res) {
    const { otp } = req.query;

    if (!global.currentOtp) {
        return res.status(400).json({ success: false, msg: "Chưa tạo OTP" });
    }

    if (Date.now() > global.otpExpire) {
        return res.status(400).json({ success: false, msg: "OTP hết hạn" });
    }

    if (otp == global.currentOtp) {
        return res.status(200).json({ success: true, msg: "OTP đúng" });
    }

    return res.status(400).json({ success: false, msg: "Sai OTP" });
}
