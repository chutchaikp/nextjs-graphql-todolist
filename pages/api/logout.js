import cookie from "cookie";

const Logout = (req, res) => {

	debugger;

	res.setHeader(
		"Set-Cookie",
		cookie.serialize("token", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			expires: new Date(0),
			sameSite: "strict",
			path: "/",
		})
	);
	res.statusCode = 200;
	res.json({ success: true });
};

export default Logout
