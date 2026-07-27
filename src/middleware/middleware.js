import jwt from 'jsonwebtoken';

export function middleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
console.log(authHeader)
    if (!authHeader) {
      return res.status(401).json({
        error: 'Usuário não autenticado'
      });
    }

    const token = authHeader.split(' ')[1];
console.log(token)
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

     req.id = decoded.id;
console.log("decoded",decoded )
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Token inválido'
    });
  }
  
}





































