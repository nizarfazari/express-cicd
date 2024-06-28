## Binar Car Rental ( API )

## ERD
![Alt text](./ERD.png)


## API Spec
### Cars API
Method | URI | Description | 
------ | --- | ----------- |
**GET** | `/api/v1/cars` | Display all cars data from database |
**GET** | `/api/v1/cars/:id` | Display specific car data from database by ID |
**POST** | `/api/v1/cars` | Create car data to database |
**UPDATE** | `/api/v1/cars/:id` | Update specific car data from database by ID |
**DELETE** | `/api/v1/cars/:id` | Delete specific car data from database by ID |

### User API 
Method | URI | Description | 
------ | --- | ----------- |
**GET** | `/api/v1/users/me` | Display specific user data  |
**POST** | `/api/v1/login` | To  purpose of authenticating users by verifying their credentials  |
**POST** | `/api/v1/register` | To create users  |
