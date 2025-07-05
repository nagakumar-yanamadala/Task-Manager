# Task Manager

A simple, full-stack task management application built with Node.js, Express, and EJS. It allows you to create, edit, delete, and track tasks, with support for theme toggling and a smooth user interface.

## 🚀 Features

- Add, edit, delete tasks
- Mark tasks as completed and move them back if needed
- Task details page
- Persistent data storage in JSON
- Clean, responsive design with dark/light theme toggle
- Font Awesome icons for a polished look

## 🛠 Tech Stack

- JavaScript (ES6+)
- Node.js
- Express.js
- EJS templating
- HTML / CSS
- Font Awesome
- JSON for data storage

## 📂 Project Structure

```
Task-Manager/
  ├── views/
  │   ├── home.ejs
  │   ├── completed.ejs
  │   ├── details.ejs
  │   └── edit.ejs
  ├── public/
  │   └── style.css
  ├── data.json
  ├── index.js
  └── package.json
```

## 💻 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/nagakumar-yanamadala/Task-Manager.git
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the application**

```bash
node index.js
```

4. **Open in browser**

```
http://localhost:3000
```

## ✨ Screenshots

![Task Manager Screenshot](./screenshot.png)

## 📌 Future Improvements

- Add authentication
- Connect to MongoDB for scalable storage
- Add drag-and-drop sorting of tasks
- Improve accessibility

## 📄 License

This project is open-source and free to use under the MIT License.
