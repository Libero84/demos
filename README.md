Version:
node 19.9.0
npm 9.6.3

install packages in each directory:
npm install

We start the server:
npm start

Client we run:
npm run dev

---

Description:

The application consists of two pages. The first page presents the table view. From the table we can switch to the detail view.
We also have the possibility to add new entities and update existing ones.
For the presentation, a simple server was added, whose task is to mock up data.

The libraries used in the project are: Ag Grid, shadcn/ui, React-Hook-Form, Zod, tailwindcss, apollo/client
Ag Grid - main table,
shadcn/ui - form components
React-Hook-Form - form handling
Zod - form validation
tailwindcss - styling
appolo/client - communication with backend

---

Problems:

I used version 19 of node because there was an error code on the server in version 20: 'ERR_UNKNOWN_FILE_EXTENSION' error - related to ts extension - to avoid standing still for this project I decided to use the working version of node
resetting the number field - in the schema for the phone field I left the string type. After setting the number field to undefined, zod still did not clear the field. I think it would be possible to replace zod with e.g. yup. Or handle the field as a string using regexp for example.

In the application, error handling should be added, as well as short messages in the form of toasts about the successful action of adding and editing an entity.
It would also be tempting to write unit tests for the form
