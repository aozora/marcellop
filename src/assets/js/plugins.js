/**
 *
 * Twitter Feed Fetcher
 *
 */
function sm_format_twitter(twitters) {
  var statusHTML = [];
  for (var i = 0; i < twitters.length; i++) {
    var username = twitters[i].user.screen_name;
    var status = twitters[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function (url) {
      return '<a href="' + url + '" target="_blank">' + url + '</a>';
    }).replace(/\B@([_a-z0-9]+)/ig, function (reply) {
      return reply.charAt(0) + '<a href="http://twitter.com/' + reply.substring(1) + '" target="_blank">' + reply.substring(1) + '</a>';
    });
    statusHTML.push('<li><i class="icon-twitter"></i><span>' + status + '</span><small><a href="http://twitter.com/' + username + '/statuses/' + twitters[i].id_str + '" target="_blank">' + relative_time(twitters[i].created_at) + '</a></small></li>');
  }
  return statusHTML.join('');
}


function sm_format_twitter2(twitters) {
  var statusHTML = [];
  for (var i = 0; i < twitters.length; i++) {
    var username = twitters[i].user.screen_name;
    var status = twitters[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function (url) {
      return '<a href="' + url + '" target="_blank">' + url + '</a>';
    }).replace(/\B@([_a-z0-9]+)/ig, function (reply) {
      return reply.charAt(0) + '<a href="http://twitter.com/' + reply.substring(1) + '" target="_blank">' + reply.substring(1) + '</a>';
    });
    statusHTML.push('<div class="slide"><span>' + status + '</span><small><a href="http://twitter.com/' + username + '/statuses/' + twitters[i].id_str + '" target="_blank">' + relative_time(twitters[i].created_at) + '</a></small></div>');
  }
  return statusHTML.join('');
}


function sm_format_twitter3(twitters) {
  var statusHTML = [];
  for (var i = 0; i < twitters.length; i++) {
    var username = twitters[i].user.screen_name;
    var status = twitters[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function (url) {
      return '<a href="' + url + '" target="_blank">' + url + '</a>';
    }).replace(/\B@([_a-z0-9]+)/ig, function (reply) {
      return reply.charAt(0) + '<a href="http://twitter.com/' + reply.substring(1) + '" target="_blank">' + reply.substring(1) + '</a>';
    });
    statusHTML.push('<div class="slide"><div class="testi-content"><p>' + status + '</p><div class="testi-meta"><span><a href="http://twitter.com/' + username + '/statuses/' + twitters[i].id_str + '" target="_blank">' + relative_time(twitters[i].created_at) + '</a></span></div></div></div>');
  }
  return statusHTML.join('');
}


function relative_time(time_value) {
  var values = time_value.split(" ");
  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
  var parsed_date = Date.parse(time_value);
  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
  delta = delta + (relative_to.getTimezoneOffset() * 60);

  if (delta < 60) {
    return 'less than a minute ago';
  } else if (delta < 120) {
    return 'about a minute ago';
  } else if (delta < (60 * 60)) {
    return (parseInt(delta / 60)).toString() + ' minutes ago';
  } else if (delta < (120 * 60)) {
    return 'about an hour ago';
  } else if (delta < (24 * 60 * 60)) {
    return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
  } else if (delta < (48 * 60 * 60)) {
    return '1 day ago';
  } else {
    return (parseInt(delta / 86400)).toString() + ' days ago';
  }
}


// SmoothScroll v0.9.9
// Licensed under the terms of the MIT license.

// People involved
// - Balazs Galambosi: maintainer (CHANGELOG.txt)
// - Patrick Brunner (patrickb1991@gmail.com)
// - Michael Herf: ssc_pulse Algorithm
if (navigator.platform.toUpperCase().indexOf('MAC') === -1 && !navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini|BlackBerry)/) && jQuery(window).width() > 991 && !jQuery('body').hasClass('no-smooth-scroll')) {
  function ssc_init() {
    if (!document.body)return;
    var e = document.body;
    var t = document.documentElement;
    var n = window.innerHeight;
    var r = e.scrollHeight;
    ssc_root = document.compatMode.indexOf("CSS") >= 0 ? t : e;
    ssc_activeElement = e;
    ssc_initdone = true;
    if (top != self) {
      ssc_frame = true
    } else if (r > n && (e.offsetHeight <= n || t.offsetHeight <= n)) {
      ssc_root.style.height = "auto";
      if (ssc_root.offsetHeight <= n) {
        var i = document.createElement("div");
        i.style.clear = "both";
        e.appendChild(i)
      }
    }
    if (!ssc_fixedback) {
      e.style.backgroundAttachment = "scroll";
      t.style.backgroundAttachment = "scroll"
    }
    if (ssc_keyboardsupport) {
      ssc_addEvent("keydown", ssc_keydown)
    }
  }

  function ssc_scrollArray(e, t, n, r) {
    r || (r = 1e3);
    ssc_directionCheck(t, n);
    ssc_que.push({x: t, y: n, lastX: t < 0 ? .99 : -.99, lastY: n < 0 ? .99 : -.99, start: +(new Date)});
    if (ssc_pending) {
      return
    }
    var i = function () {
      var s = +(new Date);
      var o = 0;
      var u = 0;
      for (var a = 0; a < ssc_que.length; a++) {
        var f = ssc_que[a];
        var l = s - f.start;
        var c = l >= ssc_animtime;
        var h = c ? 1 : l / ssc_animtime;
        if (ssc_pulseAlgorithm) {
          h = ssc_pulse(h)
        }
        var p = f.x * h - f.lastX >> 0;
        var d = f.y * h - f.lastY >> 0;
        o += p;
        u += d;
        f.lastX += p;
        f.lastY += d;
        if (c) {
          ssc_que.splice(a, 1);
          a--
        }
      }
      if (t) {
        var v = e.scrollLeft;
        e.scrollLeft += o;
        if (o && e.scrollLeft === v) {
          t = 0
        }
      }
      if (n) {
        var m = e.scrollTop;
        e.scrollTop += u;
        if (u && e.scrollTop === m) {
          n = 0
        }
      }
      if (!t && !n) {
        ssc_que = []
      }
      if (ssc_que.length) {
        setTimeout(i, r / ssc_framerate + 1)
      } else {
        ssc_pending = false
      }
    };
    setTimeout(i, 0);
    ssc_pending = true
  }

  function ssc_wheel(e) {
    if (!ssc_initdone) {
      ssc_init()
    }
    var t = e.target;
    var n = ssc_overflowingAncestor(t);
    if (!n || e.defaultPrevented || ssc_isNodeName(ssc_activeElement, "embed") || ssc_isNodeName(t, "embed") && /\.pdf/i.test(t.src)) {
      return true
    }
    var r = e.wheelDeltaX || 0;
    var i = e.wheelDeltaY || 0;
    if (!r && !i) {
      i = e.wheelDelta || 0
    }
    if (Math.abs(r) > 1.2) {
      r *= ssc_stepsize / 120
    }
    if (Math.abs(i) > 1.2) {
      i *= ssc_stepsize / 120
    }
    ssc_scrollArray(n, -r, -i);
    e.preventDefault()
  }

  function ssc_keydown(e) {
    var t = e.target;
    var n = e.ctrlKey || e.altKey || e.metaKey;
    if (/input|textarea|embed/i.test(t.nodeName) || t.isContentEditable || e.defaultPrevented || n) {
      return true
    }
    if (ssc_isNodeName(t, "button") && e.keyCode === ssc_key.spacebar) {
      return true
    }
    var r, i = 0, s = 0;
    var o = ssc_overflowingAncestor(ssc_activeElement);
    var u = o.clientHeight;
    if (o == document.body) {
      u = window.innerHeight
    }
    switch (e.keyCode) {
      case ssc_key.up:
        s = -ssc_arrowscroll;
        break;
      case ssc_key.down:
        s = ssc_arrowscroll;
        break;
      case ssc_key.spacebar:
        r = e.shiftKey ? 1 : -1;
        s = -r * u * .9;
        break;
      case ssc_key.pageup:
        s = -u * .9;
        break;
      case ssc_key.pagedown:
        s = u * .9;
        break;
      case ssc_key.home:
        s = -o.scrollTop;
        break;
      case ssc_key.end:
        var a = o.scrollHeight - o.scrollTop - u;
        s = a > 0 ? a + 10 : 0;
        break;
      case ssc_key.left:
        i = -ssc_arrowscroll;
        break;
      case ssc_key.right:
        i = ssc_arrowscroll;
        break;
      default:
        return true
    }
    ssc_scrollArray(o, i, s);
    e.preventDefault()
  }

  function ssc_mousedown(e) {
    ssc_activeElement = e.target
  }

  function ssc_setCache(e, t) {
    for (var n = e.length; n--;)ssc_cache[ssc_uniqueID(e[n])] = t;
    return t
  }

  function ssc_overflowingAncestor(e) {
    var t = [];
    var n = ssc_root.scrollHeight;
    do {
      var r = ssc_cache[ssc_uniqueID(e)];
      if (r) {
        return ssc_setCache(t, r)
      }
      t.push(e);
      if (n === e.scrollHeight) {
        if (!ssc_frame || ssc_root.clientHeight + 10 < n) {
          return ssc_setCache(t, document.body)
        }
      } else if (e.clientHeight + 10 < e.scrollHeight) {
        overflow = getComputedStyle(e, "").getPropertyValue("overflow");
        if (overflow === "scroll" || overflow === "auto") {
          return ssc_setCache(t, e)
        }
      }
    } while (e = e.parentNode)
  }

  function ssc_addEvent(e, t, n) {
    window.addEventListener(e, t, n || false)
  }

  function ssc_removeEvent(e, t, n) {
    window.removeEventListener(e, t, n || false)
  }

  function ssc_isNodeName(e, t) {
    return e.nodeName.toLowerCase() === t.toLowerCase()
  }

  function ssc_directionCheck(e, t) {
    e = e > 0 ? 1 : -1;
    t = t > 0 ? 1 : -1;
    if (ssc_direction.x !== e || ssc_direction.y !== t) {
      ssc_direction.x = e;
      ssc_direction.y = t;
      ssc_que = []
    }
  }

  function ssc_pulse_(e) {
    var t, n, r;
    e = e * ssc_pulseScale;
    if (e < 1) {
      t = e - (1 - Math.exp(-e))
    } else {
      n = Math.exp(-1);
      e -= 1;
      r = 1 - Math.exp(-e);
      t = n + r * (1 - n)
    }
    return t * ssc_pulseNormalize
  }

  function ssc_pulse(e) {
    if (e >= 1)return 1;
    if (e <= 0)return 0;
    if (ssc_pulseNormalize == 1) {
      ssc_pulseNormalize /= ssc_pulse_(1)
    }
    return ssc_pulse_(e)
  }

  var ssc_framerate = 150;
  var ssc_animtime = 500;
  var ssc_stepsize = 150;
  var ssc_pulseAlgorithm = true;
  var ssc_pulseScale = 6;
  var ssc_pulseNormalize = 1;
  var ssc_keyboardsupport = true;
  var ssc_arrowscroll = 50;
  var ssc_frame = false;
  var ssc_direction = {x: 0, y: 0};
  var ssc_initdone = false;
  var ssc_fixedback = true;
  var ssc_root = document.documentElement;
  var ssc_activeElement;
  var ssc_key = {left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36};
  var ssc_que = [];
  var ssc_pending = false;
  var ssc_cache = {};
  setInterval(function () {
    ssc_cache = {}
  }, 10 * 1e3);
  var ssc_uniqueID = function () {
    var e = 0;
    return function (t) {
      return t.ssc_uniqueID || (t.ssc_uniqueID = e++)
    }
  }();
  var ischrome = /chrome/.test(navigator.userAgent.toLowerCase());
  if (ischrome) {
    ssc_addEvent("mousedown", ssc_mousedown);
    ssc_addEvent("mousewheel", ssc_wheel);
    ssc_addEvent("load", ssc_init)
  }
}


!function (t) {
  var o = 0;
  t.fn.scrolled = function (a, n) {
    "function" == typeof a && (n = a, a = 300);
    var c = "scrollTimer" + o++;
    this.scroll(function () {
      var o = t(this), e = o.data(c);
      e && clearTimeout(e), e = setTimeout(function () {
        o.removeData(c), n.call(o[0])
      }, a), o.data(c, e)
    })
  }
}(jQuery);
