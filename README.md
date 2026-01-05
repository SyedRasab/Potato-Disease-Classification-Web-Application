# Potato Disease Classification 🥔🌿

![Project Banner](banner.png)

[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

An end-to-end deep learning application designed to classify potato leaf diseases into three categories: **Early Blight**, **Late Blight**, and **Healthy**.

---

## 🚀 Key Features

*   **Deep Learning Backend**: Powered by a Convolutional Neural Network (CNN) implemented in TensorFlow.
*   **Real-time API**: High-performance FastAPI backend for model serving.
*   **Modern Frontend**: Sleek, responsive React UI built with Vite and Tailwind CSS.
*   **Detailed Predictions**: Provides confidence scores and a breakdown for each class.

---

## 📁 Project Structure

*   `Fastapi/`: High-performance backend API and prediction logic.
*   `frontend/`: Modern React user interface.
*   `Training/`: Contains the `model-training.ipynb` Jupyter Notebook used for training the model.
*   `saved_models/`: (Excluded from repository) Stores the trained `.keras` or `.h5` model files.

---

## 🛠️ Getting Started

### 🐍 Backend Setup (FastAPI)

1.  **Navigate to directory**:
    ```bash
    cd Fastapi
    ```
2.  **Environment Setup**:
    ```bash
    python -m venv .venv
    # Windows:
    .venv\Scripts\activate
    # macOS/Linux:
    source .venv/bin/activate
    ```
3.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
4.  **Run Server**:
    ```bash
    uvicorn main:app --reload
    ```

### ⚛️ Frontend Setup (React)

1.  **Navigate to directory**:
    ```bash
    cd frontend
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Launch Dev Server**:
    ```bash
    npm run dev
    ```

---

## 🧠 Model Training

The model was trained using the `model-training.ipynb` notebook located in the `Training/` directory. It uses a CNN architecture to achieve high accuracy on potato leaf disease datasets.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

**Developed with ❤️ for Advanced Plant Pathology & AI.**
