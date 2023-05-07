document.querySelector('#banner').id;
// select #banner's id, can change it using '='
document.querySelector('a').href;
document.querySelector('a').title;

const link = document.querySelector('a');

link.href;
link.getAttribute('link')
// gettAttribute -> returns directly from the HTML
// .href -> gets it from javascript
// Looks same but different

link.setAttribute('want to change', 'change to');

// ex) link.setAttribute('href', 'http://asdasd.com')
