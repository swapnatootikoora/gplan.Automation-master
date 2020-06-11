## What is gPlan Automation?

A suite of automated tests for the gPlan web application

## What does it use

The project uses [Selenium Web Driver](https://www.npmjs.com/package/selenium-webdriver) for controlling browser interaction and [nightwatchjs](https://www.npmjs.com/package/nightwatch) to provide a test execution framework and translate test steps into [Selenium wire protocol](https://code.google.com/p/selenium/wiki/JsonWireProtocol) commands which the web driver understands.

    
	    js tests    ---->     nightwatchjs     --->     Selenium webdriver     ---->     Browser 
    


## Getting started

### Installing dependencies
To run the tests the follow these steps

* [Install git](http://git-scm.com/)
* [Install node](https://nodejs.org/)
* [MAC ONLY] [Install xcode command line tools](https://developer.apple.com/downloads/index.action?q=xcode)
* Open terminal/command/powershell and navigate to a location you wish to store the tests
* [Clone the repository](http://git-scm.com/docs/git-clone) by running - *git clone https://github.com/thisisglobal/gPlan.Automation.git*
* Change directory to the new repository - *cd gPlan.Automation*
* Install test dependancies by running - *npm install*

### Installing browser drivers

###### Safari  
* [MAC] - Double click *bin/SafariDriver.safariextz* and accept prompt to install browser extension
* [Windows] - Launch safari, *File->Open* and select *bin/SafariDriver.safariextz*, accept prompt to install browser extension

###### Other Browsers
* Due to gPlan end users only running the application on safari, it is advised that testing be performed on the same browser.


### Running tests

The run tests command takes the format *node test [test group] --[environment]*

* Execute santity tests with the default settings by running - *node test sanity*
* Execute smoke tests with the default settings by running - *node test smoke*
* [Note] - running *node test* on it's own will return an error.

Test Groups - *sanity, smoke*  
Environments - *localhost, dev, dev2, dev3, test*

To run specific tests you can apply a filter, there is not currently a command line parameter for this yet however.  
To run a specific test (for example 02 - smoke test), edit the *nightwatch.json* and add the line ***"filter": "ST01.js"*** after the *desiredCapabilities* property in the section for the browser you are running, e.g. *"safari"*

## Project Struture

	|
    ├── bin/
    ├── commands/
	├── data/
    ├── logs/
	├── pages/
	├── reports/
	├── screenshots/
	├── tests/
	|     ├── sanity/
	|     ├── smoke/
	├── utils/
	├── gulpfile.js
	├── nightwatch.json


**Bin** - stores binary files, such as drivers that are required by selenium to control a specific browser  
**Commands** - low level actions to perform on a browser, e.g. *selectOption* which selects drop downs options by text  
**Data** - contains .json files (per environment) which contain the data used in tests, for example *order name, sales exec name etc*. *default.json* contains the data that can be used by all environments, environment .json files just override or add to the data required specifically for that environment e.g. environment url  
**Logs** - contains very low level logs of test runs, useful for debugging but not results gathering  
**Pages** - contains page modules (one page per .js file) which encapsulate all actions that can be performed on the specified page. for example *orderPage.js* contains actions such as *enterOrderDetails* and *saveOrderDetails*  
**Reports** - contains high level test execution results stored in XML format
**Screenshots** - contains screenshots taken during the ***last*** test execution  
**Tests** - contains the actual files that are loaded and ran during test execution, this is split into 2 folders: sanity + smoke. Each file represents a seperate test scenario and uses the *page modules* to perform the actions required to complete the test  
**Utils** - contains utility functions such as *generating jcns* and *building screenshots file names*  
**gulpfile.js** - configuration for the task runner which is responsible for starting test in conjunction with performing tasks such as deleting old screenshots and fetching JCNs that may be needed by the next test run  
**nightwatch.json** - nightwatchjs configuration file, location for configuring settings such as *launch url, parallel execution, desired browsers etc*

## Useful Resources
* [Nightwatch config file settings](http://nightwatchjs.org/guide#settings-file)
* [Nightwatch api documentation](http://nightwatchjs.org/api)
* [CSS Selectors](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/Selectors) - helps to understand property selectors, pseudo state selectors and nth-child etc
* [CSS attribute selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors) - helps to understand selecting elements by attributes (starts with, ends with etc)