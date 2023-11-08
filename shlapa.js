function e(e,t,r,n){Object.defineProperty(e,t,{get:r,set:n,enumerable:!0,configurable:!0})}var t=globalThis,r={},n={},o=t.parcelRequirec284;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var o={id:e,exports:{}};return r[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},t.parcelRequirec284=o);var i=o.register;i("aCKYX",function(t,r){e(t.exports,"getUser",()=>s),e(t.exports,"Auth",()=>o("hxg9E").Auth),// src/auth.js
o("2gd5Q");var n=o("4FrD6");o("keEwO");var i=o("hxg9E");/**
 * Get the authenticated user
 * @returns Promise<user>
 */async function s(){try{// Get the user's info, see:
// https://docs.amplify.aws/lib/auth/advanced/q/platform/js/#identity-pool-federation
let e=await (0,i.Auth).currentAuthenticatedUser(),t=e.username;// If that didn't throw, we have a user object, and the user is authenticated
console.log("The user is authenticated",t);// Get the user's Identity Token, which we'll use later with our
// microservice. See discussion of various tokens:
// https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html
let r=e.signInUserSession.idToken.jwtToken,n=e.signInUserSession.accessToken.jwtToken;// Return a simplified "user" object
return{username:t,idToken:r,accessToken:n,// Include a simple method to generate headers with our Authorization info
authorizationHeaders:(e="application/json")=>{let t={"Content-Type":e};return t.Authorization=`Bearer ${r}`,t}}}catch(e){// Unable to get user, return `null` instead
return console.log(e),null}}// Configure our Auth object to use our Cognito User Pool
(0,n.Amplify).configure({Auth:{// Amazon Region. We can hard-code this (we always use the us-east-1 region)
region:"us-east-1",// Amazon Cognito User Pool ID
userPoolId:"us-east-1_99jDRAj40",// Amazon Cognito App Client ID (26-char alphanumeric string)
userPoolWebClientId:"adntcatm7888tvlegl8j1gmd0",// Hosted UI configuration
oauth:{// Amazon Hosted UI Domain
domain:"eldark-fragments.auth.us-east-1.amazoncognito.com",// These scopes must match what you set in the User Pool for this App Client
// The default based on what we did above is: email, phone, openid. To see
// your app's OpenID Connect scopes, go to Amazon Cognito in the AWS Console
// then: Amazon Cognito > User pools > {your user pool} > App client > {your client}
// and look in the "Hosted UI" section under "OpenID Connect scopes".
scope:["email","phone","openid"],// NOTE: these must match what you have specified in the Hosted UI
// app settings for Callback and Redirect URLs (e.g., no trailing slash).
redirectSignIn:"http://localhost:1234",redirectSignOut:"http://localhost:1234",// We're using the Access Code Grant flow (i.e., `code`)
responseType:"code"}}})}),i("2gd5Q",function(t,r){e(t.exports,"Amplify",()=>o("4FrD6").Amplify),e(t.exports,"Platform",()=>o("3NGR1").Platform);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("4FrD6"),i=o("3NGR1");o("2ZPeH"),o("2hp02"),o("dUqnq"),o("3v7X7"),o("kFSgg"),o("j70Ma"),o("auTMV"),o("8Z1UO"),o("9kzXW"),o("9LMg3"),o("7trhX"),i.Platform.userAgent,n.Amplify}),i("4FrD6",function(t,r){e(t.exports,"Amplify",()=>a);var n=o("2ZPeH"),i=function(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,o,i=r.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(n=i.next()).done;)s.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return s},s=new n.ConsoleLogger("Amplify"),a=new/** @class */(function(){function e(){// Everything that is `register`ed is tracked here
this._components=[],this._config={},// All modules (with `getModuleName()`) are stored here for dependency injection
this._modules={},// for backward compatibility to avoid breaking change
// if someone is using like Amplify.Auth
this.Auth=null,this.Analytics=null,this.API=null,this.Credentials=null,this.Storage=null,this.I18n=null,this.Cache=null,this.PubSub=null,this.Interactions=null,this.Pushnotification=null,this.UI=null,this.XR=null,this.Predictions=null,this.DataStore=null,this.Geo=null,this.Notifications=null,this.Logger=n.ConsoleLogger,this.ServiceWorker=null}return e.prototype.register=function(e){s.debug("component registered in amplify",e),this._components.push(e),"function"==typeof e.getModuleName?(this._modules[e.getModuleName()]=e,this[e.getModuleName()]=e):s.debug("no getModuleName method for component",e),// Finally configure this new component(category) loaded
// With the new modularization changes in Amplify V3, all the Amplify
// component are not loaded/registered right away but when they are
// imported (and hence instantiated) in the client's app. This ensures
// that all new components imported get correctly configured with the
// configuration that Amplify.configure() was called with.
e.configure(this._config)},e.prototype.configure=function(e){var t=this;return e&&(this._config=Object.assign(this._config,e),s.debug("amplify config",this._config),// Dependency Injection via property-setting.
// This avoids introducing a public method/interface/setter that's difficult to remove later.
// Plus, it reduces `if` statements within the `constructor` and `configure` of each module
Object.entries(this._modules).forEach(function(e){var r=i(e,2),n=(r[0],r[1]);// e.g. Auth.*
Object.keys(n).forEach(function(e){// e.g. Auth["Credentials"] = this._modules["Credentials"] when set
t._modules[e]&&(n[e]=t._modules[e])})}),this._components.map(function(e){e.configure(t._config)})),this._config},e.prototype.addPluggable=function(e){e&&e.getCategory&&"function"==typeof e.getCategory&&this._components.map(function(t){t.addPluggable&&"function"==typeof t.addPluggable&&t.addPluggable(e)})},e}())}),i("2ZPeH",function(t,r){e(t.exports,"ConsoleLogger",()=>h);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n,i,s=o("4Ge22"),a=function(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},u=function(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,o,i=r.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(n=i.next()).done;)s.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return s},c=function(e,t,r){if(r||2==arguments.length)for(var n,o=0,i=t.length;o<i;o++)!n&&o in t||(n||(n=Array.prototype.slice.call(t,0,o)),n[o]=t[o]);return e.concat(n||Array.prototype.slice.call(t))},f={VERBOSE:1,DEBUG:2,INFO:3,WARN:4,ERROR:5};(n=i||(i={})).DEBUG="DEBUG",n.ERROR="ERROR",n.INFO="INFO",n.WARN="WARN",n.VERBOSE="VERBOSE";var h=/** @class */function(){/**
     * @constructor
     * @param {string} name - Name of the logger
     */function e(e,t){void 0===t&&(t=i.WARN),this.name=e,this.level=t,this._pluggables=[]}return e.prototype._padding=function(e){return e<10?"0"+e:""+e},e.prototype._ts=function(){var e=new Date;return[this._padding(e.getMinutes()),this._padding(e.getSeconds())].join(":")+"."+e.getMilliseconds()},e.prototype.configure=function(e){return e&&(this._config=e),this._config},/**
     * Write log
     * @method
     * @memeberof Logger
     * @param {LOG_TYPE|string} type - log type, default INFO
     * @param {string|object} msg - Logging message or object
     */e.prototype._log=function(t){for(var r,n,o=[],s=1;s<arguments.length;s++)o[s-1]=arguments[s];var u=this.level;e.LOG_LEVEL&&(u=e.LOG_LEVEL),"undefined"!=typeof window&&window.LOG_LEVEL&&(u=window.LOG_LEVEL);var c=f[u];if(f[t]>=c){var h=console.log.bind(console);t===i.ERROR&&console.error&&(h=console.error.bind(console)),t===i.WARN&&console.warn&&(h=console.warn.bind(console));var l="[".concat(t,"] ").concat(this._ts()," ").concat(this.name),d="";if(1===o.length&&"string"==typeof o[0])h(d="".concat(l," - ").concat(o[0]));else if(1===o.length)d="".concat(l," ").concat(o[0]),h(l,o[0]);else if("string"==typeof o[0]){var p=o.slice(1);1===p.length&&(p=p[0]),d="".concat(l," - ").concat(o[0]," ").concat(p),h("".concat(l," - ").concat(o[0]),p)}else d="".concat(l," ").concat(o),h(l,o);try{for(var g=a(this._pluggables),y=g.next();!y.done;y=g.next()){var v=y.value,m={message:d,timestamp:Date.now()};v.pushLogs([m])}}catch(e){r={error:e}}finally{try{y&&!y.done&&(n=g.return)&&n.call(g)}finally{if(r)throw r.error}}}},/**
     * Write General log. Default to INFO
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._log.apply(this,c([i.INFO],u(e),!1))},/**
     * Write INFO log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */e.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._log.apply(this,c([i.INFO],u(e),!1))},/**
     * Write WARN log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */e.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._log.apply(this,c([i.WARN],u(e),!1))},/**
     * Write ERROR log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */e.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._log.apply(this,c([i.ERROR],u(e),!1))},/**
     * Write DEBUG log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */e.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._log.apply(this,c([i.DEBUG],u(e),!1))},/**
     * Write VERBOSE log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */e.prototype.verbose=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._log.apply(this,c([i.VERBOSE],u(e),!1))},e.prototype.addPluggable=function(e){e&&e.getCategoryName()===s.AWS_CLOUDWATCH_CATEGORY&&(this._pluggables.push(e),e.configure(this._config))},e.prototype.listPluggables=function(){return this._pluggables},e.LOG_LEVEL=null,e}()}),i("4Ge22",function(t,r){e(t.exports,"AWS_CLOUDWATCH_CATEGORY",()=>n);var n="Logging"}),i("3NGR1",function(t,r){e(t.exports,"Platform",()=>c),e(t.exports,"getAmplifyUserAgent",()=>h);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("9kzXW"),i=o("keU7N"),s=o("439w6"),a=function(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,o,i=r.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(n=i.next()).done;)s.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return s},u="aws-amplify",c=new/** @class */(function(){function e(){this.userAgent="".concat(u,"/").concat(i.version)}return Object.defineProperty(e.prototype,"framework",{get:function(){return(0,s.detectFramework)()},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isReactNative",{get:function(){return this.framework===n.Framework.ReactNative||this.framework===n.Framework.Expo},enumerable:!1,configurable:!0}),e.prototype.observeFrameworkChanges=function(e){(0,s.observeFrameworkChanges)(e)},e}()),f=function(e){var t=void 0===e?{}:e,r=t.category,n=t.action;t.framework;var o=[[u,i.version]];return r&&o.push([r,n]),o.push(["framework",(0,s.detectFramework)()]),o},h=function(e){return f(e).map(function(e){var t=a(e,2),r=t[0],n=t[1];return"".concat(r,"/").concat(n)}).join(" ")}}),i("9kzXW",function(t,r){var n,o,i,s,a,u,c,f,h,l,d,p,g,y,v,m,b,w,S,_;e(t.exports,"Framework",()=>n),e(t.exports,"Category",()=>o),e(t.exports,"AuthAction",()=>a),// < 100 - Web frameworks
(y=n||(n={})).WebUnknown="0",y.React="1",y.NextJs="2",y.Angular="3",y.VueJs="4",y.Nuxt="5",y.Svelte="6",// 100s - Server side frameworks
y.ServerSideUnknown="100",y.ReactSSR="101",y.NextJsSSR="102",y.AngularSSR="103",y.VueJsSSR="104",y.NuxtSSR="105",y.SvelteSSR="106",// 200s - Mobile framework
y.ReactNative="201",y.Expo="202",(v=o||(o={})).API="api",v.Auth="auth",v.Analytics="analytics",v.DataStore="datastore",v.Geo="geo",v.InAppMessaging="inappmessaging",v.Interactions="interactions",v.Predictions="predictions",v.PubSub="pubsub",v.PushNotification="pushnotification",v.Storage="storage",(m=i||(i={})).Record="1",m.UpdateEndpoint="2",(b=s||(s={})).GraphQl="1",b.Get="2",b.Post="3",b.Put="4",b.Patch="5",b.Del="6",b.Head="7",// SignUp = '1',
// ConfirmSignUp = '2',
// ResendSignUp = '3',
// SignIn = '4',
// GetMFAOptions = '5',
// GetPreferredMFA = '6',
// SetPreferredMFA = '7',
// DisableSMS = '8',
// EnableSMS = '9',
// SetupTOTP = '10',
// VerifyTotpToken = '11',
// ConfirmSignIn = '12',
// CompleteNewPassword = '13',
// SendCustomChallengeAnswer = '14',
// DeleteUserAttributes = '15',
// DeleteUser = '16',
// UpdateUserAttributes = '17',
// UserAttributes = '18',
// CurrentUserPoolUser = '19',
// CurrentAuthenticatedUser = '20',
// CurrentSession = '21',
// VerifyUserAttribute = '22',
// VerifyUserAttributeSubmit = '23',
// VerifyCurrentUserAttribute = '24',
// VerifyCurrentUserAttributeSubmit = '25',
// SignOut = '26',
// ChangePassword = '27',
// ForgotPassword = '28',
// ForgotPasswordSubmit = '29',
(a||(a={})).FederatedSignIn="30",(w=u||(u={})).Subscribe="1",w.GraphQl="2",(c||(c={})).None="0",(f||(f={})).None="0",(h||(h={})).None="0",(S=l||(l={})).Convert="1",S.Identify="2",S.Interpret="3",(d||(d={})).Subscribe="1",(p||(p={})).None="0",(_=g||(g={})).Put="1",_.Get="2",_.List="3",_.Copy="4",_.Remove="5",_.GetProperties="6"}),i("keU7N",function(t,r){e(t.exports,"version",()=>n);// generated by genversion
var n="5.3.11"}),i("439w6",function(t,r){e(t.exports,"detectFramework",()=>c),e(t.exports,"observeFrameworkChanges",()=>f);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n,i=o("9kzXW"),s=o("hFMjf"),a=[],u=!1,c=function(){if(!n){if(n=(0,s.detect)(),u)// Starting from this point, the `frameworkCache` becomes "final".
// So we don't need to notify the observers again so the observer
// can be removed after the final notice.
for(;a.length;)a.pop()();else // Every time we update the cache, call each observer function
a.forEach(function(e){return e()});// Retry once for either Unknown type after a delay (explained below)
h(i.Framework.ServerSideUnknown,10),h(i.Framework.WebUnknown,10)}return n},f=function(e){// When the `frameworkCache` won't be updated again, we ignore all incoming
// observers.
u||a.push(e)};// For a framework type and a delay amount, setup the event to re-detect
//   During the runtime boot, it is possible that framework detection will
//   be triggered before the framework has made modifications to the
//   global/window/etc needed for detection. When no framework is detected
//   we will reset and try again to ensure we don't use a cached
//   non-framework detection result for all requests.
function h(e,t){n!==e||u||setTimeout(function(){n=void 0,u=!0,setTimeout(c,1e3)},t)}}),i("hFMjf",function(t,r){e(t.exports,"detect",()=>g);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("9kzXW"),i=o("7SDLT"),s=o("hNVND"),a=o("ekYbq"),u=o("6RmW8"),c=o("8oJhN"),f=o("1ONkW"),h=o("6V1lR"),l=o("3eJAR"),d=o("9eEuN"),p=[// First, detect mobile
{platform:n.Framework.Expo,detectionMethod:l.expoDetect},{platform:n.Framework.ReactNative,detectionMethod:h.reactNativeDetect},// Next, detect web frameworks
{platform:n.Framework.NextJs,detectionMethod:u.nextWebDetect},{platform:n.Framework.Nuxt,detectionMethod:c.nuxtWebDetect},{platform:n.Framework.Angular,detectionMethod:f.angularWebDetect},{platform:n.Framework.React,detectionMethod:i.reactWebDetect},{platform:n.Framework.VueJs,detectionMethod:s.vueWebDetect},{platform:n.Framework.Svelte,detectionMethod:a.svelteWebDetect},{platform:n.Framework.WebUnknown,detectionMethod:d.webDetect},// Last, detect ssr frameworks
{platform:n.Framework.NextJsSSR,detectionMethod:u.nextSSRDetect},{platform:n.Framework.NuxtSSR,detectionMethod:c.nuxtSSRDetect},{platform:n.Framework.ReactSSR,detectionMethod:i.reactSSRDetect},{platform:n.Framework.VueJsSSR,detectionMethod:s.vueSSRDetect},{platform:n.Framework.AngularSSR,detectionMethod:f.angularSSRDetect},{platform:n.Framework.SvelteSSR,detectionMethod:a.svelteSSRDetect}];function g(){var e;return(null===(e=p.find(function(e){return e.detectionMethod()}))||void 0===e?void 0:e.platform)||n.Framework.ServerSideUnknown}}),i("7SDLT",function(t,r){e(t.exports,"reactWebDetect",()=>s),e(t.exports,"reactSSRDetect",()=>a);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("PxyB5"),i=o("hPtJY");function s(){var e=function(e){return e.startsWith("_react")||e.startsWith("__react")};return(0,n.documentExists)()&&Array.from(document.querySelectorAll("[id]")).some(function(t){return Object.keys(t).find(e)})}function a(){return(0,n.processExists)()&&void 0!==i.env&&!!Object.keys(i.env).find(function(e){return e.includes("react")})}}),i("PxyB5",function(r,n){e(r.exports,"globalExists",()=>s),e(r.exports,"windowExists",()=>a),e(r.exports,"documentExists",()=>u),e(r.exports,"processExists",()=>c),e(r.exports,"keyPrefixMatch",()=>f);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var i=o("hPtJY"),s=function(){return void 0!==t},a=function(){return"undefined"!=typeof window},u=function(){return"undefined"!=typeof document},c=function(){return void 0!==i},f=function(e,t){return!!Object.keys(e).find(function(e){return e.startsWith(t)})}}),i("hPtJY",function(e,t){// shim for using process in browser
var r,n,o,i=e.exports={};function s(){throw Error("setTimeout has not been defined")}function a(){throw Error("clearTimeout has not been defined")}function u(e){if(r===setTimeout)return setTimeout(e,0);// if setTimeout wasn't available but was latter defined
if((r===s||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{// when when somebody has screwed with setTimeout but no I.E. maddness
return r(e,0)}catch(t){try{// When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
return r.call(null,e,0)}catch(t){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:s}catch(e){r=s}try{n="function"==typeof clearTimeout?clearTimeout:a}catch(e){n=a}}();var c=[],f=!1,h=-1;function l(){f&&o&&(f=!1,o.length?c=o.concat(c):h=-1,c.length&&d())}function d(){if(!f){var e=u(l);f=!0;for(var t=c.length;t;){for(o=c,c=[];++h<t;)o&&o[h].run();h=-1,t=c.length}o=null,f=!1,function(e){if(n===clearTimeout)return clearTimeout(e);// if clearTimeout wasn't available but was latter defined
if((n===a||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{// when when somebody has screwed with setTimeout but no I.E. maddness
n(e)}catch(t){try{// When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
return n.call(null,e)}catch(t){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
// Some versions of I.E. have different rules for clearTimeout vs setTimeout
return n.call(this,e)}}}(e)}}// v8 likes predictible objects
function p(e,t){this.fun=e,this.array=t}function g(){}i.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];c.push(new p(e,t)),1!==c.length||f||u(d)},p.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=g,i.addListener=g,i.once=g,i.off=g,i.removeListener=g,i.removeAllListeners=g,i.emit=g,i.prependListener=g,i.prependOnceListener=g,i.listeners=function(e){return[]},i.binding=function(e){throw Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw Error("process.chdir is not supported")},i.umask=function(){return 0}}),i("hNVND",function(r,n){e(r.exports,"vueWebDetect",()=>s),e(r.exports,"vueSSRDetect",()=>a);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var i=o("PxyB5");function s(){return(0,i.windowExists)()&&(0,i.keyPrefixMatch)(window,"__VUE")}function a(){return(0,i.globalExists)()&&(0,i.keyPrefixMatch)(t,"__VUE")}}),i("ekYbq",function(t,r){e(t.exports,"svelteWebDetect",()=>s),e(t.exports,"svelteSSRDetect",()=>a);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("PxyB5"),i=o("hPtJY");function s(){return(0,n.windowExists)()&&(0,n.keyPrefixMatch)(window,"__SVELTE")}function a(){return(0,n.processExists)()&&void 0!==i.env&&!!Object.keys(i.env).find(function(e){return e.includes("svelte")})}}),i("6RmW8",function(r,n){e(r.exports,"nextWebDetect",()=>s),e(r.exports,"nextSSRDetect",()=>a);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var i=o("PxyB5");function s(){// @ts-ignore
return(0,i.windowExists)()&&window.next&&"object"==typeof window.next}function a(){return(0,i.globalExists)()&&((0,i.keyPrefixMatch)(t,"__next")||(0,i.keyPrefixMatch)(t,"__NEXT"))}}),i("8oJhN",function(r,n){e(r.exports,"nuxtWebDetect",()=>s),e(r.exports,"nuxtSSRDetect",()=>a);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var i=o("PxyB5");function s(){return(0,i.windowExists)()&&// @ts-ignore
(void 0!==window.__NUXT__||void 0!==window.$nuxt)}function a(){// @ts-ignore
return(0,i.globalExists)()&&void 0!==t.__NUXT_PATHS__}}),i("1ONkW",function(t,r){e(t.exports,"angularWebDetect",()=>s),e(t.exports,"angularSSRDetect",()=>a);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("PxyB5"),i=o("hPtJY");function s(){var e=!!((0,n.documentExists)()&&document.querySelector("[ng-version]")),t=!!((0,n.windowExists)()&&void 0!==window.ng);return e||t}function a(){return(0,n.processExists)()&&i.env,!1}}),i("6V1lR",function(t,r){e(t.exports,"reactNativeDetect",()=>n);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// Tested with react-native 0.17.7
function n(){return"undefined"!=typeof navigator&&void 0!==navigator.product&&"ReactNative"===navigator.product}}),i("3eJAR",function(r,n){e(r.exports,"expoDetect",()=>s);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var i=o("PxyB5");function s(){// @ts-ignore
return(0,i.globalExists)()&&void 0!==t.expo}}),i("9eEuN",function(t,r){e(t.exports,"webDetect",()=>i);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("PxyB5");function i(){return(0,n.windowExists)()}}),i("2hp02",function(t,r){e(t.exports,"Hub",()=>f);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("2ZPeH"),i=function(){return(i=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},s=function(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,o,i=r.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(n=i.next()).done;)s.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return s},a=function(e,t,r){if(r||2==arguments.length)for(var n,o=0,i=t.length;o<i;o++)!n&&o in t||(n||(n=Array.prototype.slice.call(t,0,o)),n[o]=t[o]);return e.concat(n||Array.prototype.slice.call(t))},u=new n.ConsoleLogger("Hub"),c="undefined"!=typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("amplify_default"):"@@amplify_default",f=new/** @class */(function(){function e(e){this.listeners=[],this.patterns=[],this.protectedChannels=["core","auth","api","analytics","interactions","pubsub","storage","ui","xr"],this.name=e}return(/**
     * Used internally to remove a Hub listener.
     *
     * @remarks
     * This private method is for internal use only. Instead of calling Hub.remove, call the result of Hub.listen.
     */e.prototype._remove=function(e,t){if(e instanceof RegExp){var r=this.patterns.find(function(t){return t.pattern.source===e.source});if(!r){u.warn("No listeners for ".concat(e));return}this.patterns=a([],s(this.patterns.filter(function(e){return e!==r})),!1)}else{var n=this.listeners[e];if(!n){u.warn("No listeners for ".concat(e));return}this.listeners[e]=a([],s(n.filter(function(e){return e.callback!==t})),!1)}},/**
     * @deprecated Instead of calling Hub.remove, call the result of Hub.listen.
     */e.prototype.remove=function(e,t){this._remove(e,t)},/**
     * Used to send a Hub event.
     *
     * @param channel - The channel on which the event will be broadcast
     * @param payload - The HubPayload
     * @param source  - The source of the event; defaults to ''
     * @param ampSymbol - Symbol used to determine if the event is dispatched internally on a protected channel
     *
     */e.prototype.dispatch=function(e,t,r,n){void 0===r&&(r=""),this.protectedChannels.indexOf(e)>-1&&n!==c&&u.warn("WARNING: ".concat(e," is protected and dispatching on it can have unintended consequences"));var o={channel:e,payload:i({},t),source:r,patternInfo:[]};try{this._toListeners(o)}catch(e){u.error(e)}},/**
     * Used to listen for Hub events.
     *
     * @param channel - The channel on which to listen
     * @param callback - The callback to execute when an event is received on the specified channel
     * @param listenerName - The name of the listener; defaults to 'noname'
     * @returns A function which can be called to cancel the listener.
     *
     */e.prototype.listen=function(e,t,r){var n,o=this;// Check for legacy onHubCapsule callback for backwards compatability
if(void 0===r&&(r="noname"),void 0!==t.onHubCapsule)u.warn("WARNING onHubCapsule is Deprecated. Please pass in a callback."),n=t.onHubCapsule.bind(t);else if("function"!=typeof t)throw Error("No callback supplied to Hub");else n=t;if(e instanceof RegExp)this.patterns.push({pattern:e,callback:n});else{var i=this.listeners[e];i||(i=[],this.listeners[e]=i),i.push({name:r,callback:n})}return function(){o._remove(e,n)}},e.prototype._toListeners=function(e){var t=e.channel,r=e.payload,n=this.listeners[t];if(n&&n.forEach(function(n){u.debug("Dispatching to ".concat(t," with "),r);try{n.callback(e)}catch(e){u.error(e)}}),this.patterns.length>0){if(!r.message){u.warn("Cannot perform pattern matching without a message key");return}var o=r.message;this.patterns.forEach(function(t){var r=o.match(t.pattern);if(r){var n=s(r).slice(1),a=i(i({},e),{patternInfo:n});try{t.callback(a)}catch(e){u.error(e)}}})}},e)}())("__default__")}),i("dUqnq",function(e,t){// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var r=o("1alkN"),n=o("2ZPeH"),i=o("4FrD6"),s=new n.ConsoleLogger("I18n"),a=null,u=null,c=/** @class */function(){function e(){}return(/**
     * @static
     * @method
     * Configure I18n part
     * @param {Object} config - Configuration of the I18n
     */e.configure=function(t){return s.debug("configure I18n"),t&&(a=Object.assign({},a,t.I18n||t),e.createInstance()),a},e.getModuleName=function(){return"I18n"},/**
     * @static
     * @method
     * Create an instance of I18n for the library
     */e.createInstance=function(){s.debug("create I18n instance"),u||(u=new r.I18n(a))},/**
     * @static @method
     * Explicitly setting language
     * @param {String} lang
     */e.setLanguage=function(t){return e.checkConfig(),u.setLanguage(t)},/**
     * @static @method
     * Get value
     * @param {String} key
     * @param {String} defVal - Default value
     */e.get=function(t,r){return e.checkConfig()?u.get(t,r):void 0===r?t:r},/**
     * @static
     * @method
     * Add vocabularies for one language
     * @param {String} langurage - Language of the dictionary
     * @param {Object} vocabularies - Object that has key-value as dictionary entry
     */e.putVocabulariesForLanguage=function(t,r){return e.checkConfig(),u.putVocabulariesForLanguage(t,r)},/**
     * @static
     * @method
     * Add vocabularies for one language
     * @param {Object} vocabularies - Object that has language as key,
     *                                vocabularies of each language as value
     */e.putVocabularies=function(t){return e.checkConfig(),u.putVocabularies(t)},e.checkConfig=function(){return u||(u=new r.I18n(a)),!0},e)}();(0,i.Amplify).register(c)}),i("1alkN",function(t,r){e(t.exports,"I18n",()=>a);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("2ZPeH"),i=function(){return(i=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},s=new n.ConsoleLogger("I18n"),a=/** @class */function(){/**
     * @constructor
     * Initialize with configurations
     * @param {Object} options
     */function e(e){/**
         * @private
         */this._options=null,/**
         * @private
         */this._lang=null,/**
         * @private
         */this._dict={},this._options=Object.assign({},e),this._lang=this._options.language,!this._lang&&"undefined"!=typeof window&&window&&window.navigator&&(this._lang=window.navigator.language),s.debug(this._lang)}return(/**
     * @method
     * Explicitly setting language
     * @param {String} lang
     */e.prototype.setLanguage=function(e){this._lang=e},/**
     * @method
     * Get value
     * @param {String} key
     * @param {String} defVal - Default value
     */e.prototype.get=function(e,t){if(void 0===t&&(t=void 0),!this._lang)return void 0!==t?t:e;var r=this._lang,n=this.getByLanguage(e,r);return n||((r.indexOf("-")>0&&(n=this.getByLanguage(e,r.split("-")[0])),n)?n:void 0!==t?t:e)},/**
     * @method
     * Get value according to specified language
     * @param {String} key
     * @param {String} language - Specified langurage to be used
     * @param {String} defVal - Default value
     */e.prototype.getByLanguage=function(e,t,r){if(void 0===r&&(r=null),!t)return r;var n=this._dict[t];return n?n[e]:r},/**
     * @method
     * Add vocabularies for one language
     * @param {String} language - Language of the dictionary
     * @param {Object} vocabularies - Object that has key-value as dictionary entry
     */e.prototype.putVocabulariesForLanguage=function(e,t){var r=this._dict[e];r||(r=this._dict[e]={}),this._dict[e]=i(i({},r),t)},/**
     * @method
     * Add vocabularies for one language
     * @param {Object} vocabularies - Object that has language as key,
     *                                vocabularies of each language as value
     */e.prototype.putVocabularies=function(e){var t=this;Object.keys(e).map(function(r){t.putVocabulariesForLanguage(r,e[r])})},e)}()}),i("3v7X7",function(t,r){e(t.exports,"makeQuerablePromise",()=>i),e(t.exports,"browserOrNode",()=>s);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("hPtJY"),i=function(e){if(e.isResolved)return e;var t=!0,r=!1,n=!1,o=e.then(function(e){return n=!0,t=!1,e},function(e){throw r=!0,t=!1,e});return o.isFullfilled=function(){return n},o.isPending=function(){return t},o.isRejected=function(){return r},o},s=function(){return{isBrowser:"undefined"!=typeof window&&void 0!==window.document,isNode:void 0!==n&&null!=n.versions&&null!=n.versions.node}}}),i("kFSgg",function(t,r){e(t.exports,"parseAWSExports",()=>a);var n=o("2ZPeH"),i=function(){return(i=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},s=new n.ConsoleLogger("Parser"),a=function(e){var t,r={};// Analytics
if(e.aws_mobile_analytics_app_id){var n={AWSPinpoint:{appId:e.aws_mobile_analytics_app_id,region:e.aws_mobile_analytics_app_region}};r.Analytics=n}return(e.aws_cognito_identity_pool_id||e.aws_user_pools_id)&&(r.Auth={userPoolId:e.aws_user_pools_id,userPoolWebClientId:e.aws_user_pools_web_client_id,region:e.aws_cognito_region,identityPoolId:e.aws_cognito_identity_pool_id,identityPoolRegion:e.aws_cognito_region,mandatorySignIn:"enable"===e.aws_mandatory_sign_in,signUpVerificationMethod:e.aws_cognito_sign_up_verification_method||"code"}),t=e.aws_user_files_s3_bucket?{AWSS3:{bucket:e.aws_user_files_s3_bucket,region:e.aws_user_files_s3_bucket_region,dangerouslyConnectToHttpEndpointForTesting:e.aws_user_files_s3_dangerously_connect_to_http_endpoint_for_testing}}:e?e.Storage||e:{},e.Logging&&(r.Logging=i(i({},e.Logging),{region:e.aws_project_region})),e.geo&&(r.Geo=Object.assign({},e.geo),e.geo.amazon_location_service&&(r.Geo={AmazonLocationService:e.geo.amazon_location_service})),r.Analytics=Object.assign({},r.Analytics,e.Analytics),r.Auth=Object.assign({},r.Auth,e.Auth),r.Storage=Object.assign({},t),r.Logging=Object.assign({},r.Logging,e.Logging),s.debug("parse config",e,"to amplifyconfig",r),r}}),i("j70Ma",function(t,r){e(t.exports,"Credentials",()=>w);var n=o("2ZPeH"),i=o("auTMV"),s=o("3v7X7"),a=o("aNKei"),u=o("kTTyh"),c=o("4FrD6"),f=o("5fVC3"),h=o("iWy3K"),l=o("kFSgg"),d=o("2hp02"),p=function(){return(p=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},g=function(e,t,r,n){return new(r||(r=Promise))(function(o,i){function s(e){try{u(n.next(e))}catch(e){i(e)}}function a(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t)})).then(s,a)}u((n=n.apply(e,t||[])).next())})},y=function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(u){return function(a){if(r)throw TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(s=0)),s;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,n=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){s=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){s.label=a[1];break}if(6===a[0]&&s.label<o[1]){s.label=o[1],o=a;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(a);break}o[2]&&s.ops.pop(),s.trys.pop();continue}a=t.call(e,s)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},v=new n.ConsoleLogger("Credentials"),m="undefined"!=typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("amplify_default"):"@@amplify_default",b=function(e,t,r){(0,d.Hub).dispatch("core",{event:e,data:t,message:r},"Credentials",m)},w=new/** @class */(function(){function e(e){this._gettingCredPromise=null,this._refreshHandlers={},// Allow `Auth` to be injected for SSR, but Auth isn't a required dependency for Credentials
this.Auth=void 0,this.configure(e),this._refreshHandlers.google=a.GoogleOAuth.refreshGoogleToken,this._refreshHandlers.facebook=a.FacebookOAuth.refreshFacebookToken}return e.prototype.getModuleName=function(){return"Credentials"},e.prototype.getCredSource=function(){return this._credentials_source},e.prototype.configure=function(e){if(!e)return this._config||{};this._config=Object.assign({},this._config,e);var t=this._config.refreshHandlers;return t&&(this._refreshHandlers=p(p({},this._refreshHandlers),t)),this._storage=this._config.storage,this._storage||(this._storage=new(0,i.StorageHelper)().getStorage()),this._storageSync=Promise.resolve(),"function"==typeof this._storage.sync&&(this._storageSync=this._storage.sync()),b("credentials_configured",null,"Credentials has been configured successfully"),this._config},e.prototype.get=function(){return v.debug("getting credentials"),this._pickupCredentials()},// currently we only store the guest identity in local storage
e.prototype._getCognitoIdentityIdStorageKey=function(e){return"".concat("CognitoIdentityId-").concat(e)},e.prototype._pickupCredentials=function(){return v.debug("picking up credentials"),this._gettingCredPromise&&this._gettingCredPromise.isPending()?v.debug("getting old cred promise"):(v.debug("getting new cred promise"),this._gettingCredPromise=(0,s.makeQuerablePromise)(this._keepAlive())),this._gettingCredPromise},e.prototype._keepAlive=function(){return g(this,void 0,void 0,function(){var e,t,r,n,o,i;return y(this,function(s){switch(s.label){case 0:if(v.debug("checking if credentials exists and not expired"),(e=this._credentials)&&!this._isExpired(e)&&!this._isPastTTL())return v.debug("credentials not changed and not expired, directly return"),[2/*return*/,Promise.resolve(e)];if(v.debug("need to get a new credential or refresh the existing one"),!(r=void 0===(t=this.Auth)?c.Amplify.Auth:t)||"function"!=typeof r.currentUserCredentials)return[2/*return*/,this._setCredentialsForGuest()];if(!(!this._isExpired(e)&&this._isPastTTL()))return[3/*break*/,6];v.debug("ttl has passed but token is not yet expired"),s.label=1;case 1:return s.trys.push([1,5,,6]),[4/*yield*/,r.currentUserPoolUser()];case 2:return n=s.sent(),[4/*yield*/,r.currentSession()];case 3:return o=s.sent().refreshToken,[4/*yield*/,new Promise(function(e,t){n.refreshSession(o,function(r,n){return r?t(r):e(n)})})];case 4:return s.sent(),[3/*break*/,6];case 5:return i=s.sent(),// should not throw because user might just be on guest access or is authenticated through federation
v.debug("Error attempting to refreshing the session",i),[3/*break*/,6];case 6:return[2/*return*/,r.currentUserCredentials()]}})})},e.prototype.refreshFederatedToken=function(e){v.debug("Getting federated credentials");var t=e.provider,r=e.user,n=e.token,o=e.identity_id,i=e.expires_at;return(// Make sure expires_at is in millis
i=1970===new Date(i).getFullYear()?1e3*i:i,v.debug("checking if federated jwt token expired"),i>new Date().getTime())?(// if not expired
v.debug("token not expired"),this._setCredentialsFromFederation({provider:t,token:n,user:r,identity_id:o,expires_at:i})):this._refreshHandlers[t]&&"function"==typeof this._refreshHandlers[t]?(v.debug("getting refreshed jwt token from federation provider"),this._providerRefreshWithRetry({refreshHandler:this._refreshHandlers[t],provider:t,user:r})):(v.debug("no refresh handler for provider:",t),this.clear(),Promise.reject("no refresh handler for provider"))},e.prototype._providerRefreshWithRetry=function(e){var t=this,r=e.refreshHandler,n=e.provider,o=e.user;// refreshHandler will retry network errors, otherwise it will
// return NonRetryableError to break out of jitteredExponentialRetry
return(0,u.jitteredExponentialRetry)(r,[],1e4).then(function(e){return v.debug("refresh federated token sucessfully",e),t._setCredentialsFromFederation({provider:n,token:e.token,user:o,identity_id:e.identity_id,expires_at:e.expires_at})}).catch(function(e){return"string"==typeof e&&0===e.toLowerCase().lastIndexOf("network error",e.length)||t.clear(),v.debug("refresh federated token failed",e),Promise.reject("refreshing federation token failed: "+e)})},e.prototype._isExpired=function(e){if(!e)return v.debug("no credentials for expiration check"),!0;v.debug("are these credentials expired?",e);var t=Date.now();return e.expiration.getTime()<=t},e.prototype._isPastTTL=function(){return this._nextCredentialsRefresh<=Date.now()},e.prototype._setCredentialsForGuest=function(){var e;return g(this,void 0,void 0,function(){var t,r,n,o,i,s,a,u,c,d=this;return y(this,function(p){switch(p.label){case 0:if(v.debug("setting credentials for guest"),(null===(e=this._config)||void 0===e?void 0:e.identityPoolId)||// doing best effort to check if the library was configured
(this._config=Object.assign({},this._config,(0,l.parseAWSExports)(this._config||{}).Auth)),r=(t=this._config).identityPoolId,n=t.region,o=t.mandatorySignIn,i=t.identityPoolRegion,o)return[2/*return*/,Promise.reject("cannot get guest credentials when mandatory signin enabled")];if(!r)return v.debug("No Cognito Identity pool provided for unauthenticated access"),[2/*return*/,Promise.reject("No Cognito Identity pool provided for unauthenticated access")];if(!i&&!n)return v.debug("region is not configured for getting the credentials"),[2/*return*/,Promise.reject("region is not configured for getting the credentials")];return a=this,[4/*yield*/,this._getGuestIdentityId()];case 1:return s=a._identityId=p.sent(),u={region:null!=i?i:n},c=g(d,void 0,void 0,function(){var e,t;return y(this,function(n){switch(n.label){case 0:if(s)return[3/*break*/,2];return[4/*yield*/,(0,h.getId)(u,{IdentityPoolId:r})];case 1:e=n.sent().IdentityId,this._identityId=e,n.label=2;case 2:return[4/*yield*/,(0,f.getCredentialsForIdentity)(u,{IdentityId:this._identityId})];case 3:return t=n.sent().Credentials,[2/*return*/,{identityId:this._identityId,accessKeyId:t.AccessKeyId,secretAccessKey:t.SecretKey,sessionToken:t.SessionToken,expiration:t.Expiration}]}})}).catch(function(e){return g(d,void 0,void 0,function(){return y(this,function(t){throw e})})}),[2/*return*/,this._loadCredentials(c,"guest",!1,null).then(function(e){return e}).catch(function(e){return g(d,void 0,void 0,function(){var t=this;return y(this,function(n){switch(n.label){case 0:if(!("ResourceNotFoundException"===e.name&&e.message==="Identity '".concat(s,"' not found.")))return[3/*break*/,2];return v.debug("Failed to load guest credentials"),[4/*yield*/,this._removeGuestIdentityId()];case 1:return n.sent(),c=g(t,void 0,void 0,function(){var e,t;return y(this,function(n){switch(n.label){case 0:return[4/*yield*/,(0,h.getId)(u,{IdentityPoolId:r})];case 1:return e=n.sent().IdentityId,this._identityId=e,[4/*yield*/,(0,f.getCredentialsForIdentity)(u,{IdentityId:e})];case 2:return t=n.sent().Credentials,[2/*return*/,{identityId:e,accessKeyId:t.AccessKeyId,secretAccessKey:t.SecretKey,sessionToken:t.SessionToken,expiration:t.Expiration}]}})}).catch(function(e){return g(t,void 0,void 0,function(){return y(this,function(t){throw e})})}),[2/*return*/,this._loadCredentials(c,"guest",!1,null)];case 2:return[2/*return*/,e]}})})})]}})})},e.prototype._setCredentialsFromFederation=function(e){var t=this,r=e.provider,n=e.token,o=e.identity_id,i={google:"accounts.google.com",facebook:"graph.facebook.com",amazon:"www.amazon.com",developer:"cognito-identity.amazonaws.com"}[r]||r;if(!i)return Promise.reject("You must specify a federated provider");var s={};s[i]=n;var a=this._config,u=a.identityPoolId,c=a.region,l=a.identityPoolRegion;if(!u)return v.debug("No Cognito Federated Identity pool provided"),Promise.reject("No Cognito Federated Identity pool provided");if(!l&&!c)return v.debug("region is not configured for getting the credentials"),Promise.reject("region is not configured for getting the credentials");var d={region:null!=l?l:c},p=g(t,void 0,void 0,function(){var e;return y(this,function(t){switch(t.label){case 0:if(o)return[3/*break*/,2];return[4/*yield*/,(0,h.getId)(d,{IdentityPoolId:u,Logins:s})];case 1:o=t.sent().IdentityId,t.label=2;case 2:return[4/*yield*/,(0,f.getCredentialsForIdentity)(d,{IdentityId:o,Logins:s})];case 3:return e=t.sent().Credentials,[2/*return*/,{identityId:o,accessKeyId:e.AccessKeyId,secretAccessKey:e.SecretKey,sessionToken:e.SessionToken,expiration:e.Expiration}]}})}).catch(function(e){return g(t,void 0,void 0,function(){return y(this,function(t){throw e})})});return this._loadCredentials(p,"federated",!0,e)},e.prototype._setCredentialsFromSession=function(e){var t=this;v.debug("set credentials from session");var r=e.getIdToken().getJwtToken(),n=this._config,o=n.region,i=n.userPoolId,s=n.identityPoolId,a=n.identityPoolRegion;if(!s)return v.debug("No Cognito Federated Identity pool provided"),Promise.reject("No Cognito Federated Identity pool provided");if(!a&&!o)return v.debug("region is not configured for getting the credentials"),Promise.reject("region is not configured for getting the credentials");var u={};u["cognito-idp."+o+".amazonaws.com/"+i]=r;var c={region:null!=a?a:o},l=g(t,void 0,void 0,function(){var e,t,r,n,o,i,a,l,d;return y(this,function(p){switch(p.label){case 0:return[4/*yield*/,this._getGuestIdentityId()];case 1:if(e=p.sent())return[3/*break*/,3];return[4/*yield*/,(0,h.getId)(c,{IdentityPoolId:s,Logins:u})];case 2:t=p.sent().IdentityId,p.label=3;case 3:return[4/*yield*/,(0,f.getCredentialsForIdentity)(c,{IdentityId:e||t,Logins:u})];case 4:if(o=(n=(r=p.sent()).Credentials).AccessKeyId,i=n.Expiration,a=n.SecretKey,l=n.SessionToken,d=r.IdentityId,this._identityId=d,!e)return[3/*break*/,6];// remove it from local storage to avoid being used as a guest Identity by _setCredentialsForGuest
return(// if guestIdentity is found and used by GetCredentialsForIdentity
// it will be linked to the logins provided, and disqualified as an unauth identity
v.debug("The guest identity ".concat(e," has been successfully linked to the logins")),e===d&&v.debug("The guest identity ".concat(e," has become the primary identity")),[4/*yield*/,this._removeGuestIdentityId()]);case 5:// remove it from local storage to avoid being used as a guest Identity by _setCredentialsForGuest
p.sent(),p.label=6;case 6:// https://github.com/aws/aws-sdk-js-v3/blob/main/packages/credential-provider-cognito-identity/src/fromCognitoIdentity.ts#L40
return[2/*return*/,{accessKeyId:o,secretAccessKey:a,sessionToken:l,expiration:i,identityId:d}]}})}).catch(function(e){return g(t,void 0,void 0,function(){return y(this,function(t){throw e})})});return this._loadCredentials(l,"userPool",!0,null)},e.prototype._loadCredentials=function(e,t,r,n){var o=this,i=this;return new Promise(function(s,a){e.then(function(e){return g(o,void 0,void 0,function(){var o,a,u,c,f;return y(this,function(h){switch(h.label){case 0:if(v.debug("Load credentials successfully",e),this._identityId&&!e.identityId&&(e.identityId=this._identityId),i._credentials=e,i._credentials.authenticated=r,i._credentials_source=t,i._nextCredentialsRefresh=new Date().getTime()+3e6,"federated"===t){o=Object.assign({id:this._credentials.identityId},n.user),a=n.provider,u=n.token,c=n.expires_at,f=n.identity_id;try{this._storage.setItem("aws-amplify-federatedInfo",JSON.stringify({provider:a,token:u,user:o,expires_at:c,identity_id:f}))}catch(e){v.debug("Failed to put federated info into auth storage",e)}}if("guest"!==t)return[3/*break*/,2];return[4/*yield*/,this._setGuestIdentityId(e.identityId)];case 1:h.sent(),h.label=2;case 2:return s(i._credentials),[2/*return*/]}})})}).catch(function(t){if(t){v.debug("Failed to load credentials",e),v.debug("Error loading credentials",t),a(t);return}})})},e.prototype.set=function(e,t){return"session"===t?this._setCredentialsFromSession(e):"federation"===t?this._setCredentialsFromFederation(e):"guest"===t?this._setCredentialsForGuest():(v.debug("no source specified for setting credentials"),Promise.reject("invalid source"))},e.prototype.clear=function(){return g(this,void 0,void 0,function(){return y(this,function(e){return this._credentials=null,this._credentials_source=null,v.debug("removing aws-amplify-federatedInfo from storage"),this._storage.removeItem("aws-amplify-federatedInfo"),[2/*return*/]})})},/* operations on local stored guest identity */e.prototype._getGuestIdentityId=function(){return g(this,void 0,void 0,function(){var e,t;return y(this,function(r){switch(r.label){case 0:e=this._config.identityPoolId,r.label=1;case 1:return r.trys.push([1,3,,4]),[4/*yield*/,this._storageSync];case 2:return r.sent(),[2/*return*/,this._storage.getItem(this._getCognitoIdentityIdStorageKey(e))];case 3:return t=r.sent(),v.debug("Failed to get the cached guest identityId",t),[3/*break*/,4];case 4:return[2/*return*/]}})})},e.prototype._setGuestIdentityId=function(e){return g(this,void 0,void 0,function(){var t,r;return y(this,function(n){switch(n.label){case 0:t=this._config.identityPoolId,n.label=1;case 1:return n.trys.push([1,3,,4]),[4/*yield*/,this._storageSync];case 2:return n.sent(),this._storage.setItem(this._getCognitoIdentityIdStorageKey(t),e),[3/*break*/,4];case 3:return r=n.sent(),v.debug("Failed to cache guest identityId",r),[3/*break*/,4];case 4:return[2/*return*/]}})})},e.prototype._removeGuestIdentityId=function(){return g(this,void 0,void 0,function(){var e;return y(this,function(t){return e=this._config.identityPoolId,v.debug("removing ".concat(this._getCognitoIdentityIdStorageKey(e)," from storage")),this._storage.removeItem(this._getCognitoIdentityIdStorageKey(e)),[2/*return*/]})})},/**
     * Compact version of credentials
     * @param {Object} credentials
     * @return {Object} - Credentials
     */e.prototype.shear=function(e){return{accessKeyId:e.accessKeyId,sessionToken:e.sessionToken,secretAccessKey:e.secretAccessKey,identityId:e.identityId,authenticated:e.authenticated}},e}())(null);(0,c.Amplify).register(w)}),i("auTMV",function(t,r){e(t.exports,"StorageHelper",()=>i);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n={},o=/** @class */function(){function e(){}return(/**
     * This is used to set a specific item in storage
     * @param {string} key - the key for the item
     * @param {object} value - the value
     * @returns {string} value that was set
     */e.setItem=function(e,t){return n[e]=t,n[e]},/**
     * This is used to get a specific key from storage
     * @param {string} key - the key for the item
     * This is used to clear the storage
     * @returns {string} the data item
     */e.getItem=function(e){return Object.prototype.hasOwnProperty.call(n,e)?n[e]:void 0},/**
     * This is used to remove an item from storage
     * @param {string} key - the key being set
     * @returns {string} value - value that was deleted
     */e.removeItem=function(e){return delete n[e]},/**
     * This is used to clear the storage
     * @returns {string} nothing
     */e.clear=function(){return n={}},e)}(),i=/** @class */function(){/**
     * This is used to get a storage object
     * @returns {object} the storage
     */function e(){try{this.storageWindow=window.localStorage,this.storageWindow.setItem("aws.amplify.test-ls",1),this.storageWindow.removeItem("aws.amplify.test-ls")}catch(e){this.storageWindow=o}}return(/**
     * This is used to return the storage
     * @returns {object} the storage
     */e.prototype.getStorage=function(){return this.storageWindow},e)}()}),i("aNKei",function(t,r){e(t.exports,"GoogleOAuth",()=>s),e(t.exports,"FacebookOAuth",()=>a);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("voPTN"),i=o("8wLjW"),s=new n.GoogleOAuth,a=new i.FacebookOAuth}),i("voPTN",function(t,r){e(t.exports,"GoogleOAuth",()=>f);var n=o("2ZPeH"),i=o("3v7X7"),s=o("kTTyh"),a=function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(u){return function(a){if(r)throw TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(s=0)),s;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,n=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){s=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){s.label=a[1];break}if(6===a[0]&&s.label<o[1]){s.label=o[1],o=a;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(a);break}o[2]&&s.ops.pop(),s.trys.pop();continue}a=t.call(e,s)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},u=new n.ConsoleLogger("CognitoCredentials"),c=new Promise(function(e,t){return(0,i.browserOrNode)().isBrowser?(window.gapi&&window.gapi.auth2?window.gapi.auth2:null)?(u.debug("google api already loaded"),e()):void setTimeout(function(){return e()},2e3):(u.debug("not in the browser, directly resolved"),e())}),f=/** @class */function(){function e(){this.initialized=!1,this.refreshGoogleToken=this.refreshGoogleToken.bind(this),this._refreshGoogleTokenImpl=this._refreshGoogleTokenImpl.bind(this)}return e.prototype.refreshGoogleToken=function(){var e,t,r,n;return e=this,t=void 0,r=void 0,n=function(){return a(this,function(e){switch(e.label){case 0:if(this.initialized)return[3/*break*/,2];return u.debug("need to wait for the Google SDK loaded"),[4/*yield*/,c];case 1:e.sent(),this.initialized=!0,u.debug("finish waiting"),e.label=2;case 2:return[2/*return*/,this._refreshGoogleTokenImpl()]}})},new(r||(r=Promise))(function(o,i){function s(e){try{u(n.next(e))}catch(e){i(e)}}function a(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t)})).then(s,a)}u((n=n.apply(e,t||[])).next())})},e.prototype._refreshGoogleTokenImpl=function(){var e=null;return((0,i.browserOrNode)().isBrowser&&(e=window.gapi&&window.gapi.auth2?window.gapi.auth2:null),e)?new Promise(function(t,r){e.getAuthInstance().then(function(e){e||(u.debug("google Auth undefined"),r(new s.NonRetryableError("google Auth undefined")));var n=e.currentUser.get();// refresh the token
n.isSignedIn()?(u.debug("refreshing the google access token"),n.reloadAuthResponse().then(function(e){t({token:e.id_token,expires_at:e.expires_at})}).catch(function(e){e&&"network_error"===e.error?r("Network error reloading google auth response"):r(new s.NonRetryableError("Failed to reload google auth response"))})):r(new s.NonRetryableError("User is not signed in with Google"))}).catch(function(e){u.debug("Failed to refresh google token",e),r(new s.NonRetryableError("Failed to refresh google token"))})}):(u.debug("no gapi auth2 available"),Promise.reject("no gapi auth2 available"))},e}()}),i("kTTyh",function(t,r){e(t.exports,"NonRetryableError",()=>l),e(t.exports,"jitteredBackoff",()=>d),e(t.exports,"jitteredExponentialRetry",()=>p);var n,i=o("2ZPeH"),s=(n=function(e,t){return(n=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),a=function(e,t,r,n){return new(r||(r=Promise))(function(o,i){function s(e){try{u(n.next(e))}catch(e){i(e)}}function a(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t)})).then(s,a)}u((n=n.apply(e,t||[])).next())})},u=function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(u){return function(a){if(r)throw TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(s=0)),s;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,n=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){s=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){s.label=a[1];break}if(6===a[0]&&s.label<o[1]){s.label=o[1],o=a;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(a);break}o[2]&&s.ops.pop(),s.trys.pop();continue}a=t.call(e,s)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},c=function(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,o,i=r.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(n=i.next()).done;)s.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return s},f=function(e,t,r){if(r||2==arguments.length)for(var n,o=0,i=t.length;o<i;o++)!n&&o in t||(n||(n=Array.prototype.slice.call(t,0,o)),n[o]=t[o]);return e.concat(n||Array.prototype.slice.call(t))},h=new i.ConsoleLogger("Util"),l=/** @class */function(e){function t(t){var r=e.call(this,t)||this;return r.nonRetryable=!0,r}return s(t,e),t}(Error);function d(e){return void 0===e&&(e=3e5),function(t){var r=100*Math.pow(2,t)+100*Math.random();return!(r>e)&&r}}var p=function(e,t,r,n){return void 0===r&&(r=3e5),function(e,t,r,n){return a(this,void 0,void 0,function(){var o=this;return u(this,function(i){if("function"!=typeof e)throw Error("functionToRetry must be a function");return[2/*return*/,new Promise(function(i,s){return a(o,void 0,void 0,function(){var o,a,l,d,p,g,y;return u(this,function(v){switch(v.label){case 0:o=0,a=!1,d=function(){},n&&n.then(function(){// signal not to try anymore.
a=!0,// stop sleeping if we're sleeping.
clearTimeout(l),d()}),g=function(){var n,g,y,v;return u(this,function(u){switch(u.label){case 0:o++,h.debug("".concat(e.name," attempt #").concat(o," with this vars: ").concat(JSON.stringify(t))),u.label=1;case 1:return u.trys.push([1,3,,7]),n={},g=i,[4/*yield*/,e.apply(void 0,f([],c(t),!1))];case 2:return[2/*return*/,(n.value=g.apply(void 0,[u.sent()]),n)];case 3:if(p=y=u.sent(),h.debug("error on ".concat(e.name),y),y&&y.nonRetryable)return h.debug("".concat(e.name," non retryable error"),y),[2/*return*/,{value:s(y)}];if(v=r(o,t,y),h.debug("".concat(e.name," retrying in ").concat(v," ms")),!(!1===v||a))return[3/*break*/,4];return[2/*return*/,{value:s(y)}];case 4:return[4/*yield*/,new Promise(function(e){l=setTimeout(d=e,v)})];case 5:u.sent(),u.label=6;case 6:return[3/*break*/,7];case 7:return[2/*return*/]}})},v.label=1;case 1:if(a)return[3/*break*/,3];return[5/*yield**/,g()];case 2:if("object"==typeof(y=v.sent()))return[2/*return*/,y.value];return[3/*break*/,1];case 3:return(// reached if terminated while waiting for a timer.
s(p),[2/*return*/])}})})})]})})}(e,t,d(r),n)}}),i("8wLjW",function(t,r){e(t.exports,"FacebookOAuth",()=>f);var n=o("2ZPeH"),i=o("3v7X7"),s=o("kTTyh"),a=function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(u){return function(a){if(r)throw TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(s=0)),s;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,n=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){s=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){s.label=a[1];break}if(6===a[0]&&s.label<o[1]){s.label=o[1],o=a;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(a);break}o[2]&&s.ops.pop(),s.trys.pop();continue}a=t.call(e,s)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},u=new n.ConsoleLogger("CognitoCredentials"),c=new Promise(function(e,t){return(0,i.browserOrNode)().isBrowser?window.FB?(u.debug("FB SDK already loaded"),e()):void setTimeout(function(){return e()},2e3):(u.debug("not in the browser, directly resolved"),e())}),f=/** @class */function(){function e(){this.initialized=!1,this.refreshFacebookToken=this.refreshFacebookToken.bind(this),this._refreshFacebookTokenImpl=this._refreshFacebookTokenImpl.bind(this)}return e.prototype.refreshFacebookToken=function(){var e,t,r,n;return e=this,t=void 0,r=void 0,n=function(){return a(this,function(e){switch(e.label){case 0:if(this.initialized)return[3/*break*/,2];return u.debug("need to wait for the Facebook SDK loaded"),[4/*yield*/,c];case 1:e.sent(),this.initialized=!0,u.debug("finish waiting"),e.label=2;case 2:return[2/*return*/,this._refreshFacebookTokenImpl()]}})},new(r||(r=Promise))(function(o,i){function s(e){try{u(n.next(e))}catch(e){i(e)}}function a(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t)})).then(s,a)}u((n=n.apply(e,t||[])).next())})},e.prototype._refreshFacebookTokenImpl=function(){var e=null;if((0,i.browserOrNode)().isBrowser&&(e=window.FB),!e){var t="no fb sdk available";return u.debug(t),Promise.reject(new s.NonRetryableError(t))}return new Promise(function(t,r){e.getLoginStatus(function(e){if(e&&e.authResponse){var n=e.authResponse,o=n.accessToken,i=1e3*n.expiresIn+new Date().getTime();if(!o){var a="the jwtToken is undefined";u.debug(a),r(new s.NonRetryableError(a))}t({token:o,expires_at:i})}else{var a="no response from facebook when refreshing the jwt token";u.debug(a),// There is no definitive indication for a network error in
// fbResponse, so we are treating it as an invalid token.
r(new s.NonRetryableError(a))}},{scope:"public_profile,email"})})},e}()}),i("5fVC3",function(t,r){e(t.exports,"getCredentialsForIdentity",()=>c);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("btENS"),i=o("eNnCE"),s=o("8PRMo"),a=o("4WPy7"),u=function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(u){return function(a){if(r)throw TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(s=0)),s;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,n=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){s=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){s.label=a[1];break}if(6===a[0]&&s.label<o[1]){s.label=o[1],o=a;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(a);break}o[2]&&s.ops.pop(),s.trys.pop();continue}a=t.call(e,s)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},c=(0,a.composeServiceApi)(n.cognitoIdentityTransferHandler,function(e,t){var r=(0,n.getSharedHeaders)("GetCredentialsForIdentity"),o=JSON.stringify(e);return(0,n.buildHttpRpcRequest)(t,r,o)},function(e){var t,r,n,o;return t=void 0,r=void 0,n=void 0,o=function(){var t;return u(this,function(r){switch(r.label){case 0:if(!(e.statusCode>=300))return[3/*break*/,2];return[4/*yield*/,(0,i.parseJsonError)(e)];case 1:throw r.sent();case 2:return[4/*yield*/,(0,i.parseJsonBody)(e)];case 3:var n;return[2/*return*/,{IdentityId:(t=r.sent()).IdentityId,Credentials:(void 0===(n=t.Credentials)&&(n={}),{AccessKeyId:n.AccessKeyId,SecretKey:n.SecretKey,SessionToken:n.SessionToken,Expiration:new Date(1e3*n.Expiration)}),$metadata:(0,s.parseMetadata)(e)}]}})},new(n||(n=Promise))(function(e,i){function s(e){try{u(o.next(e))}catch(e){i(e)}}function a(e){try{u(o.throw(e))}catch(e){i(e)}}function u(t){var r;t.done?e(t.value):((r=t.value)instanceof n?r:new n(function(e){e(r)})).then(s,a)}u((o=o.apply(t,r||[])).next())})},n.defaultConfig)}),i("btENS",function(t,r){e(t.exports,"cognitoIdentityTransferHandler",()=>d),e(t.exports,"defaultConfig",()=>p),e(t.exports,"getSharedHeaders",()=>g),e(t.exports,"buildHttpRpcRequest",()=>y);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("kC2Hu"),i=o("eNnCE"),s=o("5CAjT"),a=o("d8aS3"),u=o("90ga5"),c=o("50U3U"),f=o("3NGR1"),h=o("439w6"),l=function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(u){return function(a){if(r)throw TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(s=0)),s;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,n=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){s=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){s.label=a[1];break}if(6===a[0]&&s.label<o[1]){s.label=o[1],o=a;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(a);break}o[2]&&s.ops.pop(),s.trys.pop();continue}a=t.call(e,s)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},d=(0,a.composeTransferHandler)(s.unauthenticatedHandler,[function(){return function(e,t){return function(t){var r,n,o,i;return r=this,n=void 0,o=void 0,i=function(){return l(this,function(r){return t.headers["cache-control"]="no-store",[2/*return*/,e(t)]})},new(o||(o=Promise))(function(e,t){function s(e){try{u(i.next(e))}catch(e){t(e)}}function a(e){try{u(i.throw(e))}catch(e){t(e)}}function u(t){var r;t.done?e(t.value):((r=t.value)instanceof o?r:new o(function(e){e(r)})).then(s,a)}u((i=i.apply(r,n||[])).next())})}}}]),p={service:"cognito-identity",endpointResolver:function(e){var t=e.region;return{url:new URL("https://cognito-identity.".concat(t,".").concat((0,n.getDnsSuffix)(t)))}},retryDecider:(0,u.getRetryDecider)(i.parseJsonError),computeDelay:c.jitteredBackoff,userAgentValue:(0,f.getAmplifyUserAgent)()};(0,h.observeFrameworkChanges)(function(){p.userAgentValue=(0,f.getAmplifyUserAgent)()});var g=function(e){return{"content-type":"application/x-amz-json-1.1","x-amz-target":"AWSCognitoIdentityService.".concat(e)}},y=function(e,t,r){return{headers:t,url:e.url,body:r,method:"POST"}}}),i("kC2Hu",function(t,r){e(t.exports,"getDnsSuffix",()=>s);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("bT8sg"),i=function(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},s=function(e){var t,r,o=n.partitionsInfo.partitions;try{for(var s=i(o),a=s.next();!a.done;a=s.next()){var u=a.value,c=u.regions,f=u.outputs,h=u.regionRegex,l=new RegExp(h);if(c.includes(e)||l.test(e))return f.dnsSuffix}}catch(e){t={error:e}}finally{try{a&&!a.done&&(r=s.return)&&r.call(s)}finally{if(t)throw t.error}}return n.defaultPartition.outputs.dnsSuffix}}),i("bT8sg",function(t,r){e(t.exports,"defaultPartition",()=>n),e(t.exports,"partitionsInfo",()=>o);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Default partition for AWS services. This is used when the region is not provided or the region is not recognized.
 *
 * @internal
 */var n={id:"aws",outputs:{dnsSuffix:"amazonaws.com"},regionRegex:"^(us|eu|ap|sa|ca|me|af)\\-\\w+\\-\\d+$",regions:["aws-global"]},o={partitions:[n,{id:"aws-cn",outputs:{dnsSuffix:"amazonaws.com.cn"},regionRegex:"^cn\\-\\w+\\-\\d+$",regions:["aws-cn-global"]}]}}),i("eNnCE",function(t,r){e(t.exports,"parseJsonError",()=>u),e(t.exports,"parseJsonBody",()=>c);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("8PRMo"),i=function(e,t,r,n){return new(r||(r=Promise))(function(o,i){function s(e){try{u(n.next(e))}catch(e){i(e)}}function a(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t)})).then(s,a)}u((n=n.apply(e,t||[])).next())})},s=function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(u){return function(a){if(r)throw TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(s=0)),s;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,n=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){s=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){s.label=a[1];break}if(6===a[0]&&s.label<o[1]){s.label=o[1],o=a;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(a);break}o[2]&&s.ops.pop(),s.trys.pop();continue}a=t.call(e,s)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},a=function(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,o,i=r.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(n=i.next()).done;)s.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return s},u=function(e){return i(void 0,void 0,void 0,function(){var t,r,o,i,u,f,h;return s(this,function(s){switch(s.label){case 0:if(!e||e.statusCode<300)return[2/*return*/];return[4/*yield*/,c(e)];case 1:var l;return t=s.sent(),r=(l=a((null!==(u=null!==(i=null!==(o=e.headers["x-amzn-errortype"])&&void 0!==o?o:t.code)&&void 0!==i?i:t.__type)&&void 0!==u?u:"UnknownError").toString().split(/[\,\:]+/),1)[0]).includes("#")?l.split("#")[1]:l,[2/*return*/,Object.assign(Error(null!==(h=null!==(f=t.message)&&void 0!==f?f:t.Message)&&void 0!==h?h:"Unknown error"),{name:r,$metadata:(0,n.parseMetadata)(e)})]}})})},c=function(e){return i(void 0,void 0,void 0,function(){return s(this,function(t){switch(t.label){case 0:if(!e.body)throw Error("Missing response payload");return[4/*yield*/,e.body.json()];case 1:return[2/*return*/,Object.assign(t.sent(),{$metadata:(0,n.parseMetadata)(e)})]}})})}}),i("8PRMo",function(t,r){e(t.exports,"parseMetadata",()=>o);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=function(e){var t,r,o=e.headers,s=e.statusCode;return n(n({},i(e)?e.$metadata:{}),{httpStatusCode:s,requestId:null!==(r=null!==(t=o["x-amzn-requestid"])&&void 0!==t?t:o["x-amzn-request-id"])&&void 0!==r?r:o["x-amz-request-id"],extendedRequestId:o["x-amz-id-2"],cfId:o["x-amz-cf-id"]})},i=function(e){return"object"==typeof(null==e?void 0:e.$metadata)}}),i("5CAjT",function(t,r){e(t.exports,"unauthenticatedHandler",()=>u);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("TCVWy"),i=o("dusQJ"),s=o("d8aS3"),a=o("eiFr1"),u=(0,s.composeTransferHandler)(a.fetchTransferHandler,[i.userAgentMiddleware,n.retryMiddleware])}),i("TCVWy",function(t,r){e(t.exports,"retryMiddleware",()=>i);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(u){return function(a){if(r)throw TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(s=0)),s;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,n=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){s=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){s.label=a[1];break}if(6===a[0]&&s.label<o[1]){s.label=o[1],o=a;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(a);break}o[2]&&s.ops.pop(),s.trys.pop();continue}a=t.call(e,s)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},i=function(e){var t=e.maxAttempts,r=void 0===t?3:t,n=e.retryDecider,i=e.computeDelay,u=e.abortSignal;if(r<1)throw Error("maxAttempts must be greater than 0");return function(e,t){return function(c){var f,h,l,d,p;return h=this,l=void 0,d=void 0,p=function(){var h,l,d,p;return o(this,function(o){switch(o.label){case 0:l=null!==(f=t.attemptsCount)&&void 0!==f?f:0,p=function(){if(d)return a(d,l),d;throw a(h,l),h},o.label=1;case 1:if(!(!(null==u?void 0:u.aborted)&&l<r))return[3/*break*/,11];o.label=2;case 2:return o.trys.push([2,4,,5]),[4/*yield*/,e(c)];case 3:return d=o.sent(),h=void 0,[3/*break*/,5];case 4:return h=o.sent(),d=void 0,[3/*break*/,5];case 5:return(// context.attemptsCount may be updated after calling next handler which may retry the request by itself.
l=t.attemptsCount>l?t.attemptsCount:l+1,t.attemptsCount=l,[4/*yield*/,n(d,h)]);case 6:if(!o.sent())return[3/*break*/,9];if(!(!(null==u?void 0:u.aborted)&&l<r))return[3/*break*/,8];return[4/*yield*/,s(i(l),u)];case 7:o.sent(),o.label=8;case 8:case 10:return[3/*break*/,1];case 9:return[2/*return*/,p()];case 11:if(null==u||!u.aborted)return[2/*return*/,p()];throw Error("Request aborted.")}})},new(d||(d=Promise))(function(e,t){function r(e){try{o(p.next(e))}catch(e){t(e)}}function n(e){try{o(p.throw(e))}catch(e){t(e)}}function o(t){var o;t.done?e(t.value):((o=t.value)instanceof d?o:new d(function(e){e(o)})).then(r,n)}o((p=p.apply(h,l||[])).next())})}}},s=function(e,t){if(null==t?void 0:t.aborted)return Promise.resolve();var r,n,o=new Promise(function(t){n=t,r=setTimeout(t,e)});return null==t||t.addEventListener("abort",function e(o){clearTimeout(r),null==t||t.removeEventListener("abort",e),n()}),o},a=function(e,t){var r;"[object Object]"===Object.prototype.toString.call(e)&&(e.$metadata=n(n({},null!==(r=e.$metadata)&&void 0!==r?r:{}),{attempts:t}))}}),i("dusQJ",function(t,r){e(t.exports,"userAgentMiddleware",()=>o);var n=function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(u){return function(a){if(r)throw TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(s=0)),s;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,n=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){s=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){s.label=a[1];break}if(6===a[0]&&s.label<o[1]){s.label=o[1],o=a;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(a);break}o[2]&&s.ops.pop(),s.trys.pop();continue}a=t.call(e,s)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},o=function(e){var t=e.userAgentHeader,r=void 0===t?"x-amz-user-agent":t,o=e.userAgentValue,i=void 0===o?"":o;return function(e){return function(t){var o,s,a,u;return o=this,s=void 0,a=void 0,u=function(){var o;return n(this,function(n){switch(n.label){case 0:if(0!==i.trim().length)return[3/*break*/,2];return[4/*yield*/,e(t)];case 1:case 3:return[2/*return*/,n.sent()];case 2:return o=r.toLowerCase(),t.headers[o]=t.headers[o]?"".concat(t.headers[o]," ").concat(i):i,[4/*yield*/,e(t)]}})},new(a||(a=Promise))(function(e,t){function r(e){try{i(u.next(e))}catch(e){t(e)}}function n(e){try{i(u.throw(e))}catch(e){t(e)}}function i(t){var o;t.done?e(t.value):((o=t.value)instanceof a?o:new a(function(e){e(o)})).then(r,n)}i((u=u.apply(o,s||[])).next())})}}}}),i("d8aS3",function(t,r){e(t.exports,"composeTransferHandler",()=>n);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Compose a transfer handler with a core transfer handler and a list of middleware.
 * @param coreHandler Core transfer handler
 * @param middleware	List of middleware
 * @returns A transfer handler whose option type is the union of the core
 * 	transfer handler's option type and the middleware's option type.
 * @internal
 */var n=function(e,t){return function(r,n){for(var o={},i=function(t){return e(t,n)},s=t.length-1;s>=0;s--)i=(0,t[s])(n)(i,o);return i(r)}}}),i("eiFr1",function(t,r){e(t.exports,"fetchTransferHandler",()=>a),// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
o("5MPpy");var n=o("64sdJ"),i=function(){return(i=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},s=function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(u){return function(a){if(r)throw TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(s=0)),s;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,n=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){s=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){s.label=a[1];break}if(6===a[0]&&s.label<o[1]){s.label=o[1],o=a;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(a);break}o[2]&&s.ops.pop(),s.trys.pop();continue}a=t.call(e,s)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},a=function(e,t){var r,o,a,u,c=e.url,f=e.method,h=e.headers,l=e.body,d=t.abortSignal;return r=void 0,o=void 0,a=void 0,u=function(){var e,t,r,o,a,u,p;return s(this,function(s){switch(s.label){case 0:return s.trys.push([0,2,,3]),[4/*yield*/,fetch(c,{method:f,headers:h,body:["HEAD","GET","DELETE"].includes(f.toUpperCase())?void 0:l,signal:d})];case 1:return e=s.sent(),[3/*break*/,3];case 2:// TODO: needs to revise error handling in v6
// For now this is a thin wrapper over original fetch error similar to cognito-identity-js package.
// Ref: https://github.com/aws-amplify/amplify-js/blob/4fbc8c0a2be7526aab723579b4c95b552195a80b/packages/amazon-cognito-identity-js/src/Client.js#L103-L108
if((t=s.sent())instanceof TypeError)throw Error("Network error");throw t;case 3:return r={},null===(u=e.headers)||void 0===u||u.forEach(function(e,t){r[t.toLowerCase()]=e}),o={statusCode:e.status,headers:r,body:null},a=Object.assign(null!==(p=e.body)&&void 0!==p?p:{},{text:(0,n.withMemoization)(function(){return e.text()}),blob:(0,n.withMemoization)(function(){return e.blob()}),json:(0,n.withMemoization)(function(){return e.json()})}),[2/*return*/,i(i({},o),{body:a})]}})},new(a||(a=Promise))(function(e,t){function n(e){try{s(u.next(e))}catch(e){t(e)}}function i(e){try{s(u.throw(e))}catch(e){t(e)}}function s(t){var r;t.done?e(t.value):((r=t.value)instanceof a?r:new a(function(e){e(r)})).then(n,i)}s((u=u.apply(r,o||[])).next())})}}),i("5MPpy",function(e,t){e.exports=self.fetch||(self.fetch=o("laOt8").default||o("laOt8"))}),i("laOt8",function(t,r){function n(e,t){return t=t||{},new Promise(function(r,n){var o=new XMLHttpRequest,i=[],s=[],a={},u=function(){return{ok:2==(o.status/100|0),statusText:o.statusText,status:o.status,url:o.responseURL,text:function(){return Promise.resolve(o.responseText)},json:function(){return Promise.resolve(o.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([o.response]))},clone:u,headers:{keys:function(){return i},entries:function(){return s},get:function(e){return a[e.toLowerCase()]},has:function(e){return e.toLowerCase() in a}}}};for(var c in o.open(t.method||"get",e,!0),o.onload=function(){o.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(e,t,r){i.push(t=t.toLowerCase()),s.push([t,r]),a[t]=a[t]?a[t]+","+r:r}),r(u())},o.onerror=n,o.withCredentials="include"==t.credentials,t.headers)o.setRequestHeader(c,t.headers[c]);o.send(t.body||null)})}Object.defineProperty(t.exports,"__esModule",{value:!0,configurable:!0}),e(t.exports,"default",()=>n)}),i("64sdJ",function(t,r){e(t.exports,"withMemoization",()=>n);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Cache the payload of a response body. It allows multiple calls to the body,
 * for example, when reading the body in both retry decider and error deserializer.
 * Caching body is allowed here because we call the body accessor(blob(), json(),
 * etc.) when body is small or streaming implementation is not available(RN).
 *
 * @internal
 */var n=function(e){var t;return function(){return t||// introduce a possible race in the event that this wrapper is called
// again before the first `payloadAccessor` call resolves.
(t=e()),t}}}),i("90ga5",function(t,r){e(t.exports,"getRetryDecider",()=>s);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("irpi8"),i=function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(u){return function(a){if(r)throw TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(s=0)),s;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,n=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){s=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){s.label=a[1];break}if(6===a[0]&&s.label<o[1]){s.label=o[1],o=a;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(a);break}o[2]&&s.ops.pop(),s.trys.pop();continue}a=t.call(e,s)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},s=function(e){return function(t,r){var o,s,a,u;return o=void 0,s=void 0,a=void 0,u=function(){var o,s,a,u;return i(this,function(i){switch(i.label){case 0:if(!(null!=r))return[3/*break*/,1];return s=r,[3/*break*/,3];case 1:return[4/*yield*/,e(t)];case 2:s=i.sent(),i.label=3;case 3:return o=(null!==(u=s)&&void 0!==u?u:{}).name,a=null==t?void 0:t.statusCode,[2/*return*/,f(r)||c(a,o)||(0,n.isClockSkewError)(o)||h(a,o)]}})},new(a||(a=Promise))(function(e,t){function r(e){try{i(u.next(e))}catch(e){t(e)}}function n(e){try{i(u.throw(e))}catch(e){t(e)}}function i(t){var o;t.done?e(t.value):((o=t.value)instanceof a?o:new a(function(e){e(o)})).then(r,n)}i((u=u.apply(o,s||[])).next())})}},a=["BandwidthLimitExceeded","EC2ThrottledException","LimitExceededException","PriorRequestNotComplete","ProvisionedThroughputExceededException","RequestLimitExceeded","RequestThrottled","RequestThrottledException","SlowDown","ThrottledException","Throttling","ThrottlingException","TooManyRequestsException"],u=["TimeoutError","RequestTimeout","RequestTimeoutException"],c=function(e,t){return 429===e||a.includes(t)},f=function(e){return(null==e?void 0:e.name)==="Network error"},h=function(e,t){return[500,502,503,504].includes(e)||u.includes(t)}}),i("irpi8",function(t,r){e(t.exports,"isClockSkewError",()=>o);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// via https://github.com/aws/aws-sdk-js-v3/blob/ab0e7be36e7e7f8a0c04834357aaad643c7912c3/packages/service-error-classification/src/constants.ts#L8
var n=["AuthFailure","InvalidSignatureException","RequestExpired","RequestInTheFuture","RequestTimeTooSkewed","SignatureDoesNotMatch","BadRequestException"],o=function(e){return n.includes(e)}}),i("50U3U",function(t,r){e(t.exports,"jitteredBackoff",()=>i);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// TODO: [v6] The separate retry utility is used by Data packages now and will replaced by retry middleware.
var n=o("kTTyh"),i=function(e){var t=(0,n.jitteredBackoff)(3e5)(e);// The delayFunction returns false when the delay is greater than the max delay(5 mins).
// In this case, the retry middleware will delay 5 mins instead, as a ceiling of the delay.
return!1===t?3e5:t}}),i("4WPy7",function(t,r){e(t.exports,"composeServiceApi",()=>i);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(u){return function(a){if(r)throw TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(s=0)),s;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,n=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){s=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){s.label=a[1];break}if(6===a[0]&&s.label<o[1]){s.label=o[1],o=a;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(a);break}o[2]&&s.ops.pop(),s.trys.pop();continue}a=t.call(e,s)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},i=function(e,t,r,i){return function(s,a){var u,c,f,h;return u=void 0,c=void 0,f=void 0,h=function(){var u;return o(this,function(o){switch(o.label){case 0:return[4/*yield*/,(u=n(n({},i),s)).endpointResolver(u,a)];case 1:return[4/*yield*/,t(a,o.sent())];case 2:return[4/*yield*/,e(o.sent(),n({},u))];case 3:return[4/*yield*/,r(o.sent())];case 4:return[2/*return*/,o.sent()]}})},new(f||(f=Promise))(function(e,t){function r(e){try{o(h.next(e))}catch(e){t(e)}}function n(e){try{o(h.throw(e))}catch(e){t(e)}}function o(t){var o;t.done?e(t.value):((o=t.value)instanceof f?o:new f(function(e){e(o)})).then(r,n)}o((h=h.apply(u,c||[])).next())})}}}),i("iWy3K",function(t,r){e(t.exports,"getId",()=>c);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("btENS"),i=o("eNnCE"),s=o("8PRMo"),a=o("4WPy7"),u=function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(u){return function(a){if(r)throw TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(s=0)),s;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,n=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){s=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){s.label=a[1];break}if(6===a[0]&&s.label<o[1]){s.label=o[1],o=a;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(a);break}o[2]&&s.ops.pop(),s.trys.pop();continue}a=t.call(e,s)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},c=(0,a.composeServiceApi)(n.cognitoIdentityTransferHandler,function(e,t){var r=(0,n.getSharedHeaders)("GetId"),o=JSON.stringify(e);return(0,n.buildHttpRpcRequest)(t,r,o)},function(e){var t,r,n,o;return t=void 0,r=void 0,n=void 0,o=function(){return u(this,function(t){switch(t.label){case 0:if(!(e.statusCode>=300))return[3/*break*/,2];return[4/*yield*/,(0,i.parseJsonError)(e)];case 1:throw t.sent();case 2:return[4/*yield*/,(0,i.parseJsonBody)(e)];case 3:return[2/*return*/,{IdentityId:t.sent().IdentityId,$metadata:(0,s.parseMetadata)(e)}]}})},new(n||(n=Promise))(function(e,i){function s(e){try{u(o.next(e))}catch(e){i(e)}}function a(e){try{u(o.throw(e))}catch(e){i(e)}}function u(t){var r;t.done?e(t.value):((r=t.value)instanceof n?r:new n(function(e){e(r)})).then(s,a)}u((o=o.apply(t,r||[])).next())})},n.defaultConfig)}),i("8Z1UO",function(t,r){e(t.exports,"UniversalStorage",()=>u);var n=o("d3wsF"),i=o("3v7X7"),s=function(){return(s=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},a=(0,i.browserOrNode)().isBrowser,u=/** @class */function(){function e(e){void 0===e&&(e={}),this.cookies=new n.default,this.store=a?window.localStorage:Object.create(null),this.cookies=e.req?new n.default(decodeURIComponent(e.req.headers.cookie)):new n.default,Object.assign(this.store,this.cookies.getAll())}return Object.defineProperty(e.prototype,"length",{get:function(){return Object.entries(this.store).length},enumerable:!1,configurable:!0}),e.prototype.clear=function(){var e=this;Array.from(Array(this.length)).map(function(t,r){return e.key(r)}).forEach(function(t){return e.removeItem(t)})},e.prototype.getItem=function(e){return this.getLocalItem(e)},e.prototype.getLocalItem=function(e){return Object.prototype.hasOwnProperty.call(this.store,e)?this.store[e]:null},e.prototype.getUniversalItem=function(e){return this.cookies.get(e)},e.prototype.key=function(e){return Object.keys(this.store)[e]},e.prototype.removeItem=function(e){this.removeLocalItem(e),this.removeUniversalItem(e)},e.prototype.removeLocalItem=function(e){delete this.store[e]},e.prototype.removeUniversalItem=function(e){this.cookies.remove(e,{path:"/"})},e.prototype.setItem=function(e,t){this.setLocalItem(e,t);// keys take the shape:
//  1. `${ProviderPrefix}.${userPoolClientId}.${username}.${tokenType}
//  2. `${ProviderPrefix}.${userPoolClientId}.LastAuthUser
var r=e.split(".").pop();["LastAuthUser","accessToken",// refreshToken originates on the client, but SSR pages won't fail when this expires
// Note: the new `accessToken` will also be refreshed on the client (since Amplify doesn't set server-side cookies)
"refreshToken",// Required for CognitoUserSession
"idToken"].includes(null!=r?r:"")&&this.setUniversalItem(e,t,{expires:new Date(Date.now()+31536e6)})},e.prototype.setLocalItem=function(e,t){this.store[e]=t},e.prototype.setUniversalItem=function(e,t,r){void 0===r&&(r={}),this.cookies.set(e,t,s(s({},r),{path:"/",// `httpOnly` cannot be set via JavaScript: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#JavaScript_access_using_Document.cookie
sameSite:!0,// Allow unsecure requests to http://localhost:3000/ when in development.
secure:!a||"localhost"!==window.location.hostname}))},e}()}),i("d3wsF",function(t,r){e(t.exports,"default",()=>n);var n=o("1PRjB").default}),i("1PRjB",function(t,r){e(t.exports,"default",()=>a);var n=o("9tk2H"),i=o("lNRp7"),s=function(){return(s=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},a=/** @class */function(){function e(e,t){var r=this;this.changeListeners=[],this.HAS_DOCUMENT_COOKIE=!1,this.cookies=(0,i.parseCookies)(e,t),new Promise(function(){r.HAS_DOCUMENT_COOKIE=(0,i.hasDocumentCookie)()}).catch(function(){})}return e.prototype._updateBrowserValues=function(e){this.HAS_DOCUMENT_COOKIE&&(this.cookies=n.parse(document.cookie,e))},e.prototype._emitChange=function(e){for(var t=0;t<this.changeListeners.length;++t)this.changeListeners[t](e)},e.prototype.get=function(e,t,r){return void 0===t&&(t={}),this._updateBrowserValues(r),(0,i.readCookie)(this.cookies[e],t)},e.prototype.getAll=function(e,t){void 0===e&&(e={}),this._updateBrowserValues(t);var r={};for(var n in this.cookies)r[n]=(0,i.readCookie)(this.cookies[n],e);return r},e.prototype.set=function(e,t,r){var o;"object"==typeof t&&(t=JSON.stringify(t)),this.cookies=s(s({},this.cookies),((o={})[e]=t,o)),this.HAS_DOCUMENT_COOKIE&&(document.cookie=n.serialize(e,t,r)),this._emitChange({name:e,value:t,options:r})},e.prototype.remove=function(e,t){var r=t=s(s({},t),{expires:new Date(1970,1,1,0,0,1),maxAge:0});this.cookies=s({},this.cookies),delete this.cookies[e],this.HAS_DOCUMENT_COOKIE&&(document.cookie=n.serialize(e,"",r)),this._emitChange({name:e,value:void 0,options:t})},e.prototype.addChangeListener=function(e){this.changeListeners.push(e)},e.prototype.removeChangeListener=function(e){var t=this.changeListeners.indexOf(e);t>=0&&this.changeListeners.splice(t,1)},e}()}),i("9tk2H",function(t,r){e(t.exports,"parse",()=>n,e=>n=e),e(t.exports,"serialize",()=>o,e=>o=e),n=/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */function(e,t){if("string"!=typeof e)throw TypeError("argument str must be a string");for(var r={},n=e.split(";"),o=(t||{}).decode||i,s=0;s<n.length;s++){var a=n[s],u=a.indexOf("=");// skip things that don't look like key=value
if(!(u<0)){var c=a.substring(0,u).trim();// only assign once
if(void 0==r[c]){var f=a.substring(u+1,a.length).trim();'"'===f[0]&&(f=f.slice(1,-1)),r[c]=/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */function(e,t){try{return t(e)}catch(t){return e}}(f,o)}}}return r},o=/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */function(e,t,r){var n=r||{},o=n.encode||s;if("function"!=typeof o)throw TypeError("option encode is invalid");if(!a.test(e))throw TypeError("argument name is invalid");var i=o(t);if(i&&!a.test(i))throw TypeError("argument val is invalid");var u=e+"="+i;if(null!=n.maxAge){var c=n.maxAge-0;if(isNaN(c)||!isFinite(c))throw TypeError("option maxAge is invalid");u+="; Max-Age="+Math.floor(c)}if(n.domain){if(!a.test(n.domain))throw TypeError("option domain is invalid");u+="; Domain="+n.domain}if(n.path){if(!a.test(n.path))throw TypeError("option path is invalid");u+="; Path="+n.path}if(n.expires){if("function"!=typeof n.expires.toUTCString)throw TypeError("option expires is invalid");u+="; Expires="+n.expires.toUTCString()}if(n.httpOnly&&(u+="; HttpOnly"),n.secure&&(u+="; Secure"),n.sameSite)switch("string"==typeof n.sameSite?n.sameSite.toLowerCase():n.sameSite){case!0:case"strict":u+="; SameSite=Strict";break;case"lax":u+="; SameSite=Lax";break;case"none":u+="; SameSite=None";break;default:throw TypeError("option sameSite is invalid")}return u};/**
 * Module variables.
 * @private
 */var n,o,i=decodeURIComponent,s=encodeURIComponent,a=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/}),i("lNRp7",function(t,r){e(t.exports,"hasDocumentCookie",()=>i),e(t.exports,"parseCookies",()=>s),e(t.exports,"readCookie",()=>a);var n=o("9tk2H");function i(){// Can we get/set cookies on document.cookie?
return"object"==typeof document&&"string"==typeof document.cookie}function s(e,t){return"string"==typeof e?n.parse(e,t):"object"==typeof e&&null!==e?e:{}}function a(e,t){void 0===t&&(t={});var r,n=// express prepend j: before serializing a cookie
e&&"j"===e[0]&&":"===e[1]?e.substr(2):e;if(void 0===(r=t.doNotParse)&&(r=!n||"{"!==n[0]&&"["!==n[0]&&'"'!==n[0]),!r)try{return JSON.parse(n)}catch(e){// At least we tried
}// Ignore clean value if we failed the deserialization
// It is not relevant anymore to trim those values
return e}}),i("9LMg3",function(t,r){e(t.exports,"USER_AGENT_HEADER",()=>n),"undefined"!=typeof Symbol&&"function"==typeof Symbol.for&&Symbol.for("INTERNAL_AWS_APPSYNC_REALTIME_PUBSUB_PROVIDER");var n="x-amz-user-agent"}),i("7trhX",function(t,r){// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function n(e){return e.split("").map(function(e){return e.charCodeAt(0).toString(16).padStart(2,"0")}).join("")}function o(e){return e.match(/.{2}/g).map(function(e){return String.fromCharCode(parseInt(e,16))}).join("")}e(t.exports,"urlSafeEncode",()=>n),e(t.exports,"urlSafeDecode",()=>o)}),i("keEwO",function(t,r){e(t.exports,"Auth",()=>o("hxg9E").Auth);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("hxg9E");o("Ym30y"),o("9UvTj"),o("i2gj0"),o("8ZOc6"),n.Auth}),i("hxg9E",function(t,r){e(t.exports,"Auth",()=>D);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("dfmKz"),i=o("it4KL");o("2gd5Q");var s=o("3NGR1"),a=o("4FrD6"),u=o("3v7X7"),c=o("2ZPeH"),f=o("j70Ma"),h=o("2hp02"),l=o("kFSgg"),d=o("auTMV"),p=o("8Z1UO"),g=o("7trhX");o("Ym30y");var y=o("i2gj0"),v=o("foBd2"),m=o("4PRoF"),b=o("5zoIb"),w=o("bbF2X"),S=o("cfFz4"),_=o("gXTS7"),A=o("bcFEY"),E=o("9UvTj");o("jz85N");var I=o("8ZOc6"),C=o("biuEp"),U=o("l5usX"),T=o("6QCVu"),P=o("iMgsf"),i=o("it4KL"),x=new c.ConsoleLogger("AuthClass"),k="aws.cognito.signin.user.admin",R="undefined"!=typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("amplify_default"):"@@amplify_default",O=function(e,t,r){(0,h.Hub).dispatch("auth",{event:e,data:t,message:r},"Auth",R)},D=new/** @class */(function(){/**
     * Initialize Auth with AWS configurations
     * @param {Object} config - Configuration of the Auth
     */function e(e){var t=this;this.userPool=null,this.user=null,this.oAuthFlowInProgress=!1,this.autoSignInInitiated=!1,this.inflightSessionPromise=null,this.inflightSessionPromiseCounter=0,this.Credentials=f.Credentials,this.wrapRefreshSessionCallback=function(e){return function(t,r){return r?O("tokenRefresh",void 0,"New token retrieved"):O("tokenRefresh_failure",t,"Failed to retrieve new token"),e(t,r)}},this.configure(e),this.currentCredentials=this.currentCredentials.bind(this),this.currentUserCredentials=this.currentUserCredentials.bind(this),(0,h.Hub).listen("auth",function(e){switch(e.payload.event){case"verify":case"signIn":t._storage.setItem("amplify-signin-with-hostedUI","false");break;case"signOut":t._storage.removeItem("amplify-signin-with-hostedUI");break;case"cognitoHostedUI":t._storage.setItem("amplify-signin-with-hostedUI","true")}}),(0,I.addAuthCategoryToCognitoUserAgent)(),(0,I.addFrameworkToCognitoUserAgent)(s.Platform.framework),(0,s.Platform).observeFrameworkChanges(function(){(0,I.addFrameworkToCognitoUserAgent)(s.Platform.framework)})}return e.prototype.getModuleName=function(){return"Auth"},e.prototype.configure=function(e){var t=this;if(!e)return this._config||{};x.debug("configure Auth");var r=Object.assign({},this._config,(0,l.parseAWSExports)(e).Auth,e);this._config=r;var n=this._config,o=n.userPoolId,s=n.userPoolWebClientId,a=n.cookieStorage,u=n.oauth,c=n.region,f=n.identityPoolId,h=n.mandatorySignIn,g=n.refreshHandlers,m=n.identityPoolRegion,b=n.clientMetadata,w=n.endpoint,S=n.storage;if(S){if(!this._isValidAuthStorage(S))throw x.error("The storage in the Auth config is not valid!"),Error("Empty storage object");this._storage=S}else // backward compatability
a?this._storage=new y.default(a):this._storage=e.ssr?new p.UniversalStorage:new(0,d.StorageHelper)().getStorage();if(this._storageSync=Promise.resolve(),"function"==typeof this._storage.sync&&(this._storageSync=this._storage.sync()),o){var _={UserPoolId:o,ClientId:s,endpoint:w};_.Storage=this._storage,this.userPool=new v.default(_,this.wrapRefreshSessionCallback)}this.Credentials.configure({mandatorySignIn:h,region:c,userPoolId:o,identityPoolId:f,refreshHandlers:g,storage:this._storage,identityPoolRegion:m});// initialize cognitoauth client if hosted ui options provided
// to keep backward compatibility:
var A=u?(0,i.isCognitoHostedOpts)(this._config.oauth)?u:u.awsCognito:void 0;if(A){var E=Object.assign({cognitoClientId:s,UserPoolId:o,domain:A.domain,scopes:A.scope,redirectSignIn:A.redirectSignIn,redirectSignOut:A.redirectSignOut,responseType:A.responseType,Storage:this._storage,urlOpener:A.urlOpener,clientMetadata:b},A.options);this._oAuthHandler=new U.default({scopes:E.scopes,config:E,cognitoClientId:E.cognitoClientId});// **NOTE** - Remove this in a future major release as it is a breaking change
// Prevents _handleAuthResponse from being called multiple times in Expo
// See https://github.com/aws-amplify/amplify-js/issues/4388
var I={};(0,T.default)(function(e){var r=e.url;I[r]||(I[r]=!0,t._handleAuthResponse(r))})}return O("configured",null,"The Auth category has been configured successfully"),this.autoSignInInitiated||"function"!=typeof this._storage.getItem||(this.isTrueStorageValue("amplify-polling-started")&&(O("autoSignIn_failure",null,i.AuthErrorTypes.AutoSignInError),this._storage.removeItem("amplify-auto-sign-in")),this._storage.removeItem("amplify-polling-started")),this._config},/**
     * Sign up with username, password and other attributes like phone, email
     * @param {String | object} params - The user attributes used for signin
     * @param {String[]} restOfAttrs - for the backward compatability
     * @return - A promise resolves callback data if success
     */e.prototype.signUp=function(e){for(var t,r,n,o,s=this,a=[],u=1;u<arguments.length;u++)a[u-1]=arguments[u];if(!this.userPool)return this.rejectNoUserPool();var c=null,f=null,h=[],l=null,d={enabled:!1},p={},g={};if(e&&"string"==typeof e){c=e,f=a?a[0]:null;var y=a?a[1]:null,v=a?a[2]:null;y&&h.push(new m.default({Name:"email",Value:y})),v&&h.push(new m.default({Name:"phone_number",Value:v}))}else{if(!e||"object"!=typeof e)return this.rejectAuthError(i.AuthErrorTypes.SignUpError);c=e.username,f=e.password,e&&e.clientMetadata?o=e.clientMetadata:this._config.clientMetadata&&(o=this._config.clientMetadata);var b=e.attributes;b&&Object.keys(b).map(function(e){h.push(new m.default({Name:e,Value:b[e]}))});var w=e.validationData;w&&(l=[],Object.keys(w).map(function(e){l.push(new m.default({Name:e,Value:w[e]}))})),(d=null!==(t=e.autoSignIn)&&void 0!==t?t:{enabled:!1}).enabled&&(this._storage.setItem("amplify-auto-sign-in","true"),p=null!==(r=d.validationData)&&void 0!==r?r:{},g=null!==(n=d.clientMetaData)&&void 0!==n?n:{})}return c?f?(x.debug("signUp attrs:",h),x.debug("signUp validation data:",l),new Promise(function(e,t){s.userPool.signUp(c,f,h,l,function(r,n){r?(O("signUp_failure",r,c+" failed to signup"),t(r)):(O("signUp",n,c+" has signed up successfully"),d.enabled&&s.handleAutoSignIn(c,f,p,g,n),e(n))},o)})):this.rejectAuthError(i.AuthErrorTypes.EmptyPassword):this.rejectAuthError(i.AuthErrorTypes.EmptyUsername)},e.prototype.handleAutoSignIn=function(e,t,r,n,o){this.autoSignInInitiated=!0;var i=new b.default({Username:e,Password:t,ValidationData:r,ClientMetadata:n});o.userConfirmed?this.signInAfterUserConfirmed(i):"link"===this._config.signUpVerificationMethod?this.handleLinkAutoSignIn(i):this.handleCodeAutoSignIn(i)},e.prototype.handleCodeAutoSignIn=function(e){var t=this,r=function(n){"confirmSignUp"===n.payload.event&&t.signInAfterUserConfirmed(e,r)};(0,h.Hub).listen("auth",r)},e.prototype.handleLinkAutoSignIn=function(e){var t=this;this._storage.setItem("amplify-polling-started","true");var r=Date.now(),n=setInterval(function(){Date.now()-r>18e4?(clearInterval(n),O("autoSignIn_failure",null,"Please confirm your account and use your credentials to sign in."),t._storage.removeItem("amplify-auto-sign-in")):t.signInAfterUserConfirmed(e,null,n)},5e3)},e.prototype.signInAfterUserConfirmed=function(e,t,r){return(0,n.__awaiter)(this,void 0,void 0,function(){var o,i,s=this;return(0,n.__generator)(this,function(n){switch(n.label){case 0:o=this.createCognitoUser(e.getUsername()),n.label=1;case 1:return n.trys.push([1,3,,4]),[4/*yield*/,o.authenticateUser(e,this.authCallbacks(o,function(n){O("autoSignIn",n,e.getUsername()+" has signed in successfully"),t&&(0,h.Hub).remove("auth",t),r&&(clearInterval(r),s._storage.removeItem("amplify-polling-started")),s._storage.removeItem("amplify-auto-sign-in")},function(e){x.error(e),s._storage.removeItem("amplify-auto-sign-in")}))];case 2:return n.sent(),[3/*break*/,4];case 3:return i=n.sent(),x.error(i),[3/*break*/,4];case 4:return[2/*return*/]}})})},/**
     * Send the verification code to confirm sign up
     * @param {String} username - The username to be confirmed
     * @param {String} code - The verification code
     * @param {ConfirmSignUpOptions} options - other options for confirm signup
     * @return - A promise resolves callback data if success
     */e.prototype.confirmSignUp=function(e,t,r){var n,o=this;if(!this.userPool)return this.rejectNoUserPool();if(!e)return this.rejectAuthError(i.AuthErrorTypes.EmptyUsername);if(!t)return this.rejectAuthError(i.AuthErrorTypes.EmptyCode);var s=this.createCognitoUser(e),a=!r||"boolean"!=typeof r.forceAliasCreation||r.forceAliasCreation;return r&&r.clientMetadata?n=r.clientMetadata:this._config.clientMetadata&&(n=this._config.clientMetadata),new Promise(function(r,u){s.confirmRegistration(t,a,function(t,n){t?u(t):(O("confirmSignUp",n,e+" has been confirmed successfully"),o.isTrueStorageValue("amplify-auto-sign-in")&&!o.autoSignInInitiated&&(O("autoSignIn_failure",null,i.AuthErrorTypes.AutoSignInError),o._storage.removeItem("amplify-auto-sign-in")),r(n))},n)})},e.prototype.isTrueStorageValue=function(e){var t=this._storage.getItem(e);return!!t&&"true"===t},/**
     * Resend the verification code
     * @param {String} username - The username to be confirmed
     * @param {ClientMetadata} clientMetadata - Metadata to be passed to Cognito Lambda triggers
     * @return - A promise resolves code delivery details if successful
     */e.prototype.resendSignUp=function(e,t){if(void 0===t&&(t=this._config.clientMetadata),!this.userPool)return this.rejectNoUserPool();if(!e)return this.rejectAuthError(i.AuthErrorTypes.EmptyUsername);var r=this.createCognitoUser(e);return new Promise(function(e,n){r.resendConfirmationCode(function(t,r){t?n(t):e(r)},t)})},/**
     * Sign in
     * @param {String | SignInOpts} usernameOrSignInOpts - The username to be signed in or the sign in options
     * @param {String} pw - The password of the username
     * @param {ClientMetaData} clientMetadata - Client metadata for custom workflows
     * @return - A promise resolves the CognitoUser
     */e.prototype.signIn=function(e,t,r){if(void 0===r&&(r=this._config.clientMetadata),!this.userPool)return this.rejectNoUserPool();var n=null,o=null,s={};// for backward compatibility
if("string"==typeof e)n=e,o=t;else{if(!(0,i.isUsernamePasswordOpts)(e))return this.rejectAuthError(i.AuthErrorTypes.InvalidUsername);void 0!==t&&x.warn("The password should be defined under the first parameter object!"),n=e.username,o=e.password,s=e.validationData}if(!n)return this.rejectAuthError(i.AuthErrorTypes.EmptyUsername);var a=new b.default({Username:n,Password:o,ValidationData:s,ClientMetadata:r});return o?this.signInWithPassword(a):this.signInWithoutPassword(a)},/**
     * Return an object with the authentication callbacks
     * @param {CognitoUser} user - the cognito user object
     * @param {} resolve - function called when resolving the current step
     * @param {} reject - function called when rejecting the current step
     * @return - an object with the callback methods for user authentication
     */e.prototype.authCallbacks=function(e,t,r){var o=this,i=this;return{onSuccess:function(s){return(0,n.__awaiter)(o,void 0,void 0,function(){var o,a,u,c;return(0,n.__generator)(this,function(n){switch(n.label){case 0:x.debug(s),delete e.challengeName,delete e.challengeParam,n.label=1;case 1:return n.trys.push([1,4,5,9]),[4/*yield*/,this.Credentials.clear()];case 2:return n.sent(),[4/*yield*/,this.Credentials.set(s,"session")];case 3:return o=n.sent(),x.debug("succeed to get cognito credentials",o),[3/*break*/,9];case 4:return a=n.sent(),x.debug("cannot get cognito credentials",a),[3/*break*/,9];case 5:return n.trys.push([5,7,,8]),[4/*yield*/,this.currentUserPoolUser()];case 6:return u=n.sent(),i.user=u,O("signIn",u,"A user "+e.getUsername()+" has been signed in"),t(u),[3/*break*/,8];case 7:return c=n.sent(),x.error("Failed to get the signed in user",c),r(c),[3/*break*/,8];case 8:return[7/*endfinally*/];case 9:return[2/*return*/]}})})},onFailure:function(t){x.debug("signIn failure",t),O("signIn_failure",t,e.getUsername()+" failed to signin"),r(t)},customChallenge:function(r){x.debug("signIn custom challenge answer required"),e.challengeName="CUSTOM_CHALLENGE",e.challengeParam=r,t(e)},mfaRequired:function(r,n){x.debug("signIn MFA required"),e.challengeName=r,e.challengeParam=n,t(e)},mfaSetup:function(r,n){x.debug("signIn mfa setup",r),e.challengeName=r,e.challengeParam=n,t(e)},newPasswordRequired:function(r,n){x.debug("signIn new password"),e.challengeName="NEW_PASSWORD_REQUIRED",e.challengeParam={userAttributes:r,requiredAttributes:n},t(e)},totpRequired:function(r,n){x.debug("signIn totpRequired"),e.challengeName=r,e.challengeParam=n,t(e)},selectMFAType:function(r,n){x.debug("signIn selectMFAType",r),e.challengeName=r,e.challengeParam=n,t(e)}}},/**
     * Sign in with a password
     * @private
     * @param {AuthenticationDetails} authDetails - the user sign in data
     * @return - A promise resolves the CognitoUser object if success or mfa required
     */e.prototype.signInWithPassword=function(e){var t=this;if(this.pendingSignIn)throw Error("Pending sign-in attempt already in progress");var r=this.createCognitoUser(e.getUsername());return this.pendingSignIn=new Promise(function(n,o){r.authenticateUser(e,t.authCallbacks(r,function(e){t.pendingSignIn=null,n(e)},function(e){t.pendingSignIn=null,o(e)}))}),this.pendingSignIn},/**
     * Sign in without a password
     * @private
     * @param {AuthenticationDetails} authDetails - the user sign in data
     * @return - A promise resolves the CognitoUser object if success or mfa required
     */e.prototype.signInWithoutPassword=function(e){var t=this,r=this.createCognitoUser(e.getUsername());return r.setAuthenticationFlowType("CUSTOM_AUTH"),new Promise(function(n,o){r.initiateAuth(e,t.authCallbacks(r,n,o))})},/**
     * This was previously used by an authenticated user to get MFAOptions,
     * but no longer returns a meaningful response. Refer to the documentation for
     * how to setup and use MFA: https://docs.amplify.aws/lib/auth/mfa/q/platform/js
     * @deprecated
     * @param {CognitoUser} user - the current user
     * @return - A promise resolves the current preferred mfa option if success
     */e.prototype.getMFAOptions=function(e){return new Promise(function(t,r){e.getMFAOptions(function(e,n){if(e){x.debug("get MFA Options failed",e),r(e);return}x.debug("get MFA options success",n),t(n)})})},/**
     * get preferred mfa method
     * @param {CognitoUser} user - the current cognito user
     * @param {GetPreferredMFAOpts} params - options for getting the current user preferred MFA
     */e.prototype.getPreferredMFA=function(e,t){var r=this,o=this;return new Promise(function(i,s){var a=r._config.clientMetadata,u=!!t&&t.bypassCache;// TODO: verify behavior if this is override during signIn
e.getUserData(function(t,a){return(0,n.__awaiter)(r,void 0,void 0,function(){var r,u;return(0,n.__generator)(this,function(n){switch(n.label){case 0:if(!t)return[3/*break*/,5];if(x.debug("getting preferred mfa failed",t),!this.isSessionInvalid(t))return[3/*break*/,4];n.label=1;case 1:return n.trys.push([1,3,,4]),[4/*yield*/,this.cleanUpInvalidSession(e)];case 2:return n.sent(),[3/*break*/,4];case 3:return r=n.sent(),s(Error("Session is invalid due to: "+t.message+" and failed to clean up invalid session: "+r.message)),[2/*return*/];case 4:return s(t),[2/*return*/];case 5:if(!(u=o._getMfaTypeFromUserData(a)))return s("invalid MFA Type"),[2/*return*/];return i(u),[2/*return*/]}})})},{bypassCache:u,clientMetadata:a})})},e.prototype._getMfaTypeFromUserData=function(e){var t=null,r=e.PreferredMfaSetting;// if the user has used Auth.setPreferredMFA() to setup the mfa type
// then the "PreferredMfaSetting" would exist in the response
if(r)t=r;else{// if mfaList exists but empty, then its noMFA
var n=e.UserMFASettingList;n?0===n.length?t="NOMFA":x.debug("invalid case for getPreferredMFA",e):t=e.MFAOptions?"SMS_MFA":"NOMFA"}return t},e.prototype._getUserData=function(e,t){var r=this;return new Promise(function(o,i){e.getUserData(function(t,s){return(0,n.__awaiter)(r,void 0,void 0,function(){var r;return(0,n.__generator)(this,function(n){switch(n.label){case 0:if(!t)return[3/*break*/,5];if(x.debug("getting user data failed",t),!this.isSessionInvalid(t))return[3/*break*/,4];n.label=1;case 1:return n.trys.push([1,3,,4]),[4/*yield*/,this.cleanUpInvalidSession(e)];case 2:return n.sent(),[3/*break*/,4];case 3:return r=n.sent(),i(Error("Session is invalid due to: "+t.message+" and failed to clean up invalid session: "+r.message)),[2/*return*/];case 4:return i(t),[2/*return*/];case 5:o(s),n.label=6;case 6:return[2/*return*/]}})})},t)})},/**
     * set preferred MFA method
     * @param {CognitoUser} user - the current Cognito user
     * @param {string} mfaMethod - preferred mfa method
     * @return - A promise resolve if success
     */e.prototype.setPreferredMFA=function(e,t){return(0,n.__awaiter)(this,void 0,void 0,function(){var r,o,s,a,u,c,f=this;return(0,n.__generator)(this,function(h){switch(h.label){case 0:return r=this._config.clientMetadata,[4/*yield*/,this._getUserData(e,{bypassCache:!0,clientMetadata:r})];case 1:switch(o=h.sent(),s=null,a=null,t){case"TOTP":case"SOFTWARE_TOKEN_MFA":return[3/*break*/,2];case"SMS":case"SMS_MFA":return[3/*break*/,3];case"NOMFA":return[3/*break*/,4]}return[3/*break*/,6];case 2:return a={PreferredMfa:!0,Enabled:!0},[3/*break*/,7];case 3:return s={PreferredMfa:!0,Enabled:!0},[3/*break*/,7];case 4:return u=o.UserMFASettingList,[4/*yield*/,this._getMfaTypeFromUserData(o)];case 5:if("NOMFA"===(c=h.sent()))return[2/*return*/,Promise.resolve("No change for mfa type")];if("SMS_MFA"===c)s={PreferredMfa:!1,Enabled:!1};else{if("SOFTWARE_TOKEN_MFA"!==c)return[2/*return*/,this.rejectAuthError(i.AuthErrorTypes.InvalidMFA)];a={PreferredMfa:!1,Enabled:!1}}return u&&0!==u.length&&u.forEach(function(e){"SMS_MFA"===e?s={PreferredMfa:!1,Enabled:!1}:"SOFTWARE_TOKEN_MFA"===e&&(a={PreferredMfa:!1,Enabled:!1})}),[3/*break*/,7];case 6:return x.debug("no validmfa method provided"),[2/*return*/,this.rejectAuthError(i.AuthErrorTypes.NoMFA)];case 7:return[2/*return*/,new Promise(function(t,o){e.setUserMfaPreference(s,a,function(i,s){if(i)return x.debug("Set user mfa preference error",i),o(i);x.debug("Set user mfa success",s),x.debug("Caching the latest user data into local"),// cache the latest result into user data
e.getUserData(function(r,i){return(0,n.__awaiter)(f,void 0,void 0,function(){var i;return(0,n.__generator)(this,function(n){switch(n.label){case 0:if(!r)return[3/*break*/,5];if(x.debug("getting user data failed",r),!this.isSessionInvalid(r))return[3/*break*/,4];n.label=1;case 1:return n.trys.push([1,3,,4]),[4/*yield*/,this.cleanUpInvalidSession(e)];case 2:return n.sent(),[3/*break*/,4];case 3:return i=n.sent(),o(Error("Session is invalid due to: "+r.message+" and failed to clean up invalid session: "+i.message)),[2/*return*/];case 4:return[2/*return*/,o(r)];case 5:return[2/*return*/,t(s)]}})})},{bypassCache:!0,clientMetadata:r})})})]}})})},/**
     * disable SMS
     * @deprecated
     * @param {CognitoUser} user - the current user
     * @return - A promise resolves is success
     */e.prototype.disableSMS=function(e){return new Promise(function(t,r){e.disableMFA(function(e,n){if(e){x.debug("disable mfa failed",e),r(e);return}x.debug("disable mfa succeed",n),t(n)})})},/**
     * enable SMS
     * @deprecated
     * @param {CognitoUser} user - the current user
     * @return - A promise resolves is success
     */e.prototype.enableSMS=function(e){return new Promise(function(t,r){e.enableMFA(function(e,n){if(e){x.debug("enable mfa failed",e),r(e);return}x.debug("enable mfa succeed",n),t(n)})})},/**
     * Setup TOTP
     * @param {CognitoUser} user - the current user
     * @return - A promise resolves with the secret code if success
     */e.prototype.setupTOTP=function(e){return new Promise(function(t,r){e.associateSoftwareToken({onFailure:function(e){x.debug("associateSoftwareToken failed",e),r(e)},associateSecretCode:function(e){x.debug("associateSoftwareToken success",e),t(e)}})})},/**
     * verify TOTP setup
     * @param {CognitoUser} user - the current user
     * @param {string} challengeAnswer - challenge answer
     * @return - A promise resolves is success
     */e.prototype.verifyTotpToken=function(e,t){x.debug("verification totp token",e,t),e&&"function"==typeof e.getSignInUserSession&&(r=e.getSignInUserSession());var r,n=null==r?void 0:r.isValid();return new Promise(function(r,o){e.verifySoftwareToken(t,"My TOTP device",{onFailure:function(e){x.debug("verifyTotpToken failed",e),o(e)},onSuccess:function(t){n||O("signIn",e,"A user "+e.getUsername()+" has been signed in"),O("verify",e,"A user "+e.getUsername()+" has been verified"),x.debug("verifyTotpToken success",t),r(t)}})})},/**
     * Send MFA code to confirm sign in
     * @param {Object} user - The CognitoUser object
     * @param {String} code - The confirmation code
     */e.prototype.confirmSignIn=function(e,t,r,o){var s=this;if(void 0===o&&(o=this._config.clientMetadata),!t)return this.rejectAuthError(i.AuthErrorTypes.EmptyCode);var a=this;return new Promise(function(i,u){e.sendMFACode(t,{onSuccess:function(t){return(0,n.__awaiter)(s,void 0,void 0,function(){var r,o,s,u;return(0,n.__generator)(this,function(n){switch(n.label){case 0:x.debug(t),n.label=1;case 1:return n.trys.push([1,4,5,10]),[4/*yield*/,this.Credentials.clear()];case 2:return n.sent(),[4/*yield*/,this.Credentials.set(t,"session")];case 3:return r=n.sent(),x.debug("succeed to get cognito credentials",r),[3/*break*/,10];case 4:return o=n.sent(),x.debug("cannot get cognito credentials",o),[3/*break*/,10];case 5:a.user=e,n.label=6;case 6:return n.trys.push([6,8,,9]),[4/*yield*/,this.currentUserPoolUser()];case 7:return s=n.sent(),e.attributes=s.attributes,[3/*break*/,9];case 8:return u=n.sent(),x.debug("cannot get updated Cognito User",u),[3/*break*/,9];case 9:return O("signIn",e,"A user "+e.getUsername()+" has been signed in"),i(e),[7/*endfinally*/];case 10:return[2/*return*/]}})})},onFailure:function(e){x.debug("confirm signIn failure",e),u(e)}},r,o)})},e.prototype.completeNewPassword=function(e,t,r,o){var s=this;if(void 0===r&&(r={}),void 0===o&&(o=this._config.clientMetadata),!t)return this.rejectAuthError(i.AuthErrorTypes.EmptyPassword);var a=this;return new Promise(function(i,u){e.completeNewPasswordChallenge(t,r,{onSuccess:function(t){return(0,n.__awaiter)(s,void 0,void 0,function(){var r,o;return(0,n.__generator)(this,function(n){switch(n.label){case 0:x.debug(t),n.label=1;case 1:return n.trys.push([1,4,5,6]),[4/*yield*/,this.Credentials.clear()];case 2:return n.sent(),[4/*yield*/,this.Credentials.set(t,"session")];case 3:return r=n.sent(),x.debug("succeed to get cognito credentials",r),[3/*break*/,6];case 4:return o=n.sent(),x.debug("cannot get cognito credentials",o),[3/*break*/,6];case 5:return a.user=e,O("signIn",e,"A user "+e.getUsername()+" has been signed in"),i(e),[7/*endfinally*/];case 6:return[2/*return*/]}})})},onFailure:function(e){x.debug("completeNewPassword failure",e),O("completeNewPassword_failure",e,s.user+" failed to complete the new password flow"),u(e)},mfaRequired:function(t,r){x.debug("signIn MFA required"),e.challengeName=t,e.challengeParam=r,i(e)},mfaSetup:function(t,r){x.debug("signIn mfa setup",t),e.challengeName=t,e.challengeParam=r,i(e)},totpRequired:function(t,r){x.debug("signIn mfa setup",t),e.challengeName=t,e.challengeParam=r,i(e)}},o)})},/**
     * Send the answer to a custom challenge
     * @param {CognitoUser} user - The CognitoUser object
     * @param {String} challengeResponses - The confirmation code
     */e.prototype.sendCustomChallengeAnswer=function(e,t,r){var n=this;return(void 0===r&&(r=this._config.clientMetadata),this.userPool)?t?new Promise(function(o,i){e.sendCustomChallengeAnswer(t,n.authCallbacks(e,o,i),r)}):this.rejectAuthError(i.AuthErrorTypes.EmptyChallengeResponse):this.rejectNoUserPool()},/**
     * Delete an authenticated users' attributes
     * @param {CognitoUser} - The currently logged in user object
     * @return {Promise}
     **/e.prototype.deleteUserAttributes=function(e,t){var r=this;return new Promise(function(n,o){r.userSession(e).then(function(r){e.deleteAttributes(t,function(e,t){return e?o(e):n(t)})})})},/**
     * Delete the current authenticated user
     * @return {Promise}
     **/// TODO: Check return type void
e.prototype.deleteUser=function(){return(0,n.__awaiter)(this,void 0,void 0,function(){var e,t,r=this;return(0,n.__generator)(this,function(o){switch(o.label){case 0:return o.trys.push([0,2,,3]),[4/*yield*/,this._storageSync];case 1:return o.sent(),[3/*break*/,3];case 2:throw e=o.sent(),x.debug("Failed to sync cache info into memory",e),Error(e);case 3:return t=this._oAuthHandler&&"true"===this._storage.getItem("amplify-signin-with-hostedUI"),[2/*return*/,new Promise(function(e,o){return(0,n.__awaiter)(r,void 0,void 0,function(){var r,i=this;return(0,n.__generator)(this,function(s){if(this.userPool){if(!(r=this.userPool.getCurrentUser()))return x.debug("Failed to get user from user pool"),[2/*return*/,o(Error("No current user."))];r.getSession(function(s,a){return(0,n.__awaiter)(i,void 0,void 0,function(){var i,a=this;return(0,n.__generator)(this,function(n){switch(n.label){case 0:if(!s)return[3/*break*/,5];if(x.debug("Failed to get the user session",s),!this.isSessionInvalid(s))return[3/*break*/,4];n.label=1;case 1:return n.trys.push([1,3,,4]),[4/*yield*/,this.cleanUpInvalidSession(r)];case 2:return n.sent(),[3/*break*/,4];case 3:return i=n.sent(),o(Error("Session is invalid due to: "+s.message+" and failed to clean up invalid session: "+i.message)),[2/*return*/];case 4:return[2/*return*/,o(s)];case 5:r.deleteUser(function(n,i){if(n)o(n);else{O("userDeleted",i,"The authenticated user has been deleted."),r.signOut(),a.user=null;try{a.cleanCachedItems();// clean aws credentials
}catch(e){// TODO: change to rejects in refactor
x.debug("failed to clear cached items")}t?a.oAuthSignOutRedirect(e,o):(O("signOut",a.user,"A user has been signed out"),e(i))}}),n.label=6;case 6:return[2/*return*/]}})})})}else x.debug("no Congito User pool"),o(Error("Cognito User pool does not exist"));return[2/*return*/]})})})]}})})},/**
     * Update an authenticated users' attributes
     * @param {CognitoUser} - The currently logged in user object
     * @return {Promise}
     **/e.prototype.updateUserAttributes=function(e,t,r){var n=this;void 0===r&&(r=this._config.clientMetadata);var o=[],i=this;return new Promise(function(s,a){i.userSession(e).then(function(i){for(var u in t)if("sub"!==u&&0>u.indexOf("_verified")){var c={Name:u,Value:t[u]};o.push(c)}e.updateAttributes(o,function(e,r,o){return e?(O("updateUserAttributes_failure",e,"Failed to update attributes"),a(e)):(O("updateUserAttributes",n.createUpdateAttributesResultList(t,null==o?void 0:o.CodeDeliveryDetailsList),"Attributes successfully updated"),s(r))},r)})})},e.prototype.createUpdateAttributesResultList=function(e,t){var r={};return Object.keys(e).forEach(function(e){r[e]={isUpdated:!0};var n=null==t?void 0:t.find(function(t){return t.AttributeName===e});n&&(r[e].isUpdated=!1,r[e].codeDeliveryDetails=n)}),r},/**
     * Return user attributes
     * @param {Object} user - The CognitoUser object
     * @return - A promise resolves to user attributes if success
     */e.prototype.userAttributes=function(e){var t=this;return new Promise(function(r,n){t.userSession(e).then(function(t){e.getUserAttributes(function(e,t){e?n(e):r(t)})})})},e.prototype.verifiedContact=function(e){var t=this;return this.userAttributes(e).then(function(e){var r=t.attributesToObject(e),n={},o={};return r.email&&(r.email_verified?o.email=r.email:n.email=r.email),r.phone_number&&(r.phone_number_verified?o.phone_number=r.phone_number:n.phone_number=r.phone_number),{verified:o,unverified:n}})},e.prototype.isErrorWithMessage=function(e){return"object"==typeof e&&Object.prototype.hasOwnProperty.call(e,"message")},// Session revoked by another app
e.prototype.isTokenRevokedError=function(e){return this.isErrorWithMessage(e)&&"Access Token has been revoked"===e.message},e.prototype.isRefreshTokenRevokedError=function(e){return this.isErrorWithMessage(e)&&"Refresh Token has been revoked"===e.message},e.prototype.isUserDisabledError=function(e){return this.isErrorWithMessage(e)&&"User is disabled."===e.message},e.prototype.isUserDoesNotExistError=function(e){return this.isErrorWithMessage(e)&&"User does not exist."===e.message},e.prototype.isRefreshTokenExpiredError=function(e){return this.isErrorWithMessage(e)&&"Refresh Token has expired"===e.message},e.prototype.isPasswordResetRequiredError=function(e){return this.isErrorWithMessage(e)&&"Password reset required for the user"===e.message},e.prototype.isSignedInHostedUI=function(){return this._oAuthHandler&&"true"===this._storage.getItem("amplify-signin-with-hostedUI")},e.prototype.isSessionInvalid=function(e){return this.isUserDisabledError(e)||this.isUserDoesNotExistError(e)||this.isTokenRevokedError(e)||this.isRefreshTokenRevokedError(e)||this.isRefreshTokenExpiredError(e)||this.isPasswordResetRequiredError(e)},e.prototype.cleanUpInvalidSession=function(e){return(0,n.__awaiter)(this,void 0,void 0,function(){var t=this;return(0,n.__generator)(this,function(r){switch(r.label){case 0:e.signOut(),this.user=null,r.label=1;case 1:return r.trys.push([1,3,,4]),[4/*yield*/,this.cleanCachedItems()];case 2:return r.sent(),[3/*break*/,4];case 3:return r.sent(),x.debug("failed to clear cached items"),[3/*break*/,4];case 4:if(this.isSignedInHostedUI())return[2/*return*/,new Promise(function(e,r){t.oAuthSignOutRedirect(e,r)})];return O("signOut",this.user,"A user has been signed out"),[2/*return*/]}})})},/**
     * Get current authenticated user
     * @return - A promise resolves to current authenticated CognitoUser if success
     */e.prototype.currentUserPoolUser=function(e){var t=this;return this.userPool?new Promise(function(r,o){t._storageSync.then(function(){return(0,n.__awaiter)(t,void 0,void 0,function(){var t,i,s,a,u,c=this;return(0,n.__generator)(this,function(f){switch(f.label){case 0:if(!this.isOAuthInProgress())return[3/*break*/,2];return x.debug("OAuth signIn in progress, waiting for resolution..."),[4/*yield*/,new Promise(function(e){var t=setTimeout(function(){x.debug("OAuth signIn in progress timeout"),(0,h.Hub).remove("auth",r),e()},1e4);function r(n){var o=n.payload.event;("cognitoHostedUI"===o||"cognitoHostedUI_failure"===o)&&(x.debug("OAuth signIn resolved: "+o),clearTimeout(t),(0,h.Hub).remove("auth",r),e())}(0,h.Hub).listen("auth",r)})];case 1:f.sent(),f.label=2;case 2:if(!(t=this.userPool.getCurrentUser()))return x.debug("Failed to get user from user pool"),o("No current user"),[2/*return*/];f.label=3;case 3:return f.trys.push([3,7,,8]),[4/*yield*/,this._userSession(t)];case 4:if(i=f.sent(),!(s=!!e&&e.bypassCache))return[3/*break*/,6];return[4/*yield*/,this.Credentials.clear()];case 5:f.sent(),f.label=6;case 6:if(a=this._config.clientMetadata,!(void 0===(u=i.getAccessToken().decodePayload().scope)?"":u).split(" ").includes(k))return x.debug("Unable to get the user data because the "+k+" is not in the scopes of the access token"),[2/*return*/,r(t)];return t.getUserData(function(e,i){return(0,n.__awaiter)(c,void 0,void 0,function(){var s,a,u,c,f,h,l;return(0,n.__generator)(this,function(n){switch(n.label){case 0:if(!e)return[3/*break*/,7];if(x.debug("getting user data failed",e),!this.isSessionInvalid(e))return[3/*break*/,5];n.label=1;case 1:return n.trys.push([1,3,,4]),[4/*yield*/,this.cleanUpInvalidSession(t)];case 2:return n.sent(),[3/*break*/,4];case 3:return s=n.sent(),o(Error("Session is invalid due to: "+e.message+" and failed to clean up invalid session: "+s.message)),[2/*return*/];case 4:return o(e),[3/*break*/,6];case 5:r(t),n.label=6;case 6:return[2/*return*/];case 7:for(c=0,a=i.PreferredMfaSetting||"NOMFA",u=[];c<i.UserAttributes.length;c++)f={Name:i.UserAttributes[c].Name,Value:i.UserAttributes[c].Value},h=new m.default(f),u.push(h);return l=this.attributesToObject(u),Object.assign(t,{attributes:l,preferredMFA:a}),[2/*return*/,r(t)]}})})},{bypassCache:s,clientMetadata:a}),[3/*break*/,8];case 7:return o(f.sent()),[3/*break*/,8];case 8:return[2/*return*/]}})})}).catch(function(e){return x.debug("Failed to sync cache info into memory",e),o(e)})}):this.rejectNoUserPool()},e.prototype.isOAuthInProgress=function(){return this.oAuthFlowInProgress},/**
     * Get current authenticated user
     * @param {CurrentUserOpts} - options for getting the current user
     * @return - A promise resolves to current authenticated CognitoUser if success
     */e.prototype.currentAuthenticatedUser=function(e){return(0,n.__awaiter)(this,void 0,void 0,function(){var t,r,o,i,s;return(0,n.__generator)(this,function(a){switch(a.label){case 0:x.debug("getting current authenticated user"),t=null,a.label=1;case 1:return a.trys.push([1,3,,4]),[4/*yield*/,this._storageSync];case 2:return a.sent(),[3/*break*/,4];case 3:throw r=a.sent(),x.debug("Failed to sync cache info into memory",r),r;case 4:try{(o=JSON.parse(this._storage.getItem("aws-amplify-federatedInfo")))&&(t=(0,n.__assign)((0,n.__assign)({},o.user),{token:o.token}))}catch(e){x.debug("cannot load federated user from auth storage")}if(!t)return[3/*break*/,5];return this.user=t,x.debug("get current authenticated federated user",this.user),[2/*return*/,this.user];case 5:x.debug("get current authenticated userpool user"),i=null,a.label=6;case 6:return a.trys.push([6,8,,9]),[4/*yield*/,this.currentUserPoolUser(e)];case 7:return i=a.sent(),[3/*break*/,9];case 8:return"No userPool"===(s=a.sent())&&x.error("Cannot get the current user because the user pool is missing. Please make sure the Auth module is configured with a valid Cognito User Pool ID"),x.debug("The user is not authenticated by the error",s),[2/*return*/,Promise.reject("The user is not authenticated")];case 9:return this.user=i,[2/*return*/,this.user]}})})},/**
     * Get current user's session
     * @return - A promise resolves to session object if success
     */e.prototype.currentSession=function(){var e=this;return(// Purposely not calling the reject method here because we don't need a console error
(x.debug("Getting current session"),this.userPool)?new Promise(function(t,r){e.currentUserPoolUser().then(function(n){e.userSession(n).then(function(e){t(e)}).catch(function(e){x.debug("Failed to get the current session",e),r(e)})}).catch(function(e){x.debug("Failed to get the current user",e),r(e)})}):Promise.reject(Error("No User Pool in the configuration.")))},e.prototype._userSession=function(e){return(0,n.__awaiter)(this,void 0,void 0,function(){var t,r,o=this;return(0,n.__generator)(this,function(s){switch(s.label){case 0:if(!e)return x.debug("the user is null"),[2/*return*/,this.rejectAuthError(i.AuthErrorTypes.NoUserSession)];t=this._config.clientMetadata,0===this.inflightSessionPromiseCounter&&(this.inflightSessionPromise=new Promise(function(r,i){e.getSession(function(t,s){return(0,n.__awaiter)(o,void 0,void 0,function(){var o;return(0,n.__generator)(this,function(n){switch(n.label){case 0:if(!t)return[3/*break*/,5];if(x.debug("Failed to get the session from user",e),!this.isSessionInvalid(t))return[3/*break*/,4];n.label=1;case 1:return n.trys.push([1,3,,4]),[4/*yield*/,this.cleanUpInvalidSession(e)];case 2:return n.sent(),[3/*break*/,4];case 3:return o=n.sent(),i(Error("Session is invalid due to: "+t.message+" and failed to clean up invalid session: "+o.message)),[2/*return*/];case 4:return i(t),[2/*return*/];case 5:return x.debug("Succeed to get the user session",s),r(s),[2/*return*/]}})})},{clientMetadata:t})})),this.inflightSessionPromiseCounter++,s.label=1;case 1:return s.trys.push([1,,3,4]),[4/*yield*/,this.inflightSessionPromise];case 2:return r=s.sent(),// Set private member. Avoid user.setSignInUserSession() to prevent excessive localstorage refresh.
// @ts-ignore
e.signInUserSession=r,[2/*return*/,r];case 3:return this.inflightSessionPromiseCounter--,[7/*endfinally*/];case 4:return[2/*return*/]}})})},/**
     * Get the corresponding user session
     * @param {Object} user - The CognitoUser object
     * @return - A promise resolves to the session
     */e.prototype.userSession=function(e){return this._userSession(e)},/**
     * Get authenticated credentials of current user.
     * @return - A promise resolves to be current user's credentials
     */e.prototype.currentUserCredentials=function(){return(0,n.__awaiter)(this,void 0,void 0,function(){var e,t,r=this;return(0,n.__generator)(this,function(n){switch(n.label){case 0:x.debug("Getting current user credentials"),n.label=1;case 1:return n.trys.push([1,3,,4]),[4/*yield*/,this._storageSync];case 2:return n.sent(),[3/*break*/,4];case 3:throw e=n.sent(),x.debug("Failed to sync cache info into memory",e),e;case 4:t=null;try{t=JSON.parse(this._storage.getItem("aws-amplify-federatedInfo"))}catch(e){x.debug("failed to get or parse item aws-amplify-federatedInfo",e)}if(t)return[2/*return*/,this.Credentials.refreshFederatedToken(t)];return[2/*return*/,this.currentSession().then(function(e){return x.debug("getting session success",e),r.Credentials.set(e,"session")}).catch(function(){return x.debug("getting guest credentials"),r.Credentials.set(null,"guest")})]}})})},e.prototype.currentCredentials=function(){return x.debug("getting current credentials"),this.Credentials.get()},/**
     * Initiate an attribute confirmation request
     * @param {Object} user - The CognitoUser
     * @param {Object} attr - The attributes to be verified
     * @return - A promise resolves to callback data if success
     */e.prototype.verifyUserAttribute=function(e,t,r){return void 0===r&&(r=this._config.clientMetadata),new Promise(function(n,o){e.getAttributeVerificationCode(t,{onSuccess:function(e){return n(e)},onFailure:function(e){return o(e)}},r)})},/**
     * Confirm an attribute using a confirmation code
     * @param {Object} user - The CognitoUser
     * @param {Object} attr - The attribute to be verified
     * @param {String} code - The confirmation code
     * @return - A promise resolves to callback data if success
     */e.prototype.verifyUserAttributeSubmit=function(e,t,r){return r?new Promise(function(n,o){e.verifyAttribute(t,r,{onSuccess:function(e){n(e)},onFailure:function(e){o(e)}})}):this.rejectAuthError(i.AuthErrorTypes.EmptyCode)},e.prototype.verifyCurrentUserAttribute=function(e){var t=this;return t.currentUserPoolUser().then(function(r){return t.verifyUserAttribute(r,e)})},/**
     * Confirm current user's attribute using a confirmation code
     * @param {Object} attr - The attribute to be verified
     * @param {String} code - The confirmation code
     * @return - A promise resolves to callback data if success
     */e.prototype.verifyCurrentUserAttributeSubmit=function(e,t){var r=this;return r.currentUserPoolUser().then(function(n){return r.verifyUserAttributeSubmit(n,e,t)})},e.prototype.cognitoIdentitySignOut=function(e,t){return(0,n.__awaiter)(this,void 0,void 0,function(){var r,o,i=this;return(0,n.__generator)(this,function(s){switch(s.label){case 0:return s.trys.push([0,2,,3]),[4/*yield*/,this._storageSync];case 1:return s.sent(),[3/*break*/,3];case 2:throw r=s.sent(),x.debug("Failed to sync cache info into memory",r),r;case 3:return o=this._oAuthHandler&&"true"===this._storage.getItem("amplify-signin-with-hostedUI"),[2/*return*/,new Promise(function(r,s){if(e&&e.global){x.debug("user global sign out",t);// in order to use global signout
// we must validate the user as an authenticated user by using getSession
var a=i._config.clientMetadata;// TODO: verify behavior if this is override during signIn
t.getSession(function(e,a){return(0,n.__awaiter)(i,void 0,void 0,function(){var i,a=this;return(0,n.__generator)(this,function(n){switch(n.label){case 0:if(!e)return[3/*break*/,5];if(x.debug("failed to get the user session",e),!this.isSessionInvalid(e))return[3/*break*/,4];n.label=1;case 1:return n.trys.push([1,3,,4]),[4/*yield*/,this.cleanUpInvalidSession(t)];case 2:return n.sent(),[3/*break*/,4];case 3:return i=n.sent(),s(Error("Session is invalid due to: "+e.message+" and failed to clean up invalid session: "+i.message)),[2/*return*/];case 4:return[2/*return*/,s(e)];case 5:return t.globalSignOut({onSuccess:function(e){if(x.debug("global sign out success"),!o)return r();a.oAuthSignOutRedirect(r,s)},onFailure:function(e){return x.debug("global sign out failed",e),s(e)}}),[2/*return*/]}})})},{clientMetadata:a})}else x.debug("user sign out",t),t.signOut(function(){if(!o)return r();i.oAuthSignOutRedirect(r,s)})})]}})})},e.prototype.oAuthSignOutRedirect=function(e,t){(0,u.browserOrNode)().isBrowser?this.oAuthSignOutRedirectOrReject(t):this.oAuthSignOutAndResolve(e)},e.prototype.oAuthSignOutAndResolve=function(e){this._oAuthHandler.signOut(),e()},e.prototype.oAuthSignOutRedirectOrReject=function(e){this._oAuthHandler.signOut(),// App should be redirected to another url otherwise it will reject
setTimeout(function(){return e(Error("Signout timeout fail"))},3e3)},/**
     * Sign out method
     * @
     * @return - A promise resolved if success
     */e.prototype.signOut=function(e){return(0,n.__awaiter)(this,void 0,void 0,function(){var t;return(0,n.__generator)(this,function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),[4/*yield*/,this.cleanCachedItems()];case 1:return r.sent(),[3/*break*/,3];case 2:return r.sent(),x.debug("failed to clear cached items"),[3/*break*/,3];case 3:if(!this.userPool)return[3/*break*/,7];if(!(t=this.userPool.getCurrentUser()))return[3/*break*/,5];return[4/*yield*/,this.cognitoIdentitySignOut(e,t)];case 4:return r.sent(),[3/*break*/,6];case 5:x.debug("no current Cognito user"),r.label=6;case 6:return[3/*break*/,8];case 7:x.debug("no Cognito User pool"),r.label=8;case 8:return(/**
                         * Note for future refactor - no reliable way to get username with
                         * Cognito User Pools vs Identity when federating with Social Providers
                         * This is why we need a well structured session object that can be inspected
                         * and information passed back in the message below for Hub dispatch
                         */O("signOut",this.user,"A user has been signed out"),this.user=null,[2/*return*/])}})})},e.prototype.cleanCachedItems=function(){return(0,n.__awaiter)(this,void 0,void 0,function(){return(0,n.__generator)(this,function(e){switch(e.label){case 0:// clear cognito cached item
return[4/*yield*/,this.Credentials.clear()];case 1:return(// clear cognito cached item
e.sent(),[2/*return*/])}})})},/**
     * Change a password for an authenticated user
     * @param {Object} user - The CognitoUser object
     * @param {String} oldPassword - the current password
     * @param {String} newPassword - the requested new password
     * @return - A promise resolves if success
     */e.prototype.changePassword=function(e,t,r,n){var o=this;return void 0===n&&(n=this._config.clientMetadata),new Promise(function(i,s){o.userSession(e).then(function(o){e.changePassword(t,r,function(e,t){return e?(x.debug("change password failure",e),s(e)):i(t)},n)})})},/**
     * Initiate a forgot password request
     * @param {String} username - the username to change password
     * @return - A promise resolves if success
     */e.prototype.forgotPassword=function(e,t){if(void 0===t&&(t=this._config.clientMetadata),!this.userPool)return this.rejectNoUserPool();if(!e)return this.rejectAuthError(i.AuthErrorTypes.EmptyUsername);var r=this.createCognitoUser(e);return new Promise(function(n,o){r.forgotPassword({onSuccess:function(){n()},onFailure:function(t){x.debug("forgot password failure",t),O("forgotPassword_failure",t,e+" forgotPassword failed"),o(t)},inputVerificationCode:function(t){O("forgotPassword",r,e+" has initiated forgot password flow"),n(t)}},t)})},/**
     * Confirm a new password using a confirmation Code
     * @param {String} username - The username
     * @param {String} code - The confirmation code
     * @param {String} password - The new password
     * @return - A promise that resolves if success
     */e.prototype.forgotPasswordSubmit=function(e,t,r,n){if(void 0===n&&(n=this._config.clientMetadata),!this.userPool)return this.rejectNoUserPool();if(!e)return this.rejectAuthError(i.AuthErrorTypes.EmptyUsername);if(!t)return this.rejectAuthError(i.AuthErrorTypes.EmptyCode);if(!r)return this.rejectAuthError(i.AuthErrorTypes.EmptyPassword);var o=this.createCognitoUser(e);return new Promise(function(i,s){o.confirmPassword(t,r,{onSuccess:function(t){O("forgotPasswordSubmit",o,e+" forgotPasswordSubmit successful"),i(t)},onFailure:function(t){O("forgotPasswordSubmit_failure",t,e+" forgotPasswordSubmit failed"),s(t)}},n)})},/**
     * Get user information
     * @async
     * @return {Object }- current User's information
     */e.prototype.currentUserInfo=function(){return(0,n.__awaiter)(this,void 0,void 0,function(){var e,t,r,o,i,s,a;return(0,n.__generator)(this,function(n){switch(n.label){case 0:if(!(!(e=this.Credentials.getCredSource())||"aws"===e||"userPool"===e))return[3/*break*/,9];return[4/*yield*/,this.currentUserPoolUser().catch(function(e){return x.error(e)})];case 1:if(!(t=n.sent()))return[2/*return*/,null];n.label=2;case 2:return n.trys.push([2,8,,9]),[4/*yield*/,this.userAttributes(t)];case 3:r=n.sent(),o=this.attributesToObject(r),i=null,n.label=4;case 4:return n.trys.push([4,6,,7]),[4/*yield*/,this.currentCredentials()];case 5:return i=n.sent(),[3/*break*/,7];case 6:return s=n.sent(),x.debug("Failed to retrieve credentials while getting current user info",s),[3/*break*/,7];case 7:return[2/*return*/,{id:i?i.identityId:void 0,username:t.getUsername(),attributes:o}];case 8:return a=n.sent(),x.error("currentUserInfo error",a),[2/*return*/,{}];case 9:if("federated"===e)return[2/*return*/,(t=this.user)||{}];return[2/*return*/]}})})},e.prototype.federatedSignIn=function(e,t,r){return(0,n.__awaiter)(this,void 0,void 0,function(){var o,s,a,u,c,f,h,l,d,p,g;return(0,n.__generator)(this,function(n){switch(n.label){case 0:if(!this._config.identityPoolId&&!this._config.userPoolId)throw Error("Federation requires either a User Pool or Identity Pool in config");// Ensure backwards compatability
if(void 0===e&&this._config.identityPoolId&&!this._config.userPoolId)throw Error("Federation with Identity Pools requires tokens passed as arguments");if(!((0,i.isFederatedSignInOptions)(e)||(0,i.isFederatedSignInOptionsCustom)(e)||(0,i.hasCustomState)(e)||void 0===e))return[3/*break*/,1];return o=e||{provider:i.CognitoHostedUIIdentityProvider.Cognito},s=(0,i.isFederatedSignInOptions)(o)?o.provider:o.customProvider,(0,i.isFederatedSignInOptions)(o),a=o.customState,this._config.userPoolId&&(u=(0,i.isCognitoHostedOpts)(this._config.oauth)?this._config.userPoolWebClientId:this._config.oauth.clientID,c=(0,i.isCognitoHostedOpts)(this._config.oauth)?this._config.oauth.redirectSignIn:this._config.oauth.redirectUri,this._oAuthHandler.oauthSignIn(this._config.oauth.responseType,this._config.oauth.domain,c,u,s,a)),[3/*break*/,4];case 1:s=e;// To check if the user is already logged in
try{(f=JSON.stringify(JSON.parse(this._storage.getItem("aws-amplify-federatedInfo")).user))&&x.warn("There is already a signed in user: "+f+" in your app.\n																	You should not call Auth.federatedSignIn method again as it may cause unexpected behavior.")}catch(e){}return h=t.token,l=t.identity_id,d=t.expires_at,[4/*yield*/,this.Credentials.set({provider:s,token:h,identity_id:l,user:r,expires_at:d},"federation")];case 2:return p=n.sent(),[4/*yield*/,this.currentAuthenticatedUser()];case 3:return O("signIn",g=n.sent(),"A user "+g.username+" has been signed in"),x.debug("federated sign in credentials",p),[2/*return*/,p];case 4:return[2/*return*/]}})})},/**
     * Used to complete the OAuth flow with or without the Cognito Hosted UI
     * @param {String} URL - optional parameter for customers to pass in the response URL
     */e.prototype._handleAuthResponse=function(e){return(0,n.__awaiter)(this,void 0,void 0,function(){var t,r,o,i,s,a,c,f,h,l,d,p,y,v;return(0,n.__generator)(this,function(m){switch(m.label){case 0:if(this.oAuthFlowInProgress)return x.debug("Skipping URL "+e+" current flow in progress"),[2/*return*/];m.label=1;case 1:if(m.trys.push([1,,8,9]),this.oAuthFlowInProgress=!0,!this._config.userPoolId)throw Error("OAuth responses require a User Pool defined in config");if(O("parsingCallbackUrl",{url:e},"The callback url is being parsed"),t=e||((0,u.browserOrNode)().isBrowser?window.location.href:""),r=!!((0,C.parse)(t).query||"").split("&").map(function(e){return e.split("=")}).find(function(e){var t=(0,n.__read)(e,1)[0];return"code"===t||"error"===t}),o=!!((0,C.parse)(t).hash||"#").substr(1).split("&").map(function(e){return e.split("=")}).find(function(e){var t=(0,n.__read)(e,1)[0];return"access_token"===t||"error"===t}),!(r||o))return[3/*break*/,7];this._storage.setItem("amplify-redirected-from-hosted-ui","true"),m.label=2;case 2:return m.trys.push([2,6,,7]),[4/*yield*/,this._oAuthHandler.handleAuthResponse(t)];case 3:if(s=(i=m.sent()).accessToken,a=i.idToken,c=i.refreshToken,f=i.state,h=new w.default({IdToken:new S.default({IdToken:a}),RefreshToken:new _.default({RefreshToken:c}),AccessToken:new A.default({AccessToken:s})}),l=void 0,!this._config.identityPoolId)return[3/*break*/,5];return[4/*yield*/,this.Credentials.set(h,"session")];case 4:l=m.sent(),x.debug("AWS credentials",l),m.label=5;case 5://#endregion
return d=/-/.test(f),// This calls cacheTokens() in Cognito SDK
(p=this.createCognitoUser(h.getIdToken().decodePayload()["cognito:username"])).setSignInUserSession(h),window&&void 0!==window.history&&window.history.replaceState({},null,this._config.oauth.redirectSignIn),O("signIn",p,"A user "+p.getUsername()+" has been signed in"),O("cognitoHostedUI",p,"A user "+p.getUsername()+" has been signed in via Cognito Hosted UI"),d&&(y=f.split("-").splice(1).join("-"),O("customOAuthState",(0,g.urlSafeDecode)(y),"State for user "+p.getUsername())),[2/*return*/,l];case 6:return v=m.sent(),x.debug("Error in cognito hosted auth response",v),window&&void 0!==window.history&&window.history.replaceState({},null,this._config.oauth.redirectSignIn),O("signIn_failure",v,"The OAuth response flow failed"),O("cognitoHostedUI_failure",v,"A failure occurred when returning to the Cognito Hosted UI"),O("customState_failure",v,"A failure occurred when returning state"),[3/*break*/,7];case 7:return[3/*break*/,9];case 8:return this.oAuthFlowInProgress=!1,[7/*endfinally*/];case 9:return[2/*return*/]}})})},/**
     * Compact version of credentials
     * @param {Object} credentials
     * @return {Object} - Credentials
     */e.prototype.essentialCredentials=function(e){return{accessKeyId:e.accessKeyId,sessionToken:e.sessionToken,secretAccessKey:e.secretAccessKey,identityId:e.identityId,authenticated:e.authenticated}},e.prototype.attributesToObject=function(e){var t=this,r={};return e&&e.map(function(e){"email_verified"===e.Name||"phone_number_verified"===e.Name?r[e.Name]=t.isTruthyString(e.Value)||!0===e.Value:r[e.Name]=e.Value}),r},e.prototype.isTruthyString=function(e){return"function"==typeof e.toLowerCase&&"true"===e.toLowerCase()},e.prototype.createCognitoUser=function(e){var t={Username:e,Pool:this.userPool};t.Storage=this._storage;var r=this._config.authenticationFlowType,n=new E.default(t);return r&&n.setAuthenticationFlowType(r),n},e.prototype._isValidAuthStorage=function(e){// We need to check if the obj has the functions of Storage
return!!e&&"function"==typeof e.getItem&&"function"==typeof e.setItem&&"function"==typeof e.removeItem&&"function"==typeof e.clear},e.prototype.noUserPoolErrorHandler=function(e){return!e||e.userPoolId&&e.identityPoolId?i.AuthErrorTypes.NoConfig:i.AuthErrorTypes.MissingAuthConfig},e.prototype.rejectAuthError=function(e){return Promise.reject(new P.AuthError(e))},e.prototype.rejectNoUserPool=function(){var e=this.noUserPoolErrorHandler(this._config);return Promise.reject(new P.NoUserPoolError(e))},e.prototype.rememberDevice=function(){return(0,n.__awaiter)(this,void 0,void 0,function(){var e,t;return(0,n.__generator)(this,function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),[4/*yield*/,this.currentUserPoolUser()];case 1:return e=r.sent(),[3/*break*/,3];case 2:return t=r.sent(),x.debug("The user is not authenticated by the error",t),[2/*return*/,Promise.reject("The user is not authenticated")];case 3:return e.getCachedDeviceKeyAndPassword(),[2/*return*/,new Promise(function(t,r){e.setDeviceStatusRemembered({onSuccess:function(e){t(e)},onFailure:function(e){"InvalidParameterException"===e.code?r(new P.AuthError(i.AuthErrorTypes.DeviceConfig)):"NetworkError"===e.code?r(new P.AuthError(i.AuthErrorTypes.NetworkError)):r(e)}})})]}})})},e.prototype.forgetDevice=function(){return(0,n.__awaiter)(this,void 0,void 0,function(){var e,t;return(0,n.__generator)(this,function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),[4/*yield*/,this.currentUserPoolUser()];case 1:return e=r.sent(),[3/*break*/,3];case 2:return t=r.sent(),x.debug("The user is not authenticated by the error",t),[2/*return*/,Promise.reject("The user is not authenticated")];case 3:return e.getCachedDeviceKeyAndPassword(),[2/*return*/,new Promise(function(t,r){e.forgetDevice({onSuccess:function(e){t(e)},onFailure:function(e){"InvalidParameterException"===e.code?r(new P.AuthError(i.AuthErrorTypes.DeviceConfig)):"NetworkError"===e.code?r(new P.AuthError(i.AuthErrorTypes.NetworkError)):r(e)}})})]}})})},e.prototype.fetchDevices=function(){return(0,n.__awaiter)(this,void 0,void 0,function(){var e,t;return(0,n.__generator)(this,function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),[4/*yield*/,this.currentUserPoolUser()];case 1:return e=r.sent(),[3/*break*/,3];case 2:throw t=r.sent(),x.debug("The user is not authenticated by the error",t),Error("The user is not authenticated");case 3:return e.getCachedDeviceKeyAndPassword(),[2/*return*/,new Promise(function(t,r){e.listDevices(60,null,{onSuccess:function(e){t(e.Devices.map(function(e){var t=e.DeviceAttributes.find(function(e){return"device_name"===e.Name})||{};return{id:e.DeviceKey,name:t.Value}}))},onFailure:function(e){"InvalidParameterException"===e.code?r(new P.AuthError(i.AuthErrorTypes.DeviceConfig)):"NetworkError"===e.code?r(new P.AuthError(i.AuthErrorTypes.NetworkError)):r(e)}})})]}})})},e}())(null);(0,a.Amplify).register(D)}),i("dfmKz",function(t,r){e(t.exports,"__extends",()=>o),e(t.exports,"__assign",()=>i),e(t.exports,"__awaiter",()=>s),e(t.exports,"__generator",()=>a),e(t.exports,"__read",()=>u);/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** *//* global Reflect, Promise */var n=function(e,t){return(n=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)};function o(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var i=function(){return(i=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function s(e,t,r,n){return new(r||(r=Promise))(function(o,i){function s(e){try{u(n.next(e))}catch(e){i(e)}}function a(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t)})).then(s,a)}u((n=n.apply(e,t||[])).next())})}function a(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,n=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}}function u(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,o,i=r.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(n=i.next()).done;)s.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return s}}),i("it4KL",function(t,r){var n,o,i,s,a,u;function c(e){return e&&!!["provider"].find(function(t){return e.hasOwnProperty(t)})}function f(e){return e&&!!["customProvider"].find(function(t){return e.hasOwnProperty(t)})}function h(e){return e&&!!["customState"].find(function(t){return e.hasOwnProperty(t)})}function l(e){return void 0!==e.redirectSignIn}function d(e){return!!e.username}e(t.exports,"CognitoHostedUIIdentityProvider",()=>n),e(t.exports,"isFederatedSignInOptions",()=>c),e(t.exports,"isFederatedSignInOptionsCustom",()=>f),e(t.exports,"hasCustomState",()=>h),e(t.exports,"isCognitoHostedOpts",()=>l),e(t.exports,"AuthErrorTypes",()=>o),e(t.exports,"isUsernamePasswordOpts",()=>d),(s=n||(n={})).Cognito="COGNITO",s.Google="Google",s.Facebook="Facebook",s.Amazon="LoginWithAmazon",s.Apple="SignInWithApple",(a=o||(o={})).NoConfig="noConfig",a.MissingAuthConfig="missingAuthConfig",a.EmptyUsername="emptyUsername",a.InvalidUsername="invalidUsername",a.EmptyPassword="emptyPassword",a.EmptyCode="emptyCode",a.SignUpError="signUpError",a.NoMFA="noMFA",a.InvalidMFA="invalidMFA",a.EmptyChallengeResponse="emptyChallengeResponse",a.NoUserSession="noUserSession",a.Default="default",a.DeviceConfig="deviceConfig",a.NetworkError="networkError",a.AutoSignInError="autoSignInError",(u=i||(i={})).API_KEY="API_KEY",u.AWS_IAM="AWS_IAM",u.OPENID_CONNECT="OPENID_CONNECT",u.AMAZON_COGNITO_USER_POOLS="AMAZON_COGNITO_USER_POOLS",u.AWS_LAMBDA="AWS_LAMBDA"}),i("Ym30y",function(t,r){e(t.exports,"AuthenticationDetails",()=>o("5zoIb").default),e(t.exports,"CognitoAccessToken",()=>o("bcFEY").default),e(t.exports,"CognitoIdToken",()=>o("cfFz4").default),e(t.exports,"CognitoRefreshToken",()=>o("gXTS7").default),e(t.exports,"CognitoUser",()=>o("9UvTj").default),e(t.exports,"CognitoUserAttribute",()=>o("4PRoF").default),e(t.exports,"CognitoUserPool",()=>o("foBd2").default),e(t.exports,"CognitoUserSession",()=>o("bbF2X").default),e(t.exports,"CookieStorage",()=>o("i2gj0").default),o("5zoIb"),o("b4DK1"),o("bcFEY"),o("cfFz4"),o("gXTS7"),o("9UvTj"),o("4PRoF"),o("foBd2"),o("bbF2X"),o("i2gj0"),o("ewYam"),o("8ZOc6"),o("8gx9f")}),i("5zoIb",function(t,r){e(t.exports,"default",()=>n);/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 *//** @class */var n=/*#__PURE__*/function(){/**
   * Constructs a new AuthenticationDetails object
   * @param {object=} data Creation options.
   * @param {string} data.Username User being authenticated.
   * @param {string} data.Password Plain-text password to authenticate with.
   * @param {(AttributeArg[])?} data.ValidationData Application extra metadata.
   * @param {(AttributeArg[])?} data.AuthParamaters Authentication paramaters for custom auth.
   */function e(e){var t=e||{},r=t.ValidationData,n=t.Username,o=t.Password,i=t.AuthParameters,s=t.ClientMetadata;this.validationData=r||{},this.authParameters=i||{},this.clientMetadata=s||{},this.username=n,this.password=o}/**
   * @returns {string} the record's username
   */var t=e.prototype;return t.getUsername=function(){return this.username}/**
   * @returns {string} the record's password
   */,t.getPassword=function(){return this.password}/**
   * @returns {Array} the record's validationData
   */,t.getValidationData=function(){return this.validationData}/**
   * @returns {Array} the record's authParameters
   */,t.getAuthParameters=function(){return this.authParameters}/**
   * @returns {ClientMetadata} the clientMetadata for a Lambda trigger
   */,t.getClientMetadata=function(){return this.clientMetadata},e}()}),i("b4DK1",function(t,r){e(t.exports,"default",()=>f);/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */var n=o("aXQL7"),i=o("8gx9f"),s=o("hMqoc"),a=o("6BaWr");/**
 * Returns a Buffer with a sequence of random nBytes
 *
 * @param {number} nBytes
 * @returns {Buffer} fixed-length sequence of random bytes
 */function u(e){return(0,n.Buffer).from(new(0,i.default)().random(e).toString(),"hex")}/**
 * Tests if a hex string has it most significant bit set (case-insensitive regex)
 */var c=/^[89a-f]/i,f=/*#__PURE__*/function(){/**
   * Constructs a new AuthenticationHelper object
   * @param {string} PoolName Cognito user pool name.
   */function e(e){this.N=new a.default("FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AAAC42DAD33170D04507A33A85521ABDF1CBA64ECFB850458DBEF0A8AEA71575D060C7DB3970F85A6E1E4C7ABF5AE8CDB0933D71E8C94E04A25619DCEE3D2261AD2EE6BF12FFA06D98A0864D87602733EC86A64521F2B18177B200CBBE117577A615D6C770988C0BAD946E208E24FA074E5AB3143DB5BFCE0FD108E4B82D120A93AD2CAFFFFFFFFFFFFFFFF",16),this.g=new a.default("2",16),this.k=new a.default(this.hexHash(""+this.padHex(this.N)+this.padHex(this.g)),16),this.smallAValue=this.generateRandomSmallA(),this.getLargeAValue(function(){}),this.infoBits=(0,n.Buffer).from("Caldera Derived Key","utf8"),this.poolName=e}/**
   * @returns {BigInteger} small A, a random number
   */var t=e.prototype;return t.getSmallAValue=function(){return this.smallAValue}/**
   * @param {nodeCallback<BigInteger>} callback Called with (err, largeAValue)
   * @returns {void}
   */,t.getLargeAValue=function(e){var t=this;this.largeAValue?e(null,this.largeAValue):this.calculateA(this.smallAValue,function(r,n){r&&e(r,null),t.largeAValue=n,e(null,t.largeAValue)})}/**
   * helper function to generate a random big integer
   * @returns {BigInteger} a random value.
   * @private
   */,t.generateRandomSmallA=function(){// This will be interpreted as a postive 128-bit integer
var e=u(128).toString("hex");// There is no need to do randomBigInt.mod(this.N - 1) as N (3072-bit) is > 128 bytes (1024-bit)
return new a.default(e,16)}/**
   * helper function to generate a random string
   * @returns {string} a random value.
   * @private
   */,t.generateRandomString=function(){return u(40).toString("base64")}/**
   * @returns {string} Generated random value included in password hash.
   */,t.getRandomPassword=function(){return this.randomPassword}/**
   * @returns {string} Generated random value included in devices hash.
   */,t.getSaltDevices=function(){return this.SaltToHashDevices}/**
   * @returns {string} Value used to verify devices.
   */,t.getVerifierDevices=function(){return this.verifierDevices}/**
   * Generate salts and compute verifier.
   * @param {string} deviceGroupKey Devices to generate verifier for.
   * @param {string} username User to generate verifier for.
   * @param {nodeCallback<null>} callback Called with (err, null)
   * @returns {void}
   */,t.generateHashDevice=function(e,t,r){var n=this;this.randomPassword=this.generateRandomString();var o=""+e+t+":"+this.randomPassword,i=this.hash(o),s=u(16).toString("hex");// The random hex will be unambiguously represented as a postive integer
this.SaltToHashDevices=this.padHex(new a.default(s,16)),this.g.modPow(new a.default(this.hexHash(this.SaltToHashDevices+i),16),this.N,function(e,t){e&&r(e,null),n.verifierDevices=n.padHex(t),r(null,null)})}/**
   * Calculate the client's public value A = g^a%N
   * with the generated random number a
   * @param {BigInteger} a Randomly generated small A.
   * @param {nodeCallback<BigInteger>} callback Called with (err, largeAValue)
   * @returns {void}
   * @private
   */,t.calculateA=function(e,t){var r=this;this.g.modPow(e,this.N,function(e,n){e&&t(e,null),n.mod(r.N).equals(a.default.ZERO)&&t(Error("Illegal paramater. A mod N cannot be 0."),null),t(null,n)})}/**
   * Calculate the client's value U which is the hash of A and B
   * @param {BigInteger} A Large A value.
   * @param {BigInteger} B Server B value.
   * @returns {BigInteger} Computed U value.
   * @private
   */,t.calculateU=function(e,t){return this.UHexHash=this.hexHash(this.padHex(e)+this.padHex(t)),new a.default(this.UHexHash,16)}/**
   * Calculate a hash from a bitArray
   * @param {Buffer} buf Value to hash.
   * @returns {String} Hex-encoded hash.
   * @private
   */,t.hash=function(e){var t=new s.Sha256;t.update(e);var r=t.digestSync(),o=(0,n.Buffer).from(r).toString("hex");return Array(64-o.length).join("0")+o}/**
   * Calculate a hash from a hex string
   * @param {String} hexStr Value to hash.
   * @returns {String} Hex-encoded hash.
   * @private
   */,t.hexHash=function(e){return this.hash((0,n.Buffer).from(e,"hex"))}/**
   * Standard hkdf algorithm
   * @param {Buffer} ikm Input key material.
   * @param {Buffer} salt Salt value.
   * @returns {Buffer} Strong key material.
   * @private
   */,t.computehkdf=function(e,t){var r=(0,n.Buffer).concat([this.infoBits,(0,n.Buffer).from("\x01","utf8")]),o=new s.Sha256(t);o.update(e);var i=o.digestSync(),a=new s.Sha256(i);return a.update(r),a.digestSync().slice(0,16)}/**
   * Calculates the final hkdf based on computed S value, and computed U value and the key
   * @param {String} username Username.
   * @param {String} password Password.
   * @param {BigInteger} serverBValue Server B value.
   * @param {BigInteger} salt Generated salt.
   * @param {nodeCallback<Buffer>} callback Called with (err, hkdfValue)
   * @returns {void}
   */,t.getPasswordAuthenticationKey=function(e,t,r,o,i){var s=this;if(r.mod(this.N).equals(a.default.ZERO))throw Error("B cannot be zero.");if(this.UValue=this.calculateU(this.largeAValue,r),this.UValue.equals(a.default.ZERO))throw Error("U cannot be zero.");var u=""+this.poolName+e+":"+t,c=this.hash(u),f=new a.default(this.hexHash(this.padHex(o)+c),16);this.calculateS(f,r,function(e,t){e&&i(e,null),i(null,s.computehkdf((0,n.Buffer).from(s.padHex(t),"hex"),(0,n.Buffer).from(s.padHex(s.UValue),"hex")))})}/**
   * Calculates the S value used in getPasswordAuthenticationKey
   * @param {BigInteger} xValue Salted password hash value.
   * @param {BigInteger} serverBValue Server B value.
   * @param {nodeCallback<string>} callback Called on success or error.
   * @returns {void}
   */,t.calculateS=function(e,t,r){var n=this;this.g.modPow(e,this.N,function(o,i){o&&r(o,null),t.subtract(n.k.multiply(i)).modPow(n.smallAValue.add(n.UValue.multiply(e)),n.N,function(e,t){e&&r(e,null),r(null,t.mod(n.N))})})}/**
   * Return constant newPasswordRequiredChallengeUserAttributePrefix
   * @return {newPasswordRequiredChallengeUserAttributePrefix} constant prefix value
   */,t.getNewPasswordRequiredChallengeUserAttributePrefix=function(){return"userAttributes."}/**
   * Returns an unambiguous, even-length hex string of the two's complement encoding of an integer.
   *
   * It is compatible with the hex encoding of Java's BigInteger's toByteArray(), wich returns a
   * byte array containing the two's-complement representation of a BigInteger. The array contains
   * the minimum number of bytes required to represent the BigInteger, including at least one sign bit.
   *
   * Examples showing how ambiguity is avoided by left padding with:
   * 	"00" (for positive values where the most-significant-bit is set)
   *  "FF" (for negative values where the most-significant-bit is set)
   *
   * padHex(bigInteger.fromInt(-236))  === "FF14"
   * padHex(bigInteger.fromInt(20))    === "14"
   *
   * padHex(bigInteger.fromInt(-200))  === "FF38"
   * padHex(bigInteger.fromInt(56))    === "38"
   *
   * padHex(bigInteger.fromInt(-20))   === "EC"
   * padHex(bigInteger.fromInt(236))   === "00EC"
   *
   * padHex(bigInteger.fromInt(-56))   === "C8"
   * padHex(bigInteger.fromInt(200))   === "00C8"
   *
   * @param {BigInteger} bigInt Number to encode.
   * @returns {String} even-length hex string of the two's complement encoding.
   */,t.padHex=function(e){if(!(e instanceof a.default))throw Error("Not a BigInteger");var t=0>e.compareTo(a.default.ZERO),r=e.abs().toString(16);if(/* Pad hex to even length if needed */r=r.length%2!=0?"0"+r:r,/* Prepend "00" if the most significant bit is set */r=c.test(r)?"00"+r:r,t){/* Flip the bits of the representation */var n=r.split("").map(function(e){var t=15&~parseInt(e,16);return"0123456789ABCDEF".charAt(t)}).join("");/*
      For hex strings starting with 'FF8', 'FF' can be dropped, e.g. 0xFFFF80=0xFF80=0x80=-128
      		Any sequence of '1' bits on the left can always be substituted with a single '1' bit
      without changing the represented value.
      		This only happens in the case when the input is 80...00
      */(r=new(0,a.default)(n,16).add(a.default.ONE).toString(16)).toUpperCase().startsWith("FF8")&&(r=r.substring(2))}return r},e}()}),i("aXQL7",function(r,n){e(r.exports,"Buffer",()=>i,e=>i=e),e(r.exports,"INSPECT_MAX_BYTES",()=>s,e=>s=e);var i,s,a=o("kuxul"),u=o("9NvM5"),c=o("767Wy");function f(){return l.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function h(e,t){if(f()<t)throw RangeError("Invalid typed array length");return l.TYPED_ARRAY_SUPPORT?// Return an augmented `Uint8Array` instance, for best performance
(e=new Uint8Array(t)).__proto__=l.prototype:(null===e&&(e=new l(t)),e.length=t),e}/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */function l(e,t,r){if(!l.TYPED_ARRAY_SUPPORT&&!(this instanceof l))return new l(e,t,r);// Common case.
if("number"==typeof e){if("string"==typeof t)throw Error("If encoding is specified then the first argument must be a string");return g(this,e)}return d(this,e,t,r)}function d(e,t,r,n){if("number"==typeof t)throw TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&t instanceof ArrayBuffer?function(e,t,r,n){if(t.byteLength// this throws if `array` is not a valid ArrayBuffer
,r<0||t.byteLength<r)throw RangeError("'offset' is out of bounds");if(t.byteLength<r+(n||0))throw RangeError("'length' is out of bounds");return t=void 0===r&&void 0===n?new Uint8Array(t):void 0===n?new Uint8Array(t,r):new Uint8Array(t,r,n),l.TYPED_ARRAY_SUPPORT?// Return an augmented `Uint8Array` instance, for best performance
(e=t).__proto__=l.prototype:e=y(e,t),e}(e,t,r,n):"string"==typeof t?function(e,t,r){if(("string"!=typeof r||""===r)&&(r="utf8"),!l.isEncoding(r))throw TypeError('"encoding" must be a valid string encoding');var n=0|m(t,r),o=(e=h(e,n)).write(t,r);return o!==n&&// cause everything after the first invalid character to be ignored. (e.g.
// 'abxxcd' will be treated as 'ab')
(e=e.slice(0,o)),e}(e,t,r):function(e,t){if(l.isBuffer(t)){var r,n=0|v(t.length);return 0===(e=h(e,n)).length||t.copy(e,0,0,n),e}if(t){if("undefined"!=typeof ArrayBuffer&&t.buffer instanceof ArrayBuffer||"length"in t)return"number"!=typeof t.length||(r=t.length)!=r// eslint-disable-line no-self-compare
?h(e,0):y(e,t);if("Buffer"===t.type&&c(t.data))return y(e,t.data)}throw TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(e,t)}function p(e){if("number"!=typeof e)throw TypeError('"size" argument must be a number');if(e<0)throw RangeError('"size" argument must not be negative')}function g(e,t){if(p(t),e=h(e,t<0?0:0|v(t)),!l.TYPED_ARRAY_SUPPORT)for(var r=0;r<t;++r)e[r]=0;return e}function y(e,t){var r=t.length<0?0:0|v(t.length);e=h(e,r);for(var n=0;n<r;n+=1)e[n]=255&t[n];return e}function v(e){// Note: cannot use `length < kMaxLength()` here because that fails when
// length is NaN (which is otherwise coerced to zero.)
if(e>=f())throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+f().toString(16)+" bytes");return 0|e}function m(e,t){if(l.isBuffer(e))return e.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(e)||e instanceof ArrayBuffer))return e.byteLength;"string"!=typeof e&&(e=""+e);var r=e.length;if(0===r)return 0;for(// Use a for loop to avoid recursion
var n=!1;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":case void 0:return R(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return D(e).length;default:if(n)return R(e).length// assume utf8
;t=(""+t).toLowerCase(),n=!0}}function b(e,t,r){var n,o,i=!1;// Return early if start > this.length. Done here to prevent potential uint32
// coercion fail below.
if((void 0===t||t<0)&&(t=0),t>this.length||((void 0===r||r>this.length)&&(r=this.length),r<=0||// Force coersion to uint32. This will also coerce falsey/NaN values to 0.
(r>>>=0)<=(t>>>=0)))return"";for(e||(e="utf8");;)switch(e){case"hex":return function(e,t,r){var n,o=e.length;(!t||t<0)&&(t=0),(!r||r<0||r>o)&&(r=o);for(var i="",s=t;s<r;++s)i+=(n=e[s])<16?"0"+n.toString(16):n.toString(16);return i}(this,t,r);case"utf8":case"utf-8":return A(this,t,r);case"ascii":return function(e,t,r){var n="";r=Math.min(e.length,r);for(var o=t;o<r;++o)n+=String.fromCharCode(127&e[o]);return n}(this,t,r);case"latin1":case"binary":return function(e,t,r){var n="";r=Math.min(e.length,r);for(var o=t;o<r;++o)n+=String.fromCharCode(e[o]);return n}(this,t,r);case"base64":return n=t,o=r,0===n&&o===this.length?a.fromByteArray(this):a.fromByteArray(this.slice(n,o));case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return function(e,t,r){for(var n=e.slice(t,r),o="",i=0;i<n.length;i+=2)o+=String.fromCharCode(n[i]+256*n[i+1]);return o}(this,t,r);default:if(i)throw TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),i=!0}}function w(e,t,r){var n=e[t];e[t]=e[r],e[r]=n}// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function S(e,t,r,n,o){// Empty buffer means no match
if(0===e.length)return -1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),isNaN(r=+r// Coerce to Number.
)&&(r=o?0:e.length-1),r<0&&(r=e.length+r),r>=e.length){if(o)return -1;r=e.length-1}else if(r<0){if(!o)return -1;r=0}// Finally, search either indexOf (if dir is true) or lastIndexOf
if("string"==typeof t&&(t=l.from(t,n)),l.isBuffer(t))return(// Special case: looking for empty string/buffer always fails
0===t.length?-1:_(e,t,r,n,o));if("number"==typeof t)return(t&=255// Search for a byte value [0-255]
,l.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf)?o?Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):_(e,[t],r,n,o);throw TypeError("val must be string, number or Buffer")}function _(e,t,r,n,o){var i,s=1,a=e.length,u=t.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(e.length<2||t.length<2)return -1;s=2,a/=2,u/=2,r/=2}function c(e,t){return 1===s?e[t]:e.readUInt16BE(t*s)}if(o){var f=-1;for(i=r;i<a;i++)if(c(e,i)===c(t,-1===f?0:i-f)){if(-1===f&&(f=i),i-f+1===u)return f*s}else -1!==f&&(i-=i-f),f=-1}else for(r+u>a&&(r=a-u),i=r;i>=0;i--){for(var h=!0,l=0;l<u;l++)if(c(e,i+l)!==c(t,l)){h=!1;break}if(h)return i}return -1}function A(e,t,r){r=Math.min(e.length,r);for(var n=[],o=t;o<r;){var i,s,a,u,c=e[o],f=null,h=c>239?4:c>223?3:c>191?2:1;if(o+h<=r)switch(h){case 1:c<128&&(f=c);break;case 2:(192&(i=e[o+1]))==128&&(u=(31&c)<<6|63&i)>127&&(f=u);break;case 3:i=e[o+1],s=e[o+2],(192&i)==128&&(192&s)==128&&(u=(15&c)<<12|(63&i)<<6|63&s)>2047&&(u<55296||u>57343)&&(f=u);break;case 4:i=e[o+1],s=e[o+2],a=e[o+3],(192&i)==128&&(192&s)==128&&(192&a)==128&&(u=(15&c)<<18|(63&i)<<12|(63&s)<<6|63&a)>65535&&u<1114112&&(f=u)}null===f?(// we did not generate a valid codePoint so insert a
// replacement char (U+FFFD) and advance only 1 byte
f=65533,h=1):f>65535&&(// encode to utf16 (surrogate pair dance)
f-=65536,n.push(f>>>10&1023|55296),f=56320|1023&f),n.push(f),o+=h}return function(e){var t=e.length;if(t<=4096)return String.fromCharCode.apply(String,e)// avoid extra slice()
;for(// Decode in chunks to avoid "call stack size exceeded".
var r="",n=0;n<t;)r+=String.fromCharCode.apply(String,e.slice(n,n+=4096));return r}(n)}/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */function E(e,t,r){if(e%1!=0||e<0)throw RangeError("offset is not uint");if(e+t>r)throw RangeError("Trying to access beyond buffer length")}function I(e,t,r,n,o,i){if(!l.isBuffer(e))throw TypeError('"buffer" argument must be a Buffer instance');if(t>o||t<i)throw RangeError('"value" argument is out of bounds');if(r+n>e.length)throw RangeError("Index out of range")}function C(e,t,r,n){t<0&&(t=65535+t+1);for(var o=0,i=Math.min(e.length-r,2);o<i;++o)e[r+o]=(t&255<<8*(n?o:1-o))>>>(n?o:1-o)*8}function U(e,t,r,n){t<0&&(t=4294967295+t+1);for(var o=0,i=Math.min(e.length-r,4);o<i;++o)e[r+o]=t>>>(n?o:3-o)*8&255}function T(e,t,r,n,o,i){if(r+n>e.length||r<0)throw RangeError("Index out of range")}function P(e,t,r,n,o){return o||T(e,t,r,4,34028234663852886e22,-34028234663852886e22),u.write(e,t,r,n,23,4),r+4}function x(e,t,r,n,o){return o||T(e,t,r,8,17976931348623157e292,-17976931348623157e292),u.write(e,t,r,n,52,8),r+8}i=l,s=50,/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */l.TYPED_ARRAY_SUPPORT=void 0!==t.TYPED_ARRAY_SUPPORT?t.TYPED_ARRAY_SUPPORT:function(){try{var e=new Uint8Array(1);return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()&&// typed array instances can be augmented
"function"==typeof e.subarray&&// chrome 9-10 lack `subarray`
0// ie10 has broken `subarray`
===e.subarray(1,1).byteLength}catch(e){return!1}}(),f(),l.poolSize=8192// not used by this implementation
,// TODO: Legacy, not needed anymore. Remove in next major version.
l._augment=function(e){return e.__proto__=l.prototype,e},/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/l.from=function(e,t,r){return d(null,e,t,r)},l.TYPED_ARRAY_SUPPORT&&(l.prototype.__proto__=Uint8Array.prototype,l.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&l[Symbol.species]===l&&Object.defineProperty(l,Symbol.species,{value:null,configurable:!0})),/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/l.alloc=function(e,t,r){return(p(e),e<=0)?h(null,e):void 0!==t?"string"==typeof r?h(null,e).fill(t,r):h(null,e).fill(t):h(null,e)},/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */l.allocUnsafe=function(e){return g(null,e)},/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */l.allocUnsafeSlow=function(e){return g(null,e)},l.isBuffer=function(e){return!!(null!=e&&e._isBuffer)},l.compare=function(e,t){if(!l.isBuffer(e)||!l.isBuffer(t))throw TypeError("Arguments must be Buffers");if(e===t)return 0;for(var r=e.length,n=t.length,o=0,i=Math.min(r,n);o<i;++o)if(e[o]!==t[o]){r=e[o],n=t[o];break}return r<n?-1:n<r?1:0},l.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},l.concat=function(e,t){if(!c(e))throw TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return l.alloc(0);if(void 0===t)for(r=0,t=0;r<e.length;++r)t+=e[r].length;var r,n=l.allocUnsafe(t),o=0;for(r=0;r<e.length;++r){var i=e[r];if(!l.isBuffer(i))throw TypeError('"list" argument must be an Array of Buffers');i.copy(n,o),o+=i.length}return n},l.byteLength=m,// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
l.prototype._isBuffer=!0,l.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)w(this,t,t+1);return this},l.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)w(this,t,t+3),w(this,t+1,t+2);return this},l.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)w(this,t,t+7),w(this,t+1,t+6),w(this,t+2,t+5),w(this,t+3,t+4);return this},l.prototype.toString=function(){var e=0|this.length;return 0===e?"":0==arguments.length?A(this,0,e):b.apply(this,arguments)},l.prototype.equals=function(e){if(!l.isBuffer(e))throw TypeError("Argument must be a Buffer");return this===e||0===l.compare(this,e)},l.prototype.inspect=function(){var e="",t=s;return this.length>0&&(e=this.toString("hex",0,t).match(/.{2}/g).join(" "),this.length>t&&(e+=" ... ")),"<Buffer "+e+">"},l.prototype.compare=function(e,t,r,n,o){if(!l.isBuffer(e))throw TypeError("Argument must be a Buffer");if(void 0===t&&(t=0),void 0===r&&(r=e?e.length:0),void 0===n&&(n=0),void 0===o&&(o=this.length),t<0||r>e.length||n<0||o>this.length)throw RangeError("out of range index");if(n>=o&&t>=r)return 0;if(n>=o)return -1;if(t>=r)return 1;if(t>>>=0,r>>>=0,n>>>=0,o>>>=0,this===e)return 0;for(var i=o-n,s=r-t,a=Math.min(i,s),u=this.slice(n,o),c=e.slice(t,r),f=0;f<a;++f)if(u[f]!==c[f]){i=u[f],s=c[f];break}return i<s?-1:s<i?1:0},l.prototype.includes=function(e,t,r){return -1!==this.indexOf(e,t,r)},l.prototype.indexOf=function(e,t,r){return S(this,e,t,r,!0)},l.prototype.lastIndexOf=function(e,t,r){return S(this,e,t,r,!1)},l.prototype.write=function(e,t,r,n){// Buffer#write(string)
if(void 0===t)n="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)n=t,r=this.length,t=0;else if(isFinite(t))t|=0,isFinite(r)?(r|=0,void 0===n&&(n="utf8")):(n=r,r=void 0);else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");var o,i,s,a,u,c,f,h,l,d,p,g,y=this.length-t;if((void 0===r||r>y)&&(r=y),e.length>0&&(r<0||t<0)||t>this.length)throw RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var v=!1;;)switch(n){case"hex":return function(e,t,r,n){r=Number(r)||0;var o=e.length-r;n?(n=Number(n))>o&&(n=o):n=o;// must be an even number of digits
var i=t.length;if(i%2!=0)throw TypeError("Invalid hex string");n>i/2&&(n=i/2);for(var s=0;s<n;++s){var a=parseInt(t.substr(2*s,2),16);if(isNaN(a))break;e[r+s]=a}return s}(this,e,t,r);case"utf8":case"utf-8":return u=t,c=r,F(R(e,this.length-u),this,u,c);case"ascii":return f=t,h=r,F(O(e),this,f,h);case"latin1":case"binary":return o=this,i=e,s=t,a=r,F(O(i),o,s,a);case"base64":// Warning: maxLength not taken into account in base64Write
return l=t,d=r,F(D(e),this,l,d);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return p=t,g=r,F(function(e,t){for(var r,n,o=[],i=0;i<e.length&&!((t-=2)<0);++i)n=(r=e.charCodeAt(i))>>8,o.push(r%256),o.push(n);return o}(e,this.length-p),this,p,g);default:if(v)throw TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),v=!0}},l.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},l.prototype.slice=function(e,t){var r,n=this.length;if(e=~~e,t=void 0===t?n:~~t,e<0?(e+=n)<0&&(e=0):e>n&&(e=n),t<0?(t+=n)<0&&(t=0):t>n&&(t=n),t<e&&(t=e),l.TYPED_ARRAY_SUPPORT)(r=this.subarray(e,t)).__proto__=l.prototype;else{var o=t-e;r=new l(o,void 0);for(var i=0;i<o;++i)r[i]=this[i+e]}return r},l.prototype.readUIntLE=function(e,t,r){e|=0,t|=0,r||E(e,t,this.length);for(var n=this[e],o=1,i=0;++i<t&&(o*=256);)n+=this[e+i]*o;return n},l.prototype.readUIntBE=function(e,t,r){e|=0,t|=0,r||E(e,t,this.length);for(var n=this[e+--t],o=1;t>0&&(o*=256);)n+=this[e+--t]*o;return n},l.prototype.readUInt8=function(e,t){return t||E(e,1,this.length),this[e]},l.prototype.readUInt16LE=function(e,t){return t||E(e,2,this.length),this[e]|this[e+1]<<8},l.prototype.readUInt16BE=function(e,t){return t||E(e,2,this.length),this[e]<<8|this[e+1]},l.prototype.readUInt32LE=function(e,t){return t||E(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},l.prototype.readUInt32BE=function(e,t){return t||E(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},l.prototype.readIntLE=function(e,t,r){e|=0,t|=0,r||E(e,t,this.length);for(var n=this[e],o=1,i=0;++i<t&&(o*=256);)n+=this[e+i]*o;return n>=(o*=128)&&(n-=Math.pow(2,8*t)),n},l.prototype.readIntBE=function(e,t,r){e|=0,t|=0,r||E(e,t,this.length);for(var n=t,o=1,i=this[e+--n];n>0&&(o*=256);)i+=this[e+--n]*o;return i>=(o*=128)&&(i-=Math.pow(2,8*t)),i},l.prototype.readInt8=function(e,t){return(t||E(e,1,this.length),128&this[e])?-((255-this[e]+1)*1):this[e]},l.prototype.readInt16LE=function(e,t){t||E(e,2,this.length);var r=this[e]|this[e+1]<<8;return 32768&r?4294901760|r:r},l.prototype.readInt16BE=function(e,t){t||E(e,2,this.length);var r=this[e+1]|this[e]<<8;return 32768&r?4294901760|r:r},l.prototype.readInt32LE=function(e,t){return t||E(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},l.prototype.readInt32BE=function(e,t){return t||E(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},l.prototype.readFloatLE=function(e,t){return t||E(e,4,this.length),u.read(this,e,!0,23,4)},l.prototype.readFloatBE=function(e,t){return t||E(e,4,this.length),u.read(this,e,!1,23,4)},l.prototype.readDoubleLE=function(e,t){return t||E(e,8,this.length),u.read(this,e,!0,52,8)},l.prototype.readDoubleBE=function(e,t){return t||E(e,8,this.length),u.read(this,e,!1,52,8)},l.prototype.writeUIntLE=function(e,t,r,n){if(e=+e,t|=0,r|=0,!n){var o=Math.pow(2,8*r)-1;I(this,e,t,r,o,0)}var i=1,s=0;for(this[t]=255&e;++s<r&&(i*=256);)this[t+s]=e/i&255;return t+r},l.prototype.writeUIntBE=function(e,t,r,n){if(e=+e,t|=0,r|=0,!n){var o=Math.pow(2,8*r)-1;I(this,e,t,r,o,0)}var i=r-1,s=1;for(this[t+i]=255&e;--i>=0&&(s*=256);)this[t+i]=e/s&255;return t+r},l.prototype.writeUInt8=function(e,t,r){return e=+e,t|=0,r||I(this,e,t,1,255,0),l.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[t]=255&e,t+1},l.prototype.writeUInt16LE=function(e,t,r){return e=+e,t|=0,r||I(this,e,t,2,65535,0),l.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):C(this,e,t,!0),t+2},l.prototype.writeUInt16BE=function(e,t,r){return e=+e,t|=0,r||I(this,e,t,2,65535,0),l.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):C(this,e,t,!1),t+2},l.prototype.writeUInt32LE=function(e,t,r){return e=+e,t|=0,r||I(this,e,t,4,4294967295,0),l.TYPED_ARRAY_SUPPORT?(this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e):U(this,e,t,!0),t+4},l.prototype.writeUInt32BE=function(e,t,r){return e=+e,t|=0,r||I(this,e,t,4,4294967295,0),l.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):U(this,e,t,!1),t+4},l.prototype.writeIntLE=function(e,t,r,n){if(e=+e,t|=0,!n){var o=Math.pow(2,8*r-1);I(this,e,t,r,o-1,-o)}var i=0,s=1,a=0;for(this[t]=255&e;++i<r&&(s*=256);)e<0&&0===a&&0!==this[t+i-1]&&(a=1),this[t+i]=(e/s>>0)-a&255;return t+r},l.prototype.writeIntBE=function(e,t,r,n){if(e=+e,t|=0,!n){var o=Math.pow(2,8*r-1);I(this,e,t,r,o-1,-o)}var i=r-1,s=1,a=0;for(this[t+i]=255&e;--i>=0&&(s*=256);)e<0&&0===a&&0!==this[t+i+1]&&(a=1),this[t+i]=(e/s>>0)-a&255;return t+r},l.prototype.writeInt8=function(e,t,r){return e=+e,t|=0,r||I(this,e,t,1,127,-128),l.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),e<0&&(e=255+e+1),this[t]=255&e,t+1},l.prototype.writeInt16LE=function(e,t,r){return e=+e,t|=0,r||I(this,e,t,2,32767,-32768),l.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):C(this,e,t,!0),t+2},l.prototype.writeInt16BE=function(e,t,r){return e=+e,t|=0,r||I(this,e,t,2,32767,-32768),l.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):C(this,e,t,!1),t+2},l.prototype.writeInt32LE=function(e,t,r){return e=+e,t|=0,r||I(this,e,t,4,2147483647,-2147483648),l.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24):U(this,e,t,!0),t+4},l.prototype.writeInt32BE=function(e,t,r){return e=+e,t|=0,r||I(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),l.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):U(this,e,t,!1),t+4},l.prototype.writeFloatLE=function(e,t,r){return P(this,e,t,!0,r)},l.prototype.writeFloatBE=function(e,t,r){return P(this,e,t,!1,r)},l.prototype.writeDoubleLE=function(e,t,r){return x(this,e,t,!0,r)},l.prototype.writeDoubleBE=function(e,t,r){return x(this,e,t,!1,r)},// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
l.prototype.copy=function(e,t,r,n){// Copy 0 bytes; we're done
if(r||(r=0),n||0===n||(n=this.length),t>=e.length&&(t=e.length),t||(t=0),n>0&&n<r&&(n=r),n===r||0===e.length||0===this.length)return 0;// Fatal error conditions
if(t<0)throw RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw RangeError("sourceStart out of bounds");if(n<0)throw RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),e.length-t<n-r&&(n=e.length-t+r);var o,i=n-r;if(this===e&&r<t&&t<n)for(o=i-1;o>=0;--o)e[o+t]=this[o+r];else if(i<1e3||!l.TYPED_ARRAY_SUPPORT)for(o=0;o<i;++o)e[o+t]=this[o+r];else Uint8Array.prototype.set.call(e,this.subarray(r,r+i),t);return i},// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
l.prototype.fill=function(e,t,r,n){// Handle string cases:
if("string"==typeof e){if("string"==typeof t?(n=t,t=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),1===e.length){var o,i=e.charCodeAt(0);i<256&&(e=i)}if(void 0!==n&&"string"!=typeof n)throw TypeError("encoding must be a string");if("string"==typeof n&&!l.isEncoding(n))throw TypeError("Unknown encoding: "+n)}else"number"==typeof e&&(e&=255);// Invalid ranges are not set to a default, so can range check early.
if(t<0||this.length<t||this.length<r)throw RangeError("Out of range index");if(r<=t)return this;if(t>>>=0,r=void 0===r?this.length:r>>>0,e||(e=0),"number"==typeof e)for(o=t;o<r;++o)this[o]=e;else{var s=l.isBuffer(e)?e:R(new l(e,n).toString()),a=s.length;for(o=0;o<r-t;++o)this[o+t]=s[o%a]}return this};// HELPER FUNCTIONS
// ================
var k=/[^+\/0-9A-Za-z-_]/g;function R(e,t){t=t||1/0;for(var r,n=e.length,o=null,i=[],s=0;s<n;++s){// is surrogate component
if((r=e.charCodeAt(s))>55295&&r<57344){// last char was a lead
if(!o){// no lead yet
if(r>56319||s+1===n){// unexpected trail
(t-=3)>-1&&i.push(239,191,189);continue}// valid lead
o=r;continue}// 2 leads in a row
if(r<56320){(t-=3)>-1&&i.push(239,191,189),o=r;continue}// valid surrogate pair
r=(o-55296<<10|r-56320)+65536}else o&&(t-=3)>-1&&i.push(239,191,189);// encode utf8
if(o=null,r<128){if((t-=1)<0)break;i.push(r)}else if(r<2048){if((t-=2)<0)break;i.push(r>>6|192,63&r|128)}else if(r<65536){if((t-=3)<0)break;i.push(r>>12|224,r>>6&63|128,63&r|128)}else if(r<1114112){if((t-=4)<0)break;i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}else throw Error("Invalid code point")}return i}function O(e){for(var t=[],r=0;r<e.length;++r)t.push(255&e.charCodeAt(r));return t}function D(e){return a.toByteArray(function(e){var t;// Node converts strings with length < 2 to ''
if(// Node strips out invalid characters like \n and \t from the string, base64-js does not
(e=((t=e).trim?t.trim():t.replace(/^\s+|\s+$/g,"")).replace(k,"")).length<2)return"";// Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
for(;e.length%4!=0;)e+="=";return e}(e))}function F(e,t,r,n){for(var o=0;o<n&&!(o+r>=t.length)&&!(o>=e.length);++o)t[o+r]=e[o];return o}}),i("kuxul",function(t,r){e(t.exports,"toByteArray",()=>n,e=>n=e),e(t.exports,"fromByteArray",()=>o,e=>o=e),n=function(e){var t,r,n=function(e){var t=e.length;if(t%4>0)throw Error("Invalid string. Length must be a multiple of 4");// Trim off extra bytes after placeholder bytes are found
// See: https://github.com/beatgammit/base64-js/issues/42
var r=e.indexOf("=");-1===r&&(r=t);var n=r===t?0:4-r%4;return[r,n]}(e),o=n[0],i=n[1],u=new a((o+i)*3/4-i),c=0,f=i>0?o-4:o;for(r=0;r<f;r+=4)t=s[e.charCodeAt(r)]<<18|s[e.charCodeAt(r+1)]<<12|s[e.charCodeAt(r+2)]<<6|s[e.charCodeAt(r+3)],u[c++]=t>>16&255,u[c++]=t>>8&255,u[c++]=255&t;return 2===i&&(t=s[e.charCodeAt(r)]<<2|s[e.charCodeAt(r+1)]>>4,u[c++]=255&t),1===i&&(t=s[e.charCodeAt(r)]<<10|s[e.charCodeAt(r+1)]<<4|s[e.charCodeAt(r+2)]>>2,u[c++]=t>>8&255,u[c++]=255&t),u},o=function(e){// go through the array every three bytes, we'll deal with trailing stuff later
for(var t,r=e.length,n=r%3// if we have 1 byte left, pad 2 bytes
,o=[],s=0,a=r-n;s<a;s+=16383// must be multiple of 3
)o.push(function(e,t,r){for(var n,o=[],s=t;s<r;s+=3)o.push(i[(n=(e[s]<<16&16711680)+(e[s+1]<<8&65280)+(255&e[s+2]))>>18&63]+i[n>>12&63]+i[n>>6&63]+i[63&n]);return o.join("")}(e,s,s+16383>a?a:s+16383));return 1===n?o.push(i[(t=e[r-1])>>2]+i[t<<4&63]+"=="):2===n&&o.push(i[(t=(e[r-2]<<8)+e[r-1])>>10]+i[t>>4&63]+i[t<<2&63]+"="),o.join("")};for(var n,o,i=[],s=[],a="undefined"!=typeof Uint8Array?Uint8Array:Array,u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",c=0,f=u.length;c<f;++c)i[c]=u[c],s[u.charCodeAt(c)]=c;// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
s["-".charCodeAt(0)]=62,s["_".charCodeAt(0)]=63}),i("9NvM5",function(t,r){var n,o;e(t.exports,"read",()=>n,e=>n=e),e(t.exports,"write",()=>o,e=>o=e),n=function(e,t,r,n,o){var i,s,a=8*o-n-1,u=(1<<a)-1,c=u>>1,f=-7,h=r?o-1:0,l=r?-1:1,d=e[t+h];for(h+=l,i=d&(1<<-f)-1,d>>=-f,f+=a;f>0;i=256*i+e[t+h],h+=l,f-=8);for(s=i&(1<<-f)-1,i>>=-f,f+=n;f>0;s=256*s+e[t+h],h+=l,f-=8);if(0===i)i=1-c;else{if(i===u)return s?NaN:(d?-1:1)*(1/0);s+=Math.pow(2,n),i-=c}return(d?-1:1)*s*Math.pow(2,i-n)},o=function(e,t,r,n,o,i){var s,a,u,c=8*i-o-1,f=(1<<c)-1,h=f>>1,l=23===o?5960464477539062e-23:0,d=n?0:i-1,p=n?1:-1,g=t<0||0===t&&1/t<0?1:0;for(isNaN(t=Math.abs(t))||t===1/0?(a=isNaN(t)?1:0,s=f):(s=Math.floor(Math.log(t)/Math.LN2),t*(u=Math.pow(2,-s))<1&&(s--,u*=2),s+h>=1?t+=l/u:t+=l*Math.pow(2,1-h),t*u>=2&&(s++,u/=2),s+h>=f?(a=0,s=f):s+h>=1?(a=(t*u-1)*Math.pow(2,o),s+=h):(a=t*Math.pow(2,h-1)*Math.pow(2,o),s=0));o>=8;e[r+d]=255&a,d+=p,a/=256,o-=8);for(s=s<<o|a,c+=o;c>0;e[r+d]=255&s,d+=p,s/=256,c-=8);e[r+d-p]|=128*g}}),i("767Wy",function(e,t){var r={}.toString;e.exports=Array.isArray||function(e){return"[object Array]"==r.call(e)}}),i("8gx9f",function(t,r){e(t.exports,"default",()=>i);var n=o("fgwpu"),i=/*#__PURE__*/function(){function e(e,t){e=this.words=e||[],void 0!=t?this.sigBytes=t:this.sigBytes=4*e.length}var t=e.prototype;return t.random=function(t){for(var r=[],o=0;o<t;o+=4)r.push((0,n.default)());return new e(r,t)},t.toString=function(){return(/**
 * Hex encoding strategy.
 * Converts a word array to a hex string.
 * @param {WordArray} wordArray The word array.
 * @return {string} The hex string.
 * @static
 */function(e){for(var t=e.words,r=e.sigBytes,n=[],o=0;o<r;o++){var i=t[o>>>2]>>>24-o%4*8&255;n.push((i>>>4).toString(16)),n.push((15&i).toString(16))}return n.join("")}(this))},e}()}),i("fgwpu",function(r,n){var i;// Native crypto import via require (NodeJS)
if(e(r.exports,"default",()=>s),"undefined"!=typeof window&&window.crypto&&(i=window.crypto),!i&&"undefined"!=typeof window&&window.msCrypto&&(i=window.msCrypto),!i&&void 0!==t&&t.crypto&&(i=t.crypto),!i)try{i=o("kjyEk")}catch(e){}function s(){if(i){// Use getRandomValues method (Browser)
if("function"==typeof i.getRandomValues)try{return i.getRandomValues(new Uint32Array(1))[0]}catch(e){}// Use randomBytes method (NodeJS)
if("function"==typeof i.randomBytes)try{return i.randomBytes(4).readInt32LE()}catch(e){}}throw Error("Native crypto module could not be used to get secure random number.")}}),i("kjyEk",function(e,t){}),i("hMqoc",function(e,t){Object.defineProperty(e.exports,"__esModule",{value:!0}),(0,o("hOJwo").__exportStar)(o("5PPry"),e.exports)}),i("hOJwo",function(t,r){function n(e,t,r,n){return new(r||(r=Promise))(function(o,i){function s(e){try{u(n.next(e))}catch(e){i(e)}}function a(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t)})).then(s,a)}u((n=n.apply(e,t||[])).next())})}function o(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,n=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}}function i(e,t){for(var r in e)"default"===r||t.hasOwnProperty(r)||(t[r]=e[r])}e(t.exports,"__awaiter",()=>n),e(t.exports,"__generator",()=>o),e(t.exports,"__exportStar",()=>i)}),i("5PPry",function(e,t){Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.Sha256=void 0;var r=o("hOJwo"),n=o("1c8c5"),i=o("kr8mE"),s=o("8XVZm"),a=/** @class */function(){function e(e){if(this.hash=new i.RawSha256,e){this.outer=new i.RawSha256;var t=function(e){var t=(0,s.convertToBuffer)(e);if(t.byteLength>n.BLOCK_SIZE){var r=new i.RawSha256;r.update(t),t=r.digest()}var o=new Uint8Array(n.BLOCK_SIZE);return o.set(t),o}(e),r=new Uint8Array(n.BLOCK_SIZE);r.set(t);for(var o=0;o<n.BLOCK_SIZE;o++)t[o]^=54,r[o]^=92;this.hash.update(t),this.outer.update(r);// overwrite the copied key in memory
for(var o=0;o<t.byteLength;o++)t[o]=0}}return e.prototype.update=function(e){if(!(0,s.isEmptyData)(e)&&!this.error)try{this.hash.update((0,s.convertToBuffer)(e))}catch(e){this.error=e}},/* This synchronous method keeps compatibility
     * with the v2 aws-sdk.
     */e.prototype.digestSync=function(){if(this.error)throw this.error;return this.outer?(this.outer.finished||this.outer.update(this.hash.digest()),this.outer.digest()):this.hash.digest()},/* The underlying digest method here is synchronous.
     * To keep the same interface with the other hash functions
     * the default is to expose this as an async method.
     * However, it can sometimes be useful to have a sync method.
     */e.prototype.digest=function(){return(0,r.__awaiter)(this,void 0,void 0,function(){return(0,r.__generator)(this,function(e){return[2/*return*/,this.digestSync()]})})},e}();e.exports.Sha256=a}),i("1c8c5",function(e,t){Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.MAX_HASHABLE_LENGTH=e.exports.INIT=e.exports.KEY=e.exports.DIGEST_LENGTH=e.exports.BLOCK_SIZE=void 0,/**
 * @internal
 */e.exports.BLOCK_SIZE=64,/**
 * @internal
 */e.exports.DIGEST_LENGTH=32,/**
 * @internal
 */e.exports.KEY=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),/**
 * @internal
 */e.exports.INIT=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],/**
 * @internal
 */e.exports.MAX_HASHABLE_LENGTH=9007199254740991}),i("kr8mE",function(e,t){Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.RawSha256=void 0;var r=o("1c8c5"),n=/** @class */function(){function e(){this.state=Int32Array.from(r.INIT),this.temp=new Int32Array(64),this.buffer=new Uint8Array(64),this.bufferLength=0,this.bytesHashed=0,/**
         * @internal
         */this.finished=!1}return e.prototype.update=function(e){if(this.finished)throw Error("Attempted to update an already finished hash.");var t=0,n=e.byteLength;if(this.bytesHashed+=n,8*this.bytesHashed>r.MAX_HASHABLE_LENGTH)throw Error("Cannot hash more than 2^53 - 1 bits");for(;n>0;)this.buffer[this.bufferLength++]=e[t++],n--,this.bufferLength===r.BLOCK_SIZE&&(this.hashBuffer(),this.bufferLength=0)},e.prototype.digest=function(){if(!this.finished){var e=8*this.bytesHashed,t=new DataView(this.buffer.buffer,this.buffer.byteOffset,this.buffer.byteLength),n=this.bufferLength;// Ensure the final block has enough room for the hashed length
if(t.setUint8(this.bufferLength++,128),n%r.BLOCK_SIZE>=r.BLOCK_SIZE-8){for(var o=this.bufferLength;o<r.BLOCK_SIZE;o++)t.setUint8(o,0);this.hashBuffer(),this.bufferLength=0}for(var o=this.bufferLength;o<r.BLOCK_SIZE-8;o++)t.setUint8(o,0);t.setUint32(r.BLOCK_SIZE-8,Math.floor(e/4294967296),!0),t.setUint32(r.BLOCK_SIZE-4,e),this.hashBuffer(),this.finished=!0}for(var i=new Uint8Array(r.DIGEST_LENGTH),o=0;o<8;o++)i[4*o]=this.state[o]>>>24&255,i[4*o+1]=this.state[o]>>>16&255,i[4*o+2]=this.state[o]>>>8&255,i[4*o+3]=this.state[o]>>>0&255;return i},e.prototype.hashBuffer=function(){for(var e=this.buffer,t=this.state,n=t[0],o=t[1],i=t[2],s=t[3],a=t[4],u=t[5],c=t[6],f=t[7],h=0;h<r.BLOCK_SIZE;h++){if(h<16)this.temp[h]=(255&e[4*h])<<24|(255&e[4*h+1])<<16|(255&e[4*h+2])<<8|255&e[4*h+3];else{var l=this.temp[h-2],d=(l>>>17|l<<15)^(l>>>19|l<<13)^l>>>10,p=((l=this.temp[h-15])>>>7|l<<25)^(l>>>18|l<<14)^l>>>3;this.temp[h]=(d+this.temp[h-7]|0)+(p+this.temp[h-16]|0)}var g=(((a>>>6|a<<26)^(a>>>11|a<<21)^(a>>>25|a<<7))+(a&u^~a&c)|0)+(f+(r.KEY[h]+this.temp[h]|0)|0)|0,y=((n>>>2|n<<30)^(n>>>13|n<<19)^(n>>>22|n<<10))+(n&o^n&i^o&i)|0;f=c,c=u,u=a,a=s+g|0,s=i,i=o,o=n,n=g+y|0}t[0]+=n,t[1]+=o,t[2]+=i,t[3]+=s,t[4]+=a,t[5]+=u,t[6]+=c,t[7]+=f},e}();e.exports.RawSha256=n}),i("8XVZm",function(e,t){// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.uint32ArrayFrom=e.exports.numToUint8=e.exports.isEmptyData=e.exports.convertToBuffer=void 0;var r=o("j519d");Object.defineProperty(e.exports,"convertToBuffer",{enumerable:!0,get:function(){return r.convertToBuffer}});var n=o("7aVm5");Object.defineProperty(e.exports,"isEmptyData",{enumerable:!0,get:function(){return n.isEmptyData}});var i=o("lBxdf");Object.defineProperty(e.exports,"numToUint8",{enumerable:!0,get:function(){return i.numToUint8}});var s=o("3vXlk");Object.defineProperty(e.exports,"uint32ArrayFrom",{enumerable:!0,get:function(){return s.uint32ArrayFrom}})}),i("j519d",function(e,t){var r=o("6ZWSX").Buffer;// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.convertToBuffer=void 0;var n=o("f5Ly5"),i=void 0!==r&&r.from?function(e){return r.from(e,"utf8")}:n.fromUtf8;e.exports.convertToBuffer=function(e){return(// Already a Uint8, do nothing
e instanceof Uint8Array?e:"string"==typeof e?i(e):ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength/Uint8Array.BYTES_PER_ELEMENT):new Uint8Array(e))}}),i("6ZWSX",function(t,r){e(t.exports,"Buffer",()=>n,e=>n=e),e(t.exports,"INSPECT_MAX_BYTES",()=>i,e=>i=e);var n,i,s=o("kuxul"),a=o("9NvM5");let u="function"==typeof Symbol&&"function"// eslint-disable-line dot-notation
==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom")// eslint-disable-line dot-notation
:null;function c(e){if(e>2147483647)throw RangeError('The value "'+e+'" is invalid for option "size"');// Return an augmented `Uint8Array` instance
let t=new Uint8Array(e);return Object.setPrototypeOf(t,f.prototype),t}/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */function f(e,t,r){// Common case.
if("number"==typeof e){if("string"==typeof t)throw TypeError('The "string" argument must be of type string. Received type number');return d(e)}return h(e,t,r)}function h(e,t,r){if("string"==typeof e)return function(e,t){if(("string"!=typeof t||""===t)&&(t="utf8"),!f.isEncoding(t))throw TypeError("Unknown encoding: "+t);let r=0|v(e,t),n=c(r),o=n.write(e,t);return o!==r&&// cause everything after the first invalid character to be ignored. (e.g.
// 'abxxcd' will be treated as 'ab')
(n=n.slice(0,o)),n}(e,t);if(ArrayBuffer.isView(e))return function(e){if(j(e,Uint8Array)){let t=new Uint8Array(e);return g(t.buffer,t.byteOffset,t.byteLength)}return p(e)}(e);if(null==e)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e);if(j(e,ArrayBuffer)||e&&j(e.buffer,ArrayBuffer)||"undefined"!=typeof SharedArrayBuffer&&(j(e,SharedArrayBuffer)||e&&j(e.buffer,SharedArrayBuffer)))return g(e,t,r);if("number"==typeof e)throw TypeError('The "value" argument must not be of type number. Received type number');let n=e.valueOf&&e.valueOf();if(null!=n&&n!==e)return f.from(n,t,r);let o=function(e){var t;if(f.isBuffer(e)){let t=0|y(e.length),r=c(t);return 0===r.length||e.copy(r,0,0,t),r}return void 0!==e.length?"number"!=typeof e.length||(t=e.length)!=t// eslint-disable-line no-self-compare
?c(0):p(e):"Buffer"===e.type&&Array.isArray(e.data)?p(e.data):void 0}(e);if(o)return o;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof e[Symbol.toPrimitive])return f.from(e[Symbol.toPrimitive]("string"),t,r);throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e)}function l(e){if("number"!=typeof e)throw TypeError('"size" argument must be of type number');if(e<0)throw RangeError('The value "'+e+'" is invalid for option "size"')}function d(e){return l(e),c(e<0?0:0|y(e))}function p(e){let t=e.length<0?0:0|y(e.length),r=c(t);for(let n=0;n<t;n+=1)r[n]=255&e[n];return r}function g(e,t,r){let n;if(t<0||e.byteLength<t)throw RangeError('"offset" is outside of buffer bounds');if(e.byteLength<t+(r||0))throw RangeError('"length" is outside of buffer bounds');return(// Return an augmented `Uint8Array` instance
Object.setPrototypeOf(n=void 0===t&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,t):new Uint8Array(e,t,r),f.prototype),n)}function y(e){// Note: cannot use `length < K_MAX_LENGTH` here because that fails when
// length is NaN (which is otherwise coerced to zero.)
if(e>=2147483647)throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes");return 0|e}function v(e,t){if(f.isBuffer(e))return e.length;if(ArrayBuffer.isView(e)||j(e,ArrayBuffer))return e.byteLength;if("string"!=typeof e)throw TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof e);let r=e.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===r)return 0;// Use a for loop to avoid recursion
let o=!1;for(;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return N(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return M(e).length;default:if(o)return n?-1:N(e).length// assume utf8
;t=(""+t).toLowerCase(),o=!0}}function m(e,t,r){let n=!1;// Return early if start > this.length. Done here to prevent potential uint32
// coercion fail below.
if((void 0===t||t<0)&&(t=0),t>this.length||((void 0===r||r>this.length)&&(r=this.length),r<=0||// Force coercion to uint32. This will also coerce falsey/NaN values to 0.
(r>>>=0)<=(t>>>=0)))return"";for(e||(e="utf8");;)switch(e){case"hex":return function(e,t,r){let n=e.length;(!t||t<0)&&(t=0),(!r||r<0||r>n)&&(r=n);let o="";for(let n=t;n<r;++n)o+=V[e[n]];return o}(this,t,r);case"utf8":case"utf-8":return _(this,t,r);case"ascii":return function(e,t,r){let n="";r=Math.min(e.length,r);for(let o=t;o<r;++o)n+=String.fromCharCode(127&e[o]);return n}(this,t,r);case"latin1":case"binary":return function(e,t,r){let n="";r=Math.min(e.length,r);for(let o=t;o<r;++o)n+=String.fromCharCode(e[o]);return n}(this,t,r);case"base64":var o,i;return o=t,i=r,0===o&&i===this.length?s.fromByteArray(this):s.fromByteArray(this.slice(o,i));case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return function(e,t,r){let n=e.slice(t,r),o="";// If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
for(let e=0;e<n.length-1;e+=2)o+=String.fromCharCode(n[e]+256*n[e+1]);return o}(this,t,r);default:if(n)throw TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),n=!0}}function b(e,t,r){let n=e[t];e[t]=e[r],e[r]=n}// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function w(e,t,r,n,o){var i;// Empty buffer means no match
if(0===e.length)return -1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),(i=r=+r// Coerce to Number.
)!=i&&(r=o?0:e.length-1),r<0&&(r=e.length+r),r>=e.length){if(o)return -1;r=e.length-1}else if(r<0){if(!o)return -1;r=0}// Finally, search either indexOf (if dir is true) or lastIndexOf
if("string"==typeof t&&(t=f.from(t,n)),f.isBuffer(t))return(// Special case: looking for empty string/buffer always fails
0===t.length?-1:S(e,t,r,n,o));if("number"==typeof t)return(t&=255// Search for a byte value [0-255]
,"function"==typeof Uint8Array.prototype.indexOf)?o?Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):S(e,[t],r,n,o);throw TypeError("val must be string, number or Buffer")}function S(e,t,r,n,o){let i,s=1,a=e.length,u=t.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(e.length<2||t.length<2)return -1;s=2,a/=2,u/=2,r/=2}function c(e,t){return 1===s?e[t]:e.readUInt16BE(t*s)}if(o){let n=-1;for(i=r;i<a;i++)if(c(e,i)===c(t,-1===n?0:i-n)){if(-1===n&&(n=i),i-n+1===u)return n*s}else -1!==n&&(i-=i-n),n=-1}else for(r+u>a&&(r=a-u),i=r;i>=0;i--){let r=!0;for(let n=0;n<u;n++)if(c(e,i+n)!==c(t,n)){r=!1;break}if(r)return i}return -1}function _(e,t,r){r=Math.min(e.length,r);let n=[],o=t;for(;o<r;){let t=e[o],i=null,s=t>239?4:t>223?3:t>191?2:1;if(o+s<=r){let r,n,a,u;switch(s){case 1:t<128&&(i=t);break;case 2:(192&(r=e[o+1]))==128&&(u=(31&t)<<6|63&r)>127&&(i=u);break;case 3:r=e[o+1],n=e[o+2],(192&r)==128&&(192&n)==128&&(u=(15&t)<<12|(63&r)<<6|63&n)>2047&&(u<55296||u>57343)&&(i=u);break;case 4:r=e[o+1],n=e[o+2],a=e[o+3],(192&r)==128&&(192&n)==128&&(192&a)==128&&(u=(15&t)<<18|(63&r)<<12|(63&n)<<6|63&a)>65535&&u<1114112&&(i=u)}}null===i?(// we did not generate a valid codePoint so insert a
// replacement char (U+FFFD) and advance only 1 byte
i=65533,s=1):i>65535&&(// encode to utf16 (surrogate pair dance)
i-=65536,n.push(i>>>10&1023|55296),i=56320|1023&i),n.push(i),o+=s}return function(e){let t=e.length;if(t<=4096)return String.fromCharCode.apply(String,e)// avoid extra slice()
;// Decode in chunks to avoid "call stack size exceeded".
let r="",n=0;for(;n<t;)r+=String.fromCharCode.apply(String,e.slice(n,n+=4096));return r}(n)}/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */function A(e,t,r){if(e%1!=0||e<0)throw RangeError("offset is not uint");if(e+t>r)throw RangeError("Trying to access beyond buffer length")}function E(e,t,r,n,o,i){if(!f.isBuffer(e))throw TypeError('"buffer" argument must be a Buffer instance');if(t>o||t<i)throw RangeError('"value" argument is out of bounds');if(r+n>e.length)throw RangeError("Index out of range")}function I(e,t,r,n,o){O(t,n,o,e,r,7);let i=Number(t&BigInt(4294967295));e[r++]=i,i>>=8,e[r++]=i,i>>=8,e[r++]=i,i>>=8,e[r++]=i;let s=Number(t>>BigInt(32)&BigInt(4294967295));return e[r++]=s,s>>=8,e[r++]=s,s>>=8,e[r++]=s,s>>=8,e[r++]=s,r}function C(e,t,r,n,o){O(t,n,o,e,r,7);let i=Number(t&BigInt(4294967295));e[r+7]=i,i>>=8,e[r+6]=i,i>>=8,e[r+5]=i,i>>=8,e[r+4]=i;let s=Number(t>>BigInt(32)&BigInt(4294967295));return e[r+3]=s,s>>=8,e[r+2]=s,s>>=8,e[r+1]=s,s>>=8,e[r]=s,r+8}function U(e,t,r,n,o,i){if(r+n>e.length||r<0)throw RangeError("Index out of range")}function T(e,t,r,n,o){return t=+t,r>>>=0,o||U(e,t,r,4,34028234663852886e22,-34028234663852886e22),a.write(e,t,r,n,23,4),r+4}function P(e,t,r,n,o){return t=+t,r>>>=0,o||U(e,t,r,8,17976931348623157e292,-17976931348623157e292),a.write(e,t,r,n,52,8),r+8}n=f,i=50,/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */f.TYPED_ARRAY_SUPPORT=function(){// Can typed array instances can be augmented?
try{let e=new Uint8Array(1),t={foo:function(){return 42}};return Object.setPrototypeOf(t,Uint8Array.prototype),Object.setPrototypeOf(e,t),42===e.foo()}catch(e){return!1}}(),f.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(f.prototype,"parent",{enumerable:!0,get:function(){if(f.isBuffer(this))return this.buffer}}),Object.defineProperty(f.prototype,"offset",{enumerable:!0,get:function(){if(f.isBuffer(this))return this.byteOffset}}),f.poolSize=8192// not used by this implementation
,/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/f.from=function(e,t,r){return h(e,t,r)},// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(f.prototype,Uint8Array.prototype),Object.setPrototypeOf(f,Uint8Array),/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/f.alloc=function(e,t,r){return(l(e),e<=0)?c(e):void 0!==t?"string"==typeof r?c(e).fill(t,r):c(e).fill(t):c(e)},/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */f.allocUnsafe=function(e){return d(e)},/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */f.allocUnsafeSlow=function(e){return d(e)},f.isBuffer=function(e){return null!=e&&!0===e._isBuffer&&e!==f.prototype// so Buffer.isBuffer(Buffer.prototype) will be false
},f.compare=function(e,t){if(j(e,Uint8Array)&&(e=f.from(e,e.offset,e.byteLength)),j(t,Uint8Array)&&(t=f.from(t,t.offset,t.byteLength)),!f.isBuffer(e)||!f.isBuffer(t))throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===t)return 0;let r=e.length,n=t.length;for(let o=0,i=Math.min(r,n);o<i;++o)if(e[o]!==t[o]){r=e[o],n=t[o];break}return r<n?-1:n<r?1:0},f.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},f.concat=function(e,t){let r;if(!Array.isArray(e))throw TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return f.alloc(0);if(void 0===t)for(r=0,t=0;r<e.length;++r)t+=e[r].length;let n=f.allocUnsafe(t),o=0;for(r=0;r<e.length;++r){let t=e[r];if(j(t,Uint8Array))o+t.length>n.length?(f.isBuffer(t)||(t=f.from(t)),t.copy(n,o)):Uint8Array.prototype.set.call(n,t,o);else if(f.isBuffer(t))t.copy(n,o);else throw TypeError('"list" argument must be an Array of Buffers');o+=t.length}return n},f.byteLength=v,// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
f.prototype._isBuffer=!0,f.prototype.swap16=function(){let e=this.length;if(e%2!=0)throw RangeError("Buffer size must be a multiple of 16-bits");for(let t=0;t<e;t+=2)b(this,t,t+1);return this},f.prototype.swap32=function(){let e=this.length;if(e%4!=0)throw RangeError("Buffer size must be a multiple of 32-bits");for(let t=0;t<e;t+=4)b(this,t,t+3),b(this,t+1,t+2);return this},f.prototype.swap64=function(){let e=this.length;if(e%8!=0)throw RangeError("Buffer size must be a multiple of 64-bits");for(let t=0;t<e;t+=8)b(this,t,t+7),b(this,t+1,t+6),b(this,t+2,t+5),b(this,t+3,t+4);return this},f.prototype.toString=function(){let e=this.length;return 0===e?"":0==arguments.length?_(this,0,e):m.apply(this,arguments)},f.prototype.toLocaleString=f.prototype.toString,f.prototype.equals=function(e){if(!f.isBuffer(e))throw TypeError("Argument must be a Buffer");return this===e||0===f.compare(this,e)},f.prototype.inspect=function(){let e="",t=i;return e=this.toString("hex",0,t).replace(/(.{2})/g,"$1 ").trim(),this.length>t&&(e+=" ... "),"<Buffer "+e+">"},u&&(f.prototype[u]=f.prototype.inspect),f.prototype.compare=function(e,t,r,n,o){if(j(e,Uint8Array)&&(e=f.from(e,e.offset,e.byteLength)),!f.isBuffer(e))throw TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(void 0===t&&(t=0),void 0===r&&(r=e?e.length:0),void 0===n&&(n=0),void 0===o&&(o=this.length),t<0||r>e.length||n<0||o>this.length)throw RangeError("out of range index");if(n>=o&&t>=r)return 0;if(n>=o)return -1;if(t>=r)return 1;if(t>>>=0,r>>>=0,n>>>=0,o>>>=0,this===e)return 0;let i=o-n,s=r-t,a=Math.min(i,s),u=this.slice(n,o),c=e.slice(t,r);for(let e=0;e<a;++e)if(u[e]!==c[e]){i=u[e],s=c[e];break}return i<s?-1:s<i?1:0},f.prototype.includes=function(e,t,r){return -1!==this.indexOf(e,t,r)},f.prototype.indexOf=function(e,t,r){return w(this,e,t,r,!0)},f.prototype.lastIndexOf=function(e,t,r){return w(this,e,t,r,!1)},f.prototype.write=function(e,t,r,n){var o,i,s,a,u,c,f,h;// Buffer#write(string)
if(void 0===t)n="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)n=t,r=this.length,t=0;else if(isFinite(t))t>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0);else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let l=this.length-t;if((void 0===r||r>l)&&(r=l),e.length>0&&(r<0||t<0)||t>this.length)throw RangeError("Attempt to write outside buffer bounds");n||(n="utf8");let d=!1;for(;;)switch(n){case"hex":return function(e,t,r,n){let o;r=Number(r)||0;let i=e.length-r;n?(n=Number(n))>i&&(n=i):n=i;let s=t.length;for(n>s/2&&(n=s/2),o=0;o<n;++o){let n=parseInt(t.substr(2*o,2),16);if(n!=n)break;e[r+o]=n}return o}(this,e,t,r);case"utf8":case"utf-8":return o=t,i=r,L(N(e,this.length-o),this,o,i);case"ascii":case"latin1":case"binary":return s=t,a=r,L(function(e){let t=[];for(let r=0;r<e.length;++r)t.push(255&e.charCodeAt(r));return t}(e),this,s,a);case"base64":// Warning: maxLength not taken into account in base64Write
return u=t,c=r,L(M(e),this,u,c);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return f=t,h=r,L(function(e,t){let r,n;let o=[];for(let i=0;i<e.length&&!((t-=2)<0);++i)n=(r=e.charCodeAt(i))>>8,o.push(r%256),o.push(n);return o}(e,this.length-f),this,f,h);default:if(d)throw TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),d=!0}},f.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},f.prototype.slice=function(e,t){let r=this.length;e=~~e,t=void 0===t?r:~~t,e<0?(e+=r)<0&&(e=0):e>r&&(e=r),t<0?(t+=r)<0&&(t=0):t>r&&(t=r),t<e&&(t=e);let n=this.subarray(e,t);return(// Return an augmented `Uint8Array` instance
Object.setPrototypeOf(n,f.prototype),n)},f.prototype.readUintLE=f.prototype.readUIntLE=function(e,t,r){e>>>=0,t>>>=0,r||A(e,t,this.length);let n=this[e],o=1,i=0;for(;++i<t&&(o*=256);)n+=this[e+i]*o;return n},f.prototype.readUintBE=f.prototype.readUIntBE=function(e,t,r){e>>>=0,t>>>=0,r||A(e,t,this.length);let n=this[e+--t],o=1;for(;t>0&&(o*=256);)n+=this[e+--t]*o;return n},f.prototype.readUint8=f.prototype.readUInt8=function(e,t){return e>>>=0,t||A(e,1,this.length),this[e]},f.prototype.readUint16LE=f.prototype.readUInt16LE=function(e,t){return e>>>=0,t||A(e,2,this.length),this[e]|this[e+1]<<8},f.prototype.readUint16BE=f.prototype.readUInt16BE=function(e,t){return e>>>=0,t||A(e,2,this.length),this[e]<<8|this[e+1]},f.prototype.readUint32LE=f.prototype.readUInt32LE=function(e,t){return e>>>=0,t||A(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},f.prototype.readUint32BE=f.prototype.readUInt32BE=function(e,t){return e>>>=0,t||A(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},f.prototype.readBigUInt64LE=K(function(e){D(e>>>=0,"offset");let t=this[e],r=this[e+7];(void 0===t||void 0===r)&&F(e,this.length-8);let n=t+256*this[++e]+65536*this[++e]+16777216*this[++e],o=this[++e]+256*this[++e]+65536*this[++e]+16777216*r;return BigInt(n)+(BigInt(o)<<BigInt(32))}),f.prototype.readBigUInt64BE=K(function(e){D(e>>>=0,"offset");let t=this[e],r=this[e+7];(void 0===t||void 0===r)&&F(e,this.length-8);let n=16777216*t+65536*this[++e]+256*this[++e]+this[++e],o=16777216*this[++e]+65536*this[++e]+256*this[++e]+r;return(BigInt(n)<<BigInt(32))+BigInt(o)}),f.prototype.readIntLE=function(e,t,r){e>>>=0,t>>>=0,r||A(e,t,this.length);let n=this[e],o=1,i=0;for(;++i<t&&(o*=256);)n+=this[e+i]*o;return n>=(o*=128)&&(n-=Math.pow(2,8*t)),n},f.prototype.readIntBE=function(e,t,r){e>>>=0,t>>>=0,r||A(e,t,this.length);let n=t,o=1,i=this[e+--n];for(;n>0&&(o*=256);)i+=this[e+--n]*o;return i>=(o*=128)&&(i-=Math.pow(2,8*t)),i},f.prototype.readInt8=function(e,t){return(e>>>=0,t||A(e,1,this.length),128&this[e])?-((255-this[e]+1)*1):this[e]},f.prototype.readInt16LE=function(e,t){e>>>=0,t||A(e,2,this.length);let r=this[e]|this[e+1]<<8;return 32768&r?4294901760|r:r},f.prototype.readInt16BE=function(e,t){e>>>=0,t||A(e,2,this.length);let r=this[e+1]|this[e]<<8;return 32768&r?4294901760|r:r},f.prototype.readInt32LE=function(e,t){return e>>>=0,t||A(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},f.prototype.readInt32BE=function(e,t){return e>>>=0,t||A(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},f.prototype.readBigInt64LE=K(function(e){D(e>>>=0,"offset");let t=this[e],r=this[e+7];(void 0===t||void 0===r)&&F(e,this.length-8);let n=this[e+4]+256*this[e+5]+65536*this[e+6]+(r<<24// Overflow
);return(BigInt(n)<<BigInt(32))+BigInt(t+256*this[++e]+65536*this[++e]+16777216*this[++e])}),f.prototype.readBigInt64BE=K(function(e){D(e>>>=0,"offset");let t=this[e],r=this[e+7];(void 0===t||void 0===r)&&F(e,this.length-8);let n=(t<<24)+// Overflow
65536*this[++e]+256*this[++e]+this[++e];return(BigInt(n)<<BigInt(32))+BigInt(16777216*this[++e]+65536*this[++e]+256*this[++e]+r)}),f.prototype.readFloatLE=function(e,t){return e>>>=0,t||A(e,4,this.length),a.read(this,e,!0,23,4)},f.prototype.readFloatBE=function(e,t){return e>>>=0,t||A(e,4,this.length),a.read(this,e,!1,23,4)},f.prototype.readDoubleLE=function(e,t){return e>>>=0,t||A(e,8,this.length),a.read(this,e,!0,52,8)},f.prototype.readDoubleBE=function(e,t){return e>>>=0,t||A(e,8,this.length),a.read(this,e,!1,52,8)},f.prototype.writeUintLE=f.prototype.writeUIntLE=function(e,t,r,n){if(e=+e,t>>>=0,r>>>=0,!n){let n=Math.pow(2,8*r)-1;E(this,e,t,r,n,0)}let o=1,i=0;for(this[t]=255&e;++i<r&&(o*=256);)this[t+i]=e/o&255;return t+r},f.prototype.writeUintBE=f.prototype.writeUIntBE=function(e,t,r,n){if(e=+e,t>>>=0,r>>>=0,!n){let n=Math.pow(2,8*r)-1;E(this,e,t,r,n,0)}let o=r-1,i=1;for(this[t+o]=255&e;--o>=0&&(i*=256);)this[t+o]=e/i&255;return t+r},f.prototype.writeUint8=f.prototype.writeUInt8=function(e,t,r){return e=+e,t>>>=0,r||E(this,e,t,1,255,0),this[t]=255&e,t+1},f.prototype.writeUint16LE=f.prototype.writeUInt16LE=function(e,t,r){return e=+e,t>>>=0,r||E(this,e,t,2,65535,0),this[t]=255&e,this[t+1]=e>>>8,t+2},f.prototype.writeUint16BE=f.prototype.writeUInt16BE=function(e,t,r){return e=+e,t>>>=0,r||E(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=255&e,t+2},f.prototype.writeUint32LE=f.prototype.writeUInt32LE=function(e,t,r){return e=+e,t>>>=0,r||E(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e,t+4},f.prototype.writeUint32BE=f.prototype.writeUInt32BE=function(e,t,r){return e=+e,t>>>=0,r||E(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},f.prototype.writeBigUInt64LE=K(function(e,t=0){return I(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))}),f.prototype.writeBigUInt64BE=K(function(e,t=0){return C(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))}),f.prototype.writeIntLE=function(e,t,r,n){if(e=+e,t>>>=0,!n){let n=Math.pow(2,8*r-1);E(this,e,t,r,n-1,-n)}let o=0,i=1,s=0;for(this[t]=255&e;++o<r&&(i*=256);)e<0&&0===s&&0!==this[t+o-1]&&(s=1),this[t+o]=(e/i>>0)-s&255;return t+r},f.prototype.writeIntBE=function(e,t,r,n){if(e=+e,t>>>=0,!n){let n=Math.pow(2,8*r-1);E(this,e,t,r,n-1,-n)}let o=r-1,i=1,s=0;for(this[t+o]=255&e;--o>=0&&(i*=256);)e<0&&0===s&&0!==this[t+o+1]&&(s=1),this[t+o]=(e/i>>0)-s&255;return t+r},f.prototype.writeInt8=function(e,t,r){return e=+e,t>>>=0,r||E(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=255&e,t+1},f.prototype.writeInt16LE=function(e,t,r){return e=+e,t>>>=0,r||E(this,e,t,2,32767,-32768),this[t]=255&e,this[t+1]=e>>>8,t+2},f.prototype.writeInt16BE=function(e,t,r){return e=+e,t>>>=0,r||E(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=255&e,t+2},f.prototype.writeInt32LE=function(e,t,r){return e=+e,t>>>=0,r||E(this,e,t,4,2147483647,-2147483648),this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},f.prototype.writeInt32BE=function(e,t,r){return e=+e,t>>>=0,r||E(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},f.prototype.writeBigInt64LE=K(function(e,t=0){return I(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),f.prototype.writeBigInt64BE=K(function(e,t=0){return C(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),f.prototype.writeFloatLE=function(e,t,r){return T(this,e,t,!0,r)},f.prototype.writeFloatBE=function(e,t,r){return T(this,e,t,!1,r)},f.prototype.writeDoubleLE=function(e,t,r){return P(this,e,t,!0,r)},f.prototype.writeDoubleBE=function(e,t,r){return P(this,e,t,!1,r)},// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
f.prototype.copy=function(e,t,r,n){if(!f.isBuffer(e))throw TypeError("argument should be a Buffer");// Copy 0 bytes; we're done
if(r||(r=0),n||0===n||(n=this.length),t>=e.length&&(t=e.length),t||(t=0),n>0&&n<r&&(n=r),n===r||0===e.length||0===this.length)return 0;// Fatal error conditions
if(t<0)throw RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw RangeError("Index out of range");if(n<0)throw RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),e.length-t<n-r&&(n=e.length-t+r);let o=n-r;return this===e&&"function"==typeof Uint8Array.prototype.copyWithin?this.copyWithin(t,r,n):Uint8Array.prototype.set.call(e,this.subarray(r,n),t),o},// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
f.prototype.fill=function(e,t,r,n){let o;// Handle string cases:
if("string"==typeof e){if("string"==typeof t?(n=t,t=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),void 0!==n&&"string"!=typeof n)throw TypeError("encoding must be a string");if("string"==typeof n&&!f.isEncoding(n))throw TypeError("Unknown encoding: "+n);if(1===e.length){let t=e.charCodeAt(0);("utf8"===n&&t<128||"latin1"===n)&&(e=t)}}else"number"==typeof e?e&=255:"boolean"==typeof e&&(e=Number(e));// Invalid ranges are not set to a default, so can range check early.
if(t<0||this.length<t||this.length<r)throw RangeError("Out of range index");if(r<=t)return this;if(t>>>=0,r=void 0===r?this.length:r>>>0,e||(e=0),"number"==typeof e)for(o=t;o<r;++o)this[o]=e;else{let i=f.isBuffer(e)?e:f.from(e,n),s=i.length;if(0===s)throw TypeError('The value "'+e+'" is invalid for argument "value"');for(o=0;o<r-t;++o)this[o+t]=i[o%s]}return this};// CUSTOM ERRORS
// =============
// Simplified versions from Node, changed for Buffer-only usage
let x={};function k(e,t,r){x[e]=class extends r{constructor(){super(),Object.defineProperty(this,"message",{value:t.apply(this,arguments),writable:!0,configurable:!0}),// Add the error code to the name to include it in the stack trace.
this.name=`${this.name} [${e}]`,// Access the stack to generate the error message including the error code
// from the name.
this.stack// eslint-disable-line no-unused-expressions
,// Reset the name to the actual name.
delete this.name}get code(){return e}set code(e){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:e,writable:!0})}toString(){return`${this.name} [${e}]: ${this.message}`}}}function R(e){let t="",r=e.length,n="-"===e[0]?1:0;for(;r>=n+4;r-=3)t=`_${e.slice(r-3,r)}${t}`;return`${e.slice(0,r)}${t}`}function O(e,t,r,n,o,i){if(e>r||e<t){let n;let o="bigint"==typeof t?"n":"";throw n=i>3?0===t||t===BigInt(0)?`>= 0${o} and < 2${o} ** ${(i+1)*8}${o}`:`>= -(2${o} ** ${(i+1)*8-1}${o}) and < 2 ** ${(i+1)*8-1}${o}`:`>= ${t}${o} and <= ${r}${o}`,new x.ERR_OUT_OF_RANGE("value",n,e)}D(o,"offset"),(void 0===n[o]||void 0===n[o+i])&&F(o,n.length-(i+1))}function D(e,t){if("number"!=typeof e)throw new x.ERR_INVALID_ARG_TYPE(t,"number",e)}function F(e,t,r){if(Math.floor(e)!==e)throw D(e,r),new x.ERR_OUT_OF_RANGE(r||"offset","an integer",e);if(t<0)throw new x.ERR_BUFFER_OUT_OF_BOUNDS;throw new x.ERR_OUT_OF_RANGE(r||"offset",`>= ${r?1:0} and <= ${t}`,e)}k("ERR_BUFFER_OUT_OF_BOUNDS",function(e){return e?`${e} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError),k("ERR_INVALID_ARG_TYPE",function(e,t){return`The "${e}" argument must be of type number. Received type ${typeof t}`},TypeError),k("ERR_OUT_OF_RANGE",function(e,t,r){let n=`The value of "${e}" is out of range.`,o=r;return Number.isInteger(r)&&Math.abs(r)>4294967296?o=R(String(r)):"bigint"==typeof r&&(o=String(r),(r>BigInt(2)**BigInt(32)||r<-(BigInt(2)**BigInt(32)))&&(o=R(o)),o+="n"),n+=` It must be ${t}. Received ${o}`},RangeError);// HELPER FUNCTIONS
// ================
let B=/[^+/0-9A-Za-z-_]/g;function N(e,t){let r;t=t||1/0;let n=e.length,o=null,i=[];for(let s=0;s<n;++s){// is surrogate component
if((r=e.charCodeAt(s))>55295&&r<57344){// last char was a lead
if(!o){// no lead yet
if(r>56319||s+1===n){// unexpected trail
(t-=3)>-1&&i.push(239,191,189);continue}// valid lead
o=r;continue}// 2 leads in a row
if(r<56320){(t-=3)>-1&&i.push(239,191,189),o=r;continue}// valid surrogate pair
r=(o-55296<<10|r-56320)+65536}else o&&(t-=3)>-1&&i.push(239,191,189);// encode utf8
if(o=null,r<128){if((t-=1)<0)break;i.push(r)}else if(r<2048){if((t-=2)<0)break;i.push(r>>6|192,63&r|128)}else if(r<65536){if((t-=3)<0)break;i.push(r>>12|224,r>>6&63|128,63&r|128)}else if(r<1114112){if((t-=4)<0)break;i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}else throw Error("Invalid code point")}return i}function M(e){return s.toByteArray(function(e){// Node converts strings with length < 2 to ''
if(// Node strips out invalid characters like \n and \t from the string, base64-js does not
(e=// Node takes equal signs as end of the Base64 encoding
(e=e.split("=")[0]).trim().replace(B,"")).length<2)return"";// Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
for(;e.length%4!=0;)e+="=";return e}(e))}function L(e,t,r,n){let o;for(o=0;o<n&&!(o+r>=t.length)&&!(o>=e.length);++o)t[o+r]=e[o];return o}// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function j(e,t){return e instanceof t||null!=e&&null!=e.constructor&&null!=e.constructor.name&&e.constructor.name===t.name}// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
let V=function(){let e="0123456789abcdef",t=Array(256);for(let r=0;r<16;++r){let n=16*r;for(let o=0;o<16;++o)t[n+o]=e[r]+e[o]}return t}();// Return not function with Error if BigInt not supported
function K(e){return"undefined"==typeof BigInt?H:e}function H(){throw Error("BigInt not supported")}}),i("f5Ly5",function(t,r){e(t.exports,"fromUtf8",()=>s);var n=o("fv73a"),i=o("fVPwZ"),s=function(e){return"function"==typeof TextEncoder?(0,i.fromUtf8)(e):(0,n.fromUtf8)(e)}}),i("fv73a",function(t,r){e(t.exports,"fromUtf8",()=>n),e(t.exports,"toUtf8",()=>o);/**
 * Converts a JS string from its native UCS-2/UTF-16 representation into a
 * Uint8Array of the bytes used to represent the equivalent characters in UTF-8.
 *
 * Cribbed from the `goog.crypt.stringToUtf8ByteArray` function in the Google
 * Closure library, though updated to use typed arrays.
 */var n=function(e){for(var t=[],r=0,n=e.length;r<n;r++){var o=e.charCodeAt(r);if(o<128)t.push(o);else if(o<2048)t.push(o>>6|192,63&o|128);else if(r+1<e.length&&(64512&o)==55296&&(64512&e.charCodeAt(r+1))==56320){var i=65536+((1023&o)<<10)+(1023&e.charCodeAt(++r));t.push(i>>18|240,i>>12&63|128,i>>6&63|128,63&i|128)}else t.push(o>>12|224,o>>6&63|128,63&o|128)}return Uint8Array.from(t)},o=function(e){for(var t="",r=0,n=e.length;r<n;r++){var o=e[r];o<128?t+=String.fromCharCode(o):192<=o&&o<224?t+=String.fromCharCode((31&o)<<6|63&e[++r]):240<=o&&o<365?t+=decodeURIComponent("%"+[o,e[++r],e[++r],e[++r]].map(function(e){return e.toString(16)}).join("%")):t+=String.fromCharCode((15&o)<<12|(63&e[++r])<<6|63&e[++r])}return t}}),i("fVPwZ",function(t,r){function n(e){return new TextEncoder().encode(e)}function o(e){return new TextDecoder("utf-8").decode(e)}e(t.exports,"fromUtf8",()=>n),e(t.exports,"toUtf8",()=>o)}),i("7aVm5",function(e,t){// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.isEmptyData=void 0,e.exports.isEmptyData=function(e){return"string"==typeof e?0===e.length:0===e.byteLength}}),i("lBxdf",function(e,t){// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.numToUint8=void 0,e.exports.numToUint8=function(e){return new Uint8Array([(4278190080&e)>>24,(16711680&e)>>16,(65280&e)>>8,255&e])}}),i("3vXlk",function(e,t){// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.uint32ArrayFrom=void 0,e.exports.uint32ArrayFrom=// IE 11 does not support Array.from, so we do it manually
function(e){if(!Array.from){for(var t=new Uint32Array(e.length);0<e.length;)t[0]=e[0];return t}return Uint32Array.from(e)}}),i("6BaWr",function(t,r){e(t.exports,"default",()=>s);// A small implementation of BigInteger based on http://www-cs-students.stanford.edu/~tjw/jsbn/
//
// All public methods have been removed except the following:
//   new BigInteger(a, b) (only radix 2, 4, 8, 16 and 32 supported)
//   toString (only radix 2, 4, 8, 16 and 32 supported)
//   negate
//   abs
//   compareTo
//   bitLength
//   mod
//   equals
//   add
//   subtract
//   multiply
//   divide
//   modPow
var n,o,i,s=a;/*
 * Copyright (c) 2003-2005  Tom Wu
 * All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY
 * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
 *
 * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
 * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
 * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
 * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
 * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * In addition, the following condition applies:
 *
 * All redistributions must retain an intact copy of this copyright notice
 * and disclaimer.
 */// (public) Constructor
function a(e,t){null!=e&&this.fromString(e,t)}// return new, unset BigInteger
function u(){return new a(null)}var c="undefined"!=typeof navigator;c&&"Microsoft Internet Explorer"==navigator.appName?(a.prototype.am=// am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
function(e,t,r,n,o,i){for(var s=32767&t,a=t>>15;--i>=0;){var u=32767&this[e],c=this[e++]>>15,f=a*u+c*s;o=((u=s*u+((32767&f)<<15)+r[n]+(1073741823&o))>>>30)+(f>>>15)+a*c+(o>>>30),r[n++]=1073741823&u}return o},n=30):c&&"Netscape"!=navigator.appName?(a.prototype.am=// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.
// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
function(e,t,r,n,o,i){for(;--i>=0;){var s=t*this[e++]+r[n]+o;o=Math.floor(s/67108864),r[n++]=67108863&s}return o},n=26):(// Mozilla/Netscape seems to prefer am3
a.prototype.am=// Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.
function(e,t,r,n,o,i){for(var s=16383&t,a=t>>14;--i>=0;){var u=16383&this[e],c=this[e++]>>14,f=a*u+c*s;o=((u=s*u+((16383&f)<<14)+r[n]+o)>>28)+(f>>14)+a*c,r[n++]=268435455&u}return o},n=28),a.prototype.DB=n,a.prototype.DM=(1<<n)-1,a.prototype.DV=1<<n,a.prototype.FV=4503599627370496,a.prototype.F1=52-n,a.prototype.F2=2*n-52;var f=[];for(i=0,o=48;i<=9;++i)f[o++]=i;for(i=10,o=97;i<36;++i)f[o++]=i;for(i=10,o=65;i<36;++i)f[o++]=i;function h(e){return"0123456789abcdefghijklmnopqrstuvwxyz".charAt(e)}// return bigint initialized to value
function l(e){var t=u();return t.fromInt(e),t}// returns bit length of the integer x
function d(e){var t,r=1;return 0!=(t=e>>>16)&&(e=t,r+=16),0!=(t=e>>8)&&(e=t,r+=8),0!=(t=e>>4)&&(e=t,r+=4),0!=(t=e>>2)&&(e=t,r+=2),0!=(t=e>>1)&&(e=t,r+=1),r}// Montgomery reduction
function p(e){this.m=e,this.mp=e.invDigit(),this.mpl=32767&this.mp,this.mph=this.mp>>15,this.um=(1<<e.DB-15)-1,this.mt2=2*e.t}p.prototype.convert=// xR mod m
function(e){var t=u();return e.abs().dlShiftTo(this.m.t,t),t.divRemTo(this.m,null,t),e.s<0&&t.compareTo(a.ZERO)>0&&this.m.subTo(t,t),t},p.prototype.revert=// x/R mod m
function(e){var t=u();return e.copyTo(t),this.reduce(t),t},p.prototype.reduce=// x = x/R mod m (HAC 14.32)
function(e){for(;e.t<=this.mt2;)e[e.t++]=0;for(var t=0;t<this.m.t;++t){// faster way of calculating u0 = x[i]*mp mod DV
var r=32767&e[t],n=r*this.mpl+((r*this.mph+(e[t]>>15)*this.mpl&this.um)<<15)&e.DM;// propagate carry
for(// use am to combine the multiply-shift-add into one call
r=t+this.m.t,e[r]+=this.m.am(0,n,e,t,0,this.m.t);e[r]>=e.DV;)e[r]-=e.DV,e[++r]++}e.clamp(),e.drShiftTo(this.m.t,e),e.compareTo(this.m)>=0&&e.subTo(this.m,e)},p.prototype.mulTo=// r = "xy/R mod m"; x,y != r
function(e,t,r){e.multiplyTo(t,r),this.reduce(r)},p.prototype.sqrTo=// r = "x^2/R mod m"; x != r
function(e,t){e.squareTo(t),this.reduce(t)},// protected
a.prototype.copyTo=// (protected) copy this to r
function(e){for(var t=this.t-1;t>=0;--t)e[t]=this[t];e.t=this.t,e.s=this.s},a.prototype.fromInt=// (protected) set from integer value x, -DV <= x < DV
function(e){this.t=1,this.s=e<0?-1:0,e>0?this[0]=e:e<-1?this[0]=e+this.DV:this.t=0},a.prototype.fromString=// (protected) set from string and radix
function(e,t){if(16==t)r=4;else if(8==t)r=3;else if(2==t)r=1;else if(32==t)r=5;else if(4==t)r=2;else throw Error("Only radix 2, 4, 8, 16, 32 are supported");this.t=0,this.s=0;for(var r,n=e.length,o=!1,i=0;--n>=0;){var s=function(e,t){var r=f[e.charCodeAt(t)];return null==r?-1:r}(e,n);if(s<0){"-"==e.charAt(n)&&(o=!0);continue}o=!1,0==i?this[this.t++]=s:i+r>this.DB?(this[this.t-1]|=(s&(1<<this.DB-i)-1)<<i,this[this.t++]=s>>this.DB-i):this[this.t-1]|=s<<i,(i+=r)>=this.DB&&(i-=this.DB)}this.clamp(),o&&a.ZERO.subTo(this,this)},a.prototype.clamp=// (protected) clamp off excess high words
function(){for(var e=this.s&this.DM;this.t>0&&this[this.t-1]==e;)--this.t},a.prototype.dlShiftTo=// (protected) r = this << n*DB
function(e,t){var r;for(r=this.t-1;r>=0;--r)t[r+e]=this[r];for(r=e-1;r>=0;--r)t[r]=0;t.t=this.t+e,t.s=this.s},a.prototype.drShiftTo=// (protected) r = this >> n*DB
function(e,t){for(var r=e;r<this.t;++r)t[r-e]=this[r];t.t=Math.max(this.t-e,0),t.s=this.s},a.prototype.lShiftTo=// (protected) r = this << n
function(e,t){var r,n=e%this.DB,o=this.DB-n,i=(1<<o)-1,s=Math.floor(e/this.DB),a=this.s<<n&this.DM;for(r=this.t-1;r>=0;--r)t[r+s+1]=this[r]>>o|a,a=(this[r]&i)<<n;for(r=s-1;r>=0;--r)t[r]=0;t[s]=a,t.t=this.t+s+1,t.s=this.s,t.clamp()},a.prototype.rShiftTo=// (protected) r = this >> n
function(e,t){t.s=this.s;var r=Math.floor(e/this.DB);if(r>=this.t){t.t=0;return}var n=e%this.DB,o=this.DB-n,i=(1<<n)-1;t[0]=this[r]>>n;for(var s=r+1;s<this.t;++s)t[s-r-1]|=(this[s]&i)<<o,t[s-r]=this[s]>>n;n>0&&(t[this.t-r-1]|=(this.s&i)<<o),t.t=this.t-r,t.clamp()},a.prototype.subTo=// (protected) r = this - a
function(e,t){for(var r=0,n=0,o=Math.min(e.t,this.t);r<o;)n+=this[r]-e[r],t[r++]=n&this.DM,n>>=this.DB;if(e.t<this.t){for(n-=e.s;r<this.t;)n+=this[r],t[r++]=n&this.DM,n>>=this.DB;n+=this.s}else{for(n+=this.s;r<e.t;)n-=e[r],t[r++]=n&this.DM,n>>=this.DB;n-=e.s}t.s=n<0?-1:0,n<-1?t[r++]=this.DV+n:n>0&&(t[r++]=n),t.t=r,t.clamp()},a.prototype.multiplyTo=// (protected) r = this * a, r != this,a (HAC 14.12)
// "this" should be the larger one if appropriate.
function(e,t){var r=this.abs(),n=e.abs(),o=r.t;for(t.t=o+n.t;--o>=0;)t[o]=0;for(o=0;o<n.t;++o)t[o+r.t]=r.am(0,n[o],t,o,0,r.t);t.s=0,t.clamp(),this.s!=e.s&&a.ZERO.subTo(t,t)},a.prototype.squareTo=// (protected) r = this^2, r != this (HAC 14.16)
function(e){for(var t=this.abs(),r=e.t=2*t.t;--r>=0;)e[r]=0;for(r=0;r<t.t-1;++r){var n=t.am(r,t[r],e,2*r,0,1);(e[r+t.t]+=t.am(r+1,2*t[r],e,2*r+1,n,t.t-r-1))>=t.DV&&(e[r+t.t]-=t.DV,e[r+t.t+1]=1)}e.t>0&&(e[e.t-1]+=t.am(r,t[r],e,2*r,0,1)),e.s=0,e.clamp()},a.prototype.divRemTo=// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
// r != q, this != m.  q or r may be null.
function(e,t,r){var n=e.abs();if(!(n.t<=0)){var o=this.abs();if(o.t<n.t){null!=t&&t.fromInt(0),null!=r&&this.copyTo(r);return}null==r&&(r=u());var i=u(),s=this.s,c=e.s,f=this.DB-d(n[n.t-1]);// normalize modulus
f>0?(n.lShiftTo(f,i),o.lShiftTo(f,r)):(n.copyTo(i),o.copyTo(r));var h=i.t,l=i[h-1];if(0!=l){var p=l*(1<<this.F1)+(h>1?i[h-2]>>this.F2:0),g=this.FV/p,y=(1<<this.F1)/p,v=1<<this.F2,m=r.t,b=m-h,w=null==t?u():t;// "negative" y so we can replace sub with am later
for(i.dlShiftTo(b,w),r.compareTo(w)>=0&&(r[r.t++]=1,r.subTo(w,r)),a.ONE.dlShiftTo(h,w),w.subTo(i,i);i.t<h;)i[i.t++]=0;for(;--b>=0;){// Estimate quotient digit
var S=r[--m]==l?this.DM:Math.floor(r[m]*g+(r[m-1]+v)*y);if((r[m]+=i.am(0,S,r,b,0,h))<S)for(// Try it out
i.dlShiftTo(b,w),r.subTo(w,r);r[m]<--S;)r.subTo(w,r)}null!=t&&(r.drShiftTo(h,t),s!=c&&a.ZERO.subTo(t,t)),r.t=h,r.clamp(),f>0&&r.rShiftTo(f,r),s<0&&a.ZERO.subTo(r,r)}}},a.prototype.invDigit=// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
// justification:
//         xy == 1 (mod m)
//         xy =  1+km
//   xy(2-xy) = (1+km)(1-km)
// x[y(2-xy)] = 1-k^2m^2
// x[y(2-xy)] == 1 (mod m^2)
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
// JS multiply "overflows" differently from C/C++, so care is needed here.
function(){if(this.t<1)return 0;var e=this[0];if((1&e)==0)return 0;var t=3&e;// y == 1/x mod 2^dbits
// we really want the negative inverse, and -DV < y < DV
return(// y == 1/x mod 2^16
// last step - calculate inverse mod DV directly;
// assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
(t=// y == 1/x mod 2^8
(t=// y == 1/x mod 2^4
(t=// y == 1/x mod 2^2
(t=t*(2-(15&e)*t)&15)*(2-(255&e)*t)&255)*(2-((65535&e)*t&65535))&65535)*(2-e*t%this.DV)%this.DV)>0?this.DV-t:-t)},a.prototype.addTo=// (protected) r = this + a
function(e,t){for(var r=0,n=0,o=Math.min(e.t,this.t);r<o;)n+=this[r]+e[r],t[r++]=n&this.DM,n>>=this.DB;if(e.t<this.t){for(n+=e.s;r<this.t;)n+=this[r],t[r++]=n&this.DM,n>>=this.DB;n+=this.s}else{for(n+=this.s;r<e.t;)n+=e[r],t[r++]=n&this.DM,n>>=this.DB;n+=e.s}t.s=n<0?-1:0,n>0?t[r++]=n:n<-1&&(t[r++]=this.DV+n),t.t=r,t.clamp()},// public
a.prototype.toString=// (public) return string representation in given radix
function(e){if(this.s<0)return"-"+this.negate().toString(e);if(16==e)t=4;else if(8==e)t=3;else if(2==e)t=1;else if(32==e)t=5;else if(4==e)t=2;else throw Error("Only radix 2, 4, 8, 16, 32 are supported");var t,r,n=(1<<t)-1,o=!1,i="",s=this.t,a=this.DB-s*this.DB%t;if(s-- >0)for(a<this.DB&&(r=this[s]>>a)>0&&(o=!0,i=h(r));s>=0;)a<t?r=(this[s]&(1<<a)-1)<<t-a|this[--s]>>(a+=this.DB-t):(r=this[s]>>(a-=t)&n,a<=0&&(a+=this.DB,--s)),r>0&&(o=!0),o&&(i+=h(r));return o?i:"0"},a.prototype.negate=// (public) -this
function(){var e=u();return a.ZERO.subTo(this,e),e},a.prototype.abs=// (public) |this|
function(){return this.s<0?this.negate():this},a.prototype.compareTo=// (public) return + if this > a, - if this < a, 0 if equal
function(e){var t=this.s-e.s;if(0!=t)return t;var r=this.t;if(0!=(t=r-e.t))return this.s<0?-t:t;for(;--r>=0;)if(0!=(t=this[r]-e[r]))return t;return 0},a.prototype.bitLength=// (public) return the number of bits in "this"
function(){return this.t<=0?0:this.DB*(this.t-1)+d(this[this.t-1]^this.s&this.DM)},a.prototype.mod=// (public) this mod a
function(e){var t=u();return this.abs().divRemTo(e,null,t),this.s<0&&t.compareTo(a.ZERO)>0&&e.subTo(t,t),t},a.prototype.equals=function(e){return 0==this.compareTo(e)},a.prototype.add=// (public) this + a
function(e){var t=u();return this.addTo(e,t),t},a.prototype.subtract=// (public) this - a
function(e){var t=u();return this.subTo(e,t),t},a.prototype.multiply=// (public) this * a
function(e){var t=u();return this.multiplyTo(e,t),t},a.prototype.divide=// (public) this / a
function(e){var t=u();return this.divRemTo(e,t,null),t},a.prototype.modPow=// (public) this^e % m (HAC 14.85)
function(e,t,r){var n,o=e.bitLength(),i=l(1),s=new p(t);if(o<=0)return i;// precomputation
var a=[],c=3,f=(n=o<18?1:o<48?3:o<144?4:o<768?5:6)-1,h=(1<<n)-1;if(a[1]=s.convert(this),n>1){var g=u();for(s.sqrTo(a[1],g);c<=h;)a[c]=u(),s.mulTo(g,a[c-2],a[c]),c+=2}var y,v,m=e.t-1,b=!0,w=u();for(o=d(e[m])-1;m>=0;){for(o>=f?y=e[m]>>o-f&h:(y=(e[m]&(1<<o+1)-1)<<f-o,m>0&&(y|=e[m-1]>>this.DB+o-f)),c=n;(1&y)==0;)y>>=1,--c;if((o-=c)<0&&(o+=this.DB,--m),b)// ret == 1, don't bother squaring or multiplying it
a[y].copyTo(i),b=!1;else{for(;c>1;)s.sqrTo(i,w),s.sqrTo(w,i),c-=2;c>0?s.sqrTo(i,w):(v=i,i=w,w=v),s.mulTo(w,a[y],i)}for(;m>=0&&(e[m]&1<<o)==0;)s.sqrTo(i,w),v=i,i=w,w=v,--o<0&&(o=this.DB-1,--m)}var S=s.revert(i);return r(null,S),S},// "constants"
a.ZERO=l(0),a.ONE=l(1)}),i("bcFEY",function(t,r){function n(e,t){return(n=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}e(t.exports,"default",()=>i);/** @class */var i=/*#__PURE__*/function(e){/**
   * Constructs a new CognitoAccessToken object
   * @param {string=} AccessToken The JWT access token.
   */function t(t){var r=(void 0===t?{}:t).AccessToken;return e.call(this,r||"")||this}return t.prototype=Object.create(e.prototype),t.prototype.constructor=t,n(t,e),t}(o("5nZH5").default)}),i("5nZH5",function(t,r){e(t.exports,"default",()=>i);/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */var n=o("aXQL7"),i=/*#__PURE__*/function(){/**
   * Constructs a new CognitoJwtToken object
   * @param {string=} token The JWT token.
   */function e(e){// Assign object
this.jwtToken=e||"",this.payload=this.decodePayload()}/**
   * @returns {string} the record's token.
   */var t=e.prototype;return t.getJwtToken=function(){return this.jwtToken}/**
   * @returns {int} the token's expiration (exp member).
   */,t.getExpiration=function(){return this.payload.exp}/**
   * @returns {int} the token's "issued at" (iat member).
   */,t.getIssuedAt=function(){return this.payload.iat}/**
   * @returns {object} the token's payload.
   */,t.decodePayload=function(){var e=this.jwtToken.split(".")[1];try{return JSON.parse((0,n.Buffer).from(e,"base64").toString("utf8"))}catch(e){return{}}},e}()}),i("cfFz4",function(t,r){function n(e,t){return(n=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}e(t.exports,"default",()=>i);/** @class */var i=/*#__PURE__*/function(e){/**
   * Constructs a new CognitoIdToken object
   * @param {string=} IdToken The JWT Id token
   */function t(t){var r=(void 0===t?{}:t).IdToken;return e.call(this,r||"")||this}return t.prototype=Object.create(e.prototype),t.prototype.constructor=t,n(t,e),t}(o("5nZH5").default)}),i("gXTS7",function(t,r){e(t.exports,"default",()=>n);/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 *//** @class */var n=/*#__PURE__*/function(){/**
   * Constructs a new CognitoRefreshToken object
   * @param {string=} RefreshToken The JWT refresh token.
   */function e(e){var t=(void 0===e?{}:e).RefreshToken;// Assign object
this.token=t||""}return e.prototype.getToken=function(){return this.token},e}()}),i("9UvTj",function(t,r){e(t.exports,"default",()=>v);/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */var n=o("aXQL7"),i=o("hMqoc"),s=o("hUce8"),a=o("6BaWr"),u=o("b4DK1"),c=o("bcFEY"),f=o("cfFz4"),h=o("gXTS7"),l=o("bbF2X"),d=o("ewYam"),p=o("4PRoF"),g=o("e0O2m"),y="undefined"!=typeof navigator?s.Platform.isReactNative?"react-native":navigator.userAgent:"nodejs",v=/*#__PURE__*/function(){/**
   * Constructs a new CognitoUser object
   * @param {object} data Creation options
   * @param {string} data.Username The user's username.
   * @param {CognitoUserPool} data.Pool Pool containing the user.
   * @param {object} data.Storage Optional storage object.
   */function e(e){if(null==e||null==e.Username||null==e.Pool)throw Error("Username and Pool information are required.");this.username=e.Username||"",this.pool=e.Pool,this.Session=null,this.client=e.Pool.client,this.signInUserSession=null,this.authenticationFlowType="USER_SRP_AUTH",this.storage=e.Storage||new(0,g.default)().getStorage(),this.keyPrefix="CognitoIdentityServiceProvider."+this.pool.getClientId(),this.userDataKey=this.keyPrefix+"."+this.username+".userData"}/**
   * Sets the session for this user
   * @param {CognitoUserSession} signInUserSession the session
   * @returns {void}
   */var t=e.prototype;return t.setSignInUserSession=function(e){this.clearCachedUserData(),this.signInUserSession=e,this.cacheTokens()}/**
   * @returns {CognitoUserSession} the current session for this user
   */,t.getSignInUserSession=function(){return this.signInUserSession}/**
   * @returns {string} the user's username
   */,t.getUsername=function(){return this.username}/**
   * @returns {String} the authentication flow type
   */,t.getAuthenticationFlowType=function(){return this.authenticationFlowType}/**
   * sets authentication flow type
   * @param {string} authenticationFlowType New value.
   * @returns {void}
   */,t.setAuthenticationFlowType=function(e){this.authenticationFlowType=e}/**
   * This is used for authenticating the user through the custom authentication flow.
   * @param {AuthenticationDetails} authDetails Contains the authentication data
   * @param {object} callback Result callback map.
   * @param {onFailure} callback.onFailure Called on any error.
   * @param {customChallenge} callback.customChallenge Custom challenge
   *        response required to continue.
   * @param {authSuccess} callback.onSuccess Called on success with the new session.
   * @returns {void}
   */,t.initiateAuth=function(e,t){var r=this,n=e.getAuthParameters();n.USERNAME=this.username;var o=0!==Object.keys(e.getValidationData()).length?e.getValidationData():e.getClientMetadata(),i={AuthFlow:"CUSTOM_AUTH",ClientId:this.pool.getClientId(),AuthParameters:n,ClientMetadata:o};this.getUserContextData()&&(i.UserContextData=this.getUserContextData()),this.client.request("InitiateAuth",i,function(e,n){if(e)return t.onFailure(e);var o=n.ChallengeName,i=n.ChallengeParameters;return"CUSTOM_CHALLENGE"===o?(r.Session=n.Session,t.customChallenge(i)):(r.signInUserSession=r.getCognitoUserSession(n.AuthenticationResult),r.cacheTokens(),t.onSuccess(r.signInUserSession))})}/**
   * This is used for authenticating the user.
   * stuff
   * @param {AuthenticationDetails} authDetails Contains the authentication data
   * @param {object} callback Result callback map.
   * @param {onFailure} callback.onFailure Called on any error.
   * @param {newPasswordRequired} callback.newPasswordRequired new
   *        password and any required attributes are required to continue
   * @param {mfaRequired} callback.mfaRequired MFA code
   *        required to continue.
   * @param {customChallenge} callback.customChallenge Custom challenge
   *        response required to continue.
   * @param {authSuccess} callback.onSuccess Called on success with the new session.
   * @returns {void}
   */,t.authenticateUser=function(e,t){return"USER_PASSWORD_AUTH"===this.authenticationFlowType?this.authenticateUserPlainUsernamePassword(e,t):"USER_SRP_AUTH"===this.authenticationFlowType||"CUSTOM_AUTH"===this.authenticationFlowType?this.authenticateUserDefaultAuth(e,t):t.onFailure(Error("Authentication flow type is invalid."))}/**
   * PRIVATE ONLY: This is an internal only method and should not
   * be directly called by the consumers.
   * It calls the AuthenticationHelper for SRP related
   * stuff
   * @param {AuthenticationDetails} authDetails Contains the authentication data
   * @param {object} callback Result callback map.
   * @param {onFailure} callback.onFailure Called on any error.
   * @param {newPasswordRequired} callback.newPasswordRequired new
   *        password and any required attributes are required to continue
   * @param {mfaRequired} callback.mfaRequired MFA code
   *        required to continue.
   * @param {customChallenge} callback.customChallenge Custom challenge
   *        response required to continue.
   * @param {authSuccess} callback.onSuccess Called on success with the new session.
   * @returns {void}
   */,t.authenticateUserDefaultAuth=function(e,t){var r,o,s=this,c=new u.default(this.pool.getUserPoolName()),f=new d.default,h={};null!=this.deviceKey&&(h.DEVICE_KEY=this.deviceKey),h.USERNAME=this.username,c.getLargeAValue(function(u,l){u&&t.onFailure(u),h.SRP_A=l.toString(16),"CUSTOM_AUTH"===s.authenticationFlowType&&(h.CHALLENGE_NAME="SRP_A");var d=0!==Object.keys(e.getValidationData()).length?e.getValidationData():e.getClientMetadata(),p={AuthFlow:s.authenticationFlowType,ClientId:s.pool.getClientId(),AuthParameters:h,ClientMetadata:d};s.getUserContextData(s.username)&&(p.UserContextData=s.getUserContextData(s.username)),s.client.request("InitiateAuth",p,function(u,h){if(u)return t.onFailure(u);var l=h.ChallengeParameters;s.username=l.USER_ID_FOR_SRP,s.userDataKey=s.keyPrefix+"."+s.username+".userData",r=new a.default(l.SRP_B,16),o=new a.default(l.SALT,16),s.getCachedDeviceKeyAndPassword(),c.getPasswordAuthenticationKey(s.username,e.getPassword(),r,o,function(e,r){e&&t.onFailure(e);var o=f.getNowString(),a=(0,n.Buffer).concat([(0,n.Buffer).from(s.pool.getUserPoolName(),"utf8"),(0,n.Buffer).from(s.username,"utf8"),(0,n.Buffer).from(l.SECRET_BLOCK,"base64"),(0,n.Buffer).from(o,"utf8")]),u=new i.Sha256(r);u.update(a);var p=u.digestSync(),g=(0,n.Buffer).from(p).toString("base64"),y={};y.USERNAME=s.username,y.PASSWORD_CLAIM_SECRET_BLOCK=l.SECRET_BLOCK,y.TIMESTAMP=o,y.PASSWORD_CLAIM_SIGNATURE=g,null!=s.deviceKey&&(y.DEVICE_KEY=s.deviceKey);var v={ChallengeName:"PASSWORD_VERIFIER",ClientId:s.pool.getClientId(),ChallengeResponses:y,Session:h.Session,ClientMetadata:d};s.getUserContextData()&&(v.UserContextData=s.getUserContextData()),function e(t,r){return s.client.request("RespondToAuthChallenge",t,function(n,o){return n&&"ResourceNotFoundException"===n.code&&-1!==n.message.toLowerCase().indexOf("device")?(y.DEVICE_KEY=null,s.deviceKey=null,s.randomPassword=null,s.deviceGroupKey=null,s.clearCachedDeviceKeyAndPassword(),e(t,r)):r(n,o)})}(v,function(e,r){return e?t.onFailure(e):s.authenticateUserInternal(r,c,t)});// getPasswordAuthenticationKey callback end
})});// getLargeAValue callback end
})}/**
   * PRIVATE ONLY: This is an internal only method and should not
   * be directly called by the consumers.
   * @param {AuthenticationDetails} authDetails Contains the authentication data.
   * @param {object} callback Result callback map.
   * @param {onFailure} callback.onFailure Called on any error.
   * @param {mfaRequired} callback.mfaRequired MFA code
   *        required to continue.
   * @param {authSuccess} callback.onSuccess Called on success with the new session.
   * @returns {void}
   */,t.authenticateUserPlainUsernamePassword=function(e,t){var r=this,n={};if(n.USERNAME=this.username,n.PASSWORD=e.getPassword(),!n.PASSWORD){t.onFailure(Error("PASSWORD parameter is required"));return}var o=new u.default(this.pool.getUserPoolName());this.getCachedDeviceKeyAndPassword(),null!=this.deviceKey&&(n.DEVICE_KEY=this.deviceKey);var i=0!==Object.keys(e.getValidationData()).length?e.getValidationData():e.getClientMetadata(),s={AuthFlow:"USER_PASSWORD_AUTH",ClientId:this.pool.getClientId(),AuthParameters:n,ClientMetadata:i};this.getUserContextData(this.username)&&(s.UserContextData=this.getUserContextData(this.username)),// USER_PASSWORD_AUTH happens in a single round-trip: client sends userName and password,
// Cognito UserPools verifies password and returns tokens.
this.client.request("InitiateAuth",s,function(e,n){return e?t.onFailure(e):r.authenticateUserInternal(n,o,t)})}/**
   * PRIVATE ONLY: This is an internal only method and should not
   * be directly called by the consumers.
   * @param {object} dataAuthenticate authentication data
   * @param {object} authenticationHelper helper created
   * @param {callback} callback passed on from caller
   * @returns {void}
   */,t.authenticateUserInternal=function(e,t,r){var o=this,i=e.ChallengeName,s=e.ChallengeParameters;if("SMS_MFA"===i)return this.Session=e.Session,r.mfaRequired(i,s);if("SELECT_MFA_TYPE"===i)return this.Session=e.Session,r.selectMFAType(i,s);if("MFA_SETUP"===i)return this.Session=e.Session,r.mfaSetup(i,s);if("SOFTWARE_TOKEN_MFA"===i)return this.Session=e.Session,r.totpRequired(i,s);if("CUSTOM_CHALLENGE"===i)return this.Session=e.Session,r.customChallenge(s);if("NEW_PASSWORD_REQUIRED"===i){this.Session=e.Session;var a=null,u=null,c=[],f=t.getNewPasswordRequiredChallengeUserAttributePrefix();if(s&&(a=JSON.parse(e.ChallengeParameters.userAttributes),u=JSON.parse(e.ChallengeParameters.requiredAttributes)),u)for(var h=0;h<u.length;h++)c[h]=u[h].substr(f.length);return r.newPasswordRequired(a,c)}if("DEVICE_SRP_AUTH"===i){this.Session=e.Session,this.getDeviceResponse(r);return}this.signInUserSession=this.getCognitoUserSession(e.AuthenticationResult),this.challengeName=i,this.cacheTokens();var l=e.AuthenticationResult.NewDeviceMetadata;if(null==l)return r.onSuccess(this.signInUserSession);t.generateHashDevice(e.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey,e.AuthenticationResult.NewDeviceMetadata.DeviceKey,function(i){if(i)return r.onFailure(i);var s={Salt:(0,n.Buffer).from(t.getSaltDevices(),"hex").toString("base64"),PasswordVerifier:(0,n.Buffer).from(t.getVerifierDevices(),"hex").toString("base64")};o.verifierDevices=s.PasswordVerifier,o.deviceGroupKey=l.DeviceGroupKey,o.randomPassword=t.getRandomPassword(),o.client.request("ConfirmDevice",{DeviceKey:l.DeviceKey,AccessToken:o.signInUserSession.getAccessToken().getJwtToken(),DeviceSecretVerifierConfig:s,DeviceName:y},function(t,n){return t?r.onFailure(t):(o.deviceKey=e.AuthenticationResult.NewDeviceMetadata.DeviceKey,o.cacheDeviceKeyAndPassword(),!0===n.UserConfirmationNecessary)?r.onSuccess(o.signInUserSession,n.UserConfirmationNecessary):r.onSuccess(o.signInUserSession)})})}/**
   * This method is user to complete the NEW_PASSWORD_REQUIRED challenge.
   * Pass the new password with any new user attributes to be updated.
   * User attribute keys must be of format userAttributes.<attribute_name>.
   * @param {string} newPassword new password for this user
   * @param {object} requiredAttributeData map with values for all required attributes
   * @param {object} callback Result callback map.
   * @param {onFailure} callback.onFailure Called on any error.
   * @param {mfaRequired} callback.mfaRequired MFA code required to continue.
   * @param {customChallenge} callback.customChallenge Custom challenge
   *         response required to continue.
   * @param {authSuccess} callback.onSuccess Called on success with the new session.
   * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
   * @returns {void}
   */,t.completeNewPasswordChallenge=function(e,t,r,n){var o=this;if(!e)return r.onFailure(Error("New password is required."));var i=new u.default(this.pool.getUserPoolName()),s=i.getNewPasswordRequiredChallengeUserAttributePrefix(),a={};t&&Object.keys(t).forEach(function(e){a[s+e]=t[e]}),a.NEW_PASSWORD=e,a.USERNAME=this.username;var c={ChallengeName:"NEW_PASSWORD_REQUIRED",ClientId:this.pool.getClientId(),ChallengeResponses:a,Session:this.Session,ClientMetadata:n};this.getUserContextData()&&(c.UserContextData=this.getUserContextData()),this.client.request("RespondToAuthChallenge",c,function(e,t){return e?r.onFailure(e):o.authenticateUserInternal(t,i,r)})}/**
   * This is used to get a session using device authentication. It is called at the end of user
   * authentication
   *
   * @param {object} callback Result callback map.
   * @param {onFailure} callback.onFailure Called on any error.
   * @param {authSuccess} callback.onSuccess Called on success with the new session.
   * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
   * @returns {void}
   * @private
   */,t.getDeviceResponse=function(e,t){var r=this,o=new u.default(this.deviceGroupKey),s=new d.default,c={};c.USERNAME=this.username,c.DEVICE_KEY=this.deviceKey,o.getLargeAValue(function(u,f){u&&e.onFailure(u),c.SRP_A=f.toString(16);var h={ChallengeName:"DEVICE_SRP_AUTH",ClientId:r.pool.getClientId(),ChallengeResponses:c,ClientMetadata:t,Session:r.Session};r.getUserContextData()&&(h.UserContextData=r.getUserContextData()),r.client.request("RespondToAuthChallenge",h,function(t,u){if(t)return e.onFailure(t);var c=u.ChallengeParameters,f=new a.default(c.SRP_B,16),h=new a.default(c.SALT,16);o.getPasswordAuthenticationKey(r.deviceKey,r.randomPassword,f,h,function(t,o){// getPasswordAuthenticationKey callback start
if(t)return e.onFailure(t);var a=s.getNowString(),f=(0,n.Buffer).concat([(0,n.Buffer).from(r.deviceGroupKey,"utf8"),(0,n.Buffer).from(r.deviceKey,"utf8"),(0,n.Buffer).from(c.SECRET_BLOCK,"base64"),(0,n.Buffer).from(a,"utf8")]),h=new i.Sha256(o);h.update(f);var l=h.digestSync(),d=(0,n.Buffer).from(l).toString("base64"),p={};p.USERNAME=r.username,p.PASSWORD_CLAIM_SECRET_BLOCK=c.SECRET_BLOCK,p.TIMESTAMP=a,p.PASSWORD_CLAIM_SIGNATURE=d,p.DEVICE_KEY=r.deviceKey;var g={ChallengeName:"DEVICE_PASSWORD_VERIFIER",ClientId:r.pool.getClientId(),ChallengeResponses:p,Session:u.Session};r.getUserContextData()&&(g.UserContextData=r.getUserContextData()),r.client.request("RespondToAuthChallenge",g,function(t,n){return t?e.onFailure(t):(r.signInUserSession=r.getCognitoUserSession(n.AuthenticationResult),r.cacheTokens(),e.onSuccess(r.signInUserSession))});// getPasswordAuthenticationKey callback end
})});// getLargeAValue callback end
})}/**
   * This is used for a certain user to confirm the registration by using a confirmation code
   * @param {string} confirmationCode Code entered by user.
   * @param {bool} forceAliasCreation Allow migrating from an existing email / phone number.
   * @param {nodeCallback<string>} callback Called on success or error.
   * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
   * @returns {void}
   */,t.confirmRegistration=function(e,t,r,n){var o={ClientId:this.pool.getClientId(),ConfirmationCode:e,Username:this.username,ForceAliasCreation:t,ClientMetadata:n};this.getUserContextData()&&(o.UserContextData=this.getUserContextData()),this.client.request("ConfirmSignUp",o,function(e){return e?r(e,null):r(null,"SUCCESS")})}/**
   * This is used by the user once he has the responses to a custom challenge
   * @param {string} answerChallenge The custom challenge answer.
   * @param {object} callback Result callback map.
   * @param {onFailure} callback.onFailure Called on any error.
   * @param {customChallenge} callback.customChallenge
   *    Custom challenge response required to continue.
   * @param {authSuccess} callback.onSuccess Called on success with the new session.
   * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
   * @returns {void}
   */,t.sendCustomChallengeAnswer=function(e,t,r){var n=this,o={};o.USERNAME=this.username,o.ANSWER=e;var i=new u.default(this.pool.getUserPoolName());this.getCachedDeviceKeyAndPassword(),null!=this.deviceKey&&(o.DEVICE_KEY=this.deviceKey);var s={ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:o,ClientId:this.pool.getClientId(),Session:this.Session,ClientMetadata:r};this.getUserContextData()&&(s.UserContextData=this.getUserContextData()),this.client.request("RespondToAuthChallenge",s,function(e,r){return e?t.onFailure(e):n.authenticateUserInternal(r,i,t)})}/**
   * This is used by the user once he has an MFA code
   * @param {string} confirmationCode The MFA code entered by the user.
   * @param {object} callback Result callback map.
   * @param {string} mfaType The mfa we are replying to.
   * @param {onFailure} callback.onFailure Called on any error.
   * @param {authSuccess} callback.onSuccess Called on success with the new session.
   * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
   * @returns {void}
   */,t.sendMFACode=function(e,t,r,o){var i=this,s={};s.USERNAME=this.username,s.SMS_MFA_CODE=e;var a=r||"SMS_MFA";"SOFTWARE_TOKEN_MFA"===a&&(s.SOFTWARE_TOKEN_MFA_CODE=e),null!=this.deviceKey&&(s.DEVICE_KEY=this.deviceKey);var c={ChallengeName:a,ChallengeResponses:s,ClientId:this.pool.getClientId(),Session:this.Session,ClientMetadata:o};this.getUserContextData()&&(c.UserContextData=this.getUserContextData()),this.client.request("RespondToAuthChallenge",c,function(e,r){if(e)return t.onFailure(e);if("DEVICE_SRP_AUTH"===r.ChallengeName){i.getDeviceResponse(t);return}if(i.signInUserSession=i.getCognitoUserSession(r.AuthenticationResult),i.cacheTokens(),null==r.AuthenticationResult.NewDeviceMetadata)return t.onSuccess(i.signInUserSession);var o=new u.default(i.pool.getUserPoolName());o.generateHashDevice(r.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey,r.AuthenticationResult.NewDeviceMetadata.DeviceKey,function(e){if(e)return t.onFailure(e);var s={Salt:(0,n.Buffer).from(o.getSaltDevices(),"hex").toString("base64"),PasswordVerifier:(0,n.Buffer).from(o.getVerifierDevices(),"hex").toString("base64")};i.verifierDevices=s.PasswordVerifier,i.deviceGroupKey=r.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey,i.randomPassword=o.getRandomPassword(),i.client.request("ConfirmDevice",{DeviceKey:r.AuthenticationResult.NewDeviceMetadata.DeviceKey,AccessToken:i.signInUserSession.getAccessToken().getJwtToken(),DeviceSecretVerifierConfig:s,DeviceName:y},function(e,n){return e?t.onFailure(e):(i.deviceKey=r.AuthenticationResult.NewDeviceMetadata.DeviceKey,i.cacheDeviceKeyAndPassword(),!0===n.UserConfirmationNecessary)?t.onSuccess(i.signInUserSession,n.UserConfirmationNecessary):t.onSuccess(i.signInUserSession)})})})}/**
   * This is used by an authenticated user to change the current password
   * @param {string} oldUserPassword The current password.
   * @param {string} newUserPassword The requested new password.
   * @param {nodeCallback<string>} callback Called on success or error.
   * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
   * @returns {void}
   */,t.changePassword=function(e,t,r,n){if(!(null!=this.signInUserSession&&this.signInUserSession.isValid()))return r(Error("User is not authenticated"),null);this.client.request("ChangePassword",{PreviousPassword:e,ProposedPassword:t,AccessToken:this.signInUserSession.getAccessToken().getJwtToken(),ClientMetadata:n},function(e){return e?r(e,null):r(null,"SUCCESS")})}/**
   * This is used by an authenticated user to enable MFA for itself
   * @deprecated
   * @param {nodeCallback<string>} callback Called on success or error.
   * @returns {void}
   */,t.enableMFA=function(e){if(null==this.signInUserSession||!this.signInUserSession.isValid())return e(Error("User is not authenticated"),null);var t=[];t.push({DeliveryMedium:"SMS",AttributeName:"phone_number"}),this.client.request("SetUserSettings",{MFAOptions:t,AccessToken:this.signInUserSession.getAccessToken().getJwtToken()},function(t){return t?e(t,null):e(null,"SUCCESS")})}/**
   * This is used by an authenticated user to enable MFA for itself
   * @param {IMfaSettings} smsMfaSettings the sms mfa settings
   * @param {IMFASettings} softwareTokenMfaSettings the software token mfa settings
   * @param {nodeCallback<string>} callback Called on success or error.
   * @returns {void}
   */,t.setUserMfaPreference=function(e,t,r){if(null==this.signInUserSession||!this.signInUserSession.isValid())return r(Error("User is not authenticated"),null);this.client.request("SetUserMFAPreference",{SMSMfaSettings:e,SoftwareTokenMfaSettings:t,AccessToken:this.signInUserSession.getAccessToken().getJwtToken()},function(e){return e?r(e,null):r(null,"SUCCESS")})}/**
   * This is used by an authenticated user to disable MFA for itself
   * @deprecated
   * @param {nodeCallback<string>} callback Called on success or error.
   * @returns {void}
   */,t.disableMFA=function(e){if(null==this.signInUserSession||!this.signInUserSession.isValid())return e(Error("User is not authenticated"),null);this.client.request("SetUserSettings",{MFAOptions:[],AccessToken:this.signInUserSession.getAccessToken().getJwtToken()},function(t){return t?e(t,null):e(null,"SUCCESS")})}/**
   * This is used by an authenticated user to delete itself
   * @param {nodeCallback<string>} callback Called on success or error.
   * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
   * @returns {void}
   */,t.deleteUser=function(e,t){var r=this;if(null==this.signInUserSession||!this.signInUserSession.isValid())return e(Error("User is not authenticated"),null);this.client.request("DeleteUser",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken(),ClientMetadata:t},function(t){return t?e(t,null):(r.clearCachedUser(),e(null,"SUCCESS"))})}/**
   * This is used by an authenticated user to change a list of attributes
   * @param {AttributeArg[]} attributes A list of the new user attributes.
   * @param {nodeCallback<string>} callback Called on success or error.
   * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
   * @returns {void}
   */,t.updateAttributes=function(e,t,r){var n=this;if(null==this.signInUserSession||!this.signInUserSession.isValid())return t(Error("User is not authenticated"),null);this.client.request("UpdateUserAttributes",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken(),UserAttributes:e,ClientMetadata:r},function(e,r){return e?t(e,null):n.getUserData(function(){return t(null,"SUCCESS",r)},{bypassCache:!0})})}/**
   * This is used by an authenticated user to get a list of attributes
   * @param {nodeCallback<CognitoUserAttribute[]>} callback Called on success or error.
   * @returns {void}
   */,t.getUserAttributes=function(e){if(!(null!=this.signInUserSession&&this.signInUserSession.isValid()))return e(Error("User is not authenticated"),null);this.client.request("GetUser",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken()},function(t,r){if(t)return e(t,null);for(var n=[],o=0;o<r.UserAttributes.length;o++){var i={Name:r.UserAttributes[o].Name,Value:r.UserAttributes[o].Value},s=new p.default(i);n.push(s)}return e(null,n)})}/**
   * This was previously used by an authenticated user to get MFAOptions,
   * but no longer returns a meaningful response. Refer to the documentation for
   * how to setup and use MFA: https://docs.amplify.aws/lib/auth/mfa/q/platform/js
   * @deprecated
   * @param {nodeCallback<MFAOptions>} callback Called on success or error.
   * @returns {void}
   */,t.getMFAOptions=function(e){if(!(null!=this.signInUserSession&&this.signInUserSession.isValid()))return e(Error("User is not authenticated"),null);this.client.request("GetUser",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken()},function(t,r){return t?e(t,null):e(null,r.MFAOptions)})}/**
   * PRIVATE ONLY: This is an internal only method and should not
   * be directly called by the consumers.
   */,t.createGetUserRequest=function(){return this.client.promisifyRequest("GetUser",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken()})}/**
   * PRIVATE ONLY: This is an internal only method and should not
   * be directly called by the consumers.
   */,t.refreshSessionIfPossible=function(e){var t=this;// best effort, if not possible
return void 0===e&&(e={}),new Promise(function(r){var n=t.signInUserSession.getRefreshToken();n&&n.getToken()?t.refreshSession(n,r,e.clientMetadata):r()})}/**
   * This is used by an authenticated users to get the userData
   * @param {nodeCallback<UserData>} callback Called on success or error.
   * @param {GetUserDataOptions} params
   * @returns {void}
   */,t.getUserData=function(e,t){var r=this;if(!(null!=this.signInUserSession&&this.signInUserSession.isValid()))return this.clearCachedUserData(),e(Error("User is not authenticated"),null);var n=this.getUserDataFromCache();if(!n){this.fetchUserData().then(function(t){e(null,t)}).catch(e);return}if(this.isFetchUserDataAndTokenRequired(t)){this.fetchUserData().then(function(e){return r.refreshSessionIfPossible(t).then(function(){return e})}).then(function(t){return e(null,t)}).catch(e);return}try{e(null,JSON.parse(n));return}catch(t){this.clearCachedUserData(),e(t,null);return}}/**
   *
   * PRIVATE ONLY: This is an internal only method and should not
   * be directly called by the consumers.
   */,t.getUserDataFromCache=function(){return this.storage.getItem(this.userDataKey)}/**
   *
   * PRIVATE ONLY: This is an internal only method and should not
   * be directly called by the consumers.
   */,t.isFetchUserDataAndTokenRequired=function(e){var t=(e||{}).bypassCache;return void 0!==t&&t}/**
   *
   * PRIVATE ONLY: This is an internal only method and should not
   * be directly called by the consumers.
   */,t.fetchUserData=function(){var e=this;return this.createGetUserRequest().then(function(t){return e.cacheUserData(t),t})}/**
   * This is used by an authenticated user to delete a list of attributes
   * @param {string[]} attributeList Names of the attributes to delete.
   * @param {nodeCallback<string>} callback Called on success or error.
   * @returns {void}
   */,t.deleteAttributes=function(e,t){var r=this;if(!(null!=this.signInUserSession&&this.signInUserSession.isValid()))return t(Error("User is not authenticated"),null);this.client.request("DeleteUserAttributes",{UserAttributeNames:e,AccessToken:this.signInUserSession.getAccessToken().getJwtToken()},function(e){return e?t(e,null):r.getUserData(function(){return t(null,"SUCCESS")},{bypassCache:!0})})}/**
   * This is used by a user to resend a confirmation code
   * @param {nodeCallback<string>} callback Called on success or error.
   * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
   * @returns {void}
   */,t.resendConfirmationCode=function(e,t){var r={ClientId:this.pool.getClientId(),Username:this.username,ClientMetadata:t};this.client.request("ResendConfirmationCode",r,function(t,r){return t?e(t,null):e(null,r)})}/**
   * This is used to get a session, either from the session object
   * or from  the local storage, or by using a refresh token
   *
   * @param {nodeCallback<CognitoUserSession>} callback Called on success or error.
   * @param {GetSessionOptions} options
   * @returns {void}
   */,t.getSession=function(e,t){if(void 0===t&&(t={}),null==this.username)return e(Error("Username is null. Cannot retrieve a new session"),null);if(null!=this.signInUserSession&&this.signInUserSession.isValid())return e(null,this.signInUserSession);var r="CognitoIdentityServiceProvider."+this.pool.getClientId()+"."+this.username,n=r+".idToken";if(this.storage.getItem(n)){var o=new f.default({IdToken:this.storage.getItem(n)}),i=new c.default({AccessToken:this.storage.getItem(r+".accessToken")}),s=new h.default({RefreshToken:this.storage.getItem(r+".refreshToken")}),a=parseInt(this.storage.getItem(r+".clockDrift"),0)||0,u=new l.default({IdToken:o,AccessToken:i,RefreshToken:s,ClockDrift:a});if(u.isValid())return this.signInUserSession=u,e(null,this.signInUserSession);if(!s.getToken())return e(Error("Cannot retrieve a new session. Please authenticate."),null);this.refreshSession(s,e,t.clientMetadata)}else e(Error("Local storage is missing an ID Token, Please authenticate"),null)}/**
   * This uses the refreshToken to retrieve a new session
   * @param {CognitoRefreshToken} refreshToken A previous session's refresh token.
   * @param {nodeCallback<CognitoUserSession>} callback Called on success or error.
   * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
   * @returns {void}
   */,t.refreshSession=function(e,t,r){var n=this,o=this.pool.wrapRefreshSessionCallback?this.pool.wrapRefreshSessionCallback(t):t,i={};i.REFRESH_TOKEN=e.getToken();var s="CognitoIdentityServiceProvider."+this.pool.getClientId(),a=s+".LastAuthUser";if(this.storage.getItem(a)){this.username=this.storage.getItem(a);var u=s+"."+this.username+".deviceKey";this.deviceKey=this.storage.getItem(u),i.DEVICE_KEY=this.deviceKey}var c={ClientId:this.pool.getClientId(),AuthFlow:"REFRESH_TOKEN_AUTH",AuthParameters:i,ClientMetadata:r};this.getUserContextData()&&(c.UserContextData=this.getUserContextData()),this.client.request("InitiateAuth",c,function(t,r){if(t)return"NotAuthorizedException"===t.code&&n.clearCachedUser(),o(t,null);if(r){var i=r.AuthenticationResult;return Object.prototype.hasOwnProperty.call(i,"RefreshToken")||(i.RefreshToken=e.getToken()),n.signInUserSession=n.getCognitoUserSession(i),n.cacheTokens(),o(null,n.signInUserSession)}})}/**
   * This is used to save the session tokens to local storage
   * @returns {void}
   */,t.cacheTokens=function(){var e="CognitoIdentityServiceProvider."+this.pool.getClientId(),t=e+"."+this.username+".idToken",r=e+"."+this.username+".accessToken",n=e+"."+this.username+".refreshToken",o=e+"."+this.username+".clockDrift";this.storage.setItem(t,this.signInUserSession.getIdToken().getJwtToken()),this.storage.setItem(r,this.signInUserSession.getAccessToken().getJwtToken()),this.storage.setItem(n,this.signInUserSession.getRefreshToken().getToken()),this.storage.setItem(o,""+this.signInUserSession.getClockDrift()),this.storage.setItem(e+".LastAuthUser",this.username)}/**
   * This is to cache user data
   */,t.cacheUserData=function(e){this.storage.setItem(this.userDataKey,JSON.stringify(e))}/**
   * This is to remove cached user data
   */,t.clearCachedUserData=function(){this.storage.removeItem(this.userDataKey)},t.clearCachedUser=function(){this.clearCachedTokens(),this.clearCachedUserData()}/**
   * This is used to cache the device key and device group and device password
   * @returns {void}
   */,t.cacheDeviceKeyAndPassword=function(){var e="CognitoIdentityServiceProvider."+this.pool.getClientId()+"."+this.username;this.storage.setItem(e+".deviceKey",this.deviceKey),this.storage.setItem(e+".randomPasswordKey",this.randomPassword),this.storage.setItem(e+".deviceGroupKey",this.deviceGroupKey)}/**
   * This is used to get current device key and device group and device password
   * @returns {void}
   */,t.getCachedDeviceKeyAndPassword=function(){var e="CognitoIdentityServiceProvider."+this.pool.getClientId()+"."+this.username,t=e+".deviceKey";this.storage.getItem(t)&&(this.deviceKey=this.storage.getItem(t),this.randomPassword=this.storage.getItem(e+".randomPasswordKey"),this.deviceGroupKey=this.storage.getItem(e+".deviceGroupKey"))}/**
   * This is used to clear the device key info from local storage
   * @returns {void}
   */,t.clearCachedDeviceKeyAndPassword=function(){var e="CognitoIdentityServiceProvider."+this.pool.getClientId()+"."+this.username;this.storage.removeItem(e+".deviceKey"),this.storage.removeItem(e+".randomPasswordKey"),this.storage.removeItem(e+".deviceGroupKey")}/**
   * This is used to clear the session tokens from local storage
   * @returns {void}
   */,t.clearCachedTokens=function(){var e="CognitoIdentityServiceProvider."+this.pool.getClientId(),t=e+"."+this.username+".idToken",r=e+"."+this.username+".accessToken",n=e+"."+this.username+".refreshToken",o=e+"."+this.username+".clockDrift";this.storage.removeItem(t),this.storage.removeItem(r),this.storage.removeItem(n),this.storage.removeItem(e+".LastAuthUser"),this.storage.removeItem(o)}/**
   * This is used to build a user session from tokens retrieved in the authentication result
   * @param {object} authResult Successful auth response from server.
   * @returns {CognitoUserSession} The new user session.
   * @private
   */,t.getCognitoUserSession=function(e){var t=new f.default(e),r=new c.default(e),n=new h.default(e);return new l.default({IdToken:t,AccessToken:r,RefreshToken:n})}/**
   * This is used to initiate a forgot password request
   * @param {object} callback Result callback map.
   * @param {onFailure} callback.onFailure Called on any error.
   * @param {inputVerificationCode?} callback.inputVerificationCode
   *    Optional callback raised instead of onSuccess with response data.
   * @param {onSuccess} callback.onSuccess Called on success.
   * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
   * @returns {void}
   */,t.forgotPassword=function(e,t){var r={ClientId:this.pool.getClientId(),Username:this.username,ClientMetadata:t};this.getUserContextData()&&(r.UserContextData=this.getUserContextData()),this.client.request("ForgotPassword",r,function(t,r){return t?e.onFailure(t):"function"==typeof e.inputVerificationCode?e.inputVerificationCode(r):e.onSuccess(r)})}/**
   * This is used to confirm a new password using a confirmationCode
   * @param {string} confirmationCode Code entered by user.
   * @param {string} newPassword Confirm new password.
   * @param {object} callback Result callback map.
   * @param {onFailure} callback.onFailure Called on any error.
   * @param {onSuccess<void>} callback.onSuccess Called on success.
   * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
   * @returns {void}
   */,t.confirmPassword=function(e,t,r,n){var o={ClientId:this.pool.getClientId(),Username:this.username,ConfirmationCode:e,Password:t,ClientMetadata:n};this.getUserContextData()&&(o.UserContextData=this.getUserContextData()),this.client.request("ConfirmForgotPassword",o,function(e){return e?r.onFailure(e):r.onSuccess("SUCCESS")})}/**
   * This is used to initiate an attribute confirmation request
   * @param {string} attributeName User attribute that needs confirmation.
   * @param {object} callback Result callback map.
   * @param {onFailure} callback.onFailure Called on any error.
   * @param {inputVerificationCode} callback.inputVerificationCode Called on success.
   * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
   * @returns {void}
   */,t.getAttributeVerificationCode=function(e,t,r){if(null==this.signInUserSession||!this.signInUserSession.isValid())return t.onFailure(Error("User is not authenticated"));this.client.request("GetUserAttributeVerificationCode",{AttributeName:e,AccessToken:this.signInUserSession.getAccessToken().getJwtToken(),ClientMetadata:r},function(e,r){return e?t.onFailure(e):"function"==typeof t.inputVerificationCode?t.inputVerificationCode(r):t.onSuccess("SUCCESS")})}/**
   * This is used to confirm an attribute using a confirmation code
   * @param {string} attributeName Attribute being confirmed.
   * @param {string} confirmationCode Code entered by user.
   * @param {object} callback Result callback map.
   * @param {onFailure} callback.onFailure Called on any error.
   * @param {onSuccess<string>} callback.onSuccess Called on success.
   * @returns {void}
   */,t.verifyAttribute=function(e,t,r){if(null==this.signInUserSession||!this.signInUserSession.isValid())return r.onFailure(Error("User is not authenticated"));this.client.request("VerifyUserAttribute",{AttributeName:e,Code:t,AccessToken:this.signInUserSession.getAccessToken().getJwtToken()},function(e){return e?r.onFailure(e):r.onSuccess("SUCCESS")})}/**
   * This is used to get the device information using the current device key
   * @param {object} callback Result callback map.
   * @param {onFailure} callback.onFailure Called on any error.
   * @param {onSuccess<*>} callback.onSuccess Called on success with device data.
   * @returns {void}
   */,t.getDevice=function(e){if(null==this.signInUserSession||!this.signInUserSession.isValid())return e.onFailure(Error("User is not authenticated"));this.client.request("GetDevice",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken(),DeviceKey:this.deviceKey},function(t,r){return t?e.onFailure(t):e.onSuccess(r)})}/**
   * This is used to forget a specific device
   * @param {string} deviceKey Device key.
   * @param {object} callback Result callback map.
   * @param {onFailure} callback.onFailure Called on any error.
   * @param {onSuccess<string>} callback.onSuccess Called on success.
   * @returns {void}
   */,t.forgetSpecificDevice=function(e,t){if(null==this.signInUserSession||!this.signInUserSession.isValid())return t.onFailure(Error("User is not authenticated"));this.client.request("ForgetDevice",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken(),DeviceKey:e},function(e){return e?t.onFailure(e):t.onSuccess("SUCCESS")})}/**
   * This is used to forget the current device
   * @param {object} callback Result callback map.
   * @param {onFailure} callback.onFailure Called on any error.
   * @param {onSuccess<string>} callback.onSuccess Called on success.
   * @returns {void}
   */,t.forgetDevice=function(e){var t=this;this.forgetSpecificDevice(this.deviceKey,{onFailure:e.onFailure,onSuccess:function(r){return t.deviceKey=null,t.deviceGroupKey=null,t.randomPassword=null,t.clearCachedDeviceKeyAndPassword(),e.onSuccess(r)}})}/**
   * This is used to set the device status as remembered
   * @param {object} callback Result callback map.
   * @param {onFailure} callback.onFailure Called on any error.
   * @param {onSuccess<string>} callback.onSuccess Called on success.
   * @returns {void}
   */,t.setDeviceStatusRemembered=function(e){if(null==this.signInUserSession||!this.signInUserSession.isValid())return e.onFailure(Error("User is not authenticated"));this.client.request("UpdateDeviceStatus",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken(),DeviceKey:this.deviceKey,DeviceRememberedStatus:"remembered"},function(t){return t?e.onFailure(t):e.onSuccess("SUCCESS")})}/**
   * This is used to set the device status as not remembered
   * @param {object} callback Result callback map.
   * @param {onFailure} callback.onFailure Called on any error.
   * @param {onSuccess<string>} callback.onSuccess Called on success.
   * @returns {void}
   */,t.setDeviceStatusNotRemembered=function(e){if(null==this.signInUserSession||!this.signInUserSession.isValid())return e.onFailure(Error("User is not authenticated"));this.client.request("UpdateDeviceStatus",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken(),DeviceKey:this.deviceKey,DeviceRememberedStatus:"not_remembered"},function(t){return t?e.onFailure(t):e.onSuccess("SUCCESS")})}/**
   * This is used to list all devices for a user
   *
   * @param {int} limit the number of devices returned in a call
   * @param {string | null} paginationToken the pagination token in case any was returned before
   * @param {object} callback Result callback map.
   * @param {onFailure} callback.onFailure Called on any error.
   * @param {onSuccess<*>} callback.onSuccess Called on success with device list.
   * @returns {void}
   */,t.listDevices=function(e,t,r){if(null==this.signInUserSession||!this.signInUserSession.isValid())return r.onFailure(Error("User is not authenticated"));var n={AccessToken:this.signInUserSession.getAccessToken().getJwtToken(),Limit:e};t&&(n.PaginationToken=t),this.client.request("ListDevices",n,function(e,t){return e?r.onFailure(e):r.onSuccess(t)})}/**
   * This is used to globally revoke all tokens issued to a user
   * @param {object} callback Result callback map.
   * @param {onFailure} callback.onFailure Called on any error.
   * @param {onSuccess<string>} callback.onSuccess Called on success.
   * @returns {void}
   */,t.globalSignOut=function(e){var t=this;if(null==this.signInUserSession||!this.signInUserSession.isValid())return e.onFailure(Error("User is not authenticated"));this.client.request("GlobalSignOut",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken()},function(r){return r?e.onFailure(r):(t.clearCachedUser(),e.onSuccess("SUCCESS"))})}/**
   * This is used for the user to signOut of the application and clear the cached tokens.
   * @returns {void}
   */,t.signOut=function(e){var t=this;// If tokens won't be revoked, we just clean the client data.
if(!e||"function"!=typeof e){this.cleanClientData();return}this.getSession(function(r,n){if(r)return e(r);t.revokeTokens(function(r){t.cleanClientData(),e(r)})})},t.revokeTokens=function(e){if(void 0===e&&(e=function(){}),"function"!=typeof e)throw Error("Invalid revokeTokenCallback. It should be a function.");if(!this.signInUserSession)return e(Error("User is not authenticated"));if(!this.signInUserSession.getAccessToken())return e(Error("No Access token available"));var t=this.signInUserSession.getRefreshToken().getToken(),r=this.signInUserSession.getAccessToken();if(this.isSessionRevocable(r)&&t)return this.revokeToken({token:t,callback:e});e()},t.isSessionRevocable=function(e){if(e&&"function"==typeof e.decodePayload)try{return!!e.decodePayload().origin_jti}catch(e){// Nothing to do, token doesnt have origin_jti claim
}return!1},t.cleanClientData=function(){this.signInUserSession=null,this.clearCachedUser()},t.revokeToken=function(e){var t=e.token,r=e.callback;this.client.requestWithRetry("RevokeToken",{Token:t,ClientId:this.pool.getClientId()},function(e){if(e)return r(e);r()})}/**
   * This is used by a user trying to select a given MFA
   * @param {string} answerChallenge the mfa the user wants
   * @param {nodeCallback<string>} callback Called on success or error.
   * @returns {void}
   */,t.sendMFASelectionAnswer=function(e,t){var r=this,n={};n.USERNAME=this.username,n.ANSWER=e;var o={ChallengeName:"SELECT_MFA_TYPE",ChallengeResponses:n,ClientId:this.pool.getClientId(),Session:this.Session};this.getUserContextData()&&(o.UserContextData=this.getUserContextData()),this.client.request("RespondToAuthChallenge",o,function(n,o){return n?t.onFailure(n):(r.Session=o.Session,"SMS_MFA"===e)?t.mfaRequired(o.ChallengeName,o.ChallengeParameters):"SOFTWARE_TOKEN_MFA"===e?t.totpRequired(o.ChallengeName,o.ChallengeParameters):void 0})}/**
   * This returns the user context data for advanced security feature.
   * @returns {string} the user context data from CognitoUserPool
   */,t.getUserContextData=function(){return this.pool.getUserContextData(this.username)}/**
   * This is used by an authenticated or a user trying to authenticate to associate a TOTP MFA
   * @param {nodeCallback<string>} callback Called on success or error.
   * @returns {void}
   */,t.associateSoftwareToken=function(e){var t=this;null!=this.signInUserSession&&this.signInUserSession.isValid()?this.client.request("AssociateSoftwareToken",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken()},function(t,r){return t?e.onFailure(t):e.associateSecretCode(r.SecretCode)}):this.client.request("AssociateSoftwareToken",{Session:this.Session},function(r,n){return r?e.onFailure(r):(t.Session=n.Session,e.associateSecretCode(n.SecretCode))})}/**
   * This is used by an authenticated or a user trying to authenticate to verify a TOTP MFA
   * @param {string} totpCode The MFA code entered by the user.
   * @param {string} friendlyDeviceName The device name we are assigning to the device.
   * @param {nodeCallback<string>} callback Called on success or error.
   * @returns {void}
   */,t.verifySoftwareToken=function(e,t,r){var n=this;null!=this.signInUserSession&&this.signInUserSession.isValid()?this.client.request("VerifySoftwareToken",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken(),UserCode:e,FriendlyDeviceName:t},function(e,t){return e?r.onFailure(e):r.onSuccess(t)}):this.client.request("VerifySoftwareToken",{Session:this.Session,UserCode:e,FriendlyDeviceName:t},function(e,t){if(e)return r.onFailure(e);n.Session=t.Session;var o={};o.USERNAME=n.username;var i={ChallengeName:"MFA_SETUP",ClientId:n.pool.getClientId(),ChallengeResponses:o,Session:n.Session};n.getUserContextData()&&(i.UserContextData=n.getUserContextData()),n.client.request("RespondToAuthChallenge",i,function(e,t){return e?r.onFailure(e):(n.signInUserSession=n.getCognitoUserSession(t.AuthenticationResult),n.cacheTokens(),r.onSuccess(n.signInUserSession))})})},e}()}),i("hUce8",function(t,r){e(t.exports,"Platform",()=>n),e(t.exports,"getUserAgent",()=>i);var n={userAgent:"aws-amplify/"+o("OhSBJ").version,isReactNative:"undefined"!=typeof navigator&&"ReactNative"===navigator.product},i=function(){return n.userAgent}}),i("OhSBJ",function(t,r){e(t.exports,"version",()=>n);// generated by genversion
var n="5.0.4"}),i("bbF2X",function(t,r){e(t.exports,"default",()=>n);/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 *//** @class */var n=/*#__PURE__*/function(){/**
   * Constructs a new CognitoUserSession object
   * @param {CognitoIdToken} IdToken The session's Id token.
   * @param {CognitoRefreshToken=} RefreshToken The session's refresh token.
   * @param {CognitoAccessToken} AccessToken The session's access token.
   * @param {int} ClockDrift The saved computer's clock drift or undefined to force calculation.
   */function e(e){var t=void 0===e?{}:e,r=t.IdToken,n=t.RefreshToken,o=t.AccessToken,i=t.ClockDrift;if(null==o||null==r)throw Error("Id token and Access Token must be present.");this.idToken=r,this.refreshToken=n,this.accessToken=o,this.clockDrift=void 0===i?this.calculateClockDrift():i}/**
   * @returns {CognitoIdToken} the session's Id token
   */var t=e.prototype;return t.getIdToken=function(){return this.idToken}/**
   * @returns {CognitoRefreshToken} the session's refresh token
   */,t.getRefreshToken=function(){return this.refreshToken}/**
   * @returns {CognitoAccessToken} the session's access token
   */,t.getAccessToken=function(){return this.accessToken}/**
   * @returns {int} the session's clock drift
   */,t.getClockDrift=function(){return this.clockDrift}/**
   * @returns {int} the computer's clock drift
   */,t.calculateClockDrift=function(){return Math.floor(new Date/1e3)-Math.min(this.accessToken.getIssuedAt(),this.idToken.getIssuedAt())}/**
   * Checks to see if the session is still valid based on session expiry information found
   * in tokens and the current time (adjusted with clock drift)
   * @returns {boolean} if the session is still valid
   */,t.isValid=function(){var e=Math.floor(new Date/1e3)-this.clockDrift;return e<this.accessToken.getExpiration()&&e<this.idToken.getExpiration()},e}()}),i("ewYam",function(t,r){e(t.exports,"default",()=>i);/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */var n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],o=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],i=/*#__PURE__*/function(){function e(){}return(/**
   * @returns {string} The current time in "ddd MMM D HH:mm:ss UTC YYYY" format.
   */e.prototype.getNowString=function(){var e=new Date,t=o[e.getUTCDay()],r=n[e.getUTCMonth()],i=e.getUTCDate(),s=e.getUTCHours();s<10&&(s="0"+s);var a=e.getUTCMinutes();a<10&&(a="0"+a);var u=e.getUTCSeconds();return u<10&&(u="0"+u),t+" "+r+" "+i+" "+s+":"+a+":"+u+" UTC "+e.getUTCFullYear()},e)}()}),i("4PRoF",function(t,r){e(t.exports,"default",()=>n);/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 *//** @class */var n=/*#__PURE__*/function(){/**
   * Constructs a new CognitoUserAttribute object
   * @param {string=} Name The record's name
   * @param {string=} Value The record's value
   */function e(e){var t=void 0===e?{}:e,r=t.Name,n=t.Value;this.Name=r||"",this.Value=n||""}/**
   * @returns {string} the record's value.
   */var t=e.prototype;return t.getValue=function(){return this.Value}/**
   * Sets the record's value.
   * @param {string} value The new value.
   * @returns {CognitoUserAttribute} The record for method chaining.
   */,t.setValue=function(e){return this.Value=e,this}/**
   * @returns {string} the record's name.
   */,t.getName=function(){return this.Name}/**
   * Sets the record's name
   * @param {string} name The new name.
   * @returns {CognitoUserAttribute} The record for method chaining.
   */,t.setName=function(e){return this.Name=e,this}/**
   * @returns {string} a string representation of the record.
   */,t.toString=function(){return JSON.stringify(this)}/**
   * @returns {object} a flat object representing the record.
   */,t.toJSON=function(){return{Name:this.Name,Value:this.Value}},e}()}),i("e0O2m",function(t,r){e(t.exports,"default",()=>i);/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */var n={},o=/*#__PURE__*/function(){function e(){}return(/**
   * This is used to set a specific item in storage
   * @param {string} key - the key for the item
   * @param {object} value - the value
   * @returns {string} value that was set
   */e.setItem=function(e,t){return n[e]=t,n[e]}/**
   * This is used to get a specific key from storage
   * @param {string} key - the key for the item
   * This is used to clear the storage
   * @returns {string} the data item
   */,e.getItem=function(e){return Object.prototype.hasOwnProperty.call(n,e)?n[e]:void 0}/**
   * This is used to remove an item from storage
   * @param {string} key - the key being set
   * @returns {boolean} return true
   */,e.removeItem=function(e){return delete n[e]}/**
   * This is used to clear the storage
   * @returns {string} nothing
   */,e.clear=function(){return n={}},e)}(),i=/*#__PURE__*/function(){/**
   * This is used to get a storage object
   * @returns {object} the storage
   */function e(){try{this.storageWindow=window.localStorage,this.storageWindow.setItem("aws.cognito.test-ls",1),this.storageWindow.removeItem("aws.cognito.test-ls")}catch(e){this.storageWindow=o}}return e.prototype.getStorage=function(){return this.storageWindow},e}()}),i("foBd2",function(t,r){e(t.exports,"default",()=>a);/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */var n=o("g3D2k"),i=o("9UvTj"),s=o("e0O2m"),a=/*#__PURE__*/function(){/**
   * Constructs a new CognitoUserPool object
   * @param {object} data Creation options.
   * @param {string} data.UserPoolId Cognito user pool id.
   * @param {string} data.ClientId User pool application client id.
   * @param {string} data.endpoint Optional custom service endpoint.
   * @param {object} data.fetchOptions Optional options for fetch API.
   *        (only credentials option is supported)
   * @param {object} data.Storage Optional storage object.
   * @param {boolean} data.AdvancedSecurityDataCollectionFlag Optional:
   *        boolean flag indicating if the data collection is enabled
   *        to support cognito advanced security features. By default, this
   *        flag is set to true.
   */function e(e,t){var r=e||{},o=r.UserPoolId,i=r.ClientId,a=r.endpoint,u=r.fetchOptions,c=r.AdvancedSecurityDataCollectionFlag;if(!o||!i)throw Error("Both UserPoolId and ClientId are required.");if(o.length>55||!/^[\w-]+_[0-9a-zA-Z]+$/.test(o))throw Error("Invalid UserPoolId format.");var f=o.split("_")[0];this.userPoolId=o,this.clientId=i,this.client=new n.default(f,a,u),/**
     * By default, AdvancedSecurityDataCollectionFlag is set to true,
     * if no input value is provided.
     */this.advancedSecurityDataCollectionFlag=!1!==c,this.storage=e.Storage||new(0,s.default)().getStorage(),t&&(this.wrapRefreshSessionCallback=t)}/**
   * @returns {string} the user pool id
   */var t=e.prototype;return t.getUserPoolId=function(){return this.userPoolId}/**
   * @returns {string} the user pool name
   */,t.getUserPoolName=function(){return this.getUserPoolId().split("_")[1]}/**
   * @returns {string} the client id
   */,t.getClientId=function(){return this.clientId}/**
   * method for signing up a user
   * @param {string} username User's username.
   * @param {string} password Plain-text initial password entered by user.
   * @param {(AttributeArg[])=} userAttributes New user attributes.
   * @param {(AttributeArg[])=} validationData Application metadata.
   * @param {(AttributeArg[])=} clientMetadata Client metadata.
   * @param {nodeCallback<SignUpResult>} callback Called on error or with the new user.
   * @param {ClientMetadata} clientMetadata object which is passed from client to Cognito Lambda trigger
   * @returns {void}
   */,t.signUp=function(e,t,r,n,o,s){var a=this,u={ClientId:this.clientId,Username:e,Password:t,UserAttributes:r,ValidationData:n,ClientMetadata:s};this.getUserContextData(e)&&(u.UserContextData=this.getUserContextData(e)),this.client.request("SignUp",u,function(t,r){if(t)return o(t,null);var n={Username:e,Pool:a,Storage:a.storage};return o(null,{user:new i.default(n),userConfirmed:r.UserConfirmed,userSub:r.UserSub,codeDeliveryDetails:r.CodeDeliveryDetails})})}/**
   * method for getting the current user of the application from the local storage
   *
   * @returns {CognitoUser} the user retrieved from storage
   */,t.getCurrentUser=function(){var e="CognitoIdentityServiceProvider."+this.clientId+".LastAuthUser",t=this.storage.getItem(e);if(t){var r={Username:t,Pool:this,Storage:this.storage};return new i.default(r)}return null}/**
   * This method returns the encoded data string used for cognito advanced security feature.
   * This would be generated only when developer has included the JS used for collecting the
   * data on their client. Please refer to documentation to know more about using AdvancedSecurity
   * features
   * @param {string} username the username for the context data
   * @returns {string} the user context data
   **/,t.getUserContextData=function(e){if("undefined"!=typeof AmazonCognitoAdvancedSecurityData){/* eslint-disable */var t=AmazonCognitoAdvancedSecurityData;/* eslint-enable */if(this.advancedSecurityDataCollectionFlag){var r=t.getData(e,this.userPoolId,this.clientId);if(r)return{EncodedData:r}}return{}}},e}()}),i("g3D2k",function(t,r){e(t.exports,"default",()=>f),o("5MPpy");var n=o("8ZOc6");function i(e){var t="function"==typeof Map?new Map:void 0;return(i=function(e){if(null===e||-1===Function.toString.call(e).indexOf("[native code]"))return e;if("function"!=typeof e)throw TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return s(e,arguments,u(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),a(r,e)})(e)}function s(e,t,r){return(s=!function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}()?function(e,t,r){var n=[null];n.push.apply(n,t);var o=new(Function.bind.apply(e,n));return r&&a(o,r.prototype),o}:Reflect.construct.bind()).apply(null,arguments)}function a(e,t){return(a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var c=/*#__PURE__*/function(e){function t(t,r,n,o){var i;return(i=e.call(this,t)||this).code=r,i.name=n,i.statusCode=o,i}return t.prototype=Object.create(e.prototype),t.prototype.constructor=t,a(t,e),t}(/*#__PURE__*/i(Error)),f=/*#__PURE__*/function(){/**
   * Constructs a new AWS Cognito Identity Provider client object
   * @param {string} region AWS region
   * @param {string} endpoint endpoint
   * @param {object} fetchOptions options for fetch API (only credentials is supported)
   */function e(e,t,r){this.endpoint=t||"https://cognito-idp."+e+".amazonaws.com/";var n=(r||{}).credentials;this.fetchOptions=n?{credentials:n}:{}}/**
   * Makes an unauthenticated request on AWS Cognito Identity Provider API
   * using fetch
   * @param {string} operation API operation
   * @param {object} params Input parameters
   * @returns Promise<object>
   */var t=e.prototype;return t.promisifyRequest=function(e,t){var r=this;return new Promise(function(n,o){r.request(e,t,function(e,t){e?o(new c(e.message,e.code,e.name,e.statusCode)):n(t)})})},t.requestWithRetry=function(e,t,r){var n=this;(function e(t,r,n,o){if(void 0===o&&(o=1),"function"!=typeof t)throw Error("functionToRetry must be a function");return h.debug(t.name+" attempt #"+o+" with args: "+JSON.stringify(r)),t.apply(void 0,r).catch(function(i){if(h.debug("error on "+t.name,i),i&&i.nonRetryable)throw h.debug(t.name+" non retryable error",i),i;var s=n(o,r,i);if(h.debug(t.name+" retrying in "+s+" ms"),!1!==s)return new Promise(function(e){return setTimeout(e,s)}).then(function(){return e(t,r,n,o+1)});throw i})})(function(t){return new Promise(function(r,o){n.request(e,t,function(e,t){e?o(e):r(t)})})},[t],function(e){var t=100*Math.pow(2,e)+100*Math.random();return!(t>5e3)&&t}).then(function(e){return r(null,e)}).catch(function(e){return r(e)})}/**
   * Makes an unauthenticated request on AWS Cognito Identity Provider API
   * using fetch
   * @param {string} operation API operation
   * @param {object} params Input parameters
   * @param {function} callback Callback called when a response is returned
   * @returns {void}
   */,t.request=function(e,t,r){var o,i={"Content-Type":"application/x-amz-json-1.1","X-Amz-Target":"AWSCognitoIdentityProviderService."+e,"X-Amz-User-Agent":(0,n.getAmplifyUserAgent)(),"Cache-Control":"no-store"},s=Object.assign({},this.fetchOptions,{headers:i,method:"POST",mode:"cors",body:JSON.stringify(t)});fetch(this.endpoint,s).then(function(e){return o=e,e},function(e){// If error happens here, the request failed
// if it is TypeError throw network error
if(e instanceof TypeError)throw Error("Network error");throw e}).then(function(e){return e.json().catch(function(){return{}})}).then(function(e){// return parsed body stream
if(o.ok)return r(null,e);// Taken from aws-sdk-js/lib/protocol/json.js
// eslint-disable-next-line no-underscore-dangle
var t=(e.__type||e.code).split("#").pop(),n=Error(e.message||e.Message||null);return n.name=t,n.code=t,r(n)}).catch(function(e){// first check if we have a service error
if(o&&o.headers&&o.headers.get("x-amzn-errortype"))try{var t=o.headers.get("x-amzn-errortype").split(":")[0],n=Error(o.status?o.status.toString():null);return n.code=t,n.name=t,n.statusCode=o.status,r(n)}catch(e){}else e instanceof Error&&"Network error"===e.message&&(e.code="NetworkError");return r(e)})},e}(),h={debug:function(){// Intentionally blank. This package doesn't have logging
}}}),i("8ZOc6",function(t,r){e(t.exports,"addAuthCategoryToCognitoUserAgent",()=>a),e(t.exports,"addFrameworkToCognitoUserAgent",()=>u),e(t.exports,"getAmplifyUserAgent",()=>c);var n=o("hUce8"),i=o("kNO0U");// constructor
function s(){}// public
s.prototype.userAgent=(0,n.getUserAgent)();var a=function(){s.category=i.AUTH_CATEGORY},u=function(e){s.framework=e},c=function(e){var t=s.category?" "+s.category:"",r=s.framework?" framework/"+s.framework:"";return""+s.prototype.userAgent+t+r}}),i("kNO0U",function(t,r){e(t.exports,"AUTH_CATEGORY",()=>n);var n="auth"}),i("i2gj0",function(t,r){e(t.exports,"default",()=>i);var n=o("eZeDV"),i=/*#__PURE__*/function(){/**
   * Constructs a new CookieStorage object
   * @param {object} data Creation options.
   * @param {string} data.domain Cookies domain (default: domain of the page
   * 				where the cookie was created, excluding subdomains)
   * @param {string} data.path Cookies path (default: '/')
   * @param {integer} data.expires Cookie expiration (in days, default: 365)
   * @param {boolean} data.secure Cookie secure flag (default: true)
   * @param {string} data.sameSite Cookie request behavior (default: null)
   */function e(e){if(void 0===e&&(e={}),e.domain&&(this.domain=e.domain),e.path?this.path=e.path:this.path="/",Object.prototype.hasOwnProperty.call(e,"expires")?this.expires=e.expires:this.expires=365,Object.prototype.hasOwnProperty.call(e,"secure")?this.secure=e.secure:this.secure=!0,Object.prototype.hasOwnProperty.call(e,"sameSite")){if(!["strict","lax","none"].includes(e.sameSite))throw Error('The sameSite value of cookieStorage must be "lax", "strict" or "none".');if("none"===e.sameSite&&!this.secure)throw Error("sameSite = None requires the Secure attribute in latest browser versions.");this.sameSite=e.sameSite}else this.sameSite=null}/**
   * This is used to set a specific item in storage
   * @param {string} key - the key for the item
   * @param {object} value - the value
   * @returns {string} value that was set
   */var t=e.prototype;return t.setItem=function(e,t){var r={path:this.path,expires:this.expires,domain:this.domain,secure:this.secure};return this.sameSite&&(r.sameSite=this.sameSite),n.set(e,t,r),n.get(e)}/**
   * This is used to get a specific key from storage
   * @param {string} key - the key for the item
   * This is used to clear the storage
   * @returns {string} the data item
   */,t.getItem=function(e){return n.get(e)}/**
   * This is used to remove an item from storage
   * @param {string} key - the key being set
   * @returns {string} value - value that was deleted
   */,t.removeItem=function(e){var t={path:this.path,expires:this.expires,domain:this.domain,secure:this.secure};return this.sameSite&&(t.sameSite=this.sameSite),n.remove(e,t)}/**
   * This is used to clear the storage of optional
   * items that were previously set
   * @returns {} an empty object
   */,t.clear=function(){for(var e=n.get(),t=Object.keys(e).length,r=0;r<t;++r)this.removeItem(Object.keys(e)[r]);return{}},e}()}),i("eZeDV",function(e,t){var r;r=function(){function e(){for(var e=0,t={};e<arguments.length;e++){var r=arguments[e];for(var n in r)t[n]=r[n]}return t}function t(e){return e.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function r(n){function o(){}function i(t,r,i){if("undefined"!=typeof document){"number"==typeof(i=e({path:"/"},o.defaults,i)).expires&&(i.expires=new Date(new Date*1+864e5*i.expires)),// We're using "expires" because "max-age" is not supported by IE
i.expires=i.expires?i.expires.toUTCString():"";try{var s=JSON.stringify(r);/^[\{\[]/.test(s)&&(r=s)}catch(e){}r=n.write?n.write(r,t):encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(String(t)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var a="";for(var u in i)i[u]&&(a+="; "+u,!0!==i[u]&&// Considers RFC 6265 section 5.2:
// ...
// 3.  If the remaining unparsed-attributes contains a %x3B (";")
//     character:
// Consume the characters of the unparsed-attributes up to,
// not including, the first %x3B (";") character.
// ...
(a+="="+i[u].split(";")[0]));return document.cookie=t+"="+r+a}}function s(e,r){if("undefined"!=typeof document){for(var o={},i=document.cookie?document.cookie.split("; "):[],s=0;s<i.length;s++){var a=i[s].split("="),u=a.slice(1).join("=");r||'"'!==u.charAt(0)||(u=u.slice(1,-1));try{var c=t(a[0]);if(u=(n.read||n)(u,c)||t(u),r)try{u=JSON.parse(u)}catch(e){}if(o[c]=u,e===c)break}catch(e){}}return e?o[e]:o}}return o.set=i,o.get=function(e){return s(e,!1)},o.getJSON=function(e){return s(e,!0)},o.remove=function(t,r){i(t,"",e(r,{expires:-1}))},o.defaults={},o.withConverter=r,o}(function(){})},"function"==typeof define&&define.amd&&define(r),e.exports=r()}),i("jz85N",function(t,r){e(t.exports,"addAuthCategoryToCognitoUserAgent",()=>o("8ZOc6").addAuthCategoryToCognitoUserAgent),e(t.exports,"addFrameworkToCognitoUserAgent",()=>o("8ZOc6").addFrameworkToCognitoUserAgent),o("8ZOc6")}),i("biuEp",function(e,t){var r=o("fFTr1"),n=o("7yJoo");function i(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}t.parse=m,t.resolve=function(e,t){return m(e,!1,!0).resolve(t)},t.resolveObject=function(e,t){return e?m(e,!1,!0).resolveObject(t):t},t.format=// format a parsed object into a url string
function(e){return(n.isString(e)&&(e=m(e)),e instanceof i)?e.format():i.prototype.format.call(e)},t.Url=i;// Reference: RFC 3986, RFC 1808, RFC 2396
// define these here so at least they only have to be
// compiled once on the first module load.
var s=/^([a-z0-9.+-]+:)/i,a=/:[0-9]*$/,u=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,c=["'"].concat(["{","}","|","\\","^","`"].concat(["<",">",'"',"`"," ","\r","\n","	"])),// Note that any invalid chars are also handled, but these
// are the ones that are *expected* to be seen, so we fast-path
// them.
f=["%","/","?",";","#"].concat(c),h=["/","?","#"],l=/^[+a-z0-9A-Z_-]{0,63}$/,d=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,p={javascript:!0,"javascript:":!0},g={javascript:!0,"javascript:":!0},y={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},v=o("9B6BR");function m(e,t,r){if(e&&n.isObject(e)&&e instanceof i)return e;var o=new i;return o.parse(e,t,r),o}i.prototype.parse=function(e,t,o){if(!n.isString(e))throw TypeError("Parameter 'url' must be a string, not "+typeof e);// Copy chrome, IE, opera backslash-handling behavior.
// Back slashes before the query string get converted to forward slashes
// See: https://code.google.com/p/chromium/issues/detail?id=25916
var i=e.indexOf("?"),a=-1!==i&&i<e.indexOf("#")?"?":"#",m=e.split(a);m[0]=m[0].replace(/\\/g,"/");var b=e=m.join(a);if(// trim before proceeding.
// This is to support parse stuff like "  http://foo.com  \n"
b=b.trim(),!o&&1===e.split("#").length){// Try fast path regexp
var w=u.exec(b);if(w)return this.path=b,this.href=b,this.pathname=w[1],w[2]?(this.search=w[2],t?this.query=v.parse(this.search.substr(1)):this.query=this.search.substr(1)):t&&(this.search="",this.query={}),this}var S=s.exec(b);if(S){var _=(S=S[0]).toLowerCase();this.protocol=_,b=b.substr(S.length)}// figure out if it's got a host
// user@server is *always* interpreted as a hostname, and url
// resolution will treat //foo/bar as host=foo,path=bar because that's
// how the browser resolves relative URLs.
if(o||S||b.match(/^\/\/[^@\/]+@[^@\/]+/)){var A="//"===b.substr(0,2);A&&!(S&&g[S])&&(b=b.substr(2),this.slashes=!0)}if(!g[S]&&(A||S&&!y[S])){for(var E,I,C=-1,U=0;U<h.length;U++){var T=b.indexOf(h[U]);-1!==T&&(-1===C||T<C)&&(C=T)}-1!==(I=-1===C?b.lastIndexOf("@"):b.lastIndexOf("@",C))&&(E=b.slice(0,I),b=b.slice(I+1),this.auth=decodeURIComponent(E)),// the host is the remaining to the left of the first non-host char
C=-1;for(var U=0;U<f.length;U++){var T=b.indexOf(f[U]);-1!==T&&(-1===C||T<C)&&(C=T)}-1===C&&(C=b.length),this.host=b.slice(0,C),b=b.slice(C),// pull out port.
this.parseHost(),// we've indicated that there is a hostname,
// so even if it's empty, it has to be present.
this.hostname=this.hostname||"";// if hostname begins with [ and ends with ]
// assume that it's an IPv6 address.
var P="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];// validate a little.
if(!P)for(var x=this.hostname.split(/\./),U=0,k=x.length;U<k;U++){var R=x[U];if(R&&!R.match(l)){for(var O="",D=0,F=R.length;D<F;D++)R.charCodeAt(D)>127?// we need this to make sure size of hostname is not
// broken by replacing non-ASCII by nothing
O+="x":O+=R[D];// we test again with ASCII char only
if(!O.match(l)){var B=x.slice(0,U),N=x.slice(U+1),M=R.match(d);M&&(B.push(M[1]),N.unshift(M[2])),N.length&&(b="/"+N.join(".")+b),this.hostname=B.join(".");break}}}this.hostname.length>255?this.hostname="":this.hostname=this.hostname.toLowerCase(),P||// It only converts parts of the domain name that
// have non-ASCII characters, i.e. it doesn't matter if
// you call it with a domain that already is ASCII-only.
(this.hostname=r.toASCII(this.hostname));var L=this.port?":"+this.port:"",j=this.hostname||"";this.host=j+L,this.href+=this.host,P&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==b[0]&&(b="/"+b))}// now rest is set to the post-host stuff.
// chop off any delim chars.
if(!p[_])// escaped, even if encodeURIComponent doesn't think they
// need to be.
for(var U=0,k=c.length;U<k;U++){var V=c[U];if(-1!==b.indexOf(V)){var K=encodeURIComponent(V);K===V&&(K=escape(V)),b=b.split(V).join(K)}}// chop off from the tail first.
var H=b.indexOf("#");-1!==H&&(// got a fragment string.
this.hash=b.substr(H),b=b.slice(0,H));var q=b.indexOf("?");//to support http.request
if(-1!==q?(this.search=b.substr(q),this.query=b.substr(q+1),t&&(this.query=v.parse(this.query)),b=b.slice(0,q)):t&&(// no query string, but parseQueryString still requested
this.search="",this.query={}),b&&(this.pathname=b),y[_]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var L=this.pathname||"",Y=this.search||"";this.path=L+Y}return(// finally, reconstruct the href based on what has been validated.
this.href=this.format(),this)},i.prototype.format=function(){var e=this.auth||"";e&&(e=(e=encodeURIComponent(e)).replace(/%3A/i,":")+"@");var t=this.protocol||"",r=this.pathname||"",o=this.hash||"",i=!1,s="";this.host?i=e+this.host:this.hostname&&(i=e+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(i+=":"+this.port)),this.query&&n.isObject(this.query)&&Object.keys(this.query).length&&(s=v.stringify(this.query));var a=this.search||s&&"?"+s||"";return t&&":"!==t.substr(-1)&&(t+=":"),this.slashes||(!t||y[t])&&!1!==i?(i="//"+(i||""),r&&"/"!==r.charAt(0)&&(r="/"+r)):i||(i=""),o&&"#"!==o.charAt(0)&&(o="#"+o),a&&"?"!==a.charAt(0)&&(a="?"+a),t+i+(r=r.replace(/[?#]/g,function(e){return encodeURIComponent(e)}))+(a=a.replace("#","%23"))+o},i.prototype.resolve=function(e){return this.resolveObject(m(e,!1,!0)).format()},i.prototype.resolveObject=function(e){if(n.isString(e)){var t=new i;t.parse(e,!1,!0),e=t}for(var r=new i,o=Object.keys(this),s=0;s<o.length;s++){var a=o[s];r[a]=this[a]}// if the relative url is empty, then there's nothing left to do here.
if(// hash is always overridden, no matter what.
// even href="" will remove it.
r.hash=e.hash,""===e.href)return r.href=r.format(),r;// hrefs like //foo/bar always cut to the protocol.
if(e.slashes&&!e.protocol){for(var u=Object.keys(e),c=0;c<u.length;c++){var f=u[c];"protocol"!==f&&(r[f]=e[f])}return y[r.protocol]&&r.hostname&&!r.pathname&&(r.path=r.pathname="/"),r.href=r.format(),r}if(e.protocol&&e.protocol!==r.protocol){// if it's a known url protocol, then changing
// the protocol does weird things
// first, if it's not file:, then we MUST have a host,
// and if there was a path
// to begin with, then we MUST have a path.
// if it is file:, then the host is dropped,
// because that's known to be hostless.
// anything else is assumed to be absolute.
if(!y[e.protocol]){for(var h=Object.keys(e),l=0;l<h.length;l++){var d=h[l];r[d]=e[d]}return r.href=r.format(),r}if(r.protocol=e.protocol,e.host||g[e.protocol])r.pathname=e.pathname;else{for(var p=(e.pathname||"").split("/");p.length&&!(e.host=p.shift()););e.host||(e.host=""),e.hostname||(e.hostname=""),""!==p[0]&&p.unshift(""),p.length<2&&p.unshift(""),r.pathname=p.join("/")}// to support http.request
if(r.search=e.search,r.query=e.query,r.host=e.host||"",r.auth=e.auth,r.hostname=e.hostname||e.host,r.port=e.port,r.pathname||r.search){var v=r.pathname||"",m=r.search||"";r.path=v+m}return r.slashes=r.slashes||e.slashes,r.href=r.format(),r}var b=r.pathname&&"/"===r.pathname.charAt(0),w=e.host||e.pathname&&"/"===e.pathname.charAt(0),S=w||b||r.host&&e.pathname,_=S,A=r.pathname&&r.pathname.split("/")||[],p=e.pathname&&e.pathname.split("/")||[],E=r.protocol&&!y[r.protocol];if(E&&(r.hostname="",r.port=null,r.host&&(""===A[0]?A[0]=r.host:A.unshift(r.host)),r.host="",e.protocol&&(e.hostname=null,e.port=null,e.host&&(""===p[0]?p[0]=e.host:p.unshift(e.host)),e.host=null),S=S&&(""===p[0]||""===A[0])),w)// it's absolute.
r.host=e.host||""===e.host?e.host:r.host,r.hostname=e.hostname||""===e.hostname?e.hostname:r.hostname,r.search=e.search,r.query=e.query,A=p;else if(p.length)A||(A=[]),A.pop(),A=A.concat(p),r.search=e.search,r.query=e.query;else if(!n.isNullOrUndefined(e.search)){// just pull out the search.
// like href='?foo'.
// Put this after the other two cases because it simplifies the booleans
if(E){r.hostname=r.host=A.shift();//occationaly the auth can get stuck only in host
//this especially happens in cases like
//url.resolveObject('mailto:local1@domain1', 'local2@domain2')
var I=!!(r.host&&r.host.indexOf("@")>0)&&r.host.split("@");I&&(r.auth=I.shift(),r.host=r.hostname=I.shift())}return r.search=e.search,r.query=e.query,n.isNull(r.pathname)&&n.isNull(r.search)||(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.href=r.format(),r}if(!A.length)return(// no path at all.  easy.
// we've already handled the other stuff above.
r.pathname=null,r.search?r.path="/"+r.search:r.path=null,r.href=r.format(),r);for(var C=A.slice(-1)[0],U=(r.host||e.host||A.length>1)&&("."===C||".."===C)||""===C,T=0,P=A.length;P>=0;P--)"."===(C=A[P])?A.splice(P,1):".."===C?(A.splice(P,1),T++):T&&(A.splice(P,1),T--);// if the path is allowed to go above the root, restore leading ..s
if(!S&&!_)for(;T--;T)A.unshift("..");S&&""!==A[0]&&(!A[0]||"/"!==A[0].charAt(0))&&A.unshift(""),U&&"/"!==A.join("/").substr(-1)&&A.push("");var x=""===A[0]||A[0]&&"/"===A[0].charAt(0);// put the host back
if(E){r.hostname=r.host=x?"":A.length?A.shift():"";//occationaly the auth can get stuck only in host
//this especially happens in cases like
//url.resolveObject('mailto:local1@domain1', 'local2@domain2')
var I=!!(r.host&&r.host.indexOf("@")>0)&&r.host.split("@");I&&(r.auth=I.shift(),r.host=r.hostname=I.shift())}return(S=S||r.host&&A.length)&&!x&&A.unshift(""),A.length?r.pathname=A.join("/"):(r.pathname=null,r.path=null),n.isNull(r.pathname)&&n.isNull(r.search)||(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.auth=e.auth||r.auth,r.slashes=r.slashes||e.slashes,r.href=r.format(),r},i.prototype.parseHost=function(){var e=this.host,t=a.exec(e);t&&(":"!==(t=t[0])&&(this.port=t.substr(1)),e=e.substr(0,e.length-t.length)),e&&(this.hostname=e)}}),i("fFTr1",function(e,r){!function(n){/** Detect free variables */var o=r&&!r.nodeType&&r,i=e&&!e.nodeType&&e,s="object"==typeof t&&t;(s.global===s||s.window===s||s.self===s)&&(n=s);/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */var a,/** Temporary variable */u,/** Regular expressions */c=/^xn--/,f=/[^\x20-\x7E]/,h=/[\x2E\u3002\uFF0E\uFF61]/g,/** Error messages */l={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},d=Math.floor,p=String.fromCharCode;/*--------------------------------------------------------------------------*//**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */function g(e){throw RangeError(l[e])}/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */function y(e,t){for(var r=e.length,n=[];r--;)n[r]=t(e[r]);return n}/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */function v(e,t){var r=e.split("@"),n="";return r.length>1&&(// In email addresses, only the domain name should be punycoded. Leave
// the local part (i.e. everything up to `@`) intact.
n=r[0]+"@",e=r[1]),n+y(// Avoid `split(regex)` for IE8 compatibility. See #17.
(e=e.replace(h,".")).split("."),t).join(".")}/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */function m(e){for(var t,r,n=[],o=0,i=e.length;o<i;)(t=e.charCodeAt(o++))>=55296&&t<=56319&&o<i?(64512&// high surrogate, and there is a next character
(r=e.charCodeAt(o++)))==56320?n.push(((1023&t)<<10)+(1023&r)+65536):(// unmatched surrogate; only append this code unit, in case the next
// code unit is the high surrogate of a surrogate pair
n.push(t),o--):n.push(t);return n}/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */function b(e){return y(e,function(e){var t="";return e>65535&&(e-=65536,t+=p(e>>>10&1023|55296),e=56320|1023&e),t+=p(e)}).join("")}/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */function w(e,t){//  0..25 map to ASCII a..z or A..Z
// 26..35 map to ASCII 0..9
return e+22+75*(e<26)-((0!=t)<<5)}/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */function S(e,t,r){var n=0;for(e=r?d(e/700):e>>1,e+=d(e/t);e>455;n+=36)e=d(e/35);return d(n+36*e/(e+38))}/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */function _(e){// Don't use UCS-2
var t,r,n,o,i,s,a,u,c,f,/** Cached calculation results */h,l=[],p=e.length,y=0,v=128,m=72;for(// Handle the basic code points: let `basic` be the number of input code
// points before the last delimiter, or `0` if there is none, then copy
// the first basic code points to the output.
(n=e.lastIndexOf("-"))<0&&(n=0),o=0;o<n;++o)e.charCodeAt(o)>=128&&g("not-basic"),l.push(e.charCodeAt(o));// Main decoding loop: start just after the last delimiter if any basic code
// points were copied; start at the beginning otherwise.
for(i=n>0?n+1:0;i<p;){// `index` is the index of the next character to be consumed.
// Decode a generalized variable-length integer into `delta`,
// which gets added to `i`. The overflow checking is easier
// if we increase `i` as we go, then subtract off its starting
// value at the end to obtain `delta`.
for(s=y,a=1,u=36;i>=p&&g("invalid-input"),((c=(t=e.charCodeAt(i++))-48<10?t-22:t-65<26?t-65:t-97<26?t-97:36)>=36||c>d((2147483647-y)/a))&&g("overflow"),y+=c*a,!(c<(f=u<=m?1:u>=m+26?26:u-m));u+=36)a>d(2147483647/(h=36-f))&&g("overflow"),a*=h;m=S(y-s,r=l.length+1,0==s),d(y/r)>2147483647-v&&g("overflow"),v+=d(y/r),y%=r,// Insert `n` at position `i` of the output
l.splice(y++,0,v)}return b(l)}/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */function A(e){var t,r,n,o,i,s,a,u,c,f,h,/** `inputLength` will hold the number of code points in `input`. */l,/** Cached calculation results */y,v,b,_=[];// Handle the basic code points
for(s=0,// Cache the length
l=// Convert the input in UCS-2 to Unicode
(e=m(e)).length,// Initialize the state
t=128,r=0,i=72;s<l;++s)(h=e[s])<128&&_.push(p(h));// Main encoding loop:
for(n=o=_.length,o&&_.push("-");n<l;){// All non-basic code points < n have been handled already. Find the next
// larger one:
for(a=2147483647,s=0;s<l;++s)(h=e[s])>=t&&h<a&&(a=h);for(a-t>d((2147483647-r)/// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
// but guard against overflow
(y=n+1))&&g("overflow"),r+=(a-t)*y,t=a,s=0;s<l;++s)if((h=e[s])<t&&++r>2147483647&&g("overflow"),h==t){// Represent delta as a generalized variable-length integer
for(u=r,c=36;!(u<(f=c<=i?1:c>=i+26?26:c-i));c+=36)b=u-f,v=36-f,_.push(p(w(f+b%v,0))),u=d(b/v);_.push(p(w(u,0))),i=S(r,y,n==o),r=0,++n}++r,++t}return _.join("")}/** Expose `punycode` */// Some AMD build optimizers, like r.js, check for specific condition patterns
// like the following:
if(/*--------------------------------------------------------------------------*//** Define the public API */a={/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */version:"1.3.2",/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */ucs2:{decode:m,encode:b},decode:_,encode:A,toASCII:/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */function(e){return v(e,function(e){return f.test(e)?"xn--"+A(e):e})},toUnicode:/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */function(e){return v(e,function(e){return c.test(e)?_(e.slice(4).toLowerCase()):e})}},"function"==typeof define&&"object"==typeof define.amd&&define.amd)define("punycode",function(){return a});else if(o&&i){if(e.exports==o)i.exports=a;else for(u in a)a.hasOwnProperty(u)&&(o[u]=a[u])}else n.punycode=a}(this)}),i("7yJoo",function(e,t){e.exports={isString:function(e){return"string"==typeof e},isObject:function(e){return"object"==typeof e&&null!==e},isNull:function(e){return null===e},isNullOrUndefined:function(e){return null==e}}}),i("9B6BR",function(t,r){var n,i;e(t.exports,"parse",()=>n,e=>n=e),e(t.exports,"stringify",()=>i,e=>i=e),n=o("kzGqM"),i=o("kWD7b")}),i("kzGqM",function(e,t){e.exports=function(e,t,n,o){t=t||"&",n=n||"=";var i={};if("string"!=typeof e||0===e.length)return i;var s=/\+/g;e=e.split(t);var a=1e3;o&&"number"==typeof o.maxKeys&&(a=o.maxKeys);var u=e.length;a>0&&u>a&&(u=a);for(var c=0;c<u;++c){var f,h,l,d,p=e[c].replace(s,"%20"),g=p.indexOf(n);(g>=0?(f=p.substr(0,g),h=p.substr(g+1)):(f=p,h=""),l=decodeURIComponent(f),d=decodeURIComponent(h),Object.prototype.hasOwnProperty.call(i,l))?r(i[l])?i[l].push(d):i[l]=[i[l],d]:i[l]=d}return i};var r=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}}),i("kWD7b",function(e,t){var r=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};e.exports=function(e,t,s,a){return(t=t||"&",s=s||"=",null===e&&(e=void 0),"object"==typeof e)?o(i(e),function(i){var a=encodeURIComponent(r(i))+s;return n(e[i])?o(e[i],function(e){return a+encodeURIComponent(r(e))}).join(t):a+encodeURIComponent(r(e[i]))}).join(t):a?encodeURIComponent(r(a))+s+encodeURIComponent(r(e)):""};var n=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};function o(e,t){if(e.map)return e.map(t);for(var r=[],n=0;n<e.length;n++)r.push(t(e[n],n));return r}var i=Object.keys||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.push(r);return t}}),i("l5usX",function(t,r){e(t.exports,"default",()=>w);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("dfmKz"),i=o("biuEp"),s=o("4mY8Z"),a=o("kcHk5"),u=o("iUhs4"),c=o("it4KL"),f=o("9kzXW"),h=o("2ZPeH"),l=o("3NGR1"),d=o("2hp02"),p=o("7trhX"),g=o("9LMg3"),y=o("hMqoc"),v="undefined"!=typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("amplify_default"):"@@amplify_default",m=function(e,t,r){(0,d.Hub).dispatch("auth",{event:e,data:t,message:r},"Auth",v)},b=new h.ConsoleLogger("OAuth"),w=/** @class */function(){function e(e){var t=e.config,r=e.cognitoClientId,n=e.scopes,o=void 0===n?[]:n;if(this._urlOpener=t.urlOpener||s.launchUri,this._config=t,this._cognitoClientId=r,!this.isValidScopes(o))throw Error("scopes must be a String Array");this._scopes=o}return e.prototype.isValidScopes=function(e){return Array.isArray(e)&&e.every(function(e){return"string"==typeof e})},e.prototype.oauthSignIn=function(e,t,r,o,i,s){void 0===e&&(e="code"),void 0===i&&(i=c.CognitoHostedUIIdentityProvider.Cognito);var u=this._generateState(32),f=s?u+"-"+(0,p.urlSafeEncode)(s):u;a.setState(f);var h=this._generateRandom(128);a.setPKCE(h);var l=this._generateChallenge(h),d=this._scopes.join(" "),g="https://"+t+"/oauth2/authorize?"+Object.entries((0,n.__assign)((0,n.__assign)({redirect_uri:r,response_type:e,client_id:o,identity_provider:i,scope:d,state:f},"code"===e?{code_challenge:l}:{}),"code"===e?{code_challenge_method:"S256"}:{})).map(function(e){var t=(0,n.__read)(e,2),r=t[0],o=t[1];return encodeURIComponent(r)+"="+encodeURIComponent(o)}).join("&");b.debug("Redirecting to "+g),this._urlOpener(g,r)},e.prototype._handleCodeFlow=function(e){return(0,n.__awaiter)(this,void 0,void 0,function(){var t,r,o,s,u,h,d,p,y,v,w,S,_,A,E,I;return(0,n.__generator)(this,function(C){switch(C.label){case 0:if(t=((0,i.parse)(e).query||"").split("&").map(function(e){return e.split("=")}).reduce(function(e,t){var r,o=(0,n.__read)(t,2),i=o[0],s=o[1];return(0,n.__assign)((0,n.__assign)({},e),((r={})[i]=s,r))},{code:void 0}).code,r=(0,i.parse)(e).pathname||"/",o=(0,i.parse)(this._config.redirectSignIn).pathname||"/",!t||r!==o)return[2/*return*/];return m("codeFlow",{},"Retrieving tokens from "+(s="https://"+this._config.domain+"/oauth2/token")),u=(0,c.isCognitoHostedOpts)(this._config)?this._cognitoClientId:this._config.clientID,h=(0,c.isCognitoHostedOpts)(this._config)?this._config.redirectSignIn:this._config.redirectUri,d=a.getPKCE(),p=(0,n.__assign)({grant_type:"authorization_code",code:t,client_id:u,redirect_uri:h},d?{code_verifier:d}:{}),b.debug("Calling token endpoint: "+s+" with",p),y=Object.entries(p).map(function(e){var t=(0,n.__read)(e,2),r=t[0],o=t[1];return encodeURIComponent(r)+"="+encodeURIComponent(o)}).join("&"),v={category:f.Category.Auth,action:f.AuthAction.FederatedSignIn},[4/*yield*/,fetch(s,{method:"POST",headers:((I={"Content-Type":"application/x-www-form-urlencoded"})[g.USER_AGENT_HEADER]=(0,l.getAmplifyUserAgent)(v),I),body:y})];case 1:return[4/*yield*/,C.sent().json()];case 2:if(S=(w=C.sent()).access_token,_=w.refresh_token,A=w.id_token,E=w.error)throw Error(E);return[2/*return*/,{accessToken:S,refreshToken:_,idToken:A}]}})})},e.prototype._handleImplicitFlow=function(e){return(0,n.__awaiter)(this,void 0,void 0,function(){var t,r,o;return(0,n.__generator)(this,function(s){return r=(t=((0,i.parse)(e).hash||"#").substr(1)// Remove # from returned code
.split("&").map(function(e){return e.split("=")}).reduce(function(e,t){var r,o=(0,n.__read)(t,2),i=o[0],s=o[1];return(0,n.__assign)((0,n.__assign)({},e),((r={})[i]=s,r))},{id_token:void 0,access_token:void 0})).id_token,o=t.access_token,m("implicitFlow",{},"Got tokens from "+e),b.debug("Retrieving implicit tokens from "+e+" with"),[2/*return*/,{accessToken:o,idToken:r,refreshToken:null}]})})},e.prototype.handleAuthResponse=function(e){return(0,n.__awaiter)(this,void 0,void 0,function(){var t,r,o,s,a,u,c;return(0,n.__generator)(this,function(f){switch(f.label){case 0:if(f.trys.push([0,5,,6]),r=(t=e?(0,n.__assign)((0,n.__assign)({},((0,i.parse)(e).hash||"#").substr(1).split("&").map(function(e){return e.split("=")}).reduce(function(e,t){var r=(0,n.__read)(t,2),o=r[0],i=r[1];return e[o]=i,e},{})),((0,i.parse)(e).query||"").split("&").map(function(e){return e.split("=")}).reduce(function(e,t){var r=(0,n.__read)(t,2),o=r[0],i=r[1];return e[o]=i,e},{})):{}).error,o=t.error_description,r)throw Error(o);if(s=this._validateState(t),b.debug("Starting "+this._config.responseType+" flow with "+e),"code"!==this._config.responseType)return[3/*break*/,2];return a=[{}],[4/*yield*/,this._handleCodeFlow(e)];case 1:return[2/*return*/,(0,n.__assign).apply(void 0,[(0,n.__assign).apply(void 0,a.concat([f.sent()])),{state:s}])];case 2:return u=[{}],[4/*yield*/,this._handleImplicitFlow(e)];case 3:return[2/*return*/,(0,n.__assign).apply(void 0,[(0,n.__assign).apply(void 0,u.concat([f.sent()])),{state:s}])];case 4:return[3/*break*/,6];case 5:throw c=f.sent(),b.debug("Error handling auth response.",c),c;case 6:return[2/*return*/]}})})},e.prototype._validateState=function(e){if(e){var t=a.getState(),r=e.state;// This is because savedState only exists if the flow was initiated by Amplify
if(t&&t!==r)throw Error("Invalid state in OAuth flow");return r}},e.prototype.signOut=function(){return(0,n.__awaiter)(this,void 0,void 0,function(){var e,t,r;return(0,n.__generator)(this,function(o){return e="https://"+this._config.domain+"/logout?",t=(0,c.isCognitoHostedOpts)(this._config)?this._cognitoClientId:this._config.oauth.clientID,r=(0,c.isCognitoHostedOpts)(this._config)?this._config.redirectSignOut:this._config.returnTo,m("oAuthSignOut",{oAuth:"signOut"},"Signing out from "+(e+=Object.entries({client_id:t,logout_uri:encodeURIComponent(r)}).map(function(e){var t=(0,n.__read)(e,2);return t[0]+"="+t[1]}).join("&"))),b.debug("Signing out from "+e),[2/*return*/,this._urlOpener(e,r)]})})},e.prototype._generateState=function(e){for(var t="",r=e,n="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";r>0;--r)t+=n[Math.round(Math.random()*(n.length-1))];return t},e.prototype._generateChallenge=function(e){var t=new y.Sha256;t.update(e);var r=t.digestSync(),n=(0,u.Buffer).from(r).toString("base64");return this._base64URL(n)},e.prototype._base64URL=function(e){return e.replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")},e.prototype._generateRandom=function(e){var t=new Uint8Array(e);if("undefined"!=typeof window&&window.crypto)window.crypto.getRandomValues(t);else for(var r=0;r<e;r+=1)t[r]=66*Math.random()|0;return this._bufferToString(t)},e.prototype._bufferToString=function(e){for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=[],n=0;n<e.byteLength;n+=1){var o=e[n]%t.length;r.push(t[o])}return r.join("")},e}()}),i("4mY8Z",function(t,r){e(t.exports,"launchUri",()=>n);var n=function(e){var t=window.open(e,"_self");return t?Promise.resolve(t):Promise.reject()}}),i("kcHk5",function(t,r){e(t.exports,"setState",()=>n),e(t.exports,"getState",()=>o),e(t.exports,"setPKCE",()=>i),e(t.exports,"getPKCE",()=>s);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=function(e){window.sessionStorage.setItem("oauth_state",e)},o=function(){var e=window.sessionStorage.getItem("oauth_state");return window.sessionStorage.removeItem("oauth_state"),e},i=function(e){window.sessionStorage.setItem("ouath_pkce_key",e)},s=function(){var e=window.sessionStorage.getItem("ouath_pkce_key");return window.sessionStorage.removeItem("ouath_pkce_key"),e}}),i("iUhs4",function(r,n){e(r.exports,"Buffer",()=>i,e=>i=e),e(r.exports,"INSPECT_MAX_BYTES",()=>s,e=>s=e);var i,s,a=o("kuxul"),u=o("9NvM5"),c=o("767Wy");function f(){return l.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function h(e,t){if(f()<t)throw RangeError("Invalid typed array length");return l.TYPED_ARRAY_SUPPORT?// Return an augmented `Uint8Array` instance, for best performance
(e=new Uint8Array(t)).__proto__=l.prototype:(null===e&&(e=new l(t)),e.length=t),e}/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */function l(e,t,r){if(!l.TYPED_ARRAY_SUPPORT&&!(this instanceof l))return new l(e,t,r);// Common case.
if("number"==typeof e){if("string"==typeof t)throw Error("If encoding is specified then the first argument must be a string");return g(this,e)}return d(this,e,t,r)}function d(e,t,r,n){if("number"==typeof t)throw TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&t instanceof ArrayBuffer?function(e,t,r,n){if(t.byteLength// this throws if `array` is not a valid ArrayBuffer
,r<0||t.byteLength<r)throw RangeError("'offset' is out of bounds");if(t.byteLength<r+(n||0))throw RangeError("'length' is out of bounds");return t=void 0===r&&void 0===n?new Uint8Array(t):void 0===n?new Uint8Array(t,r):new Uint8Array(t,r,n),l.TYPED_ARRAY_SUPPORT?// Return an augmented `Uint8Array` instance, for best performance
(e=t).__proto__=l.prototype:e=y(e,t),e}(e,t,r,n):"string"==typeof t?function(e,t,r){if(("string"!=typeof r||""===r)&&(r="utf8"),!l.isEncoding(r))throw TypeError('"encoding" must be a valid string encoding');var n=0|m(t,r),o=(e=h(e,n)).write(t,r);return o!==n&&// cause everything after the first invalid character to be ignored. (e.g.
// 'abxxcd' will be treated as 'ab')
(e=e.slice(0,o)),e}(e,t,r):function(e,t){if(l.isBuffer(t)){var r,n=0|v(t.length);return 0===(e=h(e,n)).length||t.copy(e,0,0,n),e}if(t){if("undefined"!=typeof ArrayBuffer&&t.buffer instanceof ArrayBuffer||"length"in t)return"number"!=typeof t.length||(r=t.length)!=r// eslint-disable-line no-self-compare
?h(e,0):y(e,t);if("Buffer"===t.type&&c(t.data))return y(e,t.data)}throw TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(e,t)}function p(e){if("number"!=typeof e)throw TypeError('"size" argument must be a number');if(e<0)throw RangeError('"size" argument must not be negative')}function g(e,t){if(p(t),e=h(e,t<0?0:0|v(t)),!l.TYPED_ARRAY_SUPPORT)for(var r=0;r<t;++r)e[r]=0;return e}function y(e,t){var r=t.length<0?0:0|v(t.length);e=h(e,r);for(var n=0;n<r;n+=1)e[n]=255&t[n];return e}function v(e){// Note: cannot use `length < kMaxLength()` here because that fails when
// length is NaN (which is otherwise coerced to zero.)
if(e>=f())throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+f().toString(16)+" bytes");return 0|e}function m(e,t){if(l.isBuffer(e))return e.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(e)||e instanceof ArrayBuffer))return e.byteLength;"string"!=typeof e&&(e=""+e);var r=e.length;if(0===r)return 0;for(// Use a for loop to avoid recursion
var n=!1;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":case void 0:return R(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return D(e).length;default:if(n)return R(e).length// assume utf8
;t=(""+t).toLowerCase(),n=!0}}function b(e,t,r){var n,o,i=!1;// Return early if start > this.length. Done here to prevent potential uint32
// coercion fail below.
if((void 0===t||t<0)&&(t=0),t>this.length||((void 0===r||r>this.length)&&(r=this.length),r<=0||// Force coersion to uint32. This will also coerce falsey/NaN values to 0.
(r>>>=0)<=(t>>>=0)))return"";for(e||(e="utf8");;)switch(e){case"hex":return function(e,t,r){var n,o=e.length;(!t||t<0)&&(t=0),(!r||r<0||r>o)&&(r=o);for(var i="",s=t;s<r;++s)i+=(n=e[s])<16?"0"+n.toString(16):n.toString(16);return i}(this,t,r);case"utf8":case"utf-8":return A(this,t,r);case"ascii":return function(e,t,r){var n="";r=Math.min(e.length,r);for(var o=t;o<r;++o)n+=String.fromCharCode(127&e[o]);return n}(this,t,r);case"latin1":case"binary":return function(e,t,r){var n="";r=Math.min(e.length,r);for(var o=t;o<r;++o)n+=String.fromCharCode(e[o]);return n}(this,t,r);case"base64":return n=t,o=r,0===n&&o===this.length?a.fromByteArray(this):a.fromByteArray(this.slice(n,o));case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return function(e,t,r){for(var n=e.slice(t,r),o="",i=0;i<n.length;i+=2)o+=String.fromCharCode(n[i]+256*n[i+1]);return o}(this,t,r);default:if(i)throw TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),i=!0}}function w(e,t,r){var n=e[t];e[t]=e[r],e[r]=n}// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function S(e,t,r,n,o){// Empty buffer means no match
if(0===e.length)return -1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),isNaN(r=+r// Coerce to Number.
)&&(r=o?0:e.length-1),r<0&&(r=e.length+r),r>=e.length){if(o)return -1;r=e.length-1}else if(r<0){if(!o)return -1;r=0}// Finally, search either indexOf (if dir is true) or lastIndexOf
if("string"==typeof t&&(t=l.from(t,n)),l.isBuffer(t))return(// Special case: looking for empty string/buffer always fails
0===t.length?-1:_(e,t,r,n,o));if("number"==typeof t)return(t&=255// Search for a byte value [0-255]
,l.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf)?o?Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):_(e,[t],r,n,o);throw TypeError("val must be string, number or Buffer")}function _(e,t,r,n,o){var i,s=1,a=e.length,u=t.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(e.length<2||t.length<2)return -1;s=2,a/=2,u/=2,r/=2}function c(e,t){return 1===s?e[t]:e.readUInt16BE(t*s)}if(o){var f=-1;for(i=r;i<a;i++)if(c(e,i)===c(t,-1===f?0:i-f)){if(-1===f&&(f=i),i-f+1===u)return f*s}else -1!==f&&(i-=i-f),f=-1}else for(r+u>a&&(r=a-u),i=r;i>=0;i--){for(var h=!0,l=0;l<u;l++)if(c(e,i+l)!==c(t,l)){h=!1;break}if(h)return i}return -1}function A(e,t,r){r=Math.min(e.length,r);for(var n=[],o=t;o<r;){var i,s,a,u,c=e[o],f=null,h=c>239?4:c>223?3:c>191?2:1;if(o+h<=r)switch(h){case 1:c<128&&(f=c);break;case 2:(192&(i=e[o+1]))==128&&(u=(31&c)<<6|63&i)>127&&(f=u);break;case 3:i=e[o+1],s=e[o+2],(192&i)==128&&(192&s)==128&&(u=(15&c)<<12|(63&i)<<6|63&s)>2047&&(u<55296||u>57343)&&(f=u);break;case 4:i=e[o+1],s=e[o+2],a=e[o+3],(192&i)==128&&(192&s)==128&&(192&a)==128&&(u=(15&c)<<18|(63&i)<<12|(63&s)<<6|63&a)>65535&&u<1114112&&(f=u)}null===f?(// we did not generate a valid codePoint so insert a
// replacement char (U+FFFD) and advance only 1 byte
f=65533,h=1):f>65535&&(// encode to utf16 (surrogate pair dance)
f-=65536,n.push(f>>>10&1023|55296),f=56320|1023&f),n.push(f),o+=h}return function(e){var t=e.length;if(t<=4096)return String.fromCharCode.apply(String,e)// avoid extra slice()
;for(// Decode in chunks to avoid "call stack size exceeded".
var r="",n=0;n<t;)r+=String.fromCharCode.apply(String,e.slice(n,n+=4096));return r}(n)}/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */function E(e,t,r){if(e%1!=0||e<0)throw RangeError("offset is not uint");if(e+t>r)throw RangeError("Trying to access beyond buffer length")}function I(e,t,r,n,o,i){if(!l.isBuffer(e))throw TypeError('"buffer" argument must be a Buffer instance');if(t>o||t<i)throw RangeError('"value" argument is out of bounds');if(r+n>e.length)throw RangeError("Index out of range")}function C(e,t,r,n){t<0&&(t=65535+t+1);for(var o=0,i=Math.min(e.length-r,2);o<i;++o)e[r+o]=(t&255<<8*(n?o:1-o))>>>(n?o:1-o)*8}function U(e,t,r,n){t<0&&(t=4294967295+t+1);for(var o=0,i=Math.min(e.length-r,4);o<i;++o)e[r+o]=t>>>(n?o:3-o)*8&255}function T(e,t,r,n,o,i){if(r+n>e.length||r<0)throw RangeError("Index out of range")}function P(e,t,r,n,o){return o||T(e,t,r,4,34028234663852886e22,-34028234663852886e22),u.write(e,t,r,n,23,4),r+4}function x(e,t,r,n,o){return o||T(e,t,r,8,17976931348623157e292,-17976931348623157e292),u.write(e,t,r,n,52,8),r+8}i=l,s=50,/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */l.TYPED_ARRAY_SUPPORT=void 0!==t.TYPED_ARRAY_SUPPORT?t.TYPED_ARRAY_SUPPORT:function(){try{var e=new Uint8Array(1);return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()&&// typed array instances can be augmented
"function"==typeof e.subarray&&// chrome 9-10 lack `subarray`
0// ie10 has broken `subarray`
===e.subarray(1,1).byteLength}catch(e){return!1}}(),f(),l.poolSize=8192// not used by this implementation
,// TODO: Legacy, not needed anymore. Remove in next major version.
l._augment=function(e){return e.__proto__=l.prototype,e},/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/l.from=function(e,t,r){return d(null,e,t,r)},l.TYPED_ARRAY_SUPPORT&&(l.prototype.__proto__=Uint8Array.prototype,l.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&l[Symbol.species]===l&&Object.defineProperty(l,Symbol.species,{value:null,configurable:!0})),/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/l.alloc=function(e,t,r){return(p(e),e<=0)?h(null,e):void 0!==t?"string"==typeof r?h(null,e).fill(t,r):h(null,e).fill(t):h(null,e)},/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */l.allocUnsafe=function(e){return g(null,e)},/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */l.allocUnsafeSlow=function(e){return g(null,e)},l.isBuffer=function(e){return!!(null!=e&&e._isBuffer)},l.compare=function(e,t){if(!l.isBuffer(e)||!l.isBuffer(t))throw TypeError("Arguments must be Buffers");if(e===t)return 0;for(var r=e.length,n=t.length,o=0,i=Math.min(r,n);o<i;++o)if(e[o]!==t[o]){r=e[o],n=t[o];break}return r<n?-1:n<r?1:0},l.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},l.concat=function(e,t){if(!c(e))throw TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return l.alloc(0);if(void 0===t)for(r=0,t=0;r<e.length;++r)t+=e[r].length;var r,n=l.allocUnsafe(t),o=0;for(r=0;r<e.length;++r){var i=e[r];if(!l.isBuffer(i))throw TypeError('"list" argument must be an Array of Buffers');i.copy(n,o),o+=i.length}return n},l.byteLength=m,// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
l.prototype._isBuffer=!0,l.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)w(this,t,t+1);return this},l.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)w(this,t,t+3),w(this,t+1,t+2);return this},l.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)w(this,t,t+7),w(this,t+1,t+6),w(this,t+2,t+5),w(this,t+3,t+4);return this},l.prototype.toString=function(){var e=0|this.length;return 0===e?"":0==arguments.length?A(this,0,e):b.apply(this,arguments)},l.prototype.equals=function(e){if(!l.isBuffer(e))throw TypeError("Argument must be a Buffer");return this===e||0===l.compare(this,e)},l.prototype.inspect=function(){var e="",t=s;return this.length>0&&(e=this.toString("hex",0,t).match(/.{2}/g).join(" "),this.length>t&&(e+=" ... ")),"<Buffer "+e+">"},l.prototype.compare=function(e,t,r,n,o){if(!l.isBuffer(e))throw TypeError("Argument must be a Buffer");if(void 0===t&&(t=0),void 0===r&&(r=e?e.length:0),void 0===n&&(n=0),void 0===o&&(o=this.length),t<0||r>e.length||n<0||o>this.length)throw RangeError("out of range index");if(n>=o&&t>=r)return 0;if(n>=o)return -1;if(t>=r)return 1;if(t>>>=0,r>>>=0,n>>>=0,o>>>=0,this===e)return 0;for(var i=o-n,s=r-t,a=Math.min(i,s),u=this.slice(n,o),c=e.slice(t,r),f=0;f<a;++f)if(u[f]!==c[f]){i=u[f],s=c[f];break}return i<s?-1:s<i?1:0},l.prototype.includes=function(e,t,r){return -1!==this.indexOf(e,t,r)},l.prototype.indexOf=function(e,t,r){return S(this,e,t,r,!0)},l.prototype.lastIndexOf=function(e,t,r){return S(this,e,t,r,!1)},l.prototype.write=function(e,t,r,n){// Buffer#write(string)
if(void 0===t)n="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)n=t,r=this.length,t=0;else if(isFinite(t))t|=0,isFinite(r)?(r|=0,void 0===n&&(n="utf8")):(n=r,r=void 0);else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");var o,i,s,a,u,c,f,h,l,d,p,g,y=this.length-t;if((void 0===r||r>y)&&(r=y),e.length>0&&(r<0||t<0)||t>this.length)throw RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var v=!1;;)switch(n){case"hex":return function(e,t,r,n){r=Number(r)||0;var o=e.length-r;n?(n=Number(n))>o&&(n=o):n=o;// must be an even number of digits
var i=t.length;if(i%2!=0)throw TypeError("Invalid hex string");n>i/2&&(n=i/2);for(var s=0;s<n;++s){var a=parseInt(t.substr(2*s,2),16);if(isNaN(a))break;e[r+s]=a}return s}(this,e,t,r);case"utf8":case"utf-8":return u=t,c=r,F(R(e,this.length-u),this,u,c);case"ascii":return f=t,h=r,F(O(e),this,f,h);case"latin1":case"binary":return o=this,i=e,s=t,a=r,F(O(i),o,s,a);case"base64":// Warning: maxLength not taken into account in base64Write
return l=t,d=r,F(D(e),this,l,d);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return p=t,g=r,F(function(e,t){for(var r,n,o=[],i=0;i<e.length&&!((t-=2)<0);++i)n=(r=e.charCodeAt(i))>>8,o.push(r%256),o.push(n);return o}(e,this.length-p),this,p,g);default:if(v)throw TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),v=!0}},l.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},l.prototype.slice=function(e,t){var r,n=this.length;if(e=~~e,t=void 0===t?n:~~t,e<0?(e+=n)<0&&(e=0):e>n&&(e=n),t<0?(t+=n)<0&&(t=0):t>n&&(t=n),t<e&&(t=e),l.TYPED_ARRAY_SUPPORT)(r=this.subarray(e,t)).__proto__=l.prototype;else{var o=t-e;r=new l(o,void 0);for(var i=0;i<o;++i)r[i]=this[i+e]}return r},l.prototype.readUIntLE=function(e,t,r){e|=0,t|=0,r||E(e,t,this.length);for(var n=this[e],o=1,i=0;++i<t&&(o*=256);)n+=this[e+i]*o;return n},l.prototype.readUIntBE=function(e,t,r){e|=0,t|=0,r||E(e,t,this.length);for(var n=this[e+--t],o=1;t>0&&(o*=256);)n+=this[e+--t]*o;return n},l.prototype.readUInt8=function(e,t){return t||E(e,1,this.length),this[e]},l.prototype.readUInt16LE=function(e,t){return t||E(e,2,this.length),this[e]|this[e+1]<<8},l.prototype.readUInt16BE=function(e,t){return t||E(e,2,this.length),this[e]<<8|this[e+1]},l.prototype.readUInt32LE=function(e,t){return t||E(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},l.prototype.readUInt32BE=function(e,t){return t||E(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},l.prototype.readIntLE=function(e,t,r){e|=0,t|=0,r||E(e,t,this.length);for(var n=this[e],o=1,i=0;++i<t&&(o*=256);)n+=this[e+i]*o;return n>=(o*=128)&&(n-=Math.pow(2,8*t)),n},l.prototype.readIntBE=function(e,t,r){e|=0,t|=0,r||E(e,t,this.length);for(var n=t,o=1,i=this[e+--n];n>0&&(o*=256);)i+=this[e+--n]*o;return i>=(o*=128)&&(i-=Math.pow(2,8*t)),i},l.prototype.readInt8=function(e,t){return(t||E(e,1,this.length),128&this[e])?-((255-this[e]+1)*1):this[e]},l.prototype.readInt16LE=function(e,t){t||E(e,2,this.length);var r=this[e]|this[e+1]<<8;return 32768&r?4294901760|r:r},l.prototype.readInt16BE=function(e,t){t||E(e,2,this.length);var r=this[e+1]|this[e]<<8;return 32768&r?4294901760|r:r},l.prototype.readInt32LE=function(e,t){return t||E(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},l.prototype.readInt32BE=function(e,t){return t||E(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},l.prototype.readFloatLE=function(e,t){return t||E(e,4,this.length),u.read(this,e,!0,23,4)},l.prototype.readFloatBE=function(e,t){return t||E(e,4,this.length),u.read(this,e,!1,23,4)},l.prototype.readDoubleLE=function(e,t){return t||E(e,8,this.length),u.read(this,e,!0,52,8)},l.prototype.readDoubleBE=function(e,t){return t||E(e,8,this.length),u.read(this,e,!1,52,8)},l.prototype.writeUIntLE=function(e,t,r,n){if(e=+e,t|=0,r|=0,!n){var o=Math.pow(2,8*r)-1;I(this,e,t,r,o,0)}var i=1,s=0;for(this[t]=255&e;++s<r&&(i*=256);)this[t+s]=e/i&255;return t+r},l.prototype.writeUIntBE=function(e,t,r,n){if(e=+e,t|=0,r|=0,!n){var o=Math.pow(2,8*r)-1;I(this,e,t,r,o,0)}var i=r-1,s=1;for(this[t+i]=255&e;--i>=0&&(s*=256);)this[t+i]=e/s&255;return t+r},l.prototype.writeUInt8=function(e,t,r){return e=+e,t|=0,r||I(this,e,t,1,255,0),l.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[t]=255&e,t+1},l.prototype.writeUInt16LE=function(e,t,r){return e=+e,t|=0,r||I(this,e,t,2,65535,0),l.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):C(this,e,t,!0),t+2},l.prototype.writeUInt16BE=function(e,t,r){return e=+e,t|=0,r||I(this,e,t,2,65535,0),l.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):C(this,e,t,!1),t+2},l.prototype.writeUInt32LE=function(e,t,r){return e=+e,t|=0,r||I(this,e,t,4,4294967295,0),l.TYPED_ARRAY_SUPPORT?(this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e):U(this,e,t,!0),t+4},l.prototype.writeUInt32BE=function(e,t,r){return e=+e,t|=0,r||I(this,e,t,4,4294967295,0),l.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):U(this,e,t,!1),t+4},l.prototype.writeIntLE=function(e,t,r,n){if(e=+e,t|=0,!n){var o=Math.pow(2,8*r-1);I(this,e,t,r,o-1,-o)}var i=0,s=1,a=0;for(this[t]=255&e;++i<r&&(s*=256);)e<0&&0===a&&0!==this[t+i-1]&&(a=1),this[t+i]=(e/s>>0)-a&255;return t+r},l.prototype.writeIntBE=function(e,t,r,n){if(e=+e,t|=0,!n){var o=Math.pow(2,8*r-1);I(this,e,t,r,o-1,-o)}var i=r-1,s=1,a=0;for(this[t+i]=255&e;--i>=0&&(s*=256);)e<0&&0===a&&0!==this[t+i+1]&&(a=1),this[t+i]=(e/s>>0)-a&255;return t+r},l.prototype.writeInt8=function(e,t,r){return e=+e,t|=0,r||I(this,e,t,1,127,-128),l.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),e<0&&(e=255+e+1),this[t]=255&e,t+1},l.prototype.writeInt16LE=function(e,t,r){return e=+e,t|=0,r||I(this,e,t,2,32767,-32768),l.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):C(this,e,t,!0),t+2},l.prototype.writeInt16BE=function(e,t,r){return e=+e,t|=0,r||I(this,e,t,2,32767,-32768),l.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):C(this,e,t,!1),t+2},l.prototype.writeInt32LE=function(e,t,r){return e=+e,t|=0,r||I(this,e,t,4,2147483647,-2147483648),l.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24):U(this,e,t,!0),t+4},l.prototype.writeInt32BE=function(e,t,r){return e=+e,t|=0,r||I(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),l.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):U(this,e,t,!1),t+4},l.prototype.writeFloatLE=function(e,t,r){return P(this,e,t,!0,r)},l.prototype.writeFloatBE=function(e,t,r){return P(this,e,t,!1,r)},l.prototype.writeDoubleLE=function(e,t,r){return x(this,e,t,!0,r)},l.prototype.writeDoubleBE=function(e,t,r){return x(this,e,t,!1,r)},// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
l.prototype.copy=function(e,t,r,n){// Copy 0 bytes; we're done
if(r||(r=0),n||0===n||(n=this.length),t>=e.length&&(t=e.length),t||(t=0),n>0&&n<r&&(n=r),n===r||0===e.length||0===this.length)return 0;// Fatal error conditions
if(t<0)throw RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw RangeError("sourceStart out of bounds");if(n<0)throw RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),e.length-t<n-r&&(n=e.length-t+r);var o,i=n-r;if(this===e&&r<t&&t<n)for(o=i-1;o>=0;--o)e[o+t]=this[o+r];else if(i<1e3||!l.TYPED_ARRAY_SUPPORT)for(o=0;o<i;++o)e[o+t]=this[o+r];else Uint8Array.prototype.set.call(e,this.subarray(r,r+i),t);return i},// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
l.prototype.fill=function(e,t,r,n){// Handle string cases:
if("string"==typeof e){if("string"==typeof t?(n=t,t=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),1===e.length){var o,i=e.charCodeAt(0);i<256&&(e=i)}if(void 0!==n&&"string"!=typeof n)throw TypeError("encoding must be a string");if("string"==typeof n&&!l.isEncoding(n))throw TypeError("Unknown encoding: "+n)}else"number"==typeof e&&(e&=255);// Invalid ranges are not set to a default, so can range check early.
if(t<0||this.length<t||this.length<r)throw RangeError("Out of range index");if(r<=t)return this;if(t>>>=0,r=void 0===r?this.length:r>>>0,e||(e=0),"number"==typeof e)for(o=t;o<r;++o)this[o]=e;else{var s=l.isBuffer(e)?e:R(new l(e,n).toString()),a=s.length;for(o=0;o<r-t;++o)this[o+t]=s[o%a]}return this};// HELPER FUNCTIONS
// ================
var k=/[^+\/0-9A-Za-z-_]/g;function R(e,t){t=t||1/0;for(var r,n=e.length,o=null,i=[],s=0;s<n;++s){// is surrogate component
if((r=e.charCodeAt(s))>55295&&r<57344){// last char was a lead
if(!o){// no lead yet
if(r>56319||s+1===n){// unexpected trail
(t-=3)>-1&&i.push(239,191,189);continue}// valid lead
o=r;continue}// 2 leads in a row
if(r<56320){(t-=3)>-1&&i.push(239,191,189),o=r;continue}// valid surrogate pair
r=(o-55296<<10|r-56320)+65536}else o&&(t-=3)>-1&&i.push(239,191,189);// encode utf8
if(o=null,r<128){if((t-=1)<0)break;i.push(r)}else if(r<2048){if((t-=2)<0)break;i.push(r>>6|192,63&r|128)}else if(r<65536){if((t-=3)<0)break;i.push(r>>12|224,r>>6&63|128,63&r|128)}else if(r<1114112){if((t-=4)<0)break;i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}else throw Error("Invalid code point")}return i}function O(e){for(var t=[],r=0;r<e.length;++r)t.push(255&e.charCodeAt(r));return t}function D(e){return a.toByteArray(function(e){var t;// Node converts strings with length < 2 to ''
if(// Node strips out invalid characters like \n and \t from the string, base64-js does not
(e=((t=e).trim?t.trim():t.replace(/^\s+|\s+$/g,"")).replace(k,"")).length<2)return"";// Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
for(;e.length%4!=0;)e+="=";return e}(e))}function F(e,t,r,n){for(var o=0;o<n&&!(o+r>=t.length)&&!(o>=e.length);++o)t[o+r]=e[o];return o}}),i("6QCVu",function(t,r){e(t.exports,"default",()=>i);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("3v7X7"),i=function(e){if((0,n.browserOrNode)().isBrowser&&window.location)e({url:window.location.href});else if((0,n.browserOrNode)().isNode);else throw Error("Not supported")}}),i("iMgsf",function(t,r){e(t.exports,"AuthError",()=>u),e(t.exports,"NoUserPoolError",()=>c);// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var n=o("dfmKz"),i=o("2ZPeH"),s=o("ajbBF"),a=new i.ConsoleLogger("AuthError"),u=/** @class */function(e){function t(r){var n=this,o=f[r],i=o.message,s=o.log;return(// Hack for making the custom error class work when transpiled to es5
// TODO: Delete the following 2 lines after we change the build target to >= es2015
(n=e.call(this,i)||this).constructor=t,Object.setPrototypeOf(n,t.prototype),n.name="AuthError",n.log=s||i,a.error(n.log),n)}return(0,n.__extends)(t,e),t}(Error),c=/** @class */function(e){function t(r){var n=e.call(this,r)||this;return(// Hack for making the custom error class work when transpiled to es5
// TODO: Delete the following 2 lines after we change the build target to >= es2015
n.constructor=t,Object.setPrototypeOf(n,t.prototype),n.name="NoUserPoolError",n)}return(0,n.__extends)(t,e),t}(u),f={noConfig:{message:s.AuthErrorStrings.DEFAULT_MSG,log:"\n            Error: Amplify has not been configured correctly.\n            This error is typically caused by one of the following scenarios:\n\n            1. Make sure you're passing the awsconfig object to Amplify.configure() in your app's entry point\n                See https://aws-amplify.github.io/docs/js/authentication#configure-your-app for more information\n            \n            2. There might be multiple conflicting versions of amplify packages in your node_modules.\n				Refer to our docs site for help upgrading Amplify packages (https://docs.amplify.aws/lib/troubleshooting/upgrading/q/platform/js)\n        "},missingAuthConfig:{message:s.AuthErrorStrings.DEFAULT_MSG,log:"\n            Error: Amplify has not been configured correctly. \n            The configuration object is missing required auth properties.\n            This error is typically caused by one of the following scenarios:\n\n            1. Did you run `amplify push` after adding auth via `amplify add auth`?\n                See https://aws-amplify.github.io/docs/js/authentication#amplify-project-setup for more information\n\n            2. This could also be caused by multiple conflicting versions of amplify packages, see (https://docs.amplify.aws/lib/troubleshooting/upgrading/q/platform/js) for help upgrading Amplify packages.\n        "},emptyUsername:{message:s.AuthErrorStrings.EMPTY_USERNAME},// TODO: should include a list of valid sign-in types
invalidUsername:{message:s.AuthErrorStrings.INVALID_USERNAME},emptyPassword:{message:s.AuthErrorStrings.EMPTY_PASSWORD},emptyCode:{message:s.AuthErrorStrings.EMPTY_CODE},signUpError:{message:s.AuthErrorStrings.SIGN_UP_ERROR,log:"The first parameter should either be non-null string or object"},noMFA:{message:s.AuthErrorStrings.NO_MFA},invalidMFA:{message:s.AuthErrorStrings.INVALID_MFA},emptyChallengeResponse:{message:s.AuthErrorStrings.EMPTY_CHALLENGE},noUserSession:{message:s.AuthErrorStrings.NO_USER_SESSION},deviceConfig:{message:s.AuthErrorStrings.DEVICE_CONFIG},networkError:{message:s.AuthErrorStrings.NETWORK_ERROR},autoSignInError:{message:s.AuthErrorStrings.AUTOSIGNIN_ERROR},default:{message:s.AuthErrorStrings.DEFAULT_MSG}}}),i("ajbBF",function(t,r){var n,o;e(t.exports,"AuthErrorStrings",()=>n),(o=n||(n={})).DEFAULT_MSG="Authentication Error",o.EMPTY_EMAIL="Email cannot be empty",o.EMPTY_PHONE="Phone number cannot be empty",o.EMPTY_USERNAME="Username cannot be empty",o.INVALID_USERNAME="The username should either be a string or one of the sign in types",o.EMPTY_PASSWORD="Password cannot be empty",o.EMPTY_CODE="Confirmation code cannot be empty",o.SIGN_UP_ERROR="Error creating account",o.NO_MFA="No valid MFA method provided",o.INVALID_MFA="Invalid MFA type",o.EMPTY_CHALLENGE="Challenge response cannot be empty",o.NO_USER_SESSION="Failed to get the session because the user is empty",o.NETWORK_ERROR="Network Error",o.DEVICE_CONFIG="Device tracking has not been configured in this User Pool",o.AUTOSIGNIN_ERROR="Please use your credentials to sign in"}),o("aCKYX");//# sourceMappingURL=index.b66f2f05.js.map

//# sourceMappingURL=index.b66f2f05.js.map