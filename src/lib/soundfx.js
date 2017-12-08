// https://github.com/foumart/JS.13kGames by @foumartgames
const SoundFX = (function() {

  let data = {};
  let ua = navigator.userAgent.toLowerCase();

  let ios = /ipad|iphone|ipod/.test(ua);

  function add(d) {
    data = d;
  }

  function play(id) {
    if (ios) { return; }
    playSound(data[id]);
  }

  function getMasterVolume(){ return 1; }
  const soundContext = new (window.AudioContext || window.webkitAudioContext)();
  // sine is the oscillator's default, but we use square as default
  const oscTypes = ['square', 'sawtooth', 'triangle', 'sine'];

// https://codereview.stackexchange.com/questions/47889/alternative-to-setinterval-and-settimeout
  function _interval (callback, delay) {
    var now = Date.now,
      rAF = requestAnimationFrame,
      start = now(),
      stop,
      intervalFunc = function(){
        now() - start < delay || (start+=delay,callback());
        stop || rAF(intervalFunc)
      }
    rAF(intervalFunc);
    return{
      clear:function(){stop=1}
    }
  }


  function playSound (d){

    let [_freq, _incr, _delay, _times, _vol, _type = 0] = d;

    const osc = soundContext.createOscillator(); // instantiate oscillator
    _type = _type === undefined ? 0 : _type;
    osc.frequency.value = _freq;
    osc.type = oscTypes[_type];

    const modulationGain = soundContext.createGain(); // instantiate modulation for sound volume control
    modulationGain.gain.value = 0;

    osc.connect(modulationGain);
    modulationGain.connect(soundContext.destination);
    osc.start();

    let i = 0;
    const interval = _interval(playTune, _delay);

    function playTune(){
      osc.frequency.value = _freq + _incr * i;
      modulationGain.gain.value = (1-(i/_times)) * _vol * getMasterVolume();
      i += 1;
      if (i > _times) {
        interval.clear();
        osc.stop();
      }
    }
  }
  return{
    add: add,
    play: play
  }
})();

export default SoundFX;
