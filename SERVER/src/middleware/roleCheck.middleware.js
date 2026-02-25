// Check if user is Admin
// export const isAdmin = (req, res, next) => {
//   if (req.user.user_role !== 'admin') {
//     return res.status(403).json({
//       message: 'Access denied. Admin privileges required.'
//     });
//   }
//   next();
// };

// Check if user is Client (Pathology shop owner)
// export const isClient = (req, res, next) => {
//   if (req.user.user_role  !== 'client') {
//     return res.status(403).json({ 
//       message: 'Access denied. Client privileges required.' 
//     });
//   }
//   next();
// };
// export const isClient = (req, res, next) => {
//   console.log("INSIDE isClient req.user:", req.user);

  
//   if (req.user.user_role !== 'client') {
//     return res.status(403).json({
//       message: 'Access denied. Client privileges required.'
//     });
//   }
//   next();
// };

// // Check if user is Patient
// export const isPatient = (req, res, next) => {
//   if (req.user.user_role !== 'patient') {
//     return res.status(403).json({
//       message: 'Access denied. Patient privileges required.'
//     });
//   }
//   next();
// };


export const isClient = (req, res, next) => {
  console.log("INSIDE isClient req.user:", req.user);

  if (!req.user || req.user.role !== "client") {
    return res.status(403).json({
      message: "Access denied. Client privileges required."
    });
  }

  next();
};

export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin privileges required."
    });
  }

  next();
};

export const isPatient = (req, res, next) => {
  if (!req.user || req.user.role !== "patient") {
    return res.status(403).json({
      message: "Access denied. Patient privileges required."
    });
  }

  next();
};