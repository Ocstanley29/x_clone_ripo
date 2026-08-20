export const protectRoute = (req, res, next) => {
    if (!req.auth().isAutenticated) {
        return res.status(401).json({ error: "Unauthorized you must be logged in" });
    }
    next();
};