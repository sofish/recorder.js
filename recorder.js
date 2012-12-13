/*! licensed under MIT, https://github.com/sofish */
var Recorder = (function(R, win, doc) {

  // detect CaptureApi
  R._api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;

  if(!R._api) return alert(':( Your device doesn\'t have native support of Caputure Api.');

  /* play vedio|audio
   * @param el {DOM Element} video/audio element to capture the stream
   * @param type {String} media type, the value can be: 'video', 'audio', or 'both'
   * @param callback {Function} callback to run when the media's metadata is load
   */
  R.play = function(el, type, callback) {

    // only capturing video/audio
    if(!(el && ['VIDEO', 'AUDIO'].indexOf(el.nodeName.toUpperCase()) !== -1)) return;

    var error, success, constraints;

    // notice user when an error occurred
    error = function() {
      alert('an error occurred when the browser trying to record the view stream!');
    }

    // set the video source to the stream when success to connect
    success = function(stream) {
      win.URL = win.URL || win.webkitURL;
      el.src = win.URL ? win.URL.createObjectURL(stream) : stream;
      // render callback when the metadata of the video is loaded

      el.addEventListener('loadedmetadata', function(e) {
        callback && callback(e);
        !el.autoplay && el.play();
      }, false);
    }

    // decide what to capture
    switch (type) {
      case 'video': constraints = { video: true }
        break;
      case 'audio': constraints = { audio: true }
        break;
      default : constraints = {
        video: true,
        audio: true
      }
    }

    // SPECIFIC: navigator.getUserMedia ( constraints, successCallback, errorCallback );
    // NOTE: resolve wrapping error:
    //  `NS_ERROR_XPC_BAD_OP_ON_WN_PROTO: Illegal operation on WrappedNative prototype object`
    navigator.getUserMedia ? navigator.getUserMedia(constraints, success, error) :
      navigator[R._api.name](constraints, success, error);
  }

  /* take picture
   * @param video {DOM Element} the video element
   * @return Image {String: DataURL}
   */
  R.snapshot = function(video) {

    if (!(video && video.videoHeight)) return;

    // using canvas to generate snapshot
    var canvas = doc.createElement('canvas')
      , ctx = canvas.getContext('2d');

    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;

    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL('image/png');
  }

  return R;

})(Recorder || {}, window, document);