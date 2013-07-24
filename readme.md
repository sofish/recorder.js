## Recorder.js

Using Capture API (HTML5) to capture video / photo via the camera of your device.

```js
// detect api support
if(Recorder.isSupported) console.log('oh yeah!');
```

### 1. Run the demo

```sh
git clone git@github.com:sofish/recorder.js.git
// open the `testcase/` dir on your browser
```

### 2. API

Using the API to run your own instance.

#### 2.1 Play the media

```js
/* play vedio|audio
 * @param el {DOM Element} video/audio element to capture the stream
 * @param type {String} media type, the value can be: 'video', 'audio', or 'both'
 * @param callback {Function} callback to run when the media's metadata is load
 */
Recorder.play(el, type, callback)
```

#### 2.2 Take a snapshot

Capture a snapshot of the current image of the media stream. a DataURL string of the snapshot will be set as the return value.

```js
/* take picture
 * @param video {DOM Element} the video element
 * @param type {String} specify a type, like 'image/png'
 * @return Image {String: DataURL}
 */
Recorder.snapshot(video, [type]);
```

#### 2.3 Upload snapshot

Allow u to send snapshot to server

```js
/* upload to server
 * @param url {String} request url
 * @param data {Object} data to send
 * @param callback {Function} the first argument is the response
 */
R.upload(url, data, [callback])
```

### 3. Demo Code

```js
~function(win, doc) {

  var Util = {}, video, snapshot, play;

  Util.get = function(selector, isList) {
    return isList ? doc.querySelectorAll(selector) : doc.querySelector(selector);
  }

  video = Util.get('#video');
  snapshot = Util.get('#snapshot');
  play = Util.get('#play');
  stop = Util.get('#stop');

  play.addEventListener('click', function(){
    Recorder.play(video, 'both', function() {
      snapshot.style.display = 'inline';
    })
  }, false);

  stop.addEventListener('click', function() {
    video.pause();
    snapshot.style.display = 'none';
  })

  snapshot.addEventListener('click', function() {
    var imgSource = Recorder.snapshot(video)
      , img = doc.createElement('img');

    img.src = imgSource;
    doc.body.appendChild(img);
  }, false);

}(window, document)
```



