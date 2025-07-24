const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

async function getUsers(req, res) {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).send({ message: 'No se encontraron usuarios' });
    }
    return res.status(200).send({
      message: 'Usuarios obtenidos correctamente',
      users,
    });
  } catch (error) {
    console.log('Error al obtener los usuarios:', error);
    return res.status(500).send({ message: 'Error al obtener los usuarios' });
  }
}

async function getUserById(req, res) {
  try {
    console.log(req.params);
    const id = req.params.id;
    const user = await User.findById(id);
    return res.status(200).send({ message: 'Usuario obtenido correctamente', user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error al obtener el usuario' });
  }
}

async function createUser(req, res) {
  console.log(req.body);

  try {
    if (req.file) {
      req.body.image = req.file.filename;
    }
    const user = new User(req.body);
    if (user.password) {
      user.password = bcrypt.hashSync(user.password, saltRounds);
    }
    const userSaved = await user.save();
    return res.status(201).send({ message: 'Se ha creado el usuario exitosamente', userSaved });
  } catch (error) {
    console.log('Error al crear el usuario:', error);
    return res.status(500).send({ message: 'No se pudo crear el usuario' });
  }
}

async function editUser(req, res) {
  try {
    const id = req.params.id;
    if (req.user._id !== id) {
      return res.status(403).send({ message: 'No tienes permiso para actualizar este usuario' });
    }
    const { name, email, password } = req.body;
    const userData = { name, email, password };
    userData.password = undefined;
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    const userUpdated = await User.findByIdAndUpdate(id, userData, {
      new: true,
    });
    return res.status(200).send({ message: 'Usuario actualizado con exito', user: userUpdated });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Error al intentar editar el usuario');
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const userDeleted = await User.findByIdAndDelete(id);
    if (!userDeleted) {
      return res.status(404).send({ message: 'No se encontró el usuario' });
    }
    return res.status(200).send({ message: 'Usuario borrado con éxito', userDeleted });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Error al intentar eliminar el usuario');
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: 'Email y contraseña son requeridos' });
    }
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).send({ message: 'Usuario o contraseña incorrectos' });
    }

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return res.status(401).send({ message: 'Usuario o contraseña incorrectos' });
    }
    user.password = undefined;

    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image,
    };

    const token = jwt.sign(payload, secret, { expiresIn: '1H' });

    return res.status(200).send({ message: 'Inicio de sesión exitoso', user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Error al iniciar sesión' });
  }
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  editUser,
  loginUser,
};
