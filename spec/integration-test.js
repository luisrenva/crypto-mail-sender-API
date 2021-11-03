var selenium = require('selenium-webdriver');

describe('Selenium Tutorial', () => {

  // Open the TECH.insight website in the browser before each test is run
  beforeEach((done) => {

    // originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

    this.driver = new selenium.Builder().
    withCapabilities(selenium.Capabilities.chrome()).build();

    // this.driver.get('http://www.google.com/').then(done)
    this.driver.get('http://www.techinsight.io/').then(done);
  });

  // Close the website after each test is run (so that it is opened fresh each time)
  afterEach((done) => {
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    this.driver.quit().then(done);
  });

  // Test to ensure we are on the home page by checking the <body> tag id attribute
  it('Should be on the home page', (done) => {
    var element = this.driver.findElement(selenium.By.tagName('body'));

    element.getAttribute('id').then((id) => {
      expect(id).toBe('home');
      done();
    });
  });

  // Test the navigation bar by clicking on the 'REVIEW' link and checking the URL changes to '/review'
  // it('Has a working nav', function(done) {
  //     var element = this.driver.findElement(selenium.By.linkText('REVIEW'));

  //     element.click();

  //     this.driver.getCurrentUrl().then(function(value) {
  //         expect(value).toContain('/review');
  //         done();
  //     });
  // });
});

// var selenium     = require('selenium-webdriver');
// jasmine.getEnv().defaultTimeoutInterval = 10000; // in microseconds.
// jasmine.DEFAULT_TIMEOUT_INTERVAL        = 10000; // in microseconds.
// describe('Check that we have window object', function () {
// var urls = [
//         'http://www.google.com/',
//         'http://www.yahoo.com/',
//         'https://idanmorblog.wordpress.com/'
//     ];
// var index = -1;
// // Open the TECH.insight website in the browser before each test is run
//     beforeEach(function (done) {
//         this.driver = new selenium.Builder().withCapabilities(selenium.Capabilities.chrome()).build();
//         this.driver.manage().timeouts().setScriptTimeout(10000);
//         index++;
//         if (index >= urls.length) index = 0;
//         this.driver.get(urls[index]).then(done);
//     });
// // Close the website after each test is run (so that it is opened fresh each time)
//     afterEach(function (done) {
//         this.driver.quit().then(done);
//     });
// // the function to test the rule - the Jasmine it object
//     var checkWindow = function (url) {
//         it('Check if there is a window object on page: ' + url, function (done) {
//             this.driver.executeAsyncScript(
//                 function(inputY){
//                     arguments[arguments.length - 1]({'x': !!window, 'y': inputY});
//                 },
//                 "IdanMor"
//             ).then(function (res) {
//                 expect(res.x).toBe(true);
//                 expect(res.y).tobe('IdanMor');
//                 done(); 
//             });
//         });
//     };
// //run all the tests on each url
//     urls.forEach(function (url) {
//         checkWindow(url);
//     });
// });