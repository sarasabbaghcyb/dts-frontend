# HMCTS Dev Test Frontend
This will be the frontend for the brand new HMCTS case management system. As a potential candidate we are leaving
this in your hands. Please refer to the brief for the complete list of tasks! Complete as much as you can and be
as creative as you want.

To begin with, you should be able to run this by running:
1) `yarn install`
2) `yarn webpack`
3) `yarn start:dev` or navigate to package.json and run the script manually

You can change the structure however you like!

## Testing
Both puppeteer and codecept were not working for how i wanted to carry out my end to end testing so I decided to use
Cypress testing instead. To run cypress please use command
```yarn cy:open```

Unit test are carried using Jest testing to carry out unit test which i have added to please use command

```yarn test```

### Functionality
I have added to the app by creating a user friendly ux and adding the functionality for users to view, add, delete and edit tasks.
To do this I have stuck with gov design systems and used accessible design components.

### Validation

Validation is handled manually on the front end and forms also use Joi for strict valiadation as a layer of protection for what is sent back through to the api. 
