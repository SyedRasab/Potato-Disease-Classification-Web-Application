# Potato Disease Classification Project

This project consists of a FastAPI backend for image classification and a React frontend (Vite) for the user interface.

## Project Structure

- `Fastapi/`: Contains the backend API and machine learning model logic.
- `frontend/`: Contains the React/Tailwind CSS frontend application.

## Prerequisites

- Python 3.8+
- Node.js & npm

## Getting Started

### Backend Setup

1. Navigate to the `Fastapi` directory:
   ```bash
   cd Fastapi
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows use `.venv\Scripts\activate`
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## License

MIT
