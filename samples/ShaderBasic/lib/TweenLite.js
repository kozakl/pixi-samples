/*!
 * VERSION: beta 1.9.7
 * DATE: 2013-05-16
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(function(t){"use strict";var e,i,s,r,n,a=t.GreenSockGlobals||t,o=function(t){var e,i=t.split("."),s=a;for(e=0;i.length>e;e++)s[i[e]]=s=s[i[e]]||{};return s},l=o("com.greensock"),h=[].slice,_=function(){},u={},m=function(e,i,s,r){this.sc=u[e]?u[e].sc:[],u[e]=this,this.gsClass=null,this.func=s;var n=[];this.check=function(l){for(var h,_,f,p,c=i.length,d=c;--c>-1;)(h=u[i[c]]||new m(i[c],[])).gsClass?(n[c]=h.gsClass,d--):l&&h.sc.push(this);if(0===d&&s)for(_=("com.greensock."+e).split("."),f=_.pop(),p=o(_.join("."))[f]=this.gsClass=s.apply(s,n),r&&(a[f]=p,"function"==typeof define&&define.amd?define((t.GreenSockAMDPath?t.GreenSockAMDPath+"/":"")+e.split(".").join("/"),[],function(){return p}):"undefined"!=typeof module&&module.exports&&(module.exports=p)),c=0;this.sc.length>c;c++)this.sc[c].check()},this.check(!0)},f=t._gsDefine=function(t,e,i,s){return new m(t,e,i,s)},p=l._class=function(t,e,i){return e=e||function(){},f(t,[],function(){return e},i),e};f.globals=a;var c=[0,0,1,1],d=[],v=p("easing.Ease",function(t,e,i,s){this._func=t,this._type=i||0,this._power=s||0,this._params=e?c.concat(e):c},!0),g=v.map={},T=v.register=function(t,e,i,s){for(var r,n,a,o,h=e.split(","),_=h.length,u=(i||"easeIn,easeOut,easeInOut").split(",");--_>-1;)for(n=h[_],r=s?p("easing."+n,null,!0):l.easing[n]||{},a=u.length;--a>-1;)o=u[a],g[n+"."+o]=g[o+n]=r[o]=t.getRatio?t:t[o]||new t};for(s=v.prototype,s._calcEnd=!1,s.getRatio=function(t){if(this._func)return this._params[0]=t,this._func.apply(null,this._params);var e=this._type,i=this._power,s=1===e?1-t:2===e?t:.5>t?2*t:2*(1-t);return 1===i?s*=s:2===i?s*=s*s:3===i?s*=s*s*s:4===i&&(s*=s*s*s*s),1===e?1-s:2===e?s:.5>t?s/2:1-s/2},e=["Linear","Quad","Cubic","Quart","Quint,Strong"],i=e.length;--i>-1;)s=e[i]+",Power"+i,T(new v(null,null,1,i),s,"easeOut",!0),T(new v(null,null,2,i),s,"easeIn"+(0===i?",easeNone":"")),T(new v(null,null,3,i),s,"easeInOut");g.linear=l.easing.Linear.easeIn,g.swing=l.easing.Quad.easeInOut;var P=p("events.EventDispatcher",function(t){this._listeners={},this._eventTarget=t||this});s=P.prototype,s.addEventListener=function(t,e,i,s,a){a=a||0;var o,l,h=this._listeners[t],_=0;for(null==h&&(this._listeners[t]=h=[]),l=h.length;--l>-1;)o=h[l],o.c===e&&o.s===i?h.splice(l,1):0===_&&a>o.pr&&(_=l+1);h.splice(_,0,{c:e,s:i,up:s,pr:a}),this!==r||n||r.wake()},s.removeEventListener=function(t,e){var i,s=this._listeners[t];if(s)for(i=s.length;--i>-1;)if(s[i].c===e)return s.splice(i,1),void 0},s.dispatchEvent=function(t){var e,i,s,r=this._listeners[t];if(r)for(e=r.length,i=this._eventTarget;--e>-1;)s=r[e],s.up?s.c.call(s.s||i,{type:t,target:i}):s.c.call(s.s||i)};var w=t.requestAnimationFrame,y=t.cancelAnimationFrame,k=Date.now||function(){return(new Date).getTime()};for(e=["ms","moz","webkit","o"],i=e.length;--i>-1&&!w;)w=t[e[i]+"RequestAnimationFrame"],y=t[e[i]+"CancelAnimationFrame"]||t[e[i]+"CancelRequestAnimationFrame"];p("Ticker",function(t,e){var i,s,a,o,l,h=this,u=k(),m=e!==!1&&w,f=function(t){h.time=(k()-u)/1e3;var e=a,r=h.time-l;(!i||r>0||t===!0)&&(h.frame++,l+=r+(r>=o?.004:o-r),h.dispatchEvent("tick")),t!==!0&&e===a&&(a=s(f))};P.call(h),this.time=this.frame=0,this.tick=function(){f(!0)},this.sleep=function(){null!=a&&(m&&y?y(a):clearTimeout(a),s=_,a=null,h===r&&(n=!1))},this.wake=function(){null!==a&&h.sleep(),s=0===i?_:m&&w?w:function(t){return setTimeout(t,0|1e3*(l-h.time)+1)},h===r&&(n=!0),f(2)},this.fps=function(t){return arguments.length?(i=t,o=1/(i||60),l=this.time+o,h.wake(),void 0):i},this.useRAF=function(t){return arguments.length?(h.sleep(),m=t,h.fps(i),void 0):m},h.fps(t),setTimeout(function(){m&&(!a||5>h.frame)&&h.useRAF(!1)},1500)}),s=l.Ticker.prototype=new l.events.EventDispatcher,s.constructor=l.Ticker;var b=p("core.Animation",function(t,e){if(this.vars=e||{},this._duration=this._totalDuration=t||0,this._delay=Number(this.vars.delay)||0,this._timeScale=1,this._active=this.vars.immediateRender===!0,this.data=this.vars.data,this._reversed=this.vars.reversed===!0,L){n||r.wake();var i=this.vars.useFrames?U:L;i.add(this,i._time),this.vars.paused&&this.paused(!0)}});r=b.ticker=new l.Ticker,s=b.prototype,s._dirty=s._gc=s._initted=s._paused=!1,s._totalTime=s._time=0,s._rawPrevTime=-1,s._next=s._last=s._onUpdate=s._timeline=s.timeline=null,s._paused=!1,s.play=function(t,e){return arguments.length&&this.seek(t,e),this.reversed(!1).paused(!1)},s.pause=function(t,e){return arguments.length&&this.seek(t,e),this.paused(!0)},s.resume=function(t,e){return arguments.length&&this.seek(t,e),this.paused(!1)},s.seek=function(t,e){return this.totalTime(Number(t),e!==!1)},s.restart=function(t,e){return this.reversed(!1).paused(!1).totalTime(t?-this._delay:0,e!==!1,!0)},s.reverse=function(t,e){return arguments.length&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},s.render=function(){},s.invalidate=function(){return this},s._enabled=function(t,e){return n||r.wake(),this._gc=!t,this._active=t&&!this._paused&&this._totalTime>0&&this._totalTime<this._totalDuration,e!==!0&&(t&&!this.timeline?this._timeline.add(this,this._startTime-this._delay):!t&&this.timeline&&this._timeline._remove(this,!0)),!1},s._kill=function(){return this._enabled(!1,!1)},s.kill=function(t,e){return this._kill(t,e),this},s._uncache=function(t){for(var e=t?this:this.timeline;e;)e._dirty=!0,e=e.timeline;return this},s.eventCallback=function(t,e,i,s){if(null==t)return null;if("on"===t.substr(0,2)){var r,n=this.vars;if(1===arguments.length)return n[t];if(null==e)delete n[t];else if(n[t]=e,n[t+"Params"]=i,n[t+"Scope"]=s,i)for(r=i.length;--r>-1;)"{self}"===i[r]&&(i=n[t+"Params"]=i.concat(),i[r]=this);"onUpdate"===t&&(this._onUpdate=e)}return this},s.delay=function(t){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+t-this._delay),this._delay=t,this):this._delay},s.duration=function(t){return arguments.length?(this._duration=this._totalDuration=t,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&0!==t&&this.totalTime(this._totalTime*(t/this._duration),!0),this):(this._dirty=!1,this._duration)},s.totalDuration=function(t){return this._dirty=!1,arguments.length?this.duration(t):this._totalDuration},s.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),this.totalTime(t>this._duration?this._duration:t,e)):this._time},s.totalTime=function(t,e,i){if(n||r.wake(),!arguments.length)return this._totalTime;if(this._timeline){if(0>t&&!i&&(t+=this.totalDuration()),this._timeline.smoothChildTiming){this._dirty&&this.totalDuration();var s=this._totalDuration,a=this._timeline;if(t>s&&!i&&(t=s),this._startTime=(this._paused?this._pauseTime:a._time)-(this._reversed?s-t:t)/this._timeScale,a._dirty||this._uncache(!1),!a._active)for(;a._timeline;)a.totalTime(a._totalTime,!0),a=a._timeline}this._gc&&this._enabled(!0,!1),this._totalTime!==t&&this.render(t,e,!1)}return this},s.startTime=function(t){return arguments.length?(t!==this._startTime&&(this._startTime=t,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,t-this._delay)),this):this._startTime},s.timeScale=function(t){if(!arguments.length)return this._timeScale;if(t=t||1e-6,this._timeline&&this._timeline.smoothChildTiming){var e=this._pauseTime,i=e||0===e?e:this._timeline.totalTime();this._startTime=i-(i-this._startTime)*this._timeScale/t}return this._timeScale=t,this._uncache(!1)},s.reversed=function(t){return arguments.length?(t!=this._reversed&&(this._reversed=t,this.totalTime(this._totalTime,!0)),this):this._reversed},s.paused=function(t){if(!arguments.length)return this._paused;if(t!=this._paused&&this._timeline){n||t||r.wake();var e=this._timeline.rawTime(),i=e-this._pauseTime;!t&&this._timeline.smoothChildTiming&&(this._startTime+=i,this._uncache(!1)),this._pauseTime=t?e:null,this._paused=t,this._active=!t&&this._totalTime>0&&this._totalTime<this._totalDuration,t||0===i||0===this._duration||this.render(this._totalTime,!0,!0)}return this._gc&&!t&&this._enabled(!0,!1),this};var A=p("core.SimpleTimeline",function(t){b.call(this,0,t),this.autoRemoveChildren=this.smoothChildTiming=!0});s=A.prototype=new b,s.constructor=A,s.kill()._gc=!1,s._first=s._last=null,s._sortChildren=!1,s.add=s.insert=function(t,e){var i,s;if(t._startTime=Number(e||0)+t._delay,t._paused&&this!==t._timeline&&(t._pauseTime=t._startTime+(this.rawTime()-t._startTime)/t._timeScale),t.timeline&&t.timeline._remove(t,!0),t.timeline=t._timeline=this,t._gc&&t._enabled(!0,!0),i=this._last,this._sortChildren)for(s=t._startTime;i&&i._startTime>s;)i=i._prev;return i?(t._next=i._next,i._next=t):(t._next=this._first,this._first=t),t._next?t._next._prev=t:this._last=t,t._prev=i,this._timeline&&this._uncache(!0),this},s._remove=function(t,e){return t.timeline===this&&(e||t._enabled(!1,!0),t.timeline=null,t._prev?t._prev._next=t._next:this._first===t&&(this._first=t._next),t._next?t._next._prev=t._prev:this._last===t&&(this._last=t._prev),this._timeline&&this._uncache(!0)),this},s.render=function(t,e,i){var s,r=this._first;for(this._totalTime=this._time=this._rawPrevTime=t;r;)s=r._next,(r._active||t>=r._startTime&&!r._paused)&&(r._reversed?r.render((r._dirty?r.totalDuration():r._totalDuration)-(t-r._startTime)*r._timeScale,e,i):r.render((t-r._startTime)*r._timeScale,e,i)),r=s},s.rawTime=function(){return n||r.wake(),this._totalTime};var S=p("TweenLite",function(t,e,i){if(b.call(this,e,i),null==t)throw"Cannot tween a null target.";this.target=t="string"!=typeof t?t:S.selector(t)||t;var s,r,n,a=t.jquery||t.length&&t[0]&&t[0].nodeType&&t[0].style,o=this.vars.overwrite;if(this._overwrite=o=null==o?N[S.defaultOverwrite]:"number"==typeof o?o>>0:N[o],(a||t instanceof Array)&&"number"!=typeof t[0])for(this._targets=n=h.call(t,0),this._propLookup=[],this._siblings=[],s=0;n.length>s;s++)r=n[s],r?"string"!=typeof r?r.length&&r[0]&&r[0].nodeType&&r[0].style?(n.splice(s--,1),this._targets=n=n.concat(h.call(r,0))):(this._siblings[s]=F(r,this,!1),1===o&&this._siblings[s].length>1&&G(r,this,null,1,this._siblings[s])):(r=n[s--]=S.selector(r),"string"==typeof r&&n.splice(s+1,1)):n.splice(s--,1);else this._propLookup={},this._siblings=F(t,this,!1),1===o&&this._siblings.length>1&&G(t,this,null,1,this._siblings);(this.vars.immediateRender||0===e&&0===this._delay&&this.vars.immediateRender!==!1)&&this.render(-this._delay,!1,!0)},!0),x=function(t){return t.length&&t[0]&&t[0].nodeType&&t[0].style},C=function(t,e){var i,s={};for(i in t)O[i]||i in e&&"x"!==i&&"y"!==i&&"width"!==i&&"height"!==i&&"className"!==i||!(!D[i]||D[i]&&D[i]._autoCSS)||(s[i]=t[i],delete t[i]);t.css=s};s=S.prototype=new b,s.constructor=S,s.kill()._gc=!1,s.ratio=0,s._firstPT=s._targets=s._overwrittenProps=s._startAt=null,s._notifyPluginsOfEnabled=!1,S.version="1.9.7",S.defaultEase=s._ease=new v(null,null,1,1),S.defaultOverwrite="auto",S.ticker=r,S.autoSleep=!0,S.selector=t.$||t.jQuery||function(e){return t.$?(S.selector=t.$,t.$(e)):t.document?t.document.getElementById("#"===e.charAt(0)?e.substr(1):e):e};var R=S._internals={},D=S._plugins={},E=S._tweenLookup={},I=0,O=R.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1},N={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},U=b._rootFramesTimeline=new A,L=b._rootTimeline=new A;L._startTime=r.time,U._startTime=r.frame,L._active=U._active=!0,b._updateRoot=function(){if(L.render((r.time-L._startTime)*L._timeScale,!1,!1),U.render((r.frame-U._startTime)*U._timeScale,!1,!1),!(r.frame%120)){var t,e,i;for(i in E){for(e=E[i].tweens,t=e.length;--t>-1;)e[t]._gc&&e.splice(t,1);0===e.length&&delete E[i]}if(i=L._first,(!i||i._paused)&&S.autoSleep&&!U._first&&1===r._listeners.tick.length){for(;i&&i._paused;)i=i._next;i||r.sleep()}}},r.addEventListener("tick",b._updateRoot);var F=function(t,e,i){var s,r,n=t._gsTweenID;if(E[n||(t._gsTweenID=n="t"+I++)]||(E[n]={target:t,tweens:[]}),e&&(s=E[n].tweens,s[r=s.length]=e,i))for(;--r>-1;)s[r]===e&&s.splice(r,1);return E[n].tweens},G=function(t,e,i,s,r){var n,a,o,l;if(1===s||s>=4){for(l=r.length,n=0;l>n;n++)if((o=r[n])!==e)o._gc||o._enabled(!1,!1)&&(a=!0);else if(5===s)break;return a}var h,_=e._startTime+1e-10,u=[],m=0,f=0===e._duration;for(n=r.length;--n>-1;)(o=r[n])===e||o._gc||o._paused||(o._timeline!==e._timeline?(h=h||Q(e,0,f),0===Q(o,h,f)&&(u[m++]=o)):_>=o._startTime&&o._startTime+o.totalDuration()/o._timeScale+1e-10>_&&((f||!o._initted)&&2e-10>=_-o._startTime||(u[m++]=o)));for(n=m;--n>-1;)o=u[n],2===s&&o._kill(i,t)&&(a=!0),(2!==s||!o._firstPT&&o._initted)&&o._enabled(!1,!1)&&(a=!0);return a},Q=function(t,e,i){for(var s=t._timeline,r=s._timeScale,n=t._startTime,a=1e-10;s._timeline;){if(n+=s._startTime,r*=s._timeScale,s._paused)return-100;s=s._timeline}return n/=r,n>e?n-e:i&&n===e||!t._initted&&2*a>n-e?a:(n+=t.totalDuration()/t._timeScale/r)>e+a?0:n-e-a};s._init=function(){var t,e,i,s,r=this.vars,n=this._overwrittenProps,a=this._duration,o=r.ease;if(r.startAt){if(r.startAt.overwrite=0,r.startAt.immediateRender=!0,this._startAt=S.to(this.target,0,r.startAt),r.immediateRender&&(this._startAt=null,0===this._time&&0!==a))return}else if(r.runBackwards&&r.immediateRender&&0!==a)if(this._startAt)this._startAt.render(-1,!0),this._startAt=null;else if(0===this._time){i={};for(s in r)O[s]&&"autoCSS"!==s||(i[s]=r[s]);return i.overwrite=0,this._startAt=S.to(this.target,0,i),void 0}if(this._ease=o?o instanceof v?r.easeParams instanceof Array?o.config.apply(o,r.easeParams):o:"function"==typeof o?new v(o,r.easeParams):g[o]||S.defaultEase:S.defaultEase,this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets)for(t=this._targets.length;--t>-1;)this._initProps(this._targets[t],this._propLookup[t]={},this._siblings[t],n?n[t]:null)&&(e=!0);else e=this._initProps(this.target,this._propLookup,this._siblings,n);if(e&&S._onPluginEvent("_onInitAllProps",this),n&&(this._firstPT||"function"!=typeof this.target&&this._enabled(!1,!1)),r.runBackwards)for(i=this._firstPT;i;)i.s+=i.c,i.c=-i.c,i=i._next;this._onUpdate=r.onUpdate,this._initted=!0},s._initProps=function(t,e,i,s){var r,n,a,o,l,h,_;if(null==t)return!1;this.vars.css||t.style&&t.nodeType&&D.css&&this.vars.autoCSS!==!1&&C(this.vars,t);for(r in this.vars){if(O[r]){if(("onStartParams"===r||"onUpdateParams"===r||"onCompleteParams"===r||"onReverseCompleteParams"===r||"onRepeatParams"===r)&&(l=this.vars[r]))for(n=l.length;--n>-1;)"{self}"===l[n]&&(l=this.vars[r]=l.concat(),l[n]=this)}else if(D[r]&&(o=new D[r])._onInitTween(t,this.vars[r],this)){for(this._firstPT=h={_next:this._firstPT,t:o,p:"setRatio",s:0,c:1,f:!0,n:r,pg:!0,pr:o._priority},n=o._overwriteProps.length;--n>-1;)e[o._overwriteProps[n]]=this._firstPT;(o._priority||o._onInitAllProps)&&(a=!0),(o._onDisable||o._onEnable)&&(this._notifyPluginsOfEnabled=!0)}else this._firstPT=e[r]=h={_next:this._firstPT,t:t,p:r,f:"function"==typeof t[r],n:r,pg:!1,pr:0},h.s=h.f?t[r.indexOf("set")||"function"!=typeof t["get"+r.substr(3)]?r:"get"+r.substr(3)]():parseFloat(t[r]),_=this.vars[r],h.c="string"==typeof _&&"="===_.charAt(1)?parseInt(_.charAt(0)+"1",10)*Number(_.substr(2)):Number(_)-h.s||0;h&&h._next&&(h._next._prev=h)}return s&&this._kill(s,t)?this._initProps(t,e,i,s):this._overwrite>1&&this._firstPT&&i.length>1&&G(t,this,e,this._overwrite,i)?(this._kill(e,t),this._initProps(t,e,i,s)):a},s.render=function(t,e,i){var s,r,n,a=this._time;if(t>=this._duration)this._totalTime=this._time=this._duration,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(s=!0,r="onComplete"),0===this._duration&&((0===t||0>this._rawPrevTime)&&this._rawPrevTime!==t&&(i=!0,this._rawPrevTime>0&&(r="onReverseComplete",e&&(t=-1))),this._rawPrevTime=t);else if(1e-7>t)this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==a||0===this._duration&&this._rawPrevTime>0)&&(r="onReverseComplete",s=this._reversed),0>t?(this._active=!1,0===this._duration&&(this._rawPrevTime>=0&&(i=!0),this._rawPrevTime=t)):this._initted||(i=!0);else if(this._totalTime=this._time=t,this._easeType){var o=t/this._duration,l=this._easeType,h=this._easePower;(1===l||3===l&&o>=.5)&&(o=1-o),3===l&&(o*=2),1===h?o*=o:2===h?o*=o*o:3===h?o*=o*o*o:4===h&&(o*=o*o*o*o),this.ratio=1===l?1-o:2===l?o:.5>t/this._duration?o/2:1-o/2}else this.ratio=this._ease.getRatio(t/this._duration);if(this._time!==a||i){if(!this._initted){if(this._init(),!this._initted)return;this._time&&!s?this.ratio=this._ease.getRatio(this._time/this._duration):s&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._active||this._paused||(this._active=!0),0===a&&(this._startAt&&(t>=0?this._startAt.render(t,e,i):r||(r="_dummyGS")),this.vars.onStart&&(0!==this._time||0===this._duration)&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||d))),n=this._firstPT;n;)n.f?n.t[n.p](n.c*this.ratio+n.s):n.t[n.p]=n.c*this.ratio+n.s,n=n._next;this._onUpdate&&(0>t&&this._startAt&&this._startAt.render(t,e,i),e||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||d)),r&&(this._gc||(0>t&&this._startAt&&!this._onUpdate&&this._startAt.render(t,e,i),s&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[r]&&this.vars[r].apply(this.vars[r+"Scope"]||this,this.vars[r+"Params"]||d)))}},s._kill=function(t,e){if("all"===t&&(t=null),null==t&&(null==e||e===this.target))return this._enabled(!1,!1);e="string"!=typeof e?e||this._targets||this.target:S.selector(e)||e;var i,s,r,n,a,o,l,h;if((e instanceof Array||x(e))&&"number"!=typeof e[0])for(i=e.length;--i>-1;)this._kill(t,e[i])&&(o=!0);else{if(this._targets){for(i=this._targets.length;--i>-1;)if(e===this._targets[i]){a=this._propLookup[i]||{},this._overwrittenProps=this._overwrittenProps||[],s=this._overwrittenProps[i]=t?this._overwrittenProps[i]||{}:"all";break}}else{if(e!==this.target)return!1;a=this._propLookup,s=this._overwrittenProps=t?this._overwrittenProps||{}:"all"}if(a){l=t||a,h=t!==s&&"all"!==s&&t!==a&&(null==t||t._tempKill!==!0);for(r in l)(n=a[r])&&(n.pg&&n.t._kill(l)&&(o=!0),n.pg&&0!==n.t._overwriteProps.length||(n._prev?n._prev._next=n._next:n===this._firstPT&&(this._firstPT=n._next),n._next&&(n._next._prev=n._prev),n._next=n._prev=null),delete a[r]),h&&(s[r]=1);!this._firstPT&&this._initted&&this._enabled(!1,!1)}}return o},s.invalidate=function(){return this._notifyPluginsOfEnabled&&S._onPluginEvent("_onDisable",this),this._firstPT=null,this._overwrittenProps=null,this._onUpdate=null,this._startAt=null,this._initted=this._active=this._notifyPluginsOfEnabled=!1,this._propLookup=this._targets?{}:[],this},s._enabled=function(t,e){if(n||r.wake(),t&&this._gc){var i,s=this._targets;if(s)for(i=s.length;--i>-1;)this._siblings[i]=F(s[i],this,!0);else this._siblings=F(this.target,this,!0)}return b.prototype._enabled.call(this,t,e),this._notifyPluginsOfEnabled&&this._firstPT?S._onPluginEvent(t?"_onEnable":"_onDisable",this):!1},S.to=function(t,e,i){return new S(t,e,i)},S.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new S(t,e,i)},S.fromTo=function(t,e,i,s){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,new S(t,e,s)},S.delayedCall=function(t,e,i,s,r){return new S(e,0,{delay:t,onComplete:e,onCompleteParams:i,onCompleteScope:s,onReverseComplete:e,onReverseCompleteParams:i,onReverseCompleteScope:s,immediateRender:!1,useFrames:r,overwrite:0})},S.set=function(t,e){return new S(t,0,e)},S.killTweensOf=S.killDelayedCallsTo=function(t,e){for(var i=S.getTweensOf(t),s=i.length;--s>-1;)i[s]._kill(e,t)},S.getTweensOf=function(t){if(null==t)return[];t="string"!=typeof t?t:S.selector(t)||t;var e,i,s,r;if((t instanceof Array||x(t))&&"number"!=typeof t[0]){for(e=t.length,i=[];--e>-1;)i=i.concat(S.getTweensOf(t[e]));for(e=i.length;--e>-1;)for(r=i[e],s=e;--s>-1;)r===i[s]&&i.splice(e,1)}else for(i=F(t).concat(),e=i.length;--e>-1;)i[e]._gc&&i.splice(e,1);return i};var j=p("plugins.TweenPlugin",function(t,e){this._overwriteProps=(t||"").split(","),this._propName=this._overwriteProps[0],this._priority=e||0,this._super=j.prototype},!0);if(s=j.prototype,j.version="1.9.1",j.API=2,s._firstPT=null,s._addTween=function(t,e,i,s,r,n){var a,o;null!=s&&(a="number"==typeof s||"="!==s.charAt(1)?Number(s)-i:parseInt(s.charAt(0)+"1",10)*Number(s.substr(2)))&&(this._firstPT=o={_next:this._firstPT,t:t,p:e,s:i,c:a,f:"function"==typeof t[e],n:r||e,r:n},o._next&&(o._next._prev=o))},s.setRatio=function(t){for(var e,i=this._firstPT,s=1e-6;i;)e=i.c*t+i.s,i.r?e=e+(e>0?.5:-.5)>>0:s>e&&e>-s&&(e=0),i.f?i.t[i.p](e):i.t[i.p]=e,i=i._next},s._kill=function(t){var e,i=this._overwriteProps,s=this._firstPT;if(null!=t[this._propName])this._overwriteProps=[];else for(e=i.length;--e>-1;)null!=t[i[e]]&&i.splice(e,1);for(;s;)null!=t[s.n]&&(s._next&&(s._next._prev=s._prev),s._prev?(s._prev._next=s._next,s._prev=null):this._firstPT===s&&(this._firstPT=s._next)),s=s._next;return!1},s._roundProps=function(t,e){for(var i=this._firstPT;i;)(t[this._propName]||null!=i.n&&t[i.n.split(this._propName+"_").join("")])&&(i.r=e),i=i._next},S._onPluginEvent=function(t,e){var i,s,r,n,a,o=e._firstPT;if("_onInitAllProps"===t){for(;o;){for(a=o._next,s=r;s&&s.pr>o.pr;)s=s._next;(o._prev=s?s._prev:n)?o._prev._next=o:r=o,(o._next=s)?s._prev=o:n=o,o=a}o=e._firstPT=r}for(;o;)o.pg&&"function"==typeof o.t[t]&&o.t[t]()&&(i=!0),o=o._next;return i},j.activate=function(t){for(var e=t.length;--e>-1;)t[e].API===j.API&&(D[(new t[e])._propName]=t[e]);return!0},f.plugin=function(t){if(!(t&&t.propName&&t.init&&t.API))throw"illegal plugin definition.";var e,i=t.propName,s=t.priority||0,r=t.overwriteProps,n={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_roundProps",initAll:"_onInitAllProps"},a=p("plugins."+i.charAt(0).toUpperCase()+i.substr(1)+"Plugin",function(){j.call(this,i,s),this._overwriteProps=r||[]},t.global===!0),o=a.prototype=new j(i);o.constructor=a,a.API=t.API;for(e in n)"function"==typeof t[e]&&(o[n[e]]=t[e]);return a.version=t.version,j.activate([a]),a},e=t._gsQueue){for(i=0;e.length>i;i++)e[i]();for(s in u)u[s].func||t.console.log("GSAP encountered missing dependency: com.greensock."+s)}n=!1})(window);