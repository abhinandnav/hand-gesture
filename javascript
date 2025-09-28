<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2575.7">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; min-height: 14.0px}
  </style>
</head>
<body>
<p class="p1">&lt;!DOCTYPE html&gt;</p>
<p class="p1">&lt;html lang="en"&gt;</p>
<p class="p1">&lt;head&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;meta charset="UTF-8"&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;title&gt;Gesture Recognition&lt;/title&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;style&gt;</p>
<p class="p1"><span class="Apple-converted-space">        </span>body {</p>
<p class="p1"><span class="Apple-converted-space">            </span>font-family: Arial, sans-serif;</p>
<p class="p1"><span class="Apple-converted-space">            </span>text-align: center;</p>
<p class="p1"><span class="Apple-converted-space">            </span>background-color: #f9f9f9;</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">        </span>#webcam-container {</p>
<p class="p1"><span class="Apple-converted-space">            </span>margin-top: 20px;</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">        </span>#label-container div {</p>
<p class="p1"><span class="Apple-converted-space">            </span>font-size: 17px;</p>
<p class="p1"><span class="Apple-converted-space">            </span>margin: 5px;</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;/style&gt;</p>
<p class="p1">&lt;/head&gt;</p>
<p class="p1">&lt;body&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;h3&gt;Teachable Machine Image Model&lt;/h3&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;button onclick="init()"&gt;Start&lt;/button&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;div id="webcam-container"&gt;&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;div id="label-container"&gt;&lt;/div&gt;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;!-- Sound effects --&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;audio id="shield-sound" src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_1e6f7c6d2b.mp3?filename=shield-112508.mp3"&gt;&lt;/audio&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;audio id="fireball-sound" src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_6f6c3e6b2e.mp3?filename=fireball-112509.mp3"&gt;&lt;/audio&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;audio id="lightning-sound" src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_3f3e3e3e3e.mp3?filename=lightning-112510.mp3"&gt;&lt;/audio&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;audio id="peace-sound" src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_7e7e7e7e7e.mp3?filename=peace-112511.mp3"&gt;&lt;/audio&gt;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"&gt;&lt;/script&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js"&gt;&lt;/script&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;script&gt;</p>
<p class="p1"><span class="Apple-converted-space">        </span>const URL = "https://teachablemachine.withgoogle.com/models/VcUFpNpSP/";</p>
<p class="p1"><span class="Apple-converted-space">        </span>let model, webcam, labelContainer, maxPredictions;</p>
<p class="p1"><span class="Apple-converted-space">        </span>let lastGesture = "";</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">        </span>async function init() {</p>
<p class="p1"><span class="Apple-converted-space">            </span>const modelURL = URL + "model.json";</p>
<p class="p1"><span class="Apple-converted-space">            </span>const metadataURL = URL + "metadata.json";</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">            </span>model = await tmImage.load(modelURL, metadataURL);</p>
<p class="p1"><span class="Apple-converted-space">            </span>maxPredictions = model.getTotalClasses();</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">            </span>const flip = true;</p>
<p class="p1"><span class="Apple-converted-space">            </span>webcam = new tmImage.Webcam(300, 300, flip);</p>
<p class="p1"><span class="Apple-converted-space">            </span>await webcam.setup();</p>
<p class="p1"><span class="Apple-converted-space">            </span>await webcam.play();</p>
<p class="p1"><span class="Apple-converted-space">            </span>window.requestAnimationFrame(loop);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">            </span>document.getElementById("webcam-container").appendChild(webcam.canvas);</p>
<p class="p1"><span class="Apple-converted-space">            </span>labelContainer = document.getElementById("label-container");</p>
<p class="p1"><span class="Apple-converted-space">            </span>for (let i = 0; i &lt; maxPredictions; i++) {</p>
<p class="p1"><span class="Apple-converted-space">                </span>const label = document.createElement("div");</p>
<p class="p1"><span class="Apple-converted-space">                </span>label.style.fontFamily = "Arial";</p>
<p class="p1"><span class="Apple-converted-space">                </span>label.style.fontSize = "17px";</p>
<p class="p1"><span class="Apple-converted-space">                </span>labelContainer.appendChild(label);</p>
<p class="p1"><span class="Apple-converted-space">            </span>}</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">        </span>async function loop() {</p>
<p class="p1"><span class="Apple-converted-space">            </span>webcam.update();</p>
<p class="p1"><span class="Apple-converted-space">            </span>await predict();</p>
<p class="p1"><span class="Apple-converted-space">            </span>window.requestAnimationFrame(loop);</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">        </span>async function predict() {</p>
<p class="p1"><span class="Apple-converted-space">            </span>const prediction = await model.predict(webcam.canvas);</p>
<p class="p1"><span class="Apple-converted-space">            </span>let detected = false;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">            </span>for (let i = 0; i &lt; maxPredictions; i++) {</p>
<p class="p1"><span class="Apple-converted-space">                </span>const className = prediction[i].className.trim();</p>
<p class="p1"><span class="Apple-converted-space">                </span>const probability = prediction[i].probability.toFixed(2);</p>
<p class="p1"><span class="Apple-converted-space">                </span>labelContainer.childNodes[i].innerHTML = `${className}: ${probability}`;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">                </span>if (probability &gt; 0.85) {</p>
<p class="p1"><span class="Apple-converted-space">                    </span>detected = true;</p>
<p class="p1"><span class="Apple-converted-space">                    </span>if (className !== lastGesture) {</p>
<p class="p1"><span class="Apple-converted-space">                        </span>playSound(className);</p>
<p class="p1"><span class="Apple-converted-space">                        </span>lastGesture = className;</p>
<p class="p1"><span class="Apple-converted-space">                    </span>}</p>
<p class="p1"><span class="Apple-converted-space">                </span>}</p>
<p class="p1"><span class="Apple-converted-space">            </span>}</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">            </span>if (!detected) {</p>
<p class="p1"><span class="Apple-converted-space">                </span>labelContainer.innerHTML = "&lt;div style='font-size:17px;'&gt;No hand detected&lt;/div&gt;";</p>
<p class="p1"><span class="Apple-converted-space">                </span>lastGesture = "";</p>
<p class="p1"><span class="Apple-converted-space">            </span>}</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">        </span>function playSound(gesture) {</p>
<p class="p1"><span class="Apple-converted-space">            </span>const sounds = {</p>
<p class="p1"><span class="Apple-converted-space">                </span>"shield": document.getElementById("shield-sound"),</p>
<p class="p1"><span class="Apple-converted-space">                </span>"fireball": document.getElementById("fireball-sound"),</p>
<p class="p1"><span class="Apple-converted-space">                </span>"lightning": document.getElementById("lightning-sound"),</p>
<p class="p1"><span class="Apple-converted-space">                </span>"peace": document.getElementById("peace-sound")</p>
<p class="p1"><span class="Apple-converted-space">            </span>};</p>
<p class="p1"><span class="Apple-converted-space">            </span>if (sounds[gesture]) {</p>
<p class="p1"><span class="Apple-converted-space">                </span>sounds[gesture].play();</p>
<p class="p1"><span class="Apple-converted-space">            </span>}</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;/script&gt;</p>
<p class="p1">&lt;/body&gt;</p>
<p class="p1">&lt;/html&gt;</p>
</body>
</html>
