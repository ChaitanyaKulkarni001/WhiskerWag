# 🐾 WhiskerWag

WhiskerWag is a pet-themed platform designed for pet lovers to share their experiences and knowledge. Built with modern technologies, this project aims to create an engaging and user-friendly experience for pet owners.

## 📦 Technologies Used

- **Frontend**: 
  - [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
  - [Tailwind CSS](https://tailwindcss.com/) for responsive and stylish designs
- **Backend**: 
  - [Django](https://www.djangoproject.com/) with Django REST Framework for API development
- **Database**: 
  - Online MySQL (can be switched to local PostgreSQL)

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- Python (v3.8 or later)
- PostgreSQL (if using locally)

### Frontend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ChaitanyaKulkarni001/WhiskerWag.git
   cd WhiskerWag/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

Your React app should now be running on [http://localhost:3000](http://localhost:3000).

### Backend Setup

1. **Clone the repository:**
   (If you haven't already, navigate to the backend folder)
   ```bash
   cd WhiskerWag/backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up the database:**
   - If using PostgreSQL locally, create a database and update your `settings.py` accordingly.

5. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Start the development server:**
   ```bash
   python manage.py runserver
   ```

Your Django API should now be running on [http://localhost:8000](http://localhost:8000).

## 🌐 Deploying to Vercel

1. **Sign in to Vercel**: Go to [Vercel](https://vercel.com/) and sign up or log in to your account.

2. **Import Your Project**:
   - Click on "New Project."
   - Choose your Git provider (e.g., GitHub).
   - Import your WhiskerWag repository.

3. **Configure Your Project**:
   - Vercel will automatically detect your frontend settings. Ensure it's set to use the **Vite** framework.
   - For environment variables (if needed), add them under the "Environment Variables" section.

4. **Deploy**:
   - Click on the "Deploy" button.
   - After a successful build, your project will be live on a unique Vercel URL.

## 📖 Features

- User authentication with JWT
- Pet-related content sharing
- Profile management for users and veterinarians
- Doctor Dashboard for appointment viewing
- Responsive design with Tailwind CSS and engaging animations

## 🌟 Future Enhancements

- Integrate more features for pet care and management
- Improve UI/UX based on user feedback
- Add real-time chat functionality

## 📫 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue to discuss your ideas.

## 🎉 Acknowledgments

- Thanks to all seniors for helping me with innovative ideas!

---

Thank you for checking out WhiskerWag! 🐶🐱 Enjoy your journey with pets!
