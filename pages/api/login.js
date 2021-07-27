import cookie from "cookie";

const Login = (req, res) => {

	debugger;

	res.setHeader(
		"Set-Cookie",
		cookie.serialize("token", req.body.token, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			maxAge: 60 * 60,
			sameSite: "strict",
			path: "/",
		})
	);
	res.statusCode = 200;
	res.json({ success: true });
};

export default Login