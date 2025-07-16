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
### 4. Install PostgreSQL
You need a local PostgreSQL server for development. Download and install PostgreSQL from the official site:

- [PostgreSQL Downloads](https://www.postgresql.org/download/)
  
### 5 . Configure Environment Variables
Create a `.env` file in the project root with the following variables from `.env.example`:
```
DJANGO_SECRET_KEY=your-django-secret-key
DEBUG=True
POSTGRES_DB=nourish_db
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_STORAGE_BUCKET_NAME=your-bucket-name
AWS_S3_REGION_NAME=your-region
```


### 6. AWS Setup (Optional, for media storage)

If you want to use AWS S3 for media file storage:

1. Create an AWS account and an S3 bucket.
2. Generate an IAM user with programmatic access and attach the necessary S3 permissions.
3. Add your AWS credentials and bucket info to the `.env` file as shown above.

For more details, see the [AWS S3 documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html).
