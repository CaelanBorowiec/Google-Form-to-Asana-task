# Google Form to Asana Task

## About

This Google Script (.gs) is a JavaScript based program which is designed to run in real time when a form is submitted.  When it runs, processing is performed on the data entered, then the data is sent to Asana in the form of an Asana Task.

## Advantages

1. Runs immediately: No polling delay imposed by some web services.
2. More control: Data handling is not limited by a service.  If the Asana API supports it, you can do it.
3. No quotas.

## Setup

1. Visit [Google Forms](https://docs.google.com/forms/u/0/)
2. Create a new form, and add all your questions
3. Click on responses, then the green &quot;Create Spreadsheet&quot; icon
4. Create new spreadsheet
5. **Tools -> Script Editor**
6. Paste in the Google Script
7. Update the script as needed so that the spreadsheet column labels match the requests in the Google Script.  You will probably want to customize the details added to the body quite a bit.
8. Add your API key to the script
9. **Run -> Function -> PostData,** accept any prompts requested.
10. **Edit -> Current Project&#39;s Triggers.  ** Add a new trigger as so:
Run: PostData, Events: From Spreadsheet, On form submit.
