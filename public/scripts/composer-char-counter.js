$(document).ready(function() {

  // Log a message to the console once the web page has been loaded.
  // console.log("The document is ready!");


  /* CHOOSING EVENTS
   *
   * Which of the following events should you use to implement a character
   * counter?
   *
   *  * `blur`: The first you click on the target element, nothing happens, but
   *    when you move focus away from it by clicking elsewhere on the web page,
   *    it triggers `blur`.
   *
   *  * `keydown`: is triggered when a key is pressed in the the target element.
   *
   *  * `keyup`: is triggered when a key de-presses from being pressed. If you
   *    hold down the key, all the characters added don't count.
   *
   *  * `keypress`: is triggered when a key is pressed, but not when `Backspace`
   *    or `Delete` is pressed.
   *
   *  * `change`: is triggered like `blur`. If you click on the element and
   *    make any changes within, and click elsewhere in the web page, it checks
   *    if the text has changed since the last time. If so, it is triggered.
   *    But changes are NOT counted until
   *
   *  * `input`: is similar to keypress; is triggered when values are added to
   *    the target element.
   */
  $("#tweet-text").on("keyup", function(event) {


    // Test events and `this` values.
    // console.log(`A ${this.type} event happened!`);
    // console.log(this);


    const tweetMax = 140;

    // Collect the length tweet body passed in by the user.
    const characterCount = ($(this).val().length);
    // console.log(characterCount);

    // Calculate how much of the limit has been reached.
    const tweetLength = tweetMax - characterCount;

    // Update the `counter` element each time the key is pressed.
    // Read this as follows: In the `New-Tweet-Section` section, find the class
    // `counter` element and change its `text` property.
    $("#New-Tweet-Section .counter").text(tweetLength);


    // This version uses DOM Traversal to find the element.
    // const parentElement = $(this).closest("form");
    // const outputElement = parentElement.find(".counter");
    // outputElement.text(tweetMax - characterCount);


    // If the tweet's length goes over 140 characters, make the tweet count
    // red...
    if (tweetLength < 0) {

      // Note: You need `.` and `#` in front of elements when you are calling
      // them, but not when you are using the `addClass` method (because it is
      // implied that it is a class; you don't need the `.` to prove it.).
      $("#New-Tweet-Section .counter").addClass("Counter-Over-Limit");

      // ...otherwise, you will have to explicitly remove the class (to account
      // for cases when the user deletes characters to bring it under 140.).
    } else {

      $("#New-Tweet-Section .counter").removeClass("Counter-Over-Limit");

    }

  });

});