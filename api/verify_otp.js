export default function handler(req, res) {
    const { otp } = req.query;

    if (!global.currentOtp || !global.otpExpire) {
        return res.status(400).json({ error: "NO_OTP_CREATED" });
    }

    if (Date.now() > global.otpExpire) {
        return res.status(400).json({ error: "OTP_EXPIRED" });
    }

    if (otp == global.currentOtp) {
        return res.status(200).json({ success: true, msg: "OTP đúng" });
    }

    res.status(400).json({ success: false, msg: "OTP sai" });
}
