﻿/*
 * EaselJS
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2011 gskinner.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
this.createjs = this.createjs || {};
(function () {
	var c = function () {
		throw "UID cannot be instantiated";
	};
	c._nextID = 0;
	c.get = function () {
		return c._nextID++
	};
	createjs.UID = c
})();
this.createjs = this.createjs || {};
(function () {
	var c = function () {
		throw "Ticker cannot be instantiated.";
	};
	c.useRAF = null;
	c._listeners = null;
	c._pauseable = null;
	c._paused = false;
	c._inited = false;
	c._startTime = 0;
	c._pausedTime = 0;
	c._ticks = 0;
	c._pausedTicks = 0;
	c._interval = 50;
	c._lastTime = 0;
	c._times = null;
	c._tickTimes = null;
	c._rafActive = false;
	c._timeoutID = null;
	c.addListener = function (a, l) {
		a != null && (c._inited || c.init(), c.removeListener(a), c._pauseable[c._listeners.length] = l == null ? true : l, c._listeners.push(a))
	};
	c.init = function () {
		c._inited = true;
		c._times = [];
		c._tickTimes = [];
		c._pauseable = [];
		c._listeners = [];
		c._times.push(c._lastTime = c._startTime = c._getTime());
		c.setInterval(c._interval)
	};
	c.removeListener = function (a) {
		var l = c._listeners;
		l && (a = l.indexOf(a), a != -1 && (l.splice(a, 1), c._pauseable.splice(a, 1)))
	};
	c.removeAllListeners = function () {
		c._listeners = [];
		c._pauseable = []
	};
	c.setInterval = function (a) {
		c._interval = a;
		c._inited && c._setupTick()
	};
	c.getInterval = function () {
		return c._interval
	};
	c.setFPS = function (a) {
		c.setInterval(1E3 / a)
	};
	c.getFPS = function () {
		return 1E3 / c._interval
	};
	c.getMeasuredFPS = function (a) {
		if (c._times.length < 2)
			return -1;
		a == null && (a = c.getFPS() | 0);
		a = Math.min(c._times.length - 1, a);
		return 1E3 / ((c._times[0] - c._times[a]) / a)
	};
	c.setPaused = function (a) {
		c._paused = a
	};
	c.getPaused = function () {
		return c._paused
	};
	c.getTime = function (a) {
		return c._getTime() - c._startTime - (a ? c._pausedTime : 0)
	};
	c.getTicks = function (a) {
		return c._ticks - (a ? c._pausedTicks : 0)
	};
	c._handleAF = function () {
		c._rafActive = false;
		c._setupTick();
		c._getTime() - c._lastTime >= (c._interval - 1) * 0.97 && c._tick()
	};
	c._handleTimeout =
	function () {
		c.timeoutID = null;
		c._setupTick();
		c._tick()
	};
	c._setupTick = function () {
		if (!(c._rafActive || c.timeoutID != null)) {
			if (c.useRAF) {
				var a = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
				if (a) {
					a(c._handleAF);
					c._rafActive = true;
					return
				}
			}
			c.timeoutID = setTimeout(c._handleTimeout, c._interval)
		}
	};
	c._tick = function () {
		var a = c._getTime();
		c._ticks++;
		var l = a - c._lastTime,
		b = c._paused;
		b && (c._pausedTicks++,
			c._pausedTime += l);
		c._lastTime = a;
		for (var d = c._pauseable, e = c._listeners.slice(), f = e ? e.length : 0, g = 0; g < f; g++) {
			var i = e[g];
			i == null || b && d[g] || (i.tick ? i.tick(l, b) : i instanceof Function && i(l, b))
		}
		for (c._tickTimes.unshift(c._getTime() - a) ; c._tickTimes.length > 100;)
			c._tickTimes.pop();
		for (c._times.unshift(a) ; c._times.length > 100;)
			c._times.pop()
	};
	var b = window.performance && (performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow);
	c._getTime = function () {
		return b && b.call(performance) ||
		(new Date).getTime()
	};
	createjs.Ticker = c
})();
this.createjs = this.createjs || {};
(function () {
	var c = function (a, l, b, d, e, c, g, i, j) {
		this.initialize(a, l, b, d, e, c, g, i, j)
	},
	b = c.prototype;
	b.stageX = 0;
	b.stageY = 0;
	b.rawX = 0;
	b.rawY = 0;
	b.type = null;
	b.nativeEvent = null;
	b.onMouseMove = null;
	b.onMouseUp = null;
	b.target = null;
	b.pointerID = 0;
	b.primary = false;
	b.initialize = function (a, l, b, d, e, c, g, i, j) {
		this.type = a;
		this.stageX = l;
		this.stageY = b;
		this.target = d;
		this.nativeEvent = e;
		this.pointerID = c;
		this.primary = g;
		this.rawX = i == null ? l : i;
		this.rawY = j == null ? b : j
	};
	b.clone = function () {
		return new c(this.type, this.stageX, this.stageY,
			this.target, this.nativeEvent, this.pointerID, this.primary, this.rawX, this.rawY)
	};
	b.toString = function () {
		return "[MouseEvent (type=" + this.type + " stageX=" + this.stageX + " stageY=" + this.stageY + ")]"
	};
	createjs.MouseEvent = c
})();
this.createjs = this.createjs || {};
(function () {
	var c = function (a, l, b, d, e, c) {
		this.initialize(a, l, b, d, e, c)
	},
	b = c.prototype;
	c.identity = null;
	c.DEG_TO_RAD = Math.PI / 180;
	b.a = 1;
	b.b = 0;
	b.c = 0;
	b.d = 1;
	b.tx = 0;
	b.ty = 0;
	b.alpha = 1;
	b.shadow = null;
	b.compositeOperation = null;
	b.initialize = function (a, l, b, d, e, c) {
		if (a != null)
			this.a = a;
		this.b = l || 0;
		this.c = b || 0;
		if (d != null)
			this.d = d;
		this.tx = e || 0;
		this.ty = c || 0;
		return this
	};
	b.prepend = function (a, l, b, d, e, c) {
		var g = this.tx;
		if (a != 1 || l != 0 || b != 0 || d != 1) {
			var i = this.a,
			j = this.c;
			this.a = i * a + this.b * b;
			this.b = i * l + this.b * d;
			this.c = j * a + this.d *
				b;
			this.d = j * l + this.d * d
		}
		this.tx = g * a + this.ty * b + e;
		this.ty = g * l + this.ty * d + c;
		return this
	};
	b.append = function (a, l, b, d, e, c) {
		var g = this.a,
		i = this.b,
		j = this.c,
		k = this.d;
		this.a = a * g + l * j;
		this.b = a * i + l * k;
		this.c = b * g + d * j;
		this.d = b * i + d * k;
		this.tx = e * g + c * j + this.tx;
		this.ty = e * i + c * k + this.ty;
		return this
	};
	b.prependMatrix = function (a) {
		this.prepend(a.a, a.b, a.c, a.d, a.tx, a.ty);
		this.prependProperties(a.alpha, a.shadow, a.compositeOperation);
		return this
	};
	b.appendMatrix = function (a) {
		this.append(a.a, a.b, a.c, a.d, a.tx, a.ty);
		this.appendProperties(a.alpha,
			a.shadow, a.compositeOperation);
		return this
	};
	b.prependTransform = function (a, l, b, d, e, f, g, i, j) {
		if (e % 360)
			var k = e * c.DEG_TO_RAD, e = Math.cos(k), k = Math.sin(k);
		else
			e = 1, k = 0;
		if (i || j)
			this.tx -= i, this.ty -= j;
		f || g ? (f *= c.DEG_TO_RAD, g *= c.DEG_TO_RAD, this.prepend(e * b, k * b, -k * d, e * d, 0, 0), this.prepend(Math.cos(g), Math.sin(g), -Math.sin(f), Math.cos(f), a, l)) : this.prepend(e * b, k * b, -k * d, e * d, a, l);
		return this
	};
	b.appendTransform = function (a, l, b, d, e, f, g, i, j) {
		if (e % 360)
			var k = e * c.DEG_TO_RAD, e = Math.cos(k), k = Math.sin(k);
		else
			e = 1, k = 0;
		f ||
		g ? (f *= c.DEG_TO_RAD, g *= c.DEG_TO_RAD, this.append(Math.cos(g), Math.sin(g), -Math.sin(f), Math.cos(f), a, l), this.append(e * b, k * b, -k * d, e * d, 0, 0)) : this.append(e * b, k * b, -k * d, e * d, a, l);
		if (i || j)
			this.tx -= i * this.a + j * this.c, this.ty -= i * this.b + j * this.d;
		return this
	};
	b.rotate = function (a) {
		var l = Math.cos(a),
		a = Math.sin(a),
		b = this.a,
		d = this.c,
		c = this.tx;
		this.a = b * l - this.b * a;
		this.b = b * a + this.b * l;
		this.c = d * l - this.d * a;
		this.d = d * a + this.d * l;
		this.tx = c * l - this.ty * a;
		this.ty = c * a + this.ty * l;
		return this
	};
	b.skew = function (a, l) {
		a *= c.DEG_TO_RAD;
		l *=
		c.DEG_TO_RAD;
		this.append(Math.cos(l), Math.sin(l), -Math.sin(a), Math.cos(a), 0, 0);
		return this
	};
	b.scale = function (a, l) {
		this.a *= a;
		this.d *= l;
		this.tx *= a;
		this.ty *= l;
		return this
	};
	b.translate = function (a, l) {
		this.tx += a;
		this.ty += l;
		return this
	};
	b.identity = function () {
		this.alpha = this.a = this.d = 1;
		this.b = this.c = this.tx = this.ty = 0;
		this.shadow = this.compositeOperation = null;
		return this
	};
	b.invert = function () {
		var a = this.a,
		l = this.b,
		b = this.c,
		d = this.d,
		c = this.tx,
		f = a * d - l * b;
		this.a = d / f;
		this.b = -l / f;
		this.c = -b / f;
		this.d = a / f;
		this.tx = (b *
			this.ty - d * c) / f;
		this.ty = -(a * this.ty - l * c) / f;
		return this
	};
	b.isIdentity = function () {
		return this.tx == 0 && this.ty == 0 && this.a == 1 && this.b == 0 && this.c == 0 && this.d == 1
	};
	b.decompose = function (a) {
		a == null && (a = {});
		a.x = this.tx;
		a.y = this.ty;
		a.scaleX = Math.sqrt(this.a * this.a + this.b * this.b);
		a.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
		var b = Math.atan2(-this.c, this.d),
		h = Math.atan2(this.b, this.a);
		b == h ? (a.rotation = h / c.DEG_TO_RAD, this.a < 0 && this.d >= 0 && (a.rotation += a.rotation <= 0 ? 180 : -180), a.skewX = a.skewY = 0) : (a.skewX = b / c.DEG_TO_RAD,
			a.skewY = h / c.DEG_TO_RAD);
		return a
	};
	b.reinitialize = function (a, b, h, d, c, f, g, i, j) {
		this.initialize(a, b, h, d, c, f);
		this.alpha = g || 1;
		this.shadow = i;
		this.compositeOperation = j;
		return this
	};
	b.appendProperties = function (a, b, h) {
		this.alpha *= a;
		this.shadow = b || this.shadow;
		this.compositeOperation = h || this.compositeOperation;
		return this
	};
	b.prependProperties = function (a, b, h) {
		this.alpha *= a;
		this.shadow = this.shadow || b;
		this.compositeOperation = this.compositeOperation || h;
		return this
	};
	b.clone = function () {
		var a = new c(this.a, this.b,
				this.c, this.d, this.tx, this.ty);
		a.shadow = this.shadow;
		a.alpha = this.alpha;
		a.compositeOperation = this.compositeOperation;
		return a
	};
	b.toString = function () {
		return "[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]"
	};
	c.identity = new c(1, 0, 0, 1, 0, 0);
	createjs.Matrix2D = c
})();
this.createjs = this.createjs || {};
(function () {
	var c = function (a, b) {
		this.initialize(a, b)
	},
	b = c.prototype;
	b.x = 0;
	b.y = 0;
	b.initialize = function (a, b) {
		this.x = a == null ? 0 : a;
		this.y = b == null ? 0 : b
	};
	b.clone = function () {
		return new c(this.x, this.y)
	};
	b.toString = function () {
		return "[Point (x=" + this.x + " y=" + this.y + ")]"
	};
	createjs.Point = c
})();
this.createjs = this.createjs || {};
(function () {
	var c = function (a, b, h, d) {
		this.initialize(a, b, h, d)
	},
	b = c.prototype;
	b.x = 0;
	b.y = 0;
	b.width = 0;
	b.height = 0;
	b.initialize = function (a, b, h, d) {
		this.x = a == null ? 0 : a;
		this.y = b == null ? 0 : b;
		this.width = h == null ? 0 : h;
		this.height = d == null ? 0 : d
	};
	b.clone = function () {
		return new c(this.x, this.y, this.width, this.height)
	};
	b.toString = function () {
		return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]"
	};
	createjs.Rectangle = c
})();
this.createjs = this.createjs || {};
(function () {
	var c = function (a, b, h, d) {
		this.initialize(a, b, h, d)
	},
	b = c.prototype;
	c.identity = null;
	b.color = null;
	b.offsetX = 0;
	b.offsetY = 0;
	b.blur = 0;
	b.initialize = function (a, b, h, d) {
		this.color = a;
		this.offsetX = b;
		this.offsetY = h;
		this.blur = d
	};
	b.toString = function () {
		return "[Shadow]"
	};
	b.clone = function () {
		return new c(this.color, this.offsetX, this.offsetY, this.blur)
	};
	c.identity = new c("transparent", 0, 0, 0);
	createjs.Shadow = c
})();
this.createjs = this.createjs || {};
(function () {
	var c = function (a) {
		this.initialize(a)
	},
	b = c.prototype;
	b.complete = true;
	b.onComplete = null;
	b._animations = null;
	b._frames = null;
	b._images = null;
	b._data = null;
	b._loadCount = 0;
	b._frameHeight = 0;
	b._frameWidth = 0;
	b._numFrames = 0;
	b._regX = 0;
	b._regY = 0;
	b.initialize = function (a) {
		var b,
		h,
		d;
		if (a != null) {
			if (a.images && (h = a.images.length) > 0) {
				d = this._images = [];
				for (b = 0; b < h; b++) {
					var c = a.images[b];
					if (typeof c == "string") {
						var f = c,
						c = new Image;
						c.src = f
					}
					d.push(c);
					if (!c.getContext && !c.complete)
						this._loadCount++, this.complete =
							false, function (a) {
								c.onload = function () {
									a._handleImageLoad()
								}
							}
					(this)
				}
			}
			if (a.frames != null)
				if (a.frames instanceof Array) {
					this._frames = [];
					d = a.frames;
					for (b = 0, h = d.length; b < h; b++)
						f = d[b], this._frames.push({
							image: this._images[f[4] ? f[4] : 0],
							rect: new createjs.Rectangle(f[0], f[1], f[2], f[3]),
							regX: f[5] || 0,
							regY: f[6] || 0
						})
				} else
					h = a.frames, this._frameWidth = h.width, this._frameHeight = h.height, this._regX = h.regX || 0, this._regY = h.regY || 0, this._numFrames = h.count, this._loadCount == 0 && this._calculateFrames();
			if ((h = a.animations) !=
				null) {
				this._animations = [];
				this._data = {};
				for (var g in h) {
					a = {
						name: g
					};
					f = h[g];
					if (isNaN(f))
						if (f instanceof Array) {
							a.frequency = f[3];
							a.next = f[2];
							d = a.frames = [];
							if (f[0] <= f[1]) {
								for (b = f[0]; b <= f[1]; b++)
									d.push(b)
							} else {
								for (b = f[0]; b >= f[1]; b--)
									d.push(b)
							}
						} else
							a.frequency = f.frequency, a.next = f.next, b = f.frames, d = a.frames = !isNaN(b) ? [b] : b.slice(0);
					else
						d = a.frames = [f];
					a.next = d.length < 2 || a.next == false ? null : a.next == null || a.next == true ? g : a.next;
					if (!a.frequency)
						a.frequency = 1;
					this._animations.push(g);
					this._data[g] = a
				}
			}
		}
	};
	b.getNumFrames = function (a) {
		return a == null ? this._frames ? this._frames.length :
		this._numFrames : (a = this._data[a], a == null ? 0 : a.frames.length)
	};
	b.getAnimations = function () {
		return this._animations.slice(0)
	};
	b.getAnimation = function (a) {
		return this._data[a]
	};
	b.getFrame = function (a) {
		return this.complete && this._frames && (frame = this._frames[a]) ? frame : null
	};
	b.toString = function () {
		return "[SpriteSheet]"
	};
	b.clone = function () {
		var a = new c;
		a.complete = this.complete;
		a._animations = this._animations;
		a._frames = this._frames;
		a._images = this._images;
		a._data = this._data;
		a._frameHeight = this._frameHeight;
		a._frameWidth =
			this._frameWidth;
		a._numFrames = this._numFrames;
		a._loadCount = this._loadCount;
		return a
	};
	b._handleImageLoad = function () {
		if (--this._loadCount == 0)
			this._calculateFrames(), this.complete = true, this.onComplete && this.onComplete()
	};
	b._calculateFrames = function () {
		if (!(this._frames || this._frameWidth == 0)) {
			for (var i = 0; i < this._images.length; i++) {
				if (!this._images[i].complete || this._images[i].width == 0 || this._images[i].height == 0)
					return;
			}
			this._frames = [];
			for (var a = 0, b = this._frameWidth, h = this._frameHeight, d = 0, c = this._images; d < c.length; d++) {
				for (var f = c[d], g = (f.width + 1) / b | 0, i = (f.height + 1) / h | 0, i = this._numFrames > 0 ? Math.min(this._numFrames - a, g * i) : g * i, j =
						0; j < i; j++)
					this._frames.push({
						image: f,
						rect: new createjs.Rectangle(j % g * b, (j / g | 0) * h, b, h),
						regX: this._regX,
						regY: this._regY
					});
				a += i
			}
			this._numFrames = a
		}
	};
	createjs.SpriteSheet = c
})();
this.createjs = this.createjs || {};
(function () {
	function c(a, b, d) {
		this.f = a;
		this.params = b;
		this.path = d == null ? true : d
	}
	c.prototype.exec = function (a) {
		this.f.apply(a, this.params)
	};
	var b = function () {
		this.initialize()
	},
	a = b.prototype;
	b.getRGB = function (a, b, d, c) {
		a != null && d == null && (c = b, d = a & 255, b = a >> 8 & 255, a = a >> 16 & 255);
		return c == null ? "rgb(" + a + "," + b + "," + d + ")" : "rgba(" + a + "," + b + "," + d + "," + c + ")"
	};
	b.getHSL = function (a, b, c, e) {
		return e == null ? "hsl(" + a % 360 + "," + b + "%," + c + "%)" : "hsla(" + a % 360 + "," + b + "%," + c + "%," + e + ")"
	};
	b.BASE_64 = {
		A: 0,
		B: 1,
		C: 2,
		D: 3,
		E: 4,
		F: 5,
		G: 6,
		H: 7,
		I: 8,
		J: 9,
		K: 10,
		L: 11,
		M: 12,
		N: 13,
		O: 14,
		P: 15,
		Q: 16,
		R: 17,
		S: 18,
		T: 19,
		U: 20,
		V: 21,
		W: 22,
		X: 23,
		Y: 24,
		Z: 25,
		a: 26,
		b: 27,
		c: 28,
		d: 29,
		e: 30,
		f: 31,
		g: 32,
		h: 33,
		i: 34,
		j: 35,
		k: 36,
		l: 37,
		m: 38,
		n: 39,
		o: 40,
		p: 41,
		q: 42,
		r: 43,
		s: 44,
		t: 45,
		u: 46,
		v: 47,
		w: 48,
		x: 49,
		y: 50,
		z: 51,
		0: 52,
		1: 53,
		2: 54,
		3: 55,
		4: 56,
		5: 57,
		6: 58,
		7: 59,
		8: 60,
		9: 61,
		"+": 62,
		"/": 63
	};
	b.STROKE_CAPS_MAP = ["butt", "round", "square"];
	b.STROKE_JOINTS_MAP = ["miter", "round", "bevel"];
	b._ctx = (createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas")).getContext("2d");
	b.beginCmd = new c(b._ctx.beginPath,
			[], false);
	b.fillCmd = new c(b._ctx.fill, [], false);
	b.strokeCmd = new c(b._ctx.stroke, [], false);
	a._strokeInstructions = null;
	a._strokeStyleInstructions = null;
	a._fillInstructions = null;
	a._instructions = null;
	a._oldInstructions = null;
	a._activeInstructions = null;
	a._active = false;
	a._dirty = false;
	a.initialize = function () {
		this.clear();
		this._ctx = b._ctx
	};
	a.draw = function (a) {
		this._dirty && this._updateInstructions();
		for (var b = this._instructions, c = 0, e = b.length; c < e; c++)
			b[c].exec(a)
	};
	a.drawAsPath = function (a) {
		this._dirty && this._updateInstructions();
		for (var b, c = this._instructions, e = 0, f = c.length; e < f; e++)
			((b = c[e]).path || e == 0) && b.exec(a)
	};
	a.moveTo = function (a, b) {
		this._activeInstructions.push(new c(this._ctx.moveTo, [a, b]));
		return this
	};
	a.lineTo = function (a, b) {
		this._dirty = this._active = true;
		this._activeInstructions.push(new c(this._ctx.lineTo, [a, b]));
		return this
	};
	a.arcTo = function (a, b, d, e, f) {
		this._dirty = this._active = true;
		this._activeInstructions.push(new c(this._ctx.arcTo, [a, b, d, e, f]));
		return this
	};
	a.arc = function (a, b, d, e, f, g) {
		this._dirty = this._active =
			true;
		g == null && (g = false);
		this._activeInstructions.push(new c(this._ctx.arc, [a, b, d, e, f, g]));
		return this
	};
	a.quadraticCurveTo = function (a, b, d, e) {
		this._dirty = this._active = true;
		this._activeInstructions.push(new c(this._ctx.quadraticCurveTo, [a, b, d, e]));
		return this
	};
	a.bezierCurveTo = function (a, b, d, e, f, g) {
		this._dirty = this._active = true;
		this._activeInstructions.push(new c(this._ctx.bezierCurveTo, [a, b, d, e, f, g]));
		return this
	};
	a.rect = function (a, b, d, e) {
		this._dirty = this._active = true;
		this._activeInstructions.push(new c(this._ctx.rect,
				[a, b, d, e]));
		return this
	};
	a.closePath = function () {
		if (this._active)
			this._dirty = true, this._activeInstructions.push(new c(this._ctx.closePath, []));
		return this
	};
	a.clear = function () {
		this._instructions = [];
		this._oldInstructions = [];
		this._activeInstructions = [];
		this._strokeStyleInstructions = this._strokeInstructions = this._fillInstructions = null;
		this._active = this._dirty = false;
		return this
	};
	a.beginFill = function (a) {
		this._active && this._newPath();
		this._fillInstructions = a ? [new c(this._setProp, ["fillStyle", a], false)] : null;
		return this
	};
	a.beginLinearGradientFill = function (a, b, d, e, f, g) {
		this._active && this._newPath();
		d = this._ctx.createLinearGradient(d, e, f, g);
		e = 0;
		for (f = a.length; e < f; e++)
			d.addColorStop(b[e], a[e]);
		this._fillInstructions = [new c(this._setProp, ["fillStyle", d], false)];
		return this
	};
	a.beginRadialGradientFill = function (a, b, d, e, f, g, i, j) {
		this._active && this._newPath();
		d = this._ctx.createRadialGradient(d, e, f, g, i, j);
		e = 0;
		for (f = a.length; e < f; e++)
			d.addColorStop(b[e], a[e]);
		this._fillInstructions = [new c(this._setProp, ["fillStyle",
					d], false)];
		return this
	};
	a.beginBitmapFill = function (a, b) {
		this._active && this._newPath();
		var d = this._ctx.createPattern(a, b || "");
		this._fillInstructions = [new c(this._setProp, ["fillStyle", d], false)];
		return this
	};
	a.endFill = function () {
		return this.beginFill()
	};
	a.setStrokeStyle = function (a, h, d, e) {
		this._active && this._newPath();
		this._strokeStyleInstructions = [new c(this._setProp, ["lineWidth", a == null ? "1" : a], false), new c(this._setProp, ["lineCap", h == null ? "butt" : isNaN(h) ? h : b.STROKE_CAPS_MAP[h]], false), new c(this._setProp,
				["lineJoin", d == null ? "miter" : isNaN(d) ? d : b.STROKE_JOINTS_MAP[d]], false), new c(this._setProp, ["miterLimit", e == null ? "10" : e], false)];
		return this
	};
	a.beginStroke = function (a) {
		this._active && this._newPath();
		this._strokeInstructions = a ? [new c(this._setProp, ["strokeStyle", a], false)] : null;
		return this
	};
	a.beginLinearGradientStroke = function (a, b, d, e, f, g) {
		this._active && this._newPath();
		d = this._ctx.createLinearGradient(d, e, f, g);
		e = 0;
		for (f = a.length; e < f; e++)
			d.addColorStop(b[e], a[e]);
		this._strokeInstructions = [new c(this._setProp,
				["strokeStyle", d], false)];
		return this
	};
	a.beginRadialGradientStroke = function (a, b, d, e, f, g, i, j) {
		this._active && this._newPath();
		d = this._ctx.createRadialGradient(d, e, f, g, i, j);
		e = 0;
		for (f = a.length; e < f; e++)
			d.addColorStop(b[e], a[e]);
		this._strokeInstructions = [new c(this._setProp, ["strokeStyle", d], false)];
		return this
	};
	a.beginBitmapStroke = function (a, b) {
		this._active && this._newPath();
		var d = this._ctx.createPattern(a, b || "");
		this._strokeInstructions = [new c(this._setProp, ["strokeStyle", d], false)];
		return this
	};
	a.endStroke =
	function () {
		this.beginStroke();
		return this
	};
	a.curveTo = a.quadraticCurveTo;
	a.drawRect = a.rect;
	a.drawRoundRect = function (a, b, c, e, f) {
		this.drawRoundRectComplex(a, b, c, e, f, f, f, f);
		return this
	};
	a.drawRoundRectComplex = function (a, b, d, e, f, g, i, j) {
		var k = (d < e ? d : e) / 2,
		m = 0,
		o = 0,
		n = 0,
		q = 0;
		f < 0 && (f *= m = -1);
		f > k && (f = k);
		g < 0 && (g *= o = -1);
		g > k && (g = k);
		i < 0 && (i *= n = -1);
		i > k && (i = k);
		j < 0 && (j *= q = -1);
		j > k && (j = k);
		this._dirty = this._active = true;
		var k = this._ctx.arcTo,
		p = this._ctx.lineTo;
		this._activeInstructions.push(new c(this._ctx.moveTo, [a + d - g, b]),
			new c(k, [a + d + g * o, b - g * o, a + d, b + g, g]), new c(p, [a + d, b + e - i]), new c(k, [a + d + i * n, b + e + i * n, a + d - i, b + e, i]), new c(p, [a + j, b + e]), new c(k, [a - j * q, b + e + j * q, a, b + e - j, j]), new c(p, [a, b + f]), new c(k, [a - f * m, b - f * m, a + f, b, f]), new c(this._ctx.closePath));
		return this
	};
	a.drawCircle = function (a, b, c) {
		this.arc(a, b, c, 0, Math.PI * 2);
		return this
	};
	a.drawEllipse = function (a, b, d, e) {
		this._dirty = this._active = true;
		var f = d / 2 * 0.5522848,
		g = e / 2 * 0.5522848,
		i = a + d,
		j = b + e,
		d = a + d / 2,
		e = b + e / 2;
		this._activeInstructions.push(new c(this._ctx.moveTo, [a, e]), new c(this._ctx.bezierCurveTo,
				[a, e - g, d - f, b, d, b]), new c(this._ctx.bezierCurveTo, [d + f, b, i, e - g, i, e]), new c(this._ctx.bezierCurveTo, [i, e + g, d + f, j, d, j]), new c(this._ctx.bezierCurveTo, [d - f, j, a, e + g, a, e]));
		return this
	};
	a.drawPolyStar = function (a, b, d, e, f, g) {
		this._dirty = this._active = true;
		f == null && (f = 0);
		f = 1 - f;
		g == null ? g = 0 : g /= 180 / Math.PI;
		var i = Math.PI / e;
		this._activeInstructions.push(new c(this._ctx.moveTo, [a + Math.cos(g) * d, b + Math.sin(g) * d]));
		for (var j = 0; j < e; j++)
			g += i, f != 1 && this._activeInstructions.push(new c(this._ctx.lineTo, [a + Math.cos(g) * d *
						f, b + Math.sin(g) * d * f])), g += i, this._activeInstructions.push(new c(this._ctx.lineTo, [a + Math.cos(g) * d, b + Math.sin(g) * d]));
		return this
	};
	a.decodePath = function (a) {
		for (var c = [this.moveTo, this.lineTo, this.quadraticCurveTo, this.bezierCurveTo], d = [2, 2, 4, 6], e = 0, f = a.length, g = [], i = 0, j = 0, k = b.BASE_64; e < f;) {
			var m = a.charAt(e),
			o = k[m],
			n = o >> 3,
			q = c[n];
			if (!q || o & 3)
				throw "bad path data (@" + e + "): " + m;
			m = d[n];
			n || (i = j = 0);
			g.length = 0;
			e++;
			o = (o >> 2 & 1) + 2;
			for (n = 0; n < m; n++) {
				var p = k[a.charAt(e)],
				s = p >> 5 ? -1 : 1,
				p = (p & 31) << 6 | k[a.charAt(e + 1)];
				o ==
				3 && (p = p << 6 | k[a.charAt(e + 2)]);
				p = s * p / 10;
				n % 2 ? i = p += i : j = p += j;
				g[n] = p;
				e += o
			}
			q.apply(this, g)
		}
		return this
	};
	a.clone = function () {
		var a = new b;
		a._instructions = this._instructions.slice();
		a._activeInstructions = this._activeInstructions.slice();
		a._oldInstructions = this._oldInstructions.slice();
		if (this._fillInstructions)
			a._fillInstructions = this._fillInstructions.slice();
		if (this._strokeInstructions)
			a._strokeInstructions = this._strokeInstructions.slice();
		if (this._strokeStyleInstructions)
			a._strokeStyleInstructions = this._strokeStyleInstructions.slice();
		a._active = this._active;
		a._dirty = this._dirty;
		a.drawAsPath = this.drawAsPath;
		return a
	};
	a.toString = function () {
		return "[Graphics]"
	};
	a.mt = a.moveTo;
	a.lt = a.lineTo;
	a.at = a.arcTo;
	a.bt = a.bezierCurveTo;
	a.qt = a.quadraticCurveTo;
	a.a = a.arc;
	a.r = a.rect;
	a.cp = a.closePath;
	a.c = a.clear;
	a.f = a.beginFill;
	a.lf = a.beginLinearGradientFill;
	a.rf = a.beginRadialGradientFill;
	a.bf = a.beginBitmapFill;
	a.ef = a.endFill;
	a.ss = a.setStrokeStyle;
	a.s = a.beginStroke;
	a.ls = a.beginLinearGradientStroke;
	a.rs = a.beginRadialGradientStroke;
	a.bs = a.beginBitmapStroke;
	a.es = a.endStroke;
	a.dr = a.drawRect;
	a.rr = a.drawRoundRect;
	a.rc = a.drawRoundRectComplex;
	a.dc = a.drawCircle;
	a.de = a.drawEllipse;
	a.dp = a.drawPolyStar;
	a.p = a.decodePath;
	a._updateInstructions = function () {
		this._instructions = this._oldInstructions.slice();
		this._instructions.push(b.beginCmd);
		this._fillInstructions && this._instructions.push.apply(this._instructions, this._fillInstructions);
		this._strokeInstructions && (this._instructions.push.apply(this._instructions, this._strokeInstructions), this._strokeStyleInstructions &&
			this._instructions.push.apply(this._instructions, this._strokeStyleInstructions));
		this._instructions.push.apply(this._instructions, this._activeInstructions);
		this._fillInstructions && this._instructions.push(b.fillCmd);
		this._strokeInstructions && this._instructions.push(b.strokeCmd)
	};
	a._getEllipseArc = function (a, b, d, e) {
		var f = d / 2 * 0.5522848,
		g = e / 2 * 0.5522848,
		i = a + d,
		j = b + e,
		d = a + d / 2,
		e = b + e / 2;
		this._activeInstructions.push(new c(this._ctx.moveTo, [a, e]), new c(this._ctx.bezierCurveTo, [a, e - g, d - f, b, d, b]), new c(this._ctx.bezierCurveTo,
				[d + f, b, i, e - g, i, e]), new c(this._ctx.bezierCurveTo, [i, e + g, d + f, j, d, j]), new c(this._ctx.bezierCurveTo, [d - f, j, a, e + g, a, e]));
		return this
	};
	a._newPath = function () {
		this._dirty && this._updateInstructions();
		this._oldInstructions = this._instructions;
		this._activeInstructions = [];
		this._active = this._dirty = false
	};
	a._setProp = function (a, b) {
		this[a] = b
	};
	createjs.Graphics = b
})();
this.createjs = this.createjs || {};
(function () {
	var c = function () {
		this.initialize()
	},
	b = c.prototype;
	c.suppressCrossDomainErrors = false;
	c._hitTestCanvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
	c._hitTestCanvas.width = c._hitTestCanvas.height = 1;
	c._hitTestContext = c._hitTestCanvas.getContext("2d");
	c._nextCacheID = 1;
	b.alpha = 1;
	b.cacheCanvas = null;
	b.id = -1;
	b.mouseEnabled = true;
	b.name = null;
	b.parent = null;
	b.regX = 0;
	b.regY = 0;
	b.rotation = 0;
	b.scaleX = 1;
	b.scaleY = 1;
	b.skewX = 0;
	b.skewY = 0;
	b.shadow = null;
	b.visible = true;
	b.x = 0;
	b.y = 0;
	b.compositeOperation = null;
	b.snapToPixel = false;
	b.onPress = null;
	b.onClick = null;
	b.onDoubleClick = null;
	b.onMouseOver = null;
	b.onMouseOut = null;
	b.onTick = null;
	b.filters = null;
	b.cacheID = 0;
	b.mask = null;
	b.hitArea = null;
	b._cacheOffsetX = 0;
	b._cacheOffsetY = 0;
	b._cacheScale = 1;
	b._cacheDataURLID = 0;
	b._cacheDataURL = null;
	b._matrix = null;
	b.initialize = function () {
		this.id = createjs.UID.get();
		this._matrix = new createjs.Matrix2D
	};
	b.isVisible = function () {
		return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0
	};
	b.draw = function (a,
		b) {
		var c = this.cacheCanvas;
		if (b || !c)
			return false;
		var d = this._cacheScale;
		a.drawImage(c, this._cacheOffsetX, this._cacheOffsetY, c.width / d, c.height / d);
		return true
	};
	b.updateContext = function (a) {
		var b,
		c = this.mask;
		c && c.graphics && (b = c.getMatrix(c._matrix), a.transform(b.a, b.b, b.c, b.d, b.tx, b.ty), c.graphics.drawAsPath(a), a.clip(), b.invert(), a.transform(b.a, b.b, b.c, b.d, b.tx, b.ty));
		b = this._matrix.identity().appendTransform(this.x, this.y, this.scaleX, this.scaleY, this.rotation, this.skewX, this.skewY, this.regX, this.regY);
		createjs.Stage._snapToPixelEnabled && this.snapToPixel ? a.transform(b.a, b.b, b.c, b.d, b.tx + 0.5 | 0, b.ty + 0.5 | 0) : a.transform(b.a, b.b, b.c, b.d, b.tx, b.ty);
		a.globalAlpha *= this.alpha;
		if (this.compositeOperation)
			a.globalCompositeOperation = this.compositeOperation;
		this.shadow && this._applyShadow(a, this.shadow)
	};
	b.cache = function (a, b, c, d, e) {
		e = e || 1;
		if (!this.cacheCanvas)
			this.cacheCanvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
		this.cacheCanvas.width = Math.ceil(c * e);
		this.cacheCanvas.height =
			Math.ceil(d * e);
		this._cacheOffsetX = a;
		this._cacheOffsetY = b;
		this._cacheScale = e || 1;
		this.updateCache()
	};
	b.updateCache = function (a) {
		var b = this.cacheCanvas,
		h = this._cacheOffsetX,
		d = this._cacheOffsetY,
		e = this._cacheScale;
		if (!b)
			throw "cache() must be called before updateCache()";
		var f = b.getContext("2d");
		f.save();
		a || f.clearRect(0, 0, b.width, b.height);
		f.globalCompositeOperation = a;
		f.setTransform(e, 0, 0, e, -h, -d);
		this.draw(f, true);
		this._applyFilters();
		f.restore();
		this.cacheID = c._nextCacheID++
	};
	b.uncache = function () {
		this._cacheDataURL =
			this.cacheCanvas = null;
		this.cacheID = this._cacheOffsetX = this._cacheOffsetY = 0;
		this._cacheScale = 1
	};
	b.getCacheDataURL = function () {
		if (!this.cacheCanvas)
			return null;
		if (this.cacheID != this._cacheDataURLID)
			this._cacheDataURL = this.cacheCanvas.toDataURL();
		return this._cacheDataURL
	};
	b.getStage = function () {
		for (var a = this; a.parent;)
			a = a.parent;
		return a instanceof createjs.Stage ? a : null
	};
	b.localToGlobal = function (a, b) {
		var c = this.getConcatenatedMatrix(this._matrix);
		if (c == null)
			return null;
		c.append(1, 0, 0, 1, a, b);
		return new createjs.Point(c.tx,
			c.ty)
	};
	b.globalToLocal = function (a, b) {
		var c = this.getConcatenatedMatrix(this._matrix);
		if (c == null)
			return null;
		c.invert();
		c.append(1, 0, 0, 1, a, b);
		return new createjs.Point(c.tx, c.ty)
	};
	b.localToLocal = function (a, b, c) {
		a = this.localToGlobal(a, b);
		return c.globalToLocal(a.x, a.y)
	};
	b.setTransform = function (a, b, c, d, e, f, g, i, j) {
		this.x = a || 0;
		this.y = b || 0;
		this.scaleX = c == null ? 1 : c;
		this.scaleY = d == null ? 1 : d;
		this.rotation = e || 0;
		this.skewX = f || 0;
		this.skewY = g || 0;
		this.regX = i || 0;
		this.regY = j || 0;
		return this
	};
	b.getMatrix = function (a) {
		return (a ?
			a.identity() : new createjs.Matrix2D).appendTransform(this.x, this.y, this.scaleX, this.scaleY, this.rotation, this.skewX, this.skewY, this.regX, this.regY).appendProperties(this.alpha, this.shadow, this.compositeOperation)
	};
	b.getConcatenatedMatrix = function (a) {
		a ? a.identity() : a = new createjs.Matrix2D;
		for (var b = this; b != null;)
			a.prependTransform(b.x, b.y, b.scaleX, b.scaleY, b.rotation, b.skewX, b.skewY, b.regX, b.regY).prependProperties(b.alpha, b.shadow, b.compositeOperation), b = b.parent;
		return a
	};
	b.hitTest = function (a, b) {
		var h =
			c._hitTestContext,
		d = c._hitTestCanvas;
		h.setTransform(1, 0, 0, 1, -a, -b);
		this.draw(h);
		h = this._testHit(h);
		d.width = 0;
		d.width = 1;
		return h
	};
	b.clone = function () {
		var a = new c;
		this.cloneProps(a);
		return a
	};
	b.toString = function () {
		return "[DisplayObject (name=" + this.name + ")]"
	};
	b.cloneProps = function (a) {
		a.alpha = this.alpha;
		a.name = this.name;
		a.regX = this.regX;
		a.regY = this.regY;
		a.rotation = this.rotation;
		a.scaleX = this.scaleX;
		a.scaleY = this.scaleY;
		a.shadow = this.shadow;
		a.skewX = this.skewX;
		a.skewY = this.skewY;
		a.visible = this.visible;
		a.x = this.x;
		a.y = this.y;
		a.mouseEnabled = this.mouseEnabled;
		a.compositeOperation = this.compositeOperation;
		if (this.cacheCanvas)
			a.cacheCanvas = this.cacheCanvas.cloneNode(true), a.cacheCanvas.getContext("2d").putImageData(this.cacheCanvas.getContext("2d").getImageData(0, 0, this.cacheCanvas.width, this.cacheCanvas.height), 0, 0)
	};
	b._applyShadow = function (a, b) {
		b = b || Shadow.identity;
		a.shadowColor = b.color;
		a.shadowOffsetX = b.offsetX;
		a.shadowOffsetY = b.offsetY;
		a.shadowBlur = b.blur
	};
	b._tick = function (a) {
		if (this.onTick)
			if (a)
				this.onTick.apply(this,
					a);
			else
				this.onTick()
	};
	b._testHit = function (a) {
		try {
			var b = a.getImageData(0, 0, 1, 1).data[3] > 1
		} catch (h) {
			if (!c.suppressCrossDomainErrors)
				throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";
		}
		return b
	};
	b._applyFilters = function () {
		if (this.filters && this.filters.length != 0 && this.cacheCanvas)
			for (var a = this.filters.length, b = this.cacheCanvas.getContext("2d"), c = this.cacheCanvas.width, d = this.cacheCanvas.height, e = 0; e < a; e++)
				this.filters[e].applyFilter(b,
					0, 0, c, d)
	};
	createjs.DisplayObject = c
})();
this.createjs = this.createjs || {};
(function () {
	var c = function () {
		this.initialize()
	},
	b = c.prototype = new createjs.DisplayObject;
	b.children = null;
	b.DisplayObject_initialize = b.initialize;
	b.initialize = function () {
		this.DisplayObject_initialize();
		this.children = []
	};
	b.isVisible = function () {
		return this.visible && this.alpha > 0 && this.children.length && this.scaleX != 0 && this.scaleY != 0
	};
	b.DisplayObject_draw = b.draw;
	b.draw = function (a, b) {
		if (this.DisplayObject_draw(a, b))
			return true;
		for (var c = this.children.slice(0), d = 0, e = c.length; d < e; d++) {
			var f = c[d];
			f.isVisible() &&
			(a.save(), f.updateContext(a), f.draw(a), a.restore())
		}
		return true
	};
	b.addChild = function (a) {
		if (a == null)
			return a;
		var b = arguments.length;
		if (b > 1) {
			for (var c = 0; c < b; c++)
				this.addChild(arguments[c]);
			return arguments[b - 1]
		}
		a.parent && a.parent.removeChild(a);
		a.parent = this;
		this.children.push(a);
		return a
	};
	b.addChildAt = function (a, b) {
		var c = arguments.length,
		d = arguments[c - 1];
		if (d < 0 || d > this.children.length)
			return arguments[c - 2];
		if (c > 2) {
			for (var e = 0; e < c - 1; e++)
				this.addChildAt(arguments[e], d + e);
			return arguments[c - 2]
		}
		a.parent &&
		a.parent.removeChild(a);
		a.parent = this;
		this.children.splice(b, 0, a);
		return a
	};
	b.removeChild = function (a) {
		var b = arguments.length;
		if (b > 1) {
			for (var c = true, d = 0; d < b; d++)
				c = c && this.removeChild(arguments[d]);
			return c
		}
		return this.removeChildAt(this.children.indexOf(a))
	};
	b.removeChildAt = function (a) {
		var b = arguments.length;
		if (b > 1) {
			for (var c = [], d = 0; d < b; d++)
				c[d] = arguments[d];
			c.sort(function (a, b) {
				return b - a
			});
			for (var e = true, d = 0; d < b; d++)
				e = e && this.removeChildAt(c[d]);
			return e
		}
		if (a < 0 || a > this.children.length - 1)
			return false;
		if (b = this.children[a])
			b.parent = null;
		this.children.splice(a, 1);
		return true
	};
	b.removeAllChildren = function () {
		for (var a = this.children; a.length;)
			a.pop().parent = null
	};
	b.getChildAt = function (a) {
		return this.children[a]
	};
	b.sortChildren = function (a) {
		this.children.sort(a)
	};
	b.getChildIndex = function (a) {
		return this.children.indexOf(a)
	};
	b.getNumChildren = function () {
		return this.children.length
	};
	b.swapChildrenAt = function (a, b) {
		var c = this.children,
		d = c[a],
		e = c[b];
		d && e && (c[a] = e, c[b] = d)
	};
	b.swapChildren = function (a, b) {
		for (var c =
				this.children, d, e, f = 0, g = c.length; f < g; f++)
			if (c[f] == a && (d = f), c[f] == b && (e = f), d != null && e != null)
				break;
		f != g && (c[d] = b, c[e] = a)
	};
	b.setChildIndex = function (a, b) {
		var c = this.children,
		d = c.length;
		if (!(a.parent != this || b < 0 || b >= d)) {
			for (var e = 0; e < d; e++)
				if (c[e] == a)
					break;
			e == d || e == b || (c.splice(e, 1), b < e && b--, c.splice(b, 0, a))
		}
	};
	b.contains = function (a) {
		for (; a;) {
			if (a == this)
				return true;
			a = a.parent
		}
		return false
	};
	b.hitTest = function (a, b) {
		return this.getObjectUnderPoint(a, b) != null
	};
	b.getObjectsUnderPoint = function (a, b) {
		var c = [],
		d =
			this.localToGlobal(a, b);
		this._getObjectsUnderPoint(d.x, d.y, c);
		return c
	};
	b.getObjectUnderPoint = function (a, b) {
		var c = this.localToGlobal(a, b);
		return this._getObjectsUnderPoint(c.x, c.y)
	};
	b.clone = function (a) {
		var b = new c;
		this.cloneProps(b);
		if (a)
			for (var h = b.children = [], d = 0, e = this.children.length; d < e; d++) {
				var f = this.children[d].clone(a);
				f.parent = b;
				h.push(f)
			}
		return b
	};
	b.toString = function () {
		return "[Container (name=" + this.name + ")]"
	};
	b.DisplayObject__tick = b._tick;
	b._tick = function (a) {
		for (var b = this.children.length -
				1; b >= 0; b--) {
			var c = this.children[b];
			c._tick && c._tick(a)
		}
		this.DisplayObject__tick(a)
	};
	b._getObjectsUnderPoint = function (a, b, h, d) {
		var e = createjs.DisplayObject._hitTestContext,
		f = createjs.DisplayObject._hitTestCanvas,
		g = this._matrix,
		i = d & 1 && (this.onPress || this.onClick || this.onDoubleClick) || d & 2 && (this.onMouseOver || this.onMouseOut);
		if (this.cacheCanvas && i && (this.getConcatenatedMatrix(g), e.setTransform(g.a, g.b, g.c, g.d, g.tx - a, g.ty - b), e.globalAlpha = g.alpha, this.draw(e), this._testHit(e)))
			return f.width = 0, f.width =
				1, this;
		for (var j = this.children.length - 1; j >= 0; j--) {
			var k = this.children[j];
			if (k.isVisible() && k.mouseEnabled)
				if (k instanceof c)
					if (i) {
						if (k = k._getObjectsUnderPoint(a, b))
							return this
					} else {
						if (k = k._getObjectsUnderPoint(a, b, h, d), !h && k)
							return k
					}
				else if (!d || i || d & 1 && (k.onPress || k.onClick || k.onDoubleClick) || d & 2 && (k.onMouseOver || k.onMouseOut)) {
					var m = k.hitArea;
					k.getConcatenatedMatrix(g);
					m && (g.appendTransform(m.x + k.regX, m.y + k.regY, m.scaleX, m.scaleY, m.rotation, m.skewX, m.skewY, m.regX, m.regY), g.alpha *= m.alpha / k.alpha);
					e.globalAlpha = g.alpha;
					e.setTransform(g.a, g.b, g.c, g.d, g.tx - a, g.ty - b);
					(m || k).draw(e);
					if (this._testHit(e))
						if (f.width = 0, f.width = 1, i)
							return this;
						else if (h)
							h.push(k);
						else
							return k
				}
		}
		return null
	};
	createjs.Container = c
})();
this.createjs = this.createjs || {};
(function () {
	var c = function (a) {
		this.initialize(a)
	},
	b = c.prototype = new createjs.Container;
	c._snapToPixelEnabled = false;
	b.autoClear = true;
	b.canvas = null;
	b.mouseX = 0;
	b.mouseY = 0;
	b.onMouseMove = null;
	b.onMouseUp = null;
	b.onMouseDown = null;
	b.snapToPixelEnabled = false;
	b.mouseInBounds = false;
	b.tickOnUpdate = true;
	b.mouseMoveOutside = false;
	b._pointerData = null;
	b._pointerCount = 0;
	b._primaryPointerID = null;
	b._mouseOverIntervalID = null;
	b.Container_initialize = b.initialize;
	b.initialize = function (a) {
		this.Container_initialize();
		this.canvas =
			a instanceof HTMLCanvasElement ? a : document.getElementById(a);
		this._pointerData = {};
		this._enableMouseEvents(true)
	};
	b.update = function () {
		if (this.canvas) {
			this.autoClear && this.clear();
			c._snapToPixelEnabled = this.snapToPixelEnabled;
			this.tickOnUpdate && this._tick(arguments.length ? arguments : null);
			var a = this.canvas.getContext("2d");
			a.save();
			this.updateContext(a);
			this.draw(a, false);
			a.restore()
		}
	};
	b.tick = b.update;
	b.clear = function () {
		if (this.canvas) {
			var a = this.canvas.getContext("2d");
			a.setTransform(1, 0, 0, 1, 0, 0);
			a.clearRect(0,
				0, this.canvas.width, this.canvas.height)
		}
	};
	b.toDataURL = function (a, b) {
		b || (b = "image/png");
		var c = this.canvas.getContext("2d"),
		d = this.canvas.width,
		e = this.canvas.height,
		f;
		if (a) {
			f = c.getImageData(0, 0, d, e);
			var g = c.globalCompositeOperation;
			c.globalCompositeOperation = "destination-over";
			c.fillStyle = a;
			c.fillRect(0, 0, d, e)
		}
		var i = this.canvas.toDataURL(b);
		if (a)
			c.clearRect(0, 0, d, e), c.putImageData(f, 0, 0), c.globalCompositeOperation = g;
		return i
	};
	b.enableMouseOver = function (a) {
		if (this._mouseOverIntervalID)
			clearInterval(this._mouseOverIntervalID),
			this._mouseOverIntervalID = null;
		if (a == null)
			a = 20;
		else if (a <= 0)
			return;
		var b = this;
		this._mouseOverIntervalID = setInterval(function () {
			b._testMouseOver()
		}, 1E3 / Math.min(50, a))
	};
	b.clone = function () {
		var a = new c(null);
		this.cloneProps(a);
		return a
	};
	b.toString = function () {
		return "[Stage (name=" + this.name + ")]"
	};
	b._enableMouseEvents = function () {
		var a = this,
		b = window.addEventListener ? window : document;
		b.addEventListener("mouseup", function (b) {
			a._handleMouseUp(b)
		}, false);
		b.addEventListener("mousemove", function (b) {
			a._handleMouseMove(b)
		},
			false);
		b.addEventListener("dblclick", function (b) {
			a._handleDoubleClick(b)
		}, false);
		this.canvas && this.canvas.addEventListener("mousedown", function (b) {
			a._handleMouseDown(b)
		}, false)
	};
	b._getPointerData = function (a) {
		var b = this._pointerData[a];
		if (!b && (b = this._pointerData[a] = {
			x: 0,
			y: 0
		}, this._primaryPointerID == null))
			this._primaryPointerID = a;
		return b
	};
	b._handleMouseMove = function (a) {
		if (!a)
			a = window.event;
		this._handlePointerMove(-1, a, a.pageX, a.pageY)
	};
	b._handlePointerMove = function (a, b, c, d) {
		if (this.canvas) {
			var e =
				this._getPointerData(a),
			f = e.inBounds;
			this._updatePointerPosition(a, c, d);
			if (f || e.inBounds || this.mouseMoveOutside) {
				a = new createjs.MouseEvent("onMouseMove", e.x, e.y, this, b, a, a == this._primaryPointerID, e.rawX, e.rawY);
				if (this.onMouseMove)
					this.onMouseMove(a);
				if (e.event && e.event.onMouseMove)
					a = a.clone(), a.target = e.event.target, e.event.onMouseMove(a)
			}
		}
	};
	b._updatePointerPosition = function (a, b, c) {
		var d = this._getElementRect(this.canvas);
		b -= d.left;
		c -= d.top;
		var e = this.canvas.width,
		f = this.canvas.height;
		b /= (d.right -
			d.left) / e;
		c /= (d.bottom - d.top) / f;
		d = this._getPointerData(a);
		if (d.inBounds = b >= 0 && c >= 0 && b <= e - 1 && c <= f - 1)
			d.x = b, d.y = c;
		else if (this.mouseMoveOutside)
			d.x = b < 0 ? 0 : b > e - 1 ? e - 1 : b, d.y = c < 0 ? 0 : c > f - 1 ? f - 1 : c;
		d.rawX = b;
		d.rawY = c;
		if (a == this._primaryPointerID)
			this.mouseX = d.x, this.mouseY = d.y, this.mouseInBounds = d.inBounds
	};
	b._getElementRect = function (a) {
		var b = a.getBoundingClientRect(),
		c = (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || document.body.clientLeft || 0),
		d = (window.pageYOffset || document.scrollTop || 0) -
		(document.clientTop || document.body.clientTop || 0),
		e = window.getComputedStyle ? getComputedStyle(a) : a.currentStyle,
		a = parseInt(e.paddingLeft) + parseInt(e.borderLeftWidth),
		f = parseInt(e.paddingTop) + parseInt(e.borderTopWidth),
		g = parseInt(e.paddingRight) + parseInt(e.borderRightWidth),
		e = parseInt(e.paddingBottom) + parseInt(e.borderBottomWidth);
		return {
			left: b.left + c + a,
			right: b.right + c - g,
			top: b.top + d + f,
			bottom: b.bottom + d - e
		}
	};
	b._handleMouseUp = function (a) {
		this._handlePointerUp(-1, a, false)
	};
	b._handlePointerUp = function (a,
		b, c) {
		var d = this._getPointerData(a),
		e = new createjs.MouseEvent("onMouseUp", d.x, d.y, this, b, a, a == this._primaryPointerID, d.rawX, d.rawY);
		if (this.onMouseUp)
			this.onMouseUp(e);
		if (d.event && d.event.onMouseUp)
			e = e.clone(), e.target = d.event.target, d.event.onMouseUp(e);
		if (d.target && d.target.onClick && this._getObjectsUnderPoint(d.x, d.y, null, true, this._mouseOverIntervalID ? 3 : 1) == d.target)
			d.target.onClick(new createjs.MouseEvent("onClick", d.x, d.y, d.target, b, a, a == this._primaryPointerID, d.rawX, d.rawY));
		if (c) {
			if (a == this._primaryPointerID)
				this._primaryPointerID =
					null;
			delete this._pointerData[a]
		} else
			d.event = d.target = null
	};
	b._handleMouseDown = function (a) {
		this._handlePointerDown(-1, a, false)
	};
	b._handlePointerDown = function (a, b, c, d) {
		var e = this._getPointerData(a);
		d != null && this._updatePointerPosition(a, c, d);
		if (this.onMouseDown)
			this.onMouseDown(new createjs.MouseEvent("onMouseDown", e.x, e.y, this, b, a, a == this._primaryPointerID, e.rawX, e.rawY));
		if (c = this._getObjectsUnderPoint(e.x, e.y, null, this._mouseOverIntervalID ? 3 : 1)) {
			if (c.onPress && (a = new createjs.MouseEvent("onPress",
							e.x, e.y, c, b, a, a == this._primaryPointerID, e.rawX, e.rawY), c.onPress(a), a.onMouseMove || a.onMouseUp))
				e.event = a;
			e.target = c
		}
	};
	b._testMouseOver = function () {
		if (this._primaryPointerID == -1 && !(this.mouseX == this._mouseOverX && this.mouseY == this._mouseOverY && this.mouseInBounds)) {
			var a = null;
			if (this.mouseInBounds)
				a = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, 3), this._mouseOverX = this.mouseX, this._mouseOverY = this.mouseY;
			if (this._mouseOverTarget != a) {
				if (this._mouseOverTarget && this._mouseOverTarget.onMouseOut)
					this._mouseOverTarget.onMouseOut(new createjs.MouseEvent("onMouseOut",
							this.mouseX, this.mouseY, this._mouseOverTarget));
				if (a && a.onMouseOver)
					a.onMouseOver(new createjs.MouseEvent("onMouseOver", this.mouseX, this.mouseY, a));
				this._mouseOverTarget = a
			}
		}
	};
	b._handleDoubleClick = function (a) {
		if (this.onDoubleClick)
			this.onDoubleClick(new createjs.MouseEvent("onDoubleClick", this.mouseX, this.mouseY, this, a, -1, true));
		var b = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, this._mouseOverIntervalID ? 3 : 1);
		if (b && b.onDoubleClick)
			b.onDoubleClick(new createjs.MouseEvent("onDoubleClick",
					this.mouseX, this.mouseY, b, a, -1, true))
	};
	createjs.Stage = c
})();
this.createjs = this.createjs || {};
(function () {
	var c = function (a) {
		this.initialize(a)
	},
	b = c.prototype = new createjs.DisplayObject;
	b.image = null;
	b.snapToPixel = true;
	b.sourceRect = null;
	b.DisplayObject_initialize = b.initialize;
	b.initialize = function (a) {
		this.DisplayObject_initialize();
		typeof a == "string" ? (this.image = new Image, this.image.src = a) : this.image = a
	};
	b.isVisible = function () {
		return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.image && (this.image.complete || this.image.getContext || this.image.readyState >= 2)
	};
	b.DisplayObject_draw =
		b.draw;
	b.draw = function (a, b) {
		if (this.DisplayObject_draw(a, b))
			return true;
		var c = this.sourceRect;
		c ? a.drawImage(this.image, c.x, c.y, c.width, c.height, 0, 0, c.width, c.height) : a.drawImage(this.image, 0, 0);
		return true
	};
	b.clone = function () {
		var a = new c(this.image);
		this.cloneProps(a);
		return a
	};
	b.toString = function () {
		return "[Bitmap (name=" + this.name + ")]"
	};
	createjs.Bitmap = c
})();
this.createjs = this.createjs || {};
(function () {
	var c = function (a) {
		this.initialize(a)
	},
	b = c.prototype = new createjs.DisplayObject;
	b.onAnimationEnd = null;
	b.currentFrame = -1;
	b.currentAnimation = null;
	b.paused = true;
	b.spriteSheet = null;
	b.snapToPixel = true;
	b.offset = 0;
	b.currentAnimationFrame = 0;
	b._advanceCount = 0;
	b._animation = null;
	b.DisplayObject_initialize = b.initialize;
	b.initialize = function (a) {
		this.DisplayObject_initialize();
		this.spriteSheet = a
	};
	b.isVisible = function () {
		return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.spriteSheet.complete &&
		this.currentFrame >= 0
	};
	b.DisplayObject_draw = b.draw;
	b.draw = function (a, b) {
		if (this.DisplayObject_draw(a, b))
			return true;
		this._normalizeFrame();
		var c = this.spriteSheet.getFrame(this.currentFrame);
		if (c != null) {
			var d = c.rect;
			a.drawImage(c.image, d.x, d.y, d.width, d.height, -c.regX, -c.regY, d.width, d.height);
			return true
		}
	};
	b.play = function () {
		this.paused = false
	};
	b.stop = function () {
		this.paused = true
	};
	b.gotoAndPlay = function (a) {
		this.paused = false;
		this._goto(a)
	};
	b.gotoAndStop = function (a) {
		this.paused = true;
		this._goto(a)
	};
	b.advance =
	function () {
		this._animation ? this.currentAnimationFrame++ : this.currentFrame++;
		this._normalizeFrame()
	};
	b.clone = function () {
		var a = new c(this.spriteSheet);
		this.cloneProps(a);
		return a
	};
	b.toString = function () {
		return "[BitmapAnimation (name=" + this.name + ")]"
	};
	b.DisplayObject__tick = b._tick;
	b._tick = function (a) {
		var b = this._animation ? this._animation.frequency : 1;
		!this.paused && (++this._advanceCount + this.offset) % b == 0 && this.advance();
		this.DisplayObject__tick(a)
	};
	b._normalizeFrame = function () {
		var a = this._animation;
		if (a)
			if (this.currentAnimationFrame >=
				a.frames.length) {
				if (a.next ? this._goto(a.next) : (this.paused = true, this.currentAnimationFrame = a.frames.length - 1, this.currentFrame = a.frames[this.currentAnimationFrame]), this.onAnimationEnd)
					this.onAnimationEnd(this, a.name)
			} else
				this.currentFrame = a.frames[this.currentAnimationFrame];
		else if (this.currentFrame >= this.spriteSheet.getNumFrames() && (this.currentFrame = 0, this.onAnimationEnd))
			this.onAnimationEnd(this, null)
	};
	b.DisplayObject_cloneProps = b.cloneProps;
	b.cloneProps = function (a) {
		this.DisplayObject_cloneProps(a);
		a.onAnimationEnd = this.onAnimationEnd;
		a.currentFrame = this.currentFrame;
		a.currentAnimation = this.currentAnimation;
		a.paused = this.paused;
		a.offset = this.offset;
		a._animation = this._animation;
		a.currentAnimationFrame = this.currentAnimationFrame
	};
	b._goto = function (a) {
		if (isNaN(a)) {
			var b = this.spriteSheet.getAnimation(a);
			if (b)
				this.currentAnimationFrame = 0, this._animation = b, this.currentAnimation = a, this._normalizeFrame()
		} else
			this.currentAnimation = this._animation = null, this.currentFrame = a
	};
	createjs.BitmapAnimation = c
})();
this.createjs = this.createjs || {};
(function () {
	var c = function (a) {
		this.initialize(a)
	},
	b = c.prototype = new createjs.DisplayObject;
	b.graphics = null;
	b.DisplayObject_initialize = b.initialize;
	b.initialize = function (a) {
		this.DisplayObject_initialize();
		this.graphics = a ? a : new createjs.Graphics
	};
	b.isVisible = function () {
		return Boolean(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.graphics)
	};
	b.DisplayObject_draw = b.draw;
	b.draw = function (a, b) {
		if (this.DisplayObject_draw(a, b))
			return true;
		this.graphics.draw(a);
		return true
	};
	b.clone = function (a) {
		a =
			new c(a && this.graphics ? this.graphics.clone() : this.graphics);
		this.cloneProps(a);
		return a
	};
	b.toString = function () {
		return "[Shape (name=" + this.name + ")]"
	};
	createjs.Shape = c
})();
this.createjs = this.createjs || {};
(function () {
	var c = function (a, b, c) {
		this.initialize(a, b, c)
	},
	b = c.prototype = new createjs.DisplayObject;
	c._workingContext = (createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas")).getContext("2d");
	b.text = "";
	b.font = null;
	b.color = "#000";
	b.textAlign = "left";
	b.textBaseline = "top";
	b.maxWidth = null;
	b.outline = false;
	b.lineHeight = 0;
	b.lineWidth = null;
	b.DisplayObject_initialize = b.initialize;
	b.initialize = function (a, b, c) {
		this.DisplayObject_initialize();
		this.text = a;
		this.font = b;
		this.color = c ? c : "#000"
	};
	b.isVisible = function () {
		return Boolean(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.text != null && this.text !== "")
	};
	b.DisplayObject_draw = b.draw;
	b.draw = function (a, b) {
		if (this.DisplayObject_draw(a, b))
			return true;
		this.outline ? a.strokeStyle = this.color : a.fillStyle = this.color;
		a.font = this.font;
		a.textAlign = this.textAlign || "start";
		a.textBaseline = this.textBaseline || "alphabetic";
		this._drawText(a);
		return true
	};
	b.getMeasuredWidth = function () {
		return this._getWorkingContext().measureText(this.text).width
	};
	b.getMeasuredLineHeight = function () {
		return this._getWorkingContext().measureText("M").width * 1.2
	};
	b.getMeasuredHeight = function () {
		return this._drawText() * (this.lineHeight || this.getMeasuredLineHeight())
	};
	b.clone = function () {
		var a = new c(this.text, this.font, this.color);
		this.cloneProps(a);
		return a
	};
	b.toString = function () {
		return "[Text (text=" + (this.text.length > 20 ? this.text.substr(0, 17) + "..." : this.text) + ")]"
	};
	b.DisplayObject_cloneProps = b.cloneProps;
	b.cloneProps = function (a) {
		this.DisplayObject_cloneProps(a);
		a.textAlign =
			this.textAlign;
		a.textBaseline = this.textBaseline;
		a.maxWidth = this.maxWidth;
		a.outline = this.outline;
		a.lineHeight = this.lineHeight;
		a.lineWidth = this.lineWidth
	};
	b._getWorkingContext = function () {
		var a = c._workingContext;
		a.font = this.font;
		a.textAlign = this.textAlign || "start";
		a.textBaseline = this.textBaseline || "alphabetic";
		return a
	};
	b._drawText = function (a) {
		var b = !!a;
		b || (a = this._getWorkingContext());
		for (var c = String(this.text).split(/(?:\r\n|\r|\n)/), d = this.lineHeight || this.getMeasuredLineHeight(), e = 0, f = 0, g = c.length; f <
			g; f++) {
			var i = a.measureText(c[f]).width;
			if (this.lineWidth == null || i < this.lineWidth)
				b && this._drawTextLine(a, c[f], e * d);
			else {
				for (var i = c[f].split(/(\s)/), j = i[0], k = 1, m = i.length; k < m; k += 2)
					a.measureText(j + i[k] + i[k + 1]).width > this.lineWidth ? (b && this._drawTextLine(a, j, e * d), e++, j = i[k + 1]) : j += i[k] + i[k + 1];
				b && this._drawTextLine(a, j, e * d)
			}
			e++
		}
		return e
	};
	b._drawTextLine = function (a, b, c) {
		this.outline ? a.strokeText(b, 0, c, this.maxWidth || 65535) : a.fillText(b, 0, c, this.maxWidth || 65535)
	};
	createjs.Text = c
})();
this.createjs = this.createjs || {};
(function () {
	var c = function () {
		throw "SpriteSheetUtils cannot be instantiated";
	};
	c._workingCanvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
	c._workingContext = c._workingCanvas.getContext("2d");
	c.addFlippedFrames = function (b, a, l, h) {
		if (a || l || h) {
			var d = 0;
			a && c._flip(b, ++d, true, false);
			l && c._flip(b, ++d, false, true);
			h && c._flip(b, ++d, true, true)
		}
	};
	c.extractFrame = function (b, a) {
		isNaN(a) && (a = b.getAnimation(a).frames[0]);
		var l = b.getFrame(a);
		if (!l)
			return null;
		var h = l.rect,
		d = c._workingCanvas;
		d.width = h.width;
		d.height = h.height;
		c._workingContext.drawImage(l.image, h.x, h.y, h.width, h.height, 0, 0, h.width, h.height);
		l = new Image;
		l.src = d.toDataURL("image/png");
		return l
	};
	c.mergeAlpha = function (b, a, c) {
		c || (c = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"));
		c.width = Math.max(a.width, b.width);
		c.height = Math.max(a.height, b.height);
		var h = c.getContext("2d");
		h.save();
		h.drawImage(b, 0, 0);
		h.globalCompositeOperation = "destination-in";
		h.drawImage(a, 0, 0);
		h.restore();
		return c
	};
	c._flip =
	function (b, a, l, h) {
		for (var d = b._images, e = c._workingCanvas, f = c._workingContext, g = d.length / a, i = 0; i < g; i++) {
			var j = d[i];
			j.__tmp = i;
			e.width = 0;
			e.width = j.width;
			e.height = j.height;
			f.setTransform(l ? -1 : 1, 0, 0, h ? -1 : 1, l ? j.width : 0, h ? j.height : 0);
			f.drawImage(j, 0, 0);
			var k = new Image;
			k.src = e.toDataURL("image/png");
			k.width = j.width;
			k.height = j.height;
			d.push(k)
		}
		f = b._frames;
		e = f.length / a;
		for (i = 0; i < e; i++) {
			var j = f[i],
			m = j.rect.clone(),
			k = d[j.image.__tmp + g * a],
			o = {
				image: k,
				rect: m,
				regX: j.regX,
				regY: j.regY
			};
			if (l)
				m.x = k.width - m.x - m.width,
				o.regX = m.width - j.regX;
			if (h)
				m.y = k.height - m.y - m.height, o.regY = m.height - j.regY;
			f.push(o)
		}
		l = "_" + (l ? "h" : "") + (h ? "v" : "");
		h = b._animations;
		b = b._data;
		d = h.length / a;
		for (i = 0; i < d; i++) {
			f = h[i];
			j = b[f];
			g = {
				name: f + l,
				frequency: j.frequency,
				next: j.next,
				frames: []
			};
			j.next && (g.next += l);
			f = j.frames;
			j = 0;
			for (k = f.length; j < k; j++)
				g.frames.push(f[j] + e * a);
			b[g.name] = g;
			h.push(g.name)
		}
	};
	createjs.SpriteSheetUtils = c
})();
this.createjs = this.createjs || {};
(function () {
	var c = function () {
		this.initialize()
	},
	b = c.prototype;
	c.ERR_DIMENSIONS = "frame dimensions exceed max spritesheet dimensions";
	c.ERR_RUNNING = "a build is already running";
	b.maxWidth = 2048;
	b.maxHeight = 2048;
	b.spriteSheet = null;
	b.scale = 1;
	b.padding = 1;
	b._frames = null;
	b._animations = null;
	b._data = null;
	b._nextFrameIndex = 0;
	b._index = 0;
	b._callback = null;
	b._timeSlice = null;
	b._timerID = null;
	b._scale = 1;
	b.initialize = function () {
		this._frames = [];
		this._animations = {}

	};
	b.addFrame = function (a, b, h, d, e, f) {
		if (this._data)
			throw c.ERR_RUNNING;
		b = b || a.bounds || a.nominalBounds;
		!b && a.getBounds && (b = a.getBounds());
		if (!b)
			return null;
		h = h || 1;
		return this._frames.push({
			source: a,
			sourceRect: b,
			scale: h,
			funct: d,
			params: e,
			scope: f,
			index: this._frames.length,
			height: b.height * h
		}) - 1
	};
	b.addAnimation = function (a, b, h, d) {
		if (this._data)
			throw c.ERR_RUNNING;
		this._animations[a] = {
			frames: b,
			next: h,
			frequency: d
		}
	};
	b.addMovieClip = function (a, b, h) {
		if (this._data)
			throw c.ERR_RUNNING;
		var d = a.frameBounds,
		e = b || a.bounds || a.nominalBounds;
		!e && a.getBounds && (e = a.getBounds());
		if (!e && !d)
			return null;
		for (var b = a.timeline.duration, f = 0; f < b; f++)
			this.addFrame(a, d && d[f] ? d[f] : e, h, function (a) {
				var b = this.actionsEnabled;
				this.actionsEnabled = false;
				this.gotoAndStop(a);
				this.actionsEnabled = b
			}, [f], a);
		var f = a.timeline._labels,
		a = [],
		g;
		for (g in f)
			a.push({
				index: f[g],
				label: g
			});
		if (a.length) {
			a.sort(function (a, b) {
				return a.index - b.index
			});
			f = 0;
			for (g = a.length; f < g; f++) {
				for (var h = a[f].label, d = f == g - 1 ? b : a[f + 1].index, e = [], i = a[f].index; i < d; i++)
					e.push(i);
				this.addAnimation(h, e, true)
			}
		}
	};
	b.build = function () {
		if (this._data)
			throw c.ERR_RUNNING;
		this._callback = null;
		for (this._startBuild() ; this._drawNext() ;);
		this._endBuild();
		return this.spriteSheet
	};
	b.buildAsync = function (a, b) {
		if (this._data)
			throw c.ERR_RUNNING;
		this._callback = a;
		this._startBuild();
		this._timeSlice = Math.max(0.01, Math.min(0.99, b || 0.3)) * 50;
		var h = this;
		this._timerID = setTimeout(function () {
			h._run()
		}, 50 - this._timeSlice)
	};
	b.stopAsync = function () {
		clearTimeout(this._timerID);
		this._data = null
	};
	b.clone = function () {
		throw "SpriteSheetBuilder cannot be cloned.";
	};
	b.toString = function () {
		return "[SpriteSheetBuilder]"
	};
	b._startBuild = function () {
		var a = this.padding || 0;
		this.spriteSheet = null;
		this._index = 0;
		this._scale = this.scale;
		var b = [];
		this._data = {
			images: [],
			frames: b,
			animations: this._animations
		};
		var h = this._frames.slice();
		h.sort(function (a, b) {
			return a.height <= b.height ? -1 : 1
		});
		if (h[h.length - 1].height + a * 2 > this.maxHeight)
			throw c.ERR_DIMENSIONS;
		for (var d = 0, e = 0, f = 0; h.length;) {
			var g = this._fillRow(h, d, f, b, a);
			if (g.w > e)
				e = g.w;
			d += g.h;
			if (!g.h || !h.length) {
				var i = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
				i.width = this._getSize(e, this.maxWidth);
				i.height = this._getSize(d, this.maxHeight);
				this._data.images[f] = i;
				g.h || (e = d = 0, f++)
			}
		}
	};
	b._getSize = function (a, b) {
		for (var c = 4; Math.pow(2, ++c) < a;);
		return Math.min(b, Math.pow(2, c))
	};
	b._fillRow = function (a, b, h, d, e) {
		var f = this.maxWidth,
		g = this.maxHeight - b,
		i = e;
		b += e;
		for (var j = 0, k = a.length - 1; k >= 0; k--) {
			var m = a[k],
			o = this._scale * m.scale,
			n = m.sourceRect,
			q = m.source,
			p = Math.floor(o * n.x - e),
			s = Math.floor(o * n.y - e),
			r = Math.ceil(o * n.height + e * 2),
			n = Math.ceil(o * n.width + e * 2);
			if (n > f)
				throw c.ERR_DIMENSIONS;
			if (!(r > g || i + n > f))
				m.img = h, m.rect = new createjs.Rectangle(i, b, n, r), j = j || r, a.splice(k, 1), d[m.index] = [i, b, n, r, h, Math.round(-p + o * q.regX - e), Math.round(-s + o * q.regY - e)], i += n
		}
		return {
			w: i,
			h: j
		}
	};
	b._endBuild = function () {
		this.spriteSheet = new createjs.SpriteSheet(this._data);
		this._data = null;
		this._callback && this._callback(this)
	};
	b._run = function () {
		for (var a = (new Date).getTime() + this._timeSlice, b = false; a > (new Date).getTime() ;)
			if (!this._drawNext()) {
				b = true;
				break
			}
		if (b)
			this._endBuild();
		else {
			var c = this;
			this._timerID = setTimeout(function () {
				c._run()
			},
					50 - this._timeSlice)
		}
	};
	b._drawNext = function () {
		var a = this._frames[this._index],
		b = a.scale * this._scale,
		c = a.rect,
		d = a.sourceRect,
		e = this._data.images[a.img].getContext("2d");
		a.funct && a.funct.apply(a.scope, a.params);
		e.save();
		e.beginPath();
		e.rect(c.x, c.y, c.width, c.height);
		e.clip();
		e.translate(Math.ceil(c.x - d.x * b), Math.ceil(c.y - d.y * b));
		e.scale(b, b);
		a.source.draw(e);
		e.restore();
		return ++this._index < this._frames.length
	};
	createjs.SpriteSheetBuilder = c
})();
this.createjs = this.createjs || {};
(function () {
	var c = function (a) {
		this.initialize(a)
	},
	b = c.prototype = new createjs.DisplayObject;
	b.htmlElement = null;
	b._style = null;
	b.DisplayObject_initialize = b.initialize;
	b.initialize = function (a) {
		typeof a == "string" && (a = document.getElementById(a));
		this.DisplayObject_initialize();
		this.mouseEnabled = false;
		if (this.htmlElement = a)
			this._style = a.style, this._style.position = "absolute", this._style.transformOrigin = this._style.WebkitTransformOrigin = this._style.msTransformOrigin = this._style.MozTransformOrigin = this._style.OTransformOrigin =
				"0% 0%"
	};
	b.isVisible = function () {
		return this.htmlElement != null
	};
	b.draw = function () {
		if (this.htmlElement != null) {
			var a = this.getConcatenatedMatrix(this._matrix),
			b = this.htmlElement;
			b.style.opacity = "" + a.alpha;
			b.style.visibility = this.visible ? "visible" : "hidden";
			b.style.transform = b.style.WebkitTransform = b.style.OTransform = b.style.msTransform = ["matrix(" + a.a, a.b, a.c, a.d, a.tx + 0.5 | 0, (a.ty + 0.5 | 0) + ")"].join(",");
			b.style.MozTransform = ["matrix(" + a.a, a.b, a.c, a.d, (a.tx + 0.5 | 0) + "px", (a.ty + 0.5 | 0) + "px)"].join(",");
			return true
		}
	};
	b.cache = function () { };
	b.uncache = function () { };
	b.updateCache = function () { };
	b.hitTest = function () { };
	b.localToGlobal = function () { };
	b.globalToLocal = function () { };
	b.localToLocal = function () { };
	b.clone = function () {
		var a = new c;
		this.cloneProps(a);
		return a
	};
	b.toString = function () {
		return "[DOMElement (name=" + this.name + ")]"
	};
	b._tick = function (a) {
		if (this.htmlElement != null && (this.htmlElement.style.visibility = "hidden", this.onTick))
			this.onTick(a)
	};
	createjs.DOMElement = c
})();
this.createjs = this.createjs || {};
(function () {
	var c = function () {
		this.initialize()
	},
	b = c.prototype;
	b.initialize = function () { };
	b.getBounds = function () {
		return new createjs.Rectangle(0, 0, 0, 0)
	};
	b.applyFilter = function () { };
	b.toString = function () {
		return "[Filter]"
	};
	b.clone = function () {
		return new c
	};
	createjs.Filter = c
})();
this.createjs = this.createjs || {};
(function () {
	var c = function () {
		throw "Touch cannot be instantiated";
	};
	c.isSupported = function () {
		return "ontouchstart" in window || window.navigator.msPointerEnabled
	};
	c.enable = function (b, a, l) {
		if (!b || !b.canvas || !c.isSupported())
			return false;
		b.__touch = {
			pointers: {},
			multitouch: !a,
			preventDefault: !l,
			count: 0
		};
		"ontouchstart" in window ? c._IOS_enable(b) : window.navigator.msPointerEnabled && c._IE_enable(b);
		return true
	};
	c.disable = function (b) {
		b && ("ontouchstart" in window ? c._IOS_disable(b) : window.navigator.msPointerEnabled && c._IE_disable(b))
	};
	c._IOS_enable = function (b) {
		var a = b.canvas,
		l = b.__touch.f = function (a) {
			c._IOS_handleEvent(b, a)
		};
		a.addEventListener("touchstart", l, false);
		a.addEventListener("touchmove", l, false);
		a.addEventListener("touchend", l, false);
		a.addEventListener("touchcancel", l, false)
	};
	c._IOS_disable = function (b) {
		var a = b.canvas;
		if (a)
			b = b.__touch.f, a.removeEventListener("touchstart", b, false), a.removeEventListener("touchmove", b, false), a.removeEventListener("touchend", b, false), a.removeEventListener("touchcancel", b, false)
	};
	c._IOS_handleEvent =
	function (b, a) {
		if (b) {
			b.__touch.preventDefault && a.preventDefault && a.preventDefault();
			for (var c = a.changedTouches, h = a.type, d = 0, e = c.length; d < e; d++) {
				var f = c[d],
				g = f.identifier;
				f.target == b.canvas && (h == "touchstart" ? this._handleStart(b, g, a, f.pageX, f.pageY) : h == "touchmove" ? this._handleMove(b, g, a, f.pageX, f.pageY) : (h == "touchend" || h == "touchcancel") && this._handleEnd(b, g, a))
			}
		}
	};
	c._IE_enable = function (b) {
		var a = b.canvas,
		l = b.__touch.f = function (a) {
			c._IE_handleEvent(b, a)
		};
		a.addEventListener("MSPointerDown", l, false);
		window.addEventListener("MSPointerMove",
			l, false);
		window.addEventListener("MSPointerUp", l, false);
		window.addEventListener("MSPointerCancel", l, false);
		if (b.__touch.preventDefault)
			a.style.msTouchAction = "none";
		b.__touch.activeIDs = {}

	};
	c._IE_disable = function (b) {
		var a = b.__touch.f;
		window.removeEventListener("MSPointerMove", a, false);
		window.removeEventListener("MSPointerUp", a, false);
		window.removeEventListener("MSPointerCancel", a, false);
		b.canvas && b.canvas.removeEventListener("MSPointerDown", a, false)
	};
	c._IE_handleEvent = function (b, a) {
		if (b) {
			b.__touch.preventDefault &&
			a.preventDefault && a.preventDefault();
			var c = a.type,
			h = a.pointerId,
			d = b.__touch.activeIDs;
			if (c == "MSPointerDown")
				a.srcElement == b.canvas && (d[h] = true, this._handleStart(b, h, a, a.pageX, a.pageY));
			else if (d[h])
				if (c == "MSPointerMove")
					this._handleMove(b, h, a, a.pageX, a.pageY);
				else if (c == "MSPointerUp" || c == "MSPointerCancel")
					delete d[h], this._handleEnd(b, h, a)
		}
	};
	c._handleStart = function (b, a, c, h, d) {
		var e = b.__touch;
		if (e.multitouch || !e.count) {
			var f = e.pointers;
			f[a] || (f[a] = true, e.count++, b._handlePointerDown(a, c, h, d))
		}
	};
	c._handleMove =
	function (b, a, c, h, d) {
		b.__touch.pointers[a] && b._handlePointerMove(a, c, h, d)
	};
	c._handleEnd = function (b, a, c) {
		var h = b.__touch,
		d = h.pointers;
		d[a] && (h.count--, b._handlePointerUp(a, c, true), delete d[a])
	};
	createjs.Touch = c
})();
