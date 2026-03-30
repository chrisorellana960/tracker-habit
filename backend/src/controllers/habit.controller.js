const Habit = require("../models/Habit");

// Crear hábito
exports.createHabit = async (req, res) => {
  try {
    const habit = new Habit({
      ...req.body,
      user: req.user.id, 
    });

    await habit.save();
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Obtener todos
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener uno
exports.getHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!habit) {
      return res.status(404).json({ message: "No encontrado" });
    }

    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar
exports.updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar
exports.deleteHabit = async (req, res) => {
  try {
    await Habit.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res.json({ message: "Hábito eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Done
exports.markAsDone = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Hábito no encontrado" });
    }

    const today = new Date();
    const lastCompleted = habit.lastCompleted;

    const todayDate = new Date(today.toDateString());

    if (!lastCompleted) {
      habit.streak = 1;
    } else {
      const lastDate = new Date(lastCompleted.toDateString());

      const diffTime = todayDate - lastDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (diffDays === 0) {
        return res.json({ message: "Ya completaste este hábito hoy", habit });
      } else if (diffDays === 1) {
        habit.streak += 1;
      } else {
        habit.streak = 1;
      }
    }

    habit.lastCompleted = todayDate;

    await habit.save();

    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};