 
## 📋 Content of the task


- [x] Finishing the UI functionalities including adding new subProducts
- [x] Neat project structure.
- [x] Proper State management.  (**Context API ** for state management).
- [x]  Data using **fetch** or axios instead of using the static data from json.
- [x] Create API endpoints to fetch products, subcategories and sub products needed to show in the frontend part.
- [x] Create an API endpoint to add a new sub product.(Not needed for products and subcategories)
- [x] Create an endpoint to save the selected as shown in the save modal in the front end screen. This can be a separate table in the backend


## 🎥  Demo


https://www.loom.com/share/83988d64b9a14a80a83bd533a15990ca?sid=f03a79d5-cd04-446a-8ed9-7627e09af754

## ✍️ Description

- **Codebase Refactor**: The codebase was  organised under clear structures following modern standards. **Compound Component Pattern** was used for the React App.** Debouncing** & **Optmisitic UI updates** were also utilized for performance gains.

- **Unit Test**:  `Jest`  and  `react-testing-library` was used to assert calls & values, as well as to mock the dependencies.   major functionalities  were unit-tested, but there was no time to include integration test 😀

- **Docker**: The app was containerized with `Dockerfile` and [`Docker-Compose`](https://docs.docker.com/compose/install/). 

- **Migration/Seeding**: The vehicle table was seeded. And the appropriate endpoints to retrieve data was added

- **Endpoints  **:  
		 - `Get all Products:`**  `{{apiUrlrl}}/api/v1/products`
		 - `Get all Subcategories:`**  `{{apiUrlrl}}/api/v1/subcategories`
		 - `Get all /POST subproducts:`**  `{{apiUrlrl}}/api/v1/subproducts`
		 - `POST Done Date:`**  `{{apiUrlrl}}/api/v1/save`

- **Styling**:  
	Styled with BEM methodology  and style scoped as css modules. No UI Library used whatsoever.


## ⚙️ Config changes / Packages

- Eslint
- Prettier
- Makefile & Bash for cmds
	*... mostly dev pkgs*
- Node v.18xx (you can easily throttle node versions with nvm installed in your PC)

## 🧐 How To Start the App (Locally)

- [ ] `make docker-build` to build the api & db
- [ ] ` make docker-seed` to seed the db with initial data
- [ ] `make docker-start `
- [ ] `make start-dev`

## 🧐 How To Test the App (Docker)
- [ ] `make test-client-docker` to test the React app in Docker
- [ ] `make test-api-docker` to test the Django app in Docker 
			or ssh into the container & run the local command below

## 🧐 How To Test the App in Locally

- [ ] `make test-client-local` to test react
- [ ] `make test-api-local `to for django app
- [ ] to stop: `make docker-stop`


once these steps are done: 

   - React app: http://localhost:3000
   - Django BE endpoint: http://localhost:8000/api/v1/{{variant}}


## 🛠️ Things to Improve with longer time allotment: 
- Document API spec with Postman collection / Swagger etc..
- Metrics & Monitoring
- Cover more test cases
- 

What are your thoughts on the Eager Loading strategy utilized in this implementation against Lazy Loading ?

Happy Coding! 👋🏽


