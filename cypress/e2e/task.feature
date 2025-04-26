Feature: View Task Details

  Scenario: Load the Task Details page
    When I go to '/task/1'
    Then the page should include 'Task number: 1'

  Scenario: Check task details are displayed
    When I go to '/task/1'
    Then I should see a summary field labeled "Title" with a value
    And I should see a summary field labeled "Description" with a value
    And I should see a summary field labeled "Status" with a value
    And I should see a summary field labeled "Due date" with a value

  Scenario: Check for Edit and Delete buttons
    When I go to '/task/1'
    Then I should see an "Edit Task" button
    And I should see a "Delete Task" button
