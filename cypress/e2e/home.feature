Feature: Initial Functional test

  Scenario: The home page loads
    When I go to '/'
    Then the page should include 'Welcome to your Task list!'

  Scenario: Check the "Add New Task" button is visible
    When I go to '/'
    Then I should see the "Add New Task" button

  Scenario: Check the task list
    When I go to '/'
    Then the page should have a task list

  Scenario: Check the sorting dropdown
    When I go to '/'
    Then I should see a "Sort tasks by" dropdown with options "Alphabetical", "ID", "Completed Status", and "Pending Status"
