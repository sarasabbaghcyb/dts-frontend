Feature: Edit Task Page

  Scenario: Check the Edit Task page displays correctly
    When I go to '/task/1/edit'
    Then I should see "Edit Task"
    And I should see a "Save Edits" button

