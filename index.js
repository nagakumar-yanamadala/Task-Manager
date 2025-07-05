// index.js
const express = require('express');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const dataPath = path.join(__dirname, 'data.json');

function loadData() {
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(rawData);
}

function saveData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
}

app.get('/', (req, res) => {
  const { tasks } = loadData();
  res.render('home', { tasks });
});

app.post('/', (req, res) => {
  const { title, description } = req.body;
  if (!title.trim() || !description.trim()) {
    return res.send("Title and Description cannot be empty.");
  }
  const data = loadData();
  data.tasks.push({ title, description, id: uuid() });
  saveData(data);
  res.redirect('/');
});

app.get('/completed', (req, res) => {
  const { completedTasks } = loadData();
  res.render('completed', { completedTasks });
});

app.get('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { tasks } = loadData();
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).send("Task not found");
  res.render('details', { task });
});

app.get('/tasks/:id/edit', (req, res) => {
  const { id } = req.params;
  const { tasks } = loadData();
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).send("Task not found");
  res.render('edit', { task });
});

app.post('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const data = loadData();
  const task = data.tasks.find(t => t.id === id);
  if (!task) return res.status(404).send("Task not found");
  data.completedTasks.push(task);
  data.tasks = data.tasks.filter(t => t.id !== id);
  saveData(data);
  res.redirect('/');
});

app.post('/moveback/:id', (req, res) => {
  const { id } = req.params;
  const data = loadData();
  const taskToMove = data.completedTasks.find(t => t.id === id);
  if (!taskToMove) return res.status(404).send("Task not found");
  data.tasks.push(taskToMove);
  data.completedTasks = data.completedTasks.filter(t => t.id !== id);
  saveData(data);
  res.redirect('/completed');
});

app.patch('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { titleToUpdate, descriptionToUpdate } = req.body;
  const data = loadData();
  const task = data.tasks.find(t => t.id === id);
  if (task) {
    if (titleToUpdate?.trim()) task.title = titleToUpdate;
    if (descriptionToUpdate?.trim()) task.description = descriptionToUpdate;
  }
  saveData(data);
  res.redirect('/');
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const data = loadData();
  data.tasks = data.tasks.filter(t => t.id !== id);
  saveData(data);
  res.redirect('/');
});

app.delete('/completedtasks/:id', (req, res) => {
  const { id } = req.params;
  const data = loadData();
  data.completedTasks = data.completedTasks.filter(t => t.id !== id);
  saveData(data);
  res.redirect('/completed');
});

app.listen(3000, () => {
  console.log("Task Manager is running on port 3000");
});
