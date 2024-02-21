const bcrypt = require("bcryptjs");
const { User } = require("../models/userModel"); 
const {registrationSchema} = require('../schemas/registerSchema')


exports.registerRequest = async (req, res) => {
  try {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({
      user: {
        email: user.email,
        subscription: "starter",
      },
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// TODO
exports.loginRequest = async (req, res) => {
    try {
      // Валідація вхідних даних
      const { error } = authSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Email or password is wrong" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Email or password is wrong" });
      }
  
      // Створення токену (переконайтеся, що ви встановили SECRET_KEY у вашому середовищі)
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  
      user.token = token;
      await user.save();
      
      res.json({
        token,
        user: {
          email: user.email,
          subscription: "starter" 
        }
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

exports.logOutRequest = async (req, res) => {
  try {
    // Припускаємо, що authMiddleware додав об'єкт user до req
    const user = req.user;

    // Якщо користувача не існує (хоча authMiddleware мав би вже переконатися в існуванні користувача)
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Видалення токена користувача
    user.token = null;
    await user.save();

    // Відправка успішної відповіді без контенту
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    // Припускаємо, що authMiddleware додав об'єкт user до req
    const { email, subscription } = req.user;

    // Якщо користувача не існує (хоча authMiddleware мав би вже переконатися в існуванні користувача)
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Відправка даних користувача
    res.status(200).json({
      email,
      subscription
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};