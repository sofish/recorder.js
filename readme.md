## Recorder.js

Using Capture API (HTML5) to capture video / photo via the camera of your device.

DEMO: baixing/fabu [使用摄像头传图](http://shanghai.sofish.baixing.cn/fabu/zhengzu#id_images)

![demo image](https://f.cloud.github.com/assets/153183/984367/4167f0b2-0899-11e3-84aa-d5ea3e8c5e77.png)


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

#### 2.4 Read files from input

Allow u to read image files from `input[type="file"]`:

```js
/* 读取 input[type=file] 选中的文件
 * @param input {HTML Element} input[type=file]
 * @returns {Array: Blob} 返回是文件的二进制形式 Blob
 */
R.read(input);
```

### 3. Demo Code

[testcase/index.html](https://github.com/sofish/recorder.js/blob/master/testcase/index.html)



