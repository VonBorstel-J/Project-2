
//  var tag = document.createElement('script');

//  tag.src = "https://www.youtube.com/iframe_api";
//  var firstScriptTag = document.getElementsByTagName('script')[0];
//  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


//  var player;
//  function onYouTubeIframeAPIReady() {
//    player = new YT.Player('player', {
//     width: 1280,
//     height: 720,
//      videoId: 'M7lc1UVf-VE',
//      playerVars: {
//        'playsinline': 1
//      },
//      events: {
//        'onReady': onPlayerReady,
//        'onStateChange': onPlayerStateChange
//      }
//    });
//  }


//  function onPlayerReady(event) {
//    event.target.playVideo();
//  }


//  var done = false;
//  function onPlayerStateChange(event) {
//    if (event.data == YT.PlayerState.PLAYING && !done) {
//      setTimeout(stopVideo, 6000);
//      done = true;
//    }
//  }
//  function stopVideo() {
//    player.stopVideo();
//  }