Feature: Add New Task Page

  Scenario: Load the Add New Task page
    When I go to '/task/new'
    Then the page should include 'Add New Task'

  Scenario: Check if the form fields are present
    When I go to '/task/new'
    Then I should see a form field with label "Task Title"
    And I should see a form field with label "Task Description"
    And I should see a dropdown with label "Task Status" and options "PENDING" and "COMPLETED"
    And I should see a form field with label "Due Date"

  Scenario: Display an error if no title is entered
    When I go to '/task/new'
    And I submit the form without filling "title"
    Then I should see an error summary with "There is a problem"
