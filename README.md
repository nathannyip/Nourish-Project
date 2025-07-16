# NourishProject

## Description
Nourish Project is a web application that helps users track their meals, monitor their daily macro and calorie intake, and visualize their nutritional progress over time.

- User registration and authentication for personalized tracking.
- Interactive dashboard to visualize daily and weekly progress.
- Response UI built with React and Material-UI.
- RESTful backend powered by Django, with support for PostgreSQL for data management.

  ![dashboard](https://github.com/user-attachments/assets/ba27322d-d9f2-4c4e-bf58-4555a6c199d6)
  <img width="1440" height="799" alt="meals" src="https://github.com/user-attachments/assets/f05962d4-114b-499c-afdd-44032ea3c21e" />


## Installation
### 1. Clone
```sh
git clone https://github.com/nathannyip/NourishProject.git
cd Nourish
```
### 1.5. Create and Activate Virtual Environment

It is recommended to use a virtual environment for Python dependencies. Run the following commands to create and activate a virtual environment using Python 3.12:

#### macOS/Linux
```sh
python3.12 -m venv venv
source venv/bin/activate
```

#### Windows
```sh
python -m venv venv
venv\Scripts\activate
```

Make sure you have Python 3.12 installed. You can check your version with:
```sh
python3 --version
```

### 2. Django setup
```sh
pip install -r requirements.txt | 
python manage.py migrate
python manage.py runserver
```
### 3. React setup
```sh
cd frontend
npm install
npm start
```
